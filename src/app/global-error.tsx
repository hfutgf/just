'use client';

import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  const searchParams = useSearchParams();
  const errorMessage =
    searchParams.get('message') || error.message || 'Kutilmagan xatolik yuz berdi';

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900">
      <Card className="w-full max-w-md shadow-lg border-red-200 dark:border-red-800">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 border-2 border-red-200 dark:border-red-800">
            <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
          <CardTitle className="text-2xl font-bold text-red-900 dark:text-red-100">
            Nimadir noto‘g‘ri ketdi
          </CardTitle>
          <CardDescription className="text-sm text-red-700 dark:text-red-300 mt-1">
            Sahifani yuklashda xatolik yuz berdi.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-3 border border-red-200 dark:border-red-800">
            <p className="text-xs font-medium text-red-800 dark:text-red-200 mb-1">
              Xatolik tafsilotlari:
            </p>
            <p className="text-xs text-red-700 dark:text-red-300 font-mono bg-red-100 dark:bg-red-900/30 p-2 rounded">
              {errorMessage}
            </p>
            {error.digest && (
              <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                Xatolik ID: {error.digest}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
            <Button
              onClick={reset}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white transition-colors"
              aria-label="Qayta urinib ko‘ring"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Qayta urinib ko‘ring
            </Button>
            <Button
              asChild
              variant="outline"
              className="flex-1 border-red-300 text-red-700 hover:bg-red-50 dark:border-red-700 dark:text-red-300 dark:hover:bg-red-900/20 transition-colors"
              aria-label="Bosh sahifaga qaytish"
            >
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Bosh sahifaga qaytish
              </Link>
            </Button>
          </div>

          <div className="text-center text-xs text-red-600 dark:text-red-400 border-t border-red-200 dark:border-red-800 pt-3">
            <p className="font-medium">Yordam kerakmi?</p>
            <p>Yuqoridagi tafsilotlar bilan qo‘llab-quvvatlash xizmatimizga murojaat qiling.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
