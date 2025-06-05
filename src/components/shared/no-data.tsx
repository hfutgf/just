import { FileX } from 'lucide-react';
import React from 'react';

import { Card, CardContent } from '@/components/ui/card';

const NoData = ({
  title = 'Maʼlumot topilmadi',
  description = 'Hozircha ko‘rsatish uchun hech qanday maʼlumot yo‘q.',
  className = '',
}) => {
  return (
    <Card className={`border-dashed ${className}`}>
      <CardContent className="flex flex-col items-center justify-center p-8 text-center">
        <FileX className="w-12 h-12 text-muted-foreground mb-4" />

        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>

        <p className="text-muted-foreground max-w-sm">{description}</p>
      </CardContent>
    </Card>
  );
};

export default NoData;
