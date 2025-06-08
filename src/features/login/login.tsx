'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import Cookie from 'js-cookie';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import useLogin from './hooks/use-login';
import loginForm from './schemas/login.schema';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

const AuthPage = (): React.ReactElement => {
  const form = useForm<z.infer<typeof loginForm>>({
    resolver: zodResolver(loginForm),
    defaultValues: {
      otp: '',
    },
  });

  const { login, isLoginPending, loginData } = useLogin();

  const onSubmit = async (values: z.infer<typeof loginForm>) => {
    try {
      login({ authCode: values.otp });
    } catch (error) {
      console.error('Ошибка:', error);
      form.setError('otp', { message: 'Tasdiqlash xatosi. Iltimos, qayta urinib ko‘ring' });
    } finally {
    }
  };

  useEffect(() => {
    if (loginData && loginData.success) {
      window.location.href = '/';
      Cookie.set('accessToken', loginData.accessToken!);
    }
  }, [loginData]);

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

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex justify-center">
                          <InputOTP
                            maxLength={6}
                            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                            value={field.value}
                            onChange={field.onChange}
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
                      </FormControl>
                      <FormMessage className="text-center text-red-500 text-sm" />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  disabled={isLoginPending || !form.formState.isValid}
                >
                  {isLoginPending ? (
                    <span className="inline-flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Tasdiqlanmoqda...
                    </span>
                  ) : form.watch('otp').length === 6 ? (
                    'Kodni tasdiqlash'
                  ) : (
                    `${6 - form.watch('otp').length} ta raqam yetmayapti`
                  )}
                </Button>

                <div className="text-center">
                  <p className="text-gray-500 text-sm mb-2">
                    Kod kelmagan bo‘lsa, iltimos, qisqa vaqt kutib, qaytadan urinib ko‘ring.
                  </p>
                </div>
              </div>
            </div>
          </form>
        </Form>

        <div className="text-center mt-8">
          <p className="text-gray-400 text-xs">Telegram orqali xavfsiz autentifikatsiya</p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
