'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Shield, User, Lock } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

import { useAdminLogin } from './hooks/use-admin-login';
import { loginSchema } from './schemas/login-schema';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

type FormValues = z.infer<typeof loginSchema>;

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const { adminLoginData, adminLoginMutation, isAdminLoginPending } = useAdminLogin();

  const handleSubmit = async (values: FormValues) => {
    adminLoginMutation(values);
  };

  useEffect(() => {
    if (adminLoginData?.success) {
      window.location.href = '/admin';
    } else {
      toast.error(adminLoginData?.message || 'Xatolik yuz berdi');
    }
  }, [adminLoginData]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-900 rounded-xl mb-4">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-semibold text-slate-900 mb-1">Admin Paneli</h1>
          <p className="text-slate-600 text-sm">Boshqaruv paneliga kirish uchun tizimga kiring</p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl text-center text-slate-800">Xush kelibsiz</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-slate-700">
                        Foydalanuvchi nomi
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <Input
                            {...field}
                            type="text"
                            placeholder="Foydalanuvchi nomini kiriting"
                            className="pl-10 h-11 border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                            disabled={isAdminLoginPending}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-slate-700">Parol</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <Input
                            {...field}
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Parolingizni kiriting"
                            className="pl-10 pr-10 h-11 border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                            disabled={isAdminLoginPending}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-slate-100"
                            onClick={() => setShowPassword(!showPassword)}
                            disabled={isAdminLoginPending}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-slate-400" />
                            ) : (
                              <Eye className="h-4 w-4 text-slate-400" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full h-11 bg-slate-900 hover:bg-slate-800 text-white font-medium mt-6"
                  disabled={isAdminLoginPending || !form.formState.isValid}
                >
                  {isAdminLoginPending ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Kirilmoqda...
                    </div>
                  ) : (
                    'Kirish'
                  )}
                </Button>
              </form>
            </Form>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <p className="text-xs text-center text-slate-500">
                Himoyalangan hudud • Faqat ruxsat etilganlar uchun
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-xs text-slate-400">
            © 2024 DAFNA YL BIRRA. Barcha huquqlar himoyalangan.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
