import { Search, X, ChevronDown, Link, LayoutGrid } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type MobileHeaderProps = {
  isMenuOpen: boolean;
  setIsOpenCatalogs: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenCatalogs: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MobileHeader = ({
  isMenuOpen,
  isOpenCatalogs,
  setIsMenuOpen,
  setIsOpenCatalogs,
}: MobileHeaderProps) => {
  return (
    <div>
      <div className="lg:hidden w-[80%] mx-auto py-3 border-t border-gray-100 flex items-center gap-3">
        <Button
          onClick={() => {
            setIsOpenCatalogs(!isOpenCatalogs);
            setIsMenuOpen(false);
          }}
          variant="ghost"
          className="text-white flex items-center justify-center bg-purple-600 hover:bg-purple-700 p-2 rounded-md font-medium transition-all duration-300"
        >
          <LayoutGrid className="h-6 w-6" />
        </Button>
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="search"
            placeholder="Mahsulot qidirish..."
            className="w-full pl-12 pr-4 py-4 bg-gray-50 border-0 rounded-2xl focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-300"
          />
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden py-4 border-t border-gray-100 bg-white/95 backdrop-blur-xl">
          <nav className="flex flex-col space-y-2 items-start p-4">Burger items</nav>
        </div>
      )}

      {isOpenCatalogs && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setIsOpenCatalogs(false)} />
          <div className="absolute top-0 left-0 w-full max-w-sm h-full bg-white shadow-xl animate-in slide-in-from-left">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Katalog</h2>
                <Button variant="ghost" size="icon" onClick={() => setIsOpenCatalogs(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="overflow-y-auto h-[calc(100%-60px)]">
              {['Elektronika', 'Moda', 'Uy', 'Avto'].map((category, i) => (
                <div key={i} className="border-b">
                  <button className="w-full text-left p-4 font-medium flex items-center justify-between">
                    {category}
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  <div className="pl-6 pb-2">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Link
                        key={j}
                        href="#"
                        className="block py-2 px-4 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded"
                      >
                        {category} {j + 1}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileHeader;
