import { Eye, Edit, Trash2, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { ViewProps } from './grid-view';

import { Button } from '@/components/ui/button';
import DeleteModal from '@/components/ui/delete-modal';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatPrice } from '@/utils/format-price';

export const ListView = ({
  products,
  isFetchProducts,
  deleteProduct,
  isDeleteProductPending,
  isDeleteModalOpen,
  selectedProduct,
  setIsDeleteModalOpen,
  setSelectedProduct,
}: ViewProps) => {
  const router = useRouter();

  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-slate-50 border-b border-slate-200">
            <TableRow>
              <TableHead className="text-left py-3 px-4 font-medium text-slate-700">
                Mahsulot
              </TableHead>
              <TableHead className="text-left py-3 px-4 font-medium text-slate-700">
                Kategoriya
              </TableHead>
              <TableHead className="text-left py-3 px-4 font-medium text-slate-700">
                Narxi
              </TableHead>
              <TableHead className="text-right py-3 px-4 font-medium text-slate-700">
                Harakatlar
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-slate-200">
            {isFetchProducts && (
              <TableRow>
                <TableCell colSpan={4} className="py-4 px-4">
                  <div className="flex justify-center items-center h-40">
                    <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                  </div>
                </TableCell>
              </TableRow>
            )}
            {!isFetchProducts &&
              products?.map((product) => (
                <TableRow key={product._id} className="hover:bg-slate-50">
                  <TableCell className="py-4 px-4">
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
                  </TableCell>
                  <TableCell className="py-4 px-4 text-slate-600">
                    {product.subCategoryId.subCategoryName}
                  </TableCell>
                  <TableCell className="py-4 px-4">
                    <div>
                      <span className="font-semibold text-slate-900">
                        {formatPrice(product.price.toString())} UZS
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 px-4">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        onClick={() => router.push(`/admin/special-products/${product._id}`)}
                        size={'icon'}
                        variant={'ghost'}
                        className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => router.push(`/admin/special-products/${product._id}/edit`)}
                        size={'icon'}
                        variant={'ghost'}
                        className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => {
                          setSelectedProduct(product);
                          setIsDeleteModalOpen(true);
                        }}
                        size={'icon'}
                        variant={'ghost'}
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
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
    </div>
  );
};
