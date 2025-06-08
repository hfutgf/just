'use client';

import { format } from 'date-fns';
import { uz } from 'date-fns/locale';
import { Clock, Calendar } from 'lucide-react';
import React from 'react';

const AdminDashboard = () => {
  const getCurrentDate = () => {
    return format(new Date(), 'EEEE, d MMMM yyyy', { locale: uz });
  };

  const getCurrentTime = () => {
    return format(new Date(), 'HH:mm');
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 mb-2">Xush kelibsiz, Admin! 👋</h1>
            <p className="text-slate-600">Bugun tizimingizni boshqarish uchun ajoyib kun</p>
          </div>
          <div className="text-right text-sm text-slate-500">
            <div className="flex items-center space-x-2 mb-1">
              <Calendar className="w-4 h-4" />
              <span>{getCurrentDate()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>{getCurrentTime()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
