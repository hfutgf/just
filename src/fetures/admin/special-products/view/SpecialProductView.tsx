import {
  Link,
  Package,
  DollarSign,
  Calendar,
  Image,
  ArrowLeft,
  Tag,
  Truck,
  Globe,
} from 'lucide-react';
import React from 'react';

import { SpecialProductType } from '../types';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatPrice } from '@/utils/format-price';

type SpecialProductViewProps = {
  specialProduct?: SpecialProductType;
};

const formatDate = (dateString?: string) => {
  if (!dateString) return 'N/A';

  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const InfoCard = ({
  title,
  icon: Icon,
  children,
  className = '',
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  className?: string;
}) => (
  <Card
    className={`border-0 shadow-sm bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm ${className}`}
  >
    <CardContent className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
          <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
      </div>
      <div className="space-y-3 text-sm">{children}</div>
    </CardContent>
  </Card>
);

const InfoRow = ({ label, value }: { label: string; value: string | undefined }) => (
  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-4">
    <span className="font-medium text-gray-600 dark:text-gray-400 min-w-0 flex-shrink">
      {label}:
    </span>
    <span className="text-gray-900 dark:text-gray-100 font-medium break-words flex-grow text-right sm:text-left">
      {value || 'Mavjud emas'}
    </span>
  </div>
);

const PriceTag = ({ price }: { price: number }) => (
  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-full border border-green-200 dark:border-green-800">
    <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
    <span className="text-lg font-bold text-green-700 dark:text-green-300">
      {formatPrice(String(price))} so&apos;m
    </span>
  </div>
);

const SpecialProductView = ({ specialProduct }: SpecialProductViewProps) => {
  if (!specialProduct) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <div className="text-center">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Mahsulot mavjud emas
          </h2>
          <p className="text-gray-600 dark:text-gray-400">Mahsulot haqida maʼlumot topilmadi</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100 dark:from-gray-900 dark:via-blue-900/10 dark:to-gray-800">
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              asChild
              variant="ghost"
              className="gap-2 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Link href="/admin/special-products">
                <ArrowLeft className="h-4 w-4" />
                Mahsulotlarga qaytish
              </Link>
            </Button>
            <div className="text-sm text-gray-500 dark:text-gray-400">ID: {specialProduct._id}</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                {specialProduct.images?.length > 0 ? (
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
                    <img
                      src={specialProduct.images[0]}
                      alt={`${specialProduct.name} product image`}
                      className="relative w-full h-80 lg:h-96 object-cover rounded-2xl shadow-xl border border-white/20"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-80 lg:h-96 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600">
                    <div className="text-center">
                      <Image className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <span className="text-gray-500 dark:text-gray-400">Rasmlar mavjud emas</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {specialProduct.name}
                  </h1>
                  <h2 className="text-xl lg:text-2xl font-medium text-gray-600 dark:text-gray-400">
                    {specialProduct.name_ru}
                  </h2>
                </div>
                <PriceTag price={specialProduct.price} />
              </div>

              <div className="space-y-4">
                <div className="p-6 bg-white/60 dark:bg-gray-800/60 rounded-xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg inline-flex bg-blue-50 dark:bg-blue-900/20">
                      <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      Tavsif
                    </h3>
                  </div>
                  <div className="space-y-3 text-gray-700 dark:text-gray-300">
                    <div>
                      <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-medium rounded mb-1">
                        UZ
                      </span>
                      <p className="leading-relaxed">{specialProduct.description}</p>
                    </div>
                    <div>
                      <span className="inline-block px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-xs font-medium rounded mb-1">
                        RU
                      </span>
                      <p className="leading-relaxed">{specialProduct.description_ru}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          <InfoCard title="Kategoriya" icon={Tag}>
            <InfoRow label="O'zbekcha" value={specialProduct.categoryId?.categoryName} />
            <InfoRow label="Ruscha" value={specialProduct.categoryId?.categoryName_ru} />
          </InfoCard>

          <InfoCard title="Subcategory" icon={Package}>
            <InfoRow label="O'zbekcha" value={specialProduct.subCategoryId?.subCategoryName} />
            <InfoRow label="Ruscha" value={specialProduct.subCategoryId?.subCategoryName_ru} />
          </InfoCard>

          <InfoCard title="Vaqtlar" icon={Calendar} className="md:col-span-2 xl:col-span-1">
            <InfoRow label="Yaratilgan" value={formatDate(specialProduct.createdAt)} />
            <InfoRow label="Yangilangan" value={formatDate(specialProduct.updatedAt)} />
          </InfoCard>
        </div>

        <InfoCard title="Delivery Information" icon={Truck} className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <span className="inline-block px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs font-medium rounded mb-2">
                UZ
              </span>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {specialProduct.deliveryInfo}
              </p>
            </div>
            <div>
              <span className="inline-block px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 text-xs font-medium rounded mb-2">
                RU
              </span>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {specialProduct.deliveryInfo_ru}
              </p>
            </div>
          </div>
        </InfoCard>
      </div>
    </div>
  );
};

export default SpecialProductView;
