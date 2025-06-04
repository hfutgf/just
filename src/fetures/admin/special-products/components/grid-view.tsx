'use client';

import { UseMutateFunction } from '@tanstack/react-query';
import { Loader2, Eye, Edit, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { ResponseSpecialProductType, SpecialProductType } from '../types';

import { Button } from '@/components/ui/button';
import DeleteModal from '@/components/ui/delete-modal';
import { formatPrice } from '@/utils/format-price';

export type ViewProps = {
  products?: SpecialProductType[];
  isFetchProducts: boolean;
  deleteProduct: UseMutateFunction<ResponseSpecialProductType, Error, string, unknown>;
  isDeleteProductPending: boolean;
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedProduct: SpecialProductType | null;
  setSelectedProduct: React.Dispatch<React.SetStateAction<SpecialProductType | null>>;
};

export const GridView = ({
  products,
  isFetchProducts,
  deleteProduct,
  isDeleteModalOpen,
  isDeleteProductPending,
  selectedProduct,
  setIsDeleteModalOpen,
  setSelectedProduct,
}: ViewProps) => {
  const router = useRouter();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isFetchProducts && (
          <div className="col-span-full">
            <div className="flex justify-center items-center h-40">
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
          </div>
        )}

        {!isFetchProducts &&
          products?.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative w-full h-48">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover rounded-lg"
                />
                <div className="absolute top-2 right-2 flex space-x-1">
                  <Button
                    size="icon"
                    className="p-2 bg-white/80 backdrop-blur-sm rounded-lg hover:bg-white transition-colors"
                  >
                    <Eye className="w-4 h-4 text-slate-600" />
                  </Button>
                  <Button
                    onClick={() => router.push(`/admin/special-products/${product._id}/edit`)}
                    size="icon"
                    className="p-2 bg-white/80 backdrop-blur-sm rounded-lg hover:bg-white transition-colors"
                  >
                    <Edit className="w-4 h-4 text-slate-600" />
                  </Button>
                  <Button
                    size="icon"
                    onClick={() => {
                      setSelectedProduct(product);
                      setIsDeleteModalOpen(true);
                    }}
                    className="p-2 bg-white/80 backdrop-blur-sm rounded-lg hover:bg-white transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-slate-900 line-clamp-2">{product.name}</h3>
                    <p className="text-sm text-slate-500 mt-1">
                      {product.subCategoryId.subCategoryName}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-lg font-bold text-slate-900">
                    {formatPrice(product.price.toString())} UZS
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>

      {selectedProduct && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedProduct(null);
          }}
          itemName={selectedProduct.name}
          isLoading={isDeleteProductPending}
          onConfirm={() => deleteProduct(selectedProduct._id)}
        />
      )}
    </>
  );
};
