"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
      <Card className="max-w-md w-full bg-white/80 backdrop-blur-sm border border-white/40 shadow-xl">
        <CardContent className="p-8 text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">
              Project Tidak Ditemukan
            </h1>
            <p className="text-gray-600">
              Maaf, project yang Anda cari tidak dapat ditemukan. Mungkin link
              sudah tidak valid atau project telah dipindahkan.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              onClick={() => router.back()}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali
            </Button>
            <Button
              onClick={() => router.push("/")}
              className="bg-black hover:bg-gray-800 text-white"
            >
              Ke Beranda
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
