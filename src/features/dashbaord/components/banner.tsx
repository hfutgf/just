'use client';

import { useKeenSlider } from 'keen-slider/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { BannerResponse } from '@/features/admin/banners/types';
import { cn } from '@/lib/utils';

import 'keen-slider/keen-slider.min.css';

type BannerPropsType = {
  banners: BannerResponse;
};

export default function BannerSlider({ banners }: BannerPropsType) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  useEffect(() => {
    if (!imagesLoaded || !instanceRef.current || !banners?.data?.length) return;

    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, 5000);

    return () => clearInterval(interval);
  }, [imagesLoaded, instanceRef, banners?.data?.length]);

  useEffect(() => {
    if (!banners?.data?.length) return;

    const imgs = banners.data.map((banner) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = banner.imageUrl;
        img.onload = resolve;
        img.onerror = resolve;
      });
    });

    Promise.all(imgs).then(() => setImagesLoaded(true));
  }, [banners]);

  const handlePrev = () => instanceRef.current?.prev();
  const handleNext = () => instanceRef.current?.next();

  if (!banners) {
    return <Skeleton className="w-full h-72 rounded-lg" />;
  }

  if (!imagesLoaded) {
    return <Skeleton className="w-full h-72 rounded-lg" />;
  }

  if (!banners?.data?.length) {
    return null;
  }

  return (
    <div className="relative w-full mx-auto">
      <div ref={sliderRef} className="keen-slider">
        {banners.data.map((banner, index) => (
          <div key={index} className="keen-slider__slide">
            <img
              src={banner.imageUrl}
              alt={`Banner ${index}`}
              className="w-full h-72 object-cover rounded-lg"
            />
          </div>
        ))}
      </div>

      <Button
        onClick={handlePrev}
        variant="outline"
        size="sm"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-50 rounded-full w-10 h-10 opacity-70 hover:opacity-90 text-black border-white"
      >
        <ArrowLeft />
      </Button>
      <Button
        onClick={handleNext}
        variant="outline"
        size="sm"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-50 rounded-full w-10 h-10 opacity-70 hover:opacity-90 text-black border-white"
      >
        <ArrowRight />
      </Button>

      <div className="absolute z-50 bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {banners.data.map((_, idx) => (
          <button
            key={idx}
            onClick={() => instanceRef.current?.moveToIdx(idx)}
            className={cn(
              'w-2 h-2 rounded-full transition-all duration-300',
              currentSlide === idx ? 'bg-white opacity-100 scale-110' : 'bg-white opacity-30'
            )}
          />
        ))}
      </div>

      <style>{`
        .keen-slider__slide {
          min-height: 240px;
        }
      `}</style>
    </div>
  );
}
