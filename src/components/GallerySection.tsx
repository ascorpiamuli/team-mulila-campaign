"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { X, ChevronLeft, ChevronRight, Play, Pause, Maximize2, Download, Share2, Heart, Image as ImageIcon, Grid, List } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface GalleryImage {
  id: number;
  src: string;
  objectPosition: string;
  title?: string;
  date?: string;
  location?: string;
}

const galleryImages: GalleryImage[] = [
  // Profile images 1-9 (webp)
  { id: 1, src: "/images/profile1.jpg", objectPosition: "center 30%", title: "Moment 01", date: "2026-03-15", location: "Kitui" },
  { id: 3, src: "/images/profile3.jpg", objectPosition: "center 30%", title: "Moment 02", date: "2026-03-25", location: "Kitui" },
  { id: 4, src: "/images/profile4.jpg", objectPosition: "center 40%", title: "Moment 03", date: "2026-04-01", location: "Kitui" },
  { id: 5, src: "/images/profile5.jpg", objectPosition: "center 25%", title: "Moment 04", date: "2026-04-05", location: "Kitui" },
  { id: 6, src: "/images/profile6.jpg", objectPosition: "center 30%", title: "Moment 05", date: "2026-04-10", location: "Kitui" },
  { id: 7, src: "/images/profile7.jpg", objectPosition: "center 35%", title: "Moment 06", date: "2026-04-15", location: "Kitui" },
  { id: 8, src: "/images/profile8.jpg", objectPosition: "center 30%", title: "Moment 07", date: "2026-04-20", location: "Kitui" },
  { id: 9, src: "/images/profile9.jpg", objectPosition: "center 40%", title: "Moment 08", date: "2026-04-25", location: "Kitui" },
  // Images 10-18 (jpeg)
  { id: 10, src: "/images/profile10.jpeg", objectPosition: "center 30%", title: "Moment 09", date: "2026-05-01", location: "Kitui" },
  { id: 11, src: "/images/profile11.jpeg", objectPosition: "center 35%", title: "Moment 10", date: "2026-05-05", location: "Kitui" },
  { id: 12, src: "/images/profile12.jpeg", objectPosition: "center 30%", title: "Moment 11", date: "2026-05-10", location: "Kitui" },
  { id: 13, src: "/images/profile13.jpeg", objectPosition: "center 40%", title: "Moment 12", date: "2026-05-15", location: "Kitui" },
  { id: 14, src: "/images/profile14.jpeg", objectPosition: "center 25%", title: "Moment 13", date: "2026-05-20", location: "Kitui" },
  { id: 15, src: "/images/profile15.jpeg", objectPosition: "center 30%", title: "Moment 14", date: "2026-05-25", location: "Kitui" },
  { id: 16, src: "/images/profile16.jpeg", objectPosition: "center 35%", title: "Moment 15", date: "2026-05-30", location: "Kitui" },
  { id: 18, src: "/images/profile18.jpeg", objectPosition: "center 40%", title: "Moment 16", date: "2026-06-05", location: "Kitui" },
];

export default function GallerySection() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [showLightbox, setShowLightbox] = useState<boolean>(false);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  const [isLightboxZoomed, setIsLightboxZoomed] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('grid'); // Default: Grid View
  const [likedImages, setLikedImages] = useState<Set<number>>(new Set());

  const slideshowRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const currentImage = galleryImages[currentIndex];

  const handleImageLoad = (id: number) => {
    setLoadedImages(prev => new Set(prev).add(id));
  };

  const handleImageError = (id: number) => {
    setImageErrors(prev => new Set(prev).add(id));
  };

  const toggleLike = (id: number) => {
    setLikedImages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const startZoomIn = useCallback(() => {
    setZoomLevel(1);
    setTimeout(() => {
      setZoomLevel(1.08);
    }, 100);
  }, []);

  const startZoomOut = useCallback(() => {
    setZoomLevel(1.08);
    setTimeout(() => {
      setZoomLevel(1);
    }, 100);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || isTransitioning) return;

    startZoomIn();

    autoPlayRef.current = setInterval(() => {
      setIsTransitioning(true);
      startZoomOut();

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
        setTimeout(() => {
          startZoomIn();
          setIsTransitioning(false);
        }, 200);
      }, 800);
    }, 6000);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, startZoomIn, startZoomOut, isTransitioning]);

  useEffect(() => {
    startZoomIn();
  }, [currentIndex, startZoomIn]);

  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsAutoPlaying(false);
    setIsTransitioning(true);

    startZoomOut();
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
      setTimeout(() => {
        startZoomIn();
        setIsTransitioning(false);
      }, 200);
    }, 500);
  };

  const goToNext = () => {
    if (isTransitioning) return;
    setIsAutoPlaying(false);
    setIsTransitioning(true);

    startZoomOut();
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
      setTimeout(() => {
        startZoomIn();
        setIsTransitioning(false);
      }, 200);
    }, 500);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsAutoPlaying(false);
    setIsTransitioning(true);

    startZoomOut();
    setTimeout(() => {
      setCurrentIndex(index);
      setTimeout(() => {
        startZoomIn();
        setIsTransitioning(false);
      }, 200);
    }, 500);
  };

  const openLightbox = () => {
    setLightboxIndex(currentIndex);
    setShowLightbox(true);
    setIsAutoPlaying(false);
  };

  const closeLightbox = () => {
    setShowLightbox(false);
    setIsLightboxZoomed(false);
    setZoomLevel(1);
  };

  const goToPreviousLightbox = () => {
    setLightboxIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const goToNextLightbox = () => {
    setLightboxIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const toggleLightboxZoom = () => {
    setIsLightboxZoomed(!isLightboxZoomed);
  };

  useEffect(() => {
    const preloadIndexes = [
      (currentIndex + 1) % galleryImages.length,
      (currentIndex - 1 + galleryImages.length) % galleryImages.length
    ];

    preloadIndexes.forEach(index => {
      const img = new window.Image();
      img.src = galleryImages[index].src;
    });
  }, [currentIndex]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-KE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section id="gallery" className="w-full py-16 md:py-24 bg-gradient-to-b from-bg-dark via-bg-dark/95 to-bg-dark/90 overflow-hidden">
      <div className="w-full px-4 md:px-6 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-10 md:mb-16 text-center animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full bg-gold/10 px-5 py-2 mb-4 border border-gold/20">
            <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
            <span className="text-xs font-semibold text-gold tracking-wider uppercase">Memory Lane</span>
          </div>
          <h2 className="font-montserrat text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-gold via-yellow-400 to-gold bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
              MOMENTS
            </span>
            <span className="text-text-light"> IN MOTION</span>
          </h2>
          <p className="mt-4 text-sm md:text-base text-text-dim max-w-2xl mx-auto">
            Capturing our journey across Kitui County — 18 powerful moments that tell our story
          </p>

          {/* View Toggle */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <button
              onClick={() => setViewMode('carousel')}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2",
                viewMode === 'carousel'
                  ? "bg-gold text-bg-dark shadow-lg shadow-gold/30"
                  : "bg-bg-card/50 text-text-dim hover:text-text-light border border-gold/10"
              )}
            >
              <Play className="h-4 w-4" />
              Slideshow
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2",
                viewMode === 'grid'
                  ? "bg-gold text-bg-dark shadow-lg shadow-gold/30"
                  : "bg-bg-card/50 text-text-dim hover:text-text-light border border-gold/10"
              )}
            >
              <Grid className="h-4 w-4" />
              Grid View
            </button>
          </div>
        </div>

        {viewMode === 'carousel' ? (
          /* Carousel View */
          <div
            ref={slideshowRef}
            className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-br from-bg-card/90 to-bg-dark shadow-2xl border border-gold/20 group"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Animated Border Glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-gold/30 via-gold/10 to-gold/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            {/* Main Image */}
            <div
              className="relative w-full cursor-pointer overflow-hidden"
              onClick={openLightbox}
            >
              <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[85vh]">
                {!loadedImages.has(currentImage.id) && !imageErrors.has(currentImage.id) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-bg-dark via-bg-card to-bg-dark animate-shimmer bg-[length:200%_auto]" />
                )}

                {imageErrors.has(currentImage.id) && (
                  <div className="absolute inset-0 flex items-center justify-center bg-bg-dark">
                    <div className="text-center">
                      <ImageIcon className="h-16 w-16 text-text-dim/30 mx-auto mb-4" />
                      <p className="text-text-dim text-sm">Image not available</p>
                    </div>
                  </div>
                )}

                <div
                  className="absolute inset-0 transition-transform duration-[10000ms] ease-out"
                  style={{
                    transform: `scale(${zoomLevel})`,
                    transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)",
                  }}
                >
                  <Image
                    src={currentImage.src}
                    alt={currentImage.title || `Gallery ${currentIndex + 1}`}
                    fill
                    className={cn(
                      "object-cover transition-opacity duration-700",
                      loadedImages.has(currentImage.id) ? "opacity-100" : "opacity-0"
                    )}
                    style={{
                      objectPosition: currentImage.objectPosition,
                    }}
                    onLoad={() => handleImageLoad(currentImage.id)}
                    onError={() => handleImageError(currentImage.id)}
                    priority={currentIndex === 0}
                    sizes="100vw"
                    quality={95}
                  />
                </div>

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/90 via-transparent to-transparent pointer-events-none" />

                {/* Image Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                      <h3 className="font-montserrat text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
                        {currentImage.title || `Moment ${currentIndex + 1}`}
                      </h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-text-dim">
                        <span>{formatDate(currentImage.date || '')}</span>
                        {currentImage.location && (
                          <>
                            <span className="w-1 h-1 rounded-full bg-gold" />
                            <span>{currentImage.location}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleLike(currentImage.id)}
                        className="rounded-full bg-black/50 p-2.5 text-white transition-all duration-300 hover:bg-gold hover:text-bg-dark backdrop-blur-sm"
                      >
                        <Heart className={cn(
                          "h-5 w-5 transition-all duration-300",
                          likedImages.has(currentImage.id) ? "fill-red-500 text-red-500" : ""
                        )} />
                      </button>
                      <button
                        className="rounded-full bg-black/50 p-2.5 text-white transition-all duration-300 hover:bg-gold hover:text-bg-dark backdrop-blur-sm"
                      >
                        <Share2 className="h-5 w-5" />
                      </button>
                      <button
                        className="rounded-full bg-black/50 p-2.5 text-white transition-all duration-300 hover:bg-gold hover:text-bg-dark backdrop-blur-sm"
                      >
                        <Download className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              disabled={isTransitioning}
              className={cn(
                "absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-3 md:p-4 text-white transition-all duration-300 hover:bg-gold hover:text-bg-dark backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed z-10",
                isHovering ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 md:opacity-100 md:translate-x-0"
              )}
            >
              <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
            </button>
            <button
              onClick={goToNext}
              disabled={isTransitioning}
              className={cn(
                "absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-3 md:p-4 text-white transition-all duration-300 hover:bg-gold hover:text-bg-dark backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed z-10",
                isHovering ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 md:opacity-100 md:translate-x-0"
              )}
            >
              <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
            </button>

            {/* Controls */}
            <div className="absolute top-4 right-4 flex gap-2 z-10">
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="rounded-full bg-black/60 p-2.5 text-white transition-all duration-300 hover:bg-gold hover:text-bg-dark backdrop-blur-sm"
              >
                {isAutoPlaying ? <Pause className="h-4 w-4 md:h-5 md:w-5" /> : <Play className="h-4 w-4 md:h-5 md:w-5" />}
              </button>
              <button
                onClick={openLightbox}
                className="rounded-full bg-black/60 p-2.5 text-white transition-all duration-300 hover:bg-gold hover:text-bg-dark backdrop-blur-sm"
              >
                <Maximize2 className="h-4 w-4 md:h-5 md:w-5" />
              </button>
            </div>

            {/* Dots Navigation */}
            <div className="absolute bottom-20 md:bottom-24 left-0 right-0 z-10">
              <div className="flex justify-center gap-2 px-4">
                {galleryImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    disabled={isTransitioning}
                    className={cn(
                      "h-2 rounded-full transition-all duration-500",
                      currentIndex === idx
                        ? "w-10 bg-gold shadow-lg shadow-gold/50"
                        : "w-2 bg-white/30 hover:bg-white/60"
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Slide Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
              <div className="rounded-full bg-black/60 backdrop-blur-sm px-4 py-1.5 border border-gold/20">
                <p className="text-xs md:text-sm text-text-light font-mono">
                  {String(currentIndex + 1).padStart(2, '0')} / {String(galleryImages.length).padStart(2, '0')}
                </p>
              </div>
            </div>

            {/* Auto-play Indicator */}
            {isAutoPlaying && (
              <div className="absolute bottom-4 left-4 z-10">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                  <span className="text-[10px] text-text-dim font-medium">Auto-playing</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Grid View (Default) */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
            {galleryImages.map((image, idx) => (
              <div
                key={image.id}
                className="group relative aspect-square rounded-xl overflow-hidden bg-bg-card/50 border border-gold/10 hover:border-gold/40 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-gold/20 cursor-pointer"
                onClick={() => {
                  setCurrentIndex(idx);
                  setViewMode('carousel');
                  setTimeout(() => {
                    setIsAutoPlaying(false);
                  }, 100);
                }}
              >
                <Image
                  src={image.src}
                  alt={image.title || `Gallery ${idx + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  style={{ objectPosition: image.objectPosition }}
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-xs font-medium truncate">{image.title || `Moment ${idx + 1}`}</p>
                  {image.location && (
                    <p className="text-text-dim text-[10px] truncate">{image.location}</p>
                  )}
                </div>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(image.id);
                    }}
                    className="rounded-full bg-black/50 p-1.5 text-white/80 hover:text-red-500 transition-all"
                  >
                    <Heart className={cn(
                      "h-3.5 w-3.5",
                      likedImages.has(image.id) ? "fill-red-500 text-red-500" : ""
                    )} />
                  </button>
                </div>
                <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[10px] font-medium text-gold bg-black/50 px-2 py-0.5 rounded-full">
                    #{idx + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {showLightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/98 backdrop-blur-xl animate-fade-in"
          onClick={closeLightbox}
        >
          <div className="relative w-full h-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-20 text-white/80 hover:text-gold transition-all duration-300 hover:scale-110"
            >
              <X className="h-6 w-6 md:h-8 md:w-8" />
            </button>

            <button
              onClick={toggleLightboxZoom}
              className="absolute top-4 right-16 z-20 text-white/80 hover:text-gold transition-all duration-300 hover:scale-110"
            >
              <Maximize2 className="h-5 w-5 md:h-6 md:w-6" />
            </button>

            <button
              onClick={goToPreviousLightbox}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 md:p-4 text-white transition-all duration-300 hover:bg-gold hover:text-bg-dark z-20 backdrop-blur-sm"
            >
              <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
            </button>

            <button
              onClick={goToNextLightbox}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 md:p-4 text-white transition-all duration-300 hover:bg-gold hover:text-bg-dark z-20 backdrop-blur-sm"
            >
              <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
            </button>

            <div className="flex h-full w-full items-center justify-center p-4 md:p-8">
              <div
                className={cn(
                  "relative transition-transform duration-500",
                  isLightboxZoomed ? "scale-150" : "scale-100"
                )}
              >
                <div className="relative w-full max-w-7xl h-[80vh] md:h-[85vh]">
                  <Image
                    src={galleryImages[lightboxIndex].src}
                    alt={galleryImages[lightboxIndex].title || `Gallery ${lightboxIndex + 1}`}
                    fill
                    className="object-contain"
                    priority
                    sizes="100vw"
                    quality={100}
                  />
                </div>
              </div>
            </div>

            {/* Lightbox Info */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
              <div className="rounded-full bg-black/60 backdrop-blur-sm px-6 py-2 border border-gold/20 text-center">
                <p className="text-sm text-text-light font-mono">
                  {String(lightboxIndex + 1).padStart(2, '0')} / {String(galleryImages.length).padStart(2, '0')}
                </p>
                <p className="text-xs text-text-dim mt-0.5">
                  {galleryImages[lightboxIndex].title || ''}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
