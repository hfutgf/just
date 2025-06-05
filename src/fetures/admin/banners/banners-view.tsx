'use client';

import Autoplay from 'embla-carousel-autoplay';
import React, { useRef } from 'react';

import { useFetchBanners } from './hooks/use-fetch-banners';

import Loading from '@/components/shared/loading';
import NoData from '@/components/shared/no-data';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';

const BannersView = () => {
  const { banners, isFetchingBanners } = useFetchBanners();
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));

  if (isFetchingBanners) {
    return <Loading />;
  }

  if (banners?.data?.length === 0) {
    return <NoData />;
  }

  return (
    <section className="w-full max-w-[90%] mx-auto">
      <Carousel
        plugins={[plugin.current]}
        opts={{
          loop: true,
          align: 'start',
        }}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {banners?.data?.map((banner, index) => (
            <CarouselItem key={index}>
              <div className="relative aspect-video">
                <img
                  src={banner.imageUrl}
                  alt={`Banner ${index + 1}`}
                  className="w-full h-full object-cover rounded-md"
                  loading="lazy"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </section>
  );
};

export default BannersView;
