'use client';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

const AuthPage = (): React.ReactElement => {
  const [otp, setOtp] = useState('');

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-500 rounded-2xl shadow-lg mb-4">
            <span className="font-bold text-white text-2xl">D</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-2">
            DAFNA
          </h1>
          <p className="text-gray-500 text-sm">YL BIRRA</p>
        </div>

        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              Tasdiqlash kodini kiriting
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Iltimos, quyidagi Telegram botga o‘ting:{' '}
              <a
                className="text-purple-600 hover:text-purple-700 font-medium hover:underline transition-colors"
                target="_self"
                href="https://t.me/myauth4455_bot"
              >
                @inoyatovauthbot
              </a>{' '}
              va 1 daqiqa amal qiladigan tasdiqlash kodini oling.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                value={otp}
                onChange={setOtp}
                className="gap-3"
              >
                <InputOTPGroup className="gap-3">
                  {[...Array(6)].map((_, index) => (
                    <InputOTPSlot
                      key={index}
                      index={index}
                      className="w-12 h-12 text-lg font-semibold border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-300"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Button
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              disabled={otp.length !== 6}
            >
              {otp.length === 6 ? 'Kodni tasdiqlash' : `${6 - otp.length} ta raqam yetmayapti`}
            </Button>

            <div className="text-center">
              <p className="text-gray-500 text-sm mb-2">
                Kod kelmagan bo‘lsa, iltimos, qisqa vaqt kutib, qaytadan urinib ko‘ring.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-400 text-xs">Telegram orqali xavfsiz autentifikatsiya</p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
