'use client';

import { Edit, PlusCircle, Armchair, Trash2 } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useDeleteCategory } from './hooks/use-delete-category';
import { useFetchCategories } from './hooks/use-fetch-categories';

import Loading from '@/components/shared/loading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import DeleteModal from '@/components/ui/delete-modal';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const CategoriesList = () => {
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const { categories, isFetchCategory, refetch } = useFetchCategories();
  const { deleteCategory, isDeleteCategoryLoading, isDeleteCategorySuccess } = useDeleteCategory();

  const handleDelete = (categoryId: string) => {
    deleteCategory(categoryId);
  };

  useEffect(() => {
    if (isDeleteCategorySuccess) {
      toast.success('Kategoriya muvofaqqiyatli o‘chirildi');
      setDeleteModal(false);
      refetch();
    }
  }, [isDeleteCategorySuccess, refetch]);

  return (
    <Card className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Kategoriyalar ro‘yxati</h1>
        <Link href={'/admin/catalogs/categories/create'}>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Kategoriya qo‘shish
          </Button>
        </Link>
      </div>

      <div className="rounded-md border overflow-auto max-h-full">
        {isFetchCategory && <Loading />}
        {!isFetchCategory && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Icon</TableHead>
                <TableHead>Nomi (EN)</TableHead>
                <TableHead>Nomi (RU)</TableHead>
                <TableHead>Subkategoriyalar</TableHead>
                <TableHead>Yaratilgan sana</TableHead>
                <TableHead className="text-right">Amallar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!isFetchCategory &&
                categories?.data.map((category) => (
                  <TableRow key={category._id}>
                    <TableCell>
                      <div className="w-10 h-10 relative">
                        {category.icon ? (
                          <div
                            className="w-5 h-5"
                            dangerouslySetInnerHTML={{ __html: category.icon }}
                          />
                        ) : (
                          <Armchair className="size-5" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{category.categoryName ?? '-'}</TableCell>
                    <TableCell>{category.categoryName_ru ?? '-'}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {category.subCategories?.map((subCat) => (
                          <Badge key={subCat._id} variant="outline">
                            {subCat.subCategoryName ?? '-'}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{new Date(category.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Link href={`/admin/catalogs/categories/${category._id}/edit`}>
                          <Button variant="outline" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => setDeleteModal(true)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <DeleteModal
                          isLoading={isDeleteCategoryLoading}
                          onConfirm={() => handleDelete(category._id)}
                          isOpen={deleteModal}
                          title="O'chirish"
                          description="Kategoriyani o'chirmoqchimisiz?"
                          itemName={category.categoryName}
                          onClose={() => setDeleteModal(false)}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        )}
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-4">
        <div className="flex items-center justify-between text-sm text-slate-600">
          <span>Jami kategoriyalar: {categories?.data.length}</span>
          <span>Ko&apos;rsatilgan: hammasi</span>
        </div>
      </div>
    </Card>
  );
};

export default CategoriesList;
