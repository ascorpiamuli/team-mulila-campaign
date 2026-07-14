#!/usr/bin/env python3
"""
Extract Kitui County constituencies from the GADM shapefile
Run: python3 extract_kitui.py
"""

import json
import os
import sys
from pathlib import Path

print("=" * 70)
print("📍 KITUI COUNTY GEOJSON EXTRACTOR")
print("=" * 70)

# Check if shapefile exists in public/data
shp_files = list(Path('public/data').glob('gadm41_KEN_2.shp'))
if not shp_files:
    shp_files = list(Path('public/data').glob('gadm*_KEN_2.shp'))

if not shp_files:
    print("\n❌ Error: Shapefile not found in public/data/")
    print("\nYour current files in public/data/:")
    for f in Path('public/data').iterdir():
        print(f"  - {f.name}")
    sys.exit(1)

shp_file = str(shp_files[0])
print(f"\n📂 Found shapefile: {shp_file}")

# Check for associated files
shp_base = shp_file.replace('.shp', '')
for ext in ['.shx', '.dbf', '.prj']:
    if os.path.exists(shp_base + ext):
        print(f"✅ Found {ext} file")

# Try using pyshp first
try:
    import shapefile
    print("\n✅ Using pyshp library...")

    reader = shapefile.Reader(shp_file)
    fields = [field[0] for field in reader.fields[1:]]
    print(f"📋 Fields available: {fields}")

    # Find field indices
    name1_idx = fields.index('NAME_1') if 'NAME_1' in fields else 0
    name2_idx = fields.index('NAME_2') if 'NAME_2' in fields else 1

    print(f"📍 Using field '{fields[name1_idx]}' for county names")
    print(f"📍 Using field '{fields[name2_idx]}' for constituency names")

    features = []
    total = 0
    for shape_rec in reader.shapeRecords():
        total += 1
        record = shape_rec.record
        if len(record) > name1_idx:
            county = str(record[name1_idx]) if record[name1_idx] is not None else ''
            if county.upper() == 'KITUI':
                # Create properties
                properties = {}
                for i, field in enumerate(fields):
                    if i < len(record):
                        val = record[i] if record[i] is not None else ''
                        properties[field] = val

                features.append({
                    "type": "Feature",
                    "properties": properties,
                    "geometry": shape_rec.shape.__geo_interface__
                })

    print(f"\n📊 Total features in shapefile: {total}")

    if features:
        # Get constituency names
        const_names = set()
        for f in features:
            name = f['properties'].get('NAME_2', 'Unknown')
            const_names.add(name)

        print(f"\n✅ Found {len(features)} Kitui features")
        print(f"📌 Kitui constituencies found ({len(const_names)}):")
        for name in sorted(const_names):
            print(f"  - {name}")

        # Save to file
        output_file = 'public/data/kitui.geojson'
        with open(output_file, 'w') as f:
            json.dump({
                "type": "FeatureCollection",
                "features": features
            }, f, indent=2)

        print(f"\n✅ SUCCESS! Saved to {output_file}")
        print("=" * 70)
        sys.exit(0)
    else:
        print("\n❌ No Kitui County found in the shapefile")

        # Show available counties
        counties = set()
        for shape_rec in reader.shapeRecords():
            record = shape_rec.record
            if len(record) > name1_idx:
                county = str(record[name1_idx]) if record[name1_idx] is not None else ''
                if county:
                    counties.add(county)
        print(f"\n📌 Available counties ({len(counties)} total, showing first 20):")
        for c in sorted(counties)[:20]:
            print(f"  - {c}")
        sys.exit(1)

except ImportError:
    print("\n❌ pyshp not installed")
    print("\n💡 Install pyshp:")
    print("  pip3 install --user pyshp")
    print("\n💡 Or use the system package:")
    print("  sudo apt-get install python3-shapely")

    # Try using ogr2ogr as fallback
    try:
        import subprocess
        print("\n🔄 Trying ogr2ogr (GDAL)...")

        # Check if ogr2ogr is available
        result = subprocess.run(['which', 'ogr2ogr'], capture_output=True)
        if result.returncode != 0:
            print("❌ ogr2ogr not found")
            print("\n💡 Install GDAL:")
            print("  sudo apt-get install gdal-bin")
            sys.exit(1)

        # Convert to GeoJSON
        temp_file = 'public/data/kenya_temp.geojson'
        cmd = ['ogr2ogr', '-f', 'GeoJSON', temp_file, shp_file]
        result = subprocess.run(cmd, capture_output=True)

        if result.returncode != 0:
            print(f"❌ ogr2ogr failed: {result.stderr.decode()}")
            sys.exit(1)

        # Read the GeoJSON
        with open(temp_file, 'r') as f:
            data = json.load(f)

        # Filter for Kitui
        features = []
        const_names = set()
        for feature in data['features']:
            props = feature.get('properties', {})
            county = props.get('NAME_1', '')
            if county.upper() == 'KITUI':
                features.append(feature)
                const_names.add(props.get('NAME_2', 'Unknown'))

        if features:
            print(f"\n✅ Found {len(features)} Kitui features")
            print(f"📌 Kitui constituencies found ({len(const_names)}):")
            for name in sorted(const_names):
                print(f"  - {name}")

            output_file = 'public/data/kitui.geojson'
            with open(output_file, 'w') as f:
                json.dump({
                    "type": "FeatureCollection",
                    "features": features
                }, f, indent=2)

            # Clean up temp file
            if os.path.exists(temp_file):
                os.remove(temp_file)

            print(f"\n✅ SUCCESS! Saved to {output_file}")
            print("=" * 70)
            sys.exit(0)
        else:
            print("\n❌ No Kitui County found")
            sys.exit(1)

    except Exception as e:
        print(f"❌ Error with ogr2ogr: {e}")
        sys.exit(1)

except Exception as e:
    print(f"❌ Error: {e}")
    sys.exit(1)
