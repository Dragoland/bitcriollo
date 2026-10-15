import { useState } from 'react';

interface ImageGalleryProps {
  images: string[];
  altTitle: string;
}

export function ImageGallery({ images, altTitle }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-80 bg-muted rounded-xl flex items-center justify-center text-muted-foreground font-mono">
        No hay imágenes disponibles
      </div>
    );
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Imagen Principal */}
      <div className="relative w-full h-[350px] sm:h-[450px] bg-card border border-border rounded-xl overflow-hidden flex items-center justify-center shadow-sm">
        <img 
          src={images[currentIndex]} 
          alt={`${altTitle} - Imagen ${currentIndex + 1}`} 
          className="w-full h-full object-cover transition-all duration-300"
        />
        
        {/* Botones de navegación (visibles solo si hay más de 1 imagen) */}
        {images.length > 1 && (
          <>
            <button 
              type="button"
              onClick={handlePrev} 
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-card/80 hover:bg-card text-foreground border border-border p-2.5 rounded-full shadow-md transition-colors cursor-pointer"
              aria-label="Imagen anterior"
            >
              ❮
            </button>
            <button 
              type="button"
              onClick={handleNext} 
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-card/80 hover:bg-card text-foreground border border-border p-2.5 rounded-full shadow-md transition-colors cursor-pointer"
              aria-label="Siguiente imagen"
            >
              ❯
            </button>
            
            {/* Indicador numérico */}
            <span className="absolute bottom-3 right-3 bg-card/80 backdrop-blur-sm text-xs px-2.5 py-1 rounded-md border border-border text-muted-foreground font-mono">
              {currentIndex + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {/* Miniaturas (Thumbnails) */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((img, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentIndex(index)}
              className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all cursor-pointer flex-shrink-0 ${
                index === currentIndex 
                  ? 'border-primary ring-2 ring-primary/20 opacity-100 scale-105' 
                  : 'border-border opacity-60 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`Miniatura ${index + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
