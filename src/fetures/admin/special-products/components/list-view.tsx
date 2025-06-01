import { Eye, Edit, Trash2, Loader2 } from 'lucide-react';
import Image from 'next/image';

import { SpecialProductType } from '../types';

import { Button } from '@/components/ui/button';
import { formatPrice } from '@/utils/format-price';

export const ListView = ({
  products,
  isFetchProducts,
}: {
  products?: SpecialProductType[];
  isFetchProducts: boolean;
}) => {
  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left py-3 px-4 font-medium text-slate-700">Mahsulot</th>
              <th className="text-left py-3 px-4 font-medium text-slate-700">Kategoriya</th>
              <th className="text-left py-3 px-4 font-medium text-slate-700">Narxi</th>
              <th className="text-right py-3 px-4 font-medium text-slate-700">Harakatlar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {isFetchProducts && (
              <tr>
                <td className="py-4 px-4" colSpan={4}>
                  <div className="col-span-full">
                    <div className="flex justify-center items-center h-40">
                      <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                    </div>
                  </div>
                </td>
              </tr>
            )}
            {!isFetchProducts &&
              products?.map((product) => (
                <tr key={product._id} className="hover:bg-slate-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="relative w-12 h-12">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="rounded-lg object-cover"
                        />
                      </div>

                      <div>
                        <p className="font-medium text-slate-900">{product.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-600">
                    {product.subCategoryId.subCategoryName}
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <span className="font-semibold text-slate-900">
                        {formatPrice(product.price)} UZS
                      </span>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        size={'icon'}
                        variant={'ghost'}
                        className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size={'icon'}
                        variant={'ghost'}
                        className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size={'icon'}
                        variant={'ghost'}
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
