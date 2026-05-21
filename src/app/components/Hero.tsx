import { Brain, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Hero() {
  return (
    <section id="home" className="relative h-[600px] flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1763637675793-da207ba1fe18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2hvb2wlMjBidWlsZGluZyUyMHN0dWRlbnRzfGVufDF8fHx8MTc3MjU0NTQyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="School building"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/70"></div>
      </div>
      
      <div className="relative z-10 text-center text-white px-4 max-w-4xl">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
          <Brain className="w-5 h-5" />
          <span className="text-sm font-medium">Powered by AI Decision Tree C4.5</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Selamat Datang di SMA Harapan Bangsa
        </h1>
        <p className="text-xl md:text-2xl mb-4">
          Membentuk Generasi Unggul, Berkarakter, dan Berprestasi
        </p>
        <p className="text-lg mb-8 text-blue-100 flex items-center justify-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Dilengkapi Sistem Rekomendasi Jurusan Berbasis Machine Learning
        </p>
        
        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="#recommendation-system"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-colors font-semibold"
          >
            Lihat Sistem Rekomendasi
          </a>
          <a
            href="#about"
            className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-3 rounded-lg transition-colors font-semibold"
          >
            Tentang Kami
          </a>
        </div>
      </div>
    </section>
  );
}