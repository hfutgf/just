'use client';

import { Edit, PlusCircle, Armchair, Trash2, ChevronDown, ChevronRight } from 'lucide-react';
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
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedSubcategory, setExpandedSubcategory] = useState<string | null>(null);
  const { categories, isFetchCategory, refetch } = useFetchCategories();
  const { deleteCategory, isDeleteCategoryLoading, isDeleteCategorySuccess } = useDeleteCategory();

  const handleDelete = (categoryId: string) => {
    deleteCategory(categoryId);
  };

  const toggleCategory = (categoryId: string) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);
      setExpandedSubcategory(null);
    } else {
      setExpandedCategory(categoryId);
      setExpandedSubcategory(null);
    }
  };

  const toggleSubcategory = (subcategoryId: string) => {
    if (expandedSubcategory === subcategoryId) {
      setExpandedSubcategory(null);
    } else {
      setExpandedSubcategory(subcategoryId);
    }
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
        <h1 className="text-2xl font-bold">Kategoriyalar ro&apos;yxati</h1>
        <Link href={'/admin/catalogs/categories/create'}>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Kategoriya qo&apos;shish
          </Button>
        </Link>
      </div>

      <div className="rounded-md border overflow-auto max-h-full">
        {isFetchCategory && <Loading />}
        {!isFetchCategory && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
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
                  <React.Fragment key={category._id}>
                    <TableRow
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => toggleCategory(category._id)}
                    >
                      <TableCell>
                        {category.subCategories?.length ? (
                          expandedCategory === category._id ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )
                        ) : null}
                      </TableCell>
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
                          <Link
                            href={`/admin/catalogs/categories/${category._id}/edit`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Button variant="outline" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="icon"
                            className="text-red-500 hover:text-red-700"
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeleteModal(true);
                            }}
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

                    {expandedCategory === category._id &&
                      category.subCategories?.map((subCat) => (
                        <React.Fragment key={subCat._id}>
                          <TableRow
                            className="bg-gray-50 cursor-pointer hover:bg-gray-100"
                            onClick={() => toggleSubcategory(subCat._id)}
                          >
                            <TableCell></TableCell>
                            <TableCell colSpan={5}>
                              <div className="flex items-center pl-8">
                                {subCat.groups?.length ? (
                                  expandedSubcategory === subCat._id ? (
                                    <ChevronDown className="h-4 w-4 mr-2" />
                                  ) : (
                                    <ChevronRight className="h-4 w-4 mr-2" />
                                  )
                                ) : null}
                                <span className="font-medium">{subCat.subCategoryName}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end space-x-2">
                                <Link
                                  href={`/admin/catalogs/subcategories/${subCat._id}/edit`}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Button variant="outline" size="icon">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </Link>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="text-red-500 hover:text-red-700"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>

                          {/* Groups section */}
                          {expandedSubcategory === subCat._id &&
                            subCat.groups?.map((group) => (
                              <TableRow key={group._id} className="bg-gray-100">
                                <TableCell colSpan={2}></TableCell>
                                <TableCell colSpan={4}>
                                  <div className="pl-16">
                                    <span className="font-medium">{group.group}</span>
                                  </div>
                                </TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end space-x-2">
                                    <Link
                                      href={`/admin/catalogs/groups/${group._id}/edit`}
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <Button variant="outline" size="icon">
                                        <Edit className="h-4 w-4" />
                                      </Button>
                                    </Link>
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      className="text-red-500 hover:text-red-700"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        // Add delete group functionality here
                                      }}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                        </React.Fragment>
                      ))}
                  </React.Fragment>
                ))}
            </TableBody>
          </Table>
        )}
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-4 mt-4">
        <div className="flex items-center justify-between text-sm text-slate-600">
          <span>Jami kategoriyalar: {categories?.data.length}</span>
          <span>Ko&apos;rsatilgan: hammasi</span>
        </div>
      </div>
    </Card>
  );
};

export default CategoriesList;
