'use client';

import { useKeenSlider } from 'keen-slider/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useFetchBanners } from '../hooks/use-fetch-banners';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

import 'keen-slider/keen-slider.min.css';

export default function BannerSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { banners, isBannerLoading } = useFetchBanners();

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  useEffect(() => {
    if (isBannerLoading || !instanceRef.current || !banners?.data?.length) return;

    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, 5000);

    return () => clearInterval(interval);
  }, [isBannerLoading, instanceRef, banners?.data?.length]);

  const handlePrev = () => instanceRef.current?.prev();
  const handleNext = () => instanceRef.current?.next();

  if (isBannerLoading) {
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
              'w-3 h-3 rounded-full transition-all duration-300',
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
