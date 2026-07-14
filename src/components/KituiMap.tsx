"use client";

import { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Loader2, MapPin, Layers, ZoomIn, ZoomOut, Maximize, Minimize, X } from 'lucide-react';
import L from 'leaflet';

interface KituiMapProps {
  data?: Array<{
    constituency: string;
    count: number;
    percentage: number;
  }>;
  onConstituencyClick?: (constituency: string) => void;
  onConstituenciesLoaded?: (constituencies: string[]) => void;
}

// Fix Leaflet default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom zoom control component
function ZoomControls() {
  const map = useMap();

  return (
    <div className="leaflet-control-zoom leaflet-bar leaflet-control">
      <a
        className="leaflet-control-zoom-in"
        href="#"
        title="Zoom in"
        role="button"
        aria-label="Zoom in"
        onClick={(e) => {
          e.preventDefault();
          map.zoomIn();
        }}
      >
        <ZoomIn className="h-4 w-4" />
      </a>
      <a
        className="leaflet-control-zoom-out"
        href="#"
        title="Zoom out"
        role="button"
        aria-label="Zoom out"
        onClick={(e) => {
          e.preventDefault();
          map.zoomOut();
        }}
      >
        <ZoomOut className="h-4 w-4" />
      </a>
    </div>
  );
}

// Pre-defined distinct colors for constituencies
const CONSTITUENCY_COLORS = [
  '#C17B2B', // Gold
  '#E74C3C', // Red
  '#3498DB', // Blue
  '#2ECC71', // Emerald
  '#9B59B6', // Purple
  '#F39C12', // Orange
  '#1ABC9C', // Teal
  '#E67E22', // Dark Orange
  '#2C3E50', // Navy
  '#D35400', // Burnt Orange
  '#27AE60', // Green
  '#2980B9', // Dark Blue
  '#8E44AD', // Dark Purple
  '#16A085', // Dark Teal
  '#C0392B', // Dark Red
  '#F1C40F', // Yellow
];

export default function KituiMap({ data, onConstituencyClick, onConstituenciesLoaded }: KituiMapProps) {
  const [geoData, setGeoData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredConstituency, setHoveredConstituency] = useState<string | null>(null);
  const [selectedConstituency, setSelectedConstituency] = useState<string | null>(null);
  const [constituencyList, setConstituencyList] = useState<string[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Load GeoJSON data
  useEffect(() => {
    const loadGeoData = async () => {
      try {
        let response = await fetch('/data/kitui.geojson');

        if (!response.ok) {
          response = await fetch('/data/kenya.geojson');
        }

        if (!response.ok) {
          throw new Error('GeoJSON data not found');
        }

        const jsonData = await response.json();
        console.log('📊 GeoJSON loaded, total features:', jsonData.features?.length);

        if (!jsonData.features || jsonData.features.length === 0) {
          throw new Error('No features found in GeoJSON');
        }

        let kituiData = jsonData;
        let constituencies: string[] = [];

        const sampleProps = jsonData.features[0]?.properties || {};
        const hasName2 = 'NAME_2' in sampleProps;
        const hasName1 = 'NAME_1' in sampleProps;

        if (hasName1 && !hasName2) {
          const kituiFeatures = jsonData.features.filter((feature: any) => {
            const props = feature.properties || {};
            const countyName = props.NAME_1 || props.COUNTY_NAM || '';
            return countyName.toUpperCase() === 'KITUI';
          });

          if (kituiFeatures.length > 0) {
            console.log(`📍 Found ${kituiFeatures.length} features for Kitui County`);
            kituiData = {
              type: "FeatureCollection",
              features: kituiFeatures
            };
          } else {
            const allCounties = [...new Set(jsonData.features.map((f: any) => f.properties?.NAME_1 || 'Unknown'))];
            setError(`No Kitui County data found. Available counties: ${allCounties.join(', ')}`);
            setLoading(false);
            return;
          }
        }

        constituencies = kituiData.features.map((f: any) =>
          f.properties?.NAME_2 || f.properties?.CONSTITUEN || 'Unknown'
        );

        console.log('📌 Kitui constituencies found:', constituencies);
        setConstituencyList(constituencies);

        if (onConstituenciesLoaded) {
          onConstituenciesLoaded(constituencies);
        }

        setGeoData(kituiData);
        setLoading(false);
      } catch (err) {
        console.error('Error loading map data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load map data');
        setLoading(false);
      }
    };

    loadGeoData();
  }, [onConstituenciesLoaded]);

  // Calculate center and zoom for Kitui County
  const mapSettings = useMemo(() => {
    if (!geoData || !geoData.features || geoData.features.length === 0) {
      return { center: [-1.5, 38.3] as [number, number], zoom: 9 };
    }

    let lat = 0, lng = 0, count = 0;
    geoData.features.forEach((feature: any) => {
      const coords = feature.geometry?.coordinates;
      if (coords) {
        try {
          let points: any[] = [];
          if (feature.geometry.type === 'Polygon') {
            points = coords[0];
          } else if (feature.geometry.type === 'MultiPolygon') {
            points = coords[0][0];
          }

          if (points && points.length > 0) {
            points.forEach((point: any) => {
              lng += point[0];
              lat += point[1];
              count++;
            });
          }
        } catch (e) {
          // Skip if geometry is complex
        }
      }
    });

    if (count > 0) {
      return { center: [lat / count, lng / count] as [number, number], zoom: 9 };
    }
    return { center: [-1.5, 38.3] as [number, number], zoom: 9 };
  }, [geoData]);

  // Get distinct constituencies and assign colors
  const constituencyColors = useMemo(() => {
    if (!geoData || !geoData.features) return {};

    const uniqueConstituencies = [
      ...new Set(
        geoData.features.map((f: any) => f.properties?.NAME_2 || f.properties?.CONSTITUEN || 'Unknown')
      )
    ] as string[]; // Cast to string[] to fix the type issue

    const colorMap: Record<string, string> = {};
    uniqueConstituencies.forEach((name: string, index: number) => {
      colorMap[name] = CONSTITUENCY_COLORS[index % CONSTITUENCY_COLORS.length];
    });

    return colorMap;
  }, [geoData]);

  // Get constituency name from feature
  const getConstituencyName = (props: any): string => {
    return props.NAME_2 || props.CONSTITUEN || props.CONSTITUENCY || props.NAME || 'Unknown';
  };

  // Find data for a constituency
  const findConstituencyData = (constituencyName: string) => {
    if (!data) return null;
    return data.find(d => {
      const dName = d.constituency.toLowerCase().trim();
      const fName = constituencyName.toLowerCase().trim();
      return dName === fName ||
        dName.includes(fName) ||
        fName.includes(dName);
    });
  };

  const getStyle = (feature: any) => {
    const props = feature.properties || {};
    const constituencyName = getConstituencyName(props);
    const isHovered = hoveredConstituency === constituencyName;
    const isSelected = selectedConstituency === constituencyName;
    const stats = findConstituencyData(constituencyName);

    const baseColor = constituencyColors[constituencyName] || '#666';
    const percentage = stats?.percentage || 0;
    const opacity = 0.5 + (percentage / 100) * 0.4;

    return {
      fillColor: baseColor,
      weight: isHovered || isSelected ? 3 : 2,
      opacity: 1,
      color: isHovered ? '#FFFFFF' : (isSelected ? '#C17B2B' : '#f5f5f5'),
      fillOpacity: isHovered ? 0.9 : (isSelected ? 0.85 : opacity),
      dashArray: undefined,
    };
  };

  const onEachFeature = (feature: any, layer: any) => {
    const props = feature.properties || {};
    const constituencyName = getConstituencyName(props);
    const countyName = props.NAME_1 || props.COUNTY_NAM || 'Kitui';
    const stats = findConstituencyData(constituencyName);

    // Build tooltip content with data
    let tooltipContent = `
      <div style="padding: 10px 14px; min-width: 180px; max-width: 260px;">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
          <div style="width: 12px; height: 12px; border-radius: 50%; background: ${constituencyColors[constituencyName] || '#666'};"></div>
          <strong style="color: #C17B2B; font-size: 14px;">
            ${constituencyName}
          </strong>
        </div>
        <div style="font-size: 10px; color: #888; padding-left: 20px; border-bottom: 1px solid #2a2a2a; padding-bottom: 4px; margin-bottom: 4px;">
          ${countyName} County
        </div>
    `;

    if (stats) {
      const progressWidth = Math.min(stats.percentage, 100);
      tooltipContent += `
        <div style="display: flex; justify-content: space-between; font-size: 12px; color: #e5e5e5; padding: 1px 0;">
          <span>👥 Supporters</span>
          <span style="font-weight: bold; color: #C17B2B;">${stats.count.toLocaleString()}</span>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 12px; color: #e5e5e5; padding: 1px 0;">
          <span>📊 Percentage</span>
          <span style="font-weight: bold; color: #C17B2B;">${stats.percentage.toFixed(1)}%</span>
        </div>
        <div style="height: 4px; background: #1a1a2e; border-radius: 2px; overflow: hidden; margin-top: 4px;">
          <div style="width: ${progressWidth}%; height: 100%; background: linear-gradient(90deg, ${constituencyColors[constituencyName] || '#C17B2B'}, #E6A856); border-radius: 2px;"></div>
        </div>
        <div style="font-size: 8px; color: #666; text-align: right; margin-top: 1px;">
          ${progressWidth.toFixed(0)}% of total
        </div>
      `;
    } else {
      tooltipContent += `
        <div style="font-size: 11px; color: #666; text-align: center; padding: 6px; background: #1a1a2e; border-radius: 4px; margin-top: 4px;">
          No data available
        </div>
      `;
    }

    tooltipContent += `</div>`;
    layer.bindTooltip(tooltipContent, {
      className: 'custom-tooltip',
      direction: 'auto',
      permanent: false,
      sticky: true,
      offset: [0, -10],
    });

    // Hover events
    layer.on('mouseover', function (this: any) {
      setHoveredConstituency(constituencyName);
      this.setStyle({
        fillOpacity: 0.9,
        weight: 3,
        color: '#FFFFFF',
      });
      this.bringToFront();
    });

    layer.on('mouseout', function (this: any) {
      setHoveredConstituency(null);
      const isSelected = selectedConstituency === constituencyName;
      const stats = findConstituencyData(constituencyName);
      const percentage = stats?.percentage || 0;
      const opacity = 0.5 + (percentage / 100) * 0.4;
      this.setStyle({
        fillOpacity: isSelected ? 0.85 : opacity,
        weight: isSelected ? 3 : 2,
        color: isSelected ? '#C17B2B' : '#f5f5f5',
      });
    });

    // Click event
    layer.on('click', function (this: any) {
      if (selectedConstituency === constituencyName) {
        setSelectedConstituency(null);
        if (onConstituencyClick) {
          onConstituencyClick('');
        }
      } else {
        setSelectedConstituency(constituencyName);
        if (onConstituencyClick) {
          onConstituencyClick(constituencyName);
        }
      }
    });
  };

  const toggleFullscreen = () => {
    const container = document.getElementById('map-container');
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(() => { });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[400px] md:h-[500px] bg-bg-dark rounded-xl border border-gold/20">
        <div className="text-center">
          <Loader2 className="h-8 w-8 text-gold animate-spin mx-auto mb-3" />
          <p className="text-text-dim text-sm">Loading map data...</p>
        </div>
      </div>
    );
  }

  if (error || !geoData || geoData.features?.length === 0) {
    return (
      <div className="flex items-center justify-center h-[400px] md:h-[500px] bg-bg-dark rounded-xl border border-gold/20">
        <div className="text-center text-text-dim px-4">
          <MapPin className="h-12 w-12 text-gold/30 mx-auto mb-3" />
          <p className="text-lg font-semibold text-gold">Kitui County Map</p>
          <p className="text-sm mt-2">{error || 'No data available'}</p>
          <p className="text-xs mt-2 text-text-dim/50">Please ensure the GeoJSON file contains Kitui County data</p>
        </div>
      </div>
    );
  }

  return (
    <div id="map-container" className="relative w-full rounded-xl overflow-hidden border border-gold/20">
      <div className={`relative w-full transition-all duration-300 ${isFullscreen ? 'h-screen' : 'h-[400px] md:h-[500px]'}`}>
        <MapContainer
          center={mapSettings.center}
          zoom={mapSettings.zoom}
          style={{ height: '100%', width: '100%' }}
          className="bg-bg-dark"
          zoomControl={false}
          dragging={true}
          scrollWheelZoom={true}
          doubleClickZoom={true}
          touchZoom={true}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            className="opacity-70"
          />
          <GeoJSON
            data={geoData}
            style={getStyle}
            onEachFeature={onEachFeature}
          />
          <ZoomControls />
        </MapContainer>

        {/* Top Bar - Constituency Info */}
        <div className="absolute top-2 left-2 right-2 md:top-3 md:left-3 md:right-3 flex flex-wrap justify-between items-start gap-2 pointer-events-none">
          <div className="bg-bg-dark/80 backdrop-blur-sm rounded-lg px-2 py-1.5 md:px-3 md:py-2 border border-gold/10 pointer-events-auto">
            <div className="flex items-center gap-1.5 md:gap-2">
              <Layers className="h-3 w-3 md:h-4 md:w-4 text-gold" />
              <span className="text-[10px] md:text-xs text-text-light font-medium">
                {geoData.features.length} Areas • {constituencyList.length} Constituencies
              </span>
            </div>
          </div>
          <div className="flex gap-2 pointer-events-auto">
            {selectedConstituency && (
              <div className="bg-bg-dark/80 backdrop-blur-sm rounded-lg px-2 py-1.5 md:px-3 md:py-2 border border-gold/30 flex items-center gap-1.5 md:gap-2">
                <span className="text-[10px] md:text-xs text-gold font-medium truncate max-w-[120px] md:max-w-[200px]">
                  {selectedConstituency}
                </span>
                <button
                  onClick={() => {
                    setSelectedConstituency(null);
                    if (onConstituencyClick) onConstituencyClick('');
                  }}
                  className="text-text-dim hover:text-gold transition-colors"
                >
                  <X className="h-3 w-3 md:h-4 md:w-4" />
                </button>
              </div>
            )}
            <button
              onClick={toggleFullscreen}
              className="bg-bg-dark/80 backdrop-blur-sm rounded-lg p-1.5 md:p-2 border border-gold/10 text-text-dim hover:text-gold transition-colors pointer-events-auto"
              title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? (
                <Minimize className="h-3 w-3 md:h-4 md:w-4" />
              ) : (
                <Maximize className="h-3 w-3 md:h-4 md:w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Legend - Responsive */}
        <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 bg-bg-dark/80 backdrop-blur-sm rounded-lg px-2 py-1.5 md:px-3 md:py-2 border border-gold/10 max-w-[180px] md:max-w-[220px] pointer-events-none">
          <p className="text-[8px] md:text-[10px] text-text-dim mb-1 font-medium">Constituencies</p>
          <div className="flex flex-wrap gap-1">
            {constituencyList.slice(0, 6).map((name) => (
              <div key={name} className="flex items-center gap-0.5 md:gap-1">
                <div
                  className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full"
                  style={{ background: constituencyColors[name] || '#666' }}
                />
                <span className="text-[6px] md:text-[8px] text-text-dim truncate max-w-[30px] md:max-w-[50px]">{name}</span>
              </div>
            ))}
            {constituencyList.length > 6 && (
              <span className="text-[6px] md:text-[8px] text-text-dim/50">+{constituencyList.length - 6}</span>
            )}
          </div>
        </div>

        {/* Kitui County Label */}
        <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 bg-bg-dark/80 backdrop-blur-sm rounded-lg px-2 py-1 md:px-3 md:py-1.5 border border-gold/10 pointer-events-none">
          <span className="text-[8px] md:text-[10px] text-gold/70 font-medium">KITUI COUNTY</span>
        </div>
      </div>
    </div>
  );
}
