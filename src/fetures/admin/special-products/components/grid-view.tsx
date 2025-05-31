import { Eye, Edit, Trash2, Loader } from 'lucide-react';

import { SpecialProductType } from '../types';

import { formatPrice } from '@/utils/format-price';

export const GridView = ({
  products,
  isFetchProducts,
}: {
  products?: SpecialProductType[];
  isFetchProducts: boolean;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {isFetchProducts && (
        <div className="col-span-full">
          <div className="flex justify-center items-center h-40">
            <Loader className="w-8 h-8 bg-blue-500" />
          </div>
        </div>
      )}
      {!isFetchProducts &&
        products?.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-48 object-cover"
              />

              <div className="absolute top-2 right-2 flex space-x-1">
                <button className="p-2 bg-white/80 backdrop-blur-sm rounded-lg hover:bg-white transition-colors">
                  <Eye className="w-4 h-4 text-slate-600" />
                </button>
                <button className="p-2 bg-white/80 backdrop-blur-sm rounded-lg hover:bg-white transition-colors">
                  <Edit className="w-4 h-4 text-slate-600" />
                </button>
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
                  {formatPrice(product.price)} UZS
                </span>
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-md text-sm font-medium transition-colors">
                  Редактировать
                </button>
                <button className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
