'use client';

import { Search, Heart, ShoppingCart, User, Menu, X, LayoutGrid } from 'lucide-react';
import Link from 'next/link';
import { ReactElement, useState, useRef, useEffect } from 'react';

import Catalogs from '../catalogs';

import MobileHeader from './mobile-header';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Header = (): ReactElement => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isOpenCatalogs, setIsOpenCatalogs] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const catalogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (catalogRef.current && !catalogRef.current.contains(event.target as Node)) {
        setIsOpenCatalogs(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
      <div className="max-w-[1260px] mx-auto relative">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href={'/'} className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="font-bold text-white text-lg">D</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-xl bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  DAFNA
                </h1>
                <p className="text-xs text-gray-500 -mt-1">YL BIRRA</p>
              </div>
            </Link>
          </div>

          <div className="hidden lg:flex items-center flex-1 max-w-2xl mx-8">
            <nav className="flex items-center  mr-8" ref={catalogRef}>
              <Button
                onClick={() => setIsOpenCatalogs(!isOpenCatalogs)}
                className="text-white flex items-center gap-2 bg-green-600 hover:bg-green-700 p-2 rounded-md font-medium transition-all duration-300"
              >
                {isOpenCatalogs ? <X className="h-5 w-5" /> : <LayoutGrid className="h-5 w-5" />}
                Katalog
              </Button>

              {isOpenCatalogs && <Catalogs />}
            </nav>

            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Mahsulot qidirish..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-0 rounded-2xl focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-300"
              />
              {searchValue && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchValue('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex w-11 h-11 bg-gray-50 hover:bg-purple-50 rounded-xl transition-all duration-300 hover:scale-110 group"
            >
              <User className="h-5 w-5 text-gray-600 group-hover:text-purple-600" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="relative w-11 h-11 bg-gray-50 hover:bg-pink-50 rounded-xl transition-all duration-300 hover:scale-110 group"
            >
              <Heart className="h-5 w-5 text-gray-600 group-hover:text-pink-500" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                2
              </span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="relative w-11 h-11 bg-gray-50 hover:bg-green-50 rounded-xl transition-all duration-300 hover:scale-110 group"
            >
              <ShoppingCart className="h-5 w-5 text-gray-600 group-hover:text-green-600" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                5
              </span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden w-11 h-11 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-300"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        <MobileHeader
          isMenuOpen={isMenuOpen}
          isOpenCatalogs={isOpenCatalogs}
          setIsMenuOpen={setIsMenuOpen}
          setIsOpenCatalogs={setIsOpenCatalogs}
        />
      </div>
    </header>
  );
};

export default Header;
