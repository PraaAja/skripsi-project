import { Calendar, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function News() {
  const news = [
    {
      id: 1,
      title: 'Penerimaan Siswa Baru Tahun Ajaran 2026/2027',
      date: '1 Maret 2026',
      excerpt: 'Pendaftaran siswa baru telah dibuka. Dapatkan informasi lengkap mengenai syarat dan prosedur pendaftaran.',
      image: 'https://images.unsplash.com/photo-1706528010331-0f12582db334?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWJyYXJ5JTIwYm9va3MlMjBzdHVkeXxlbnwxfHx8fDE3NzI1MDg4OTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 2,
      title: 'Prestasi Siswa di Olimpiade Sains Nasional',
      date: '25 Februari 2026',
      excerpt: 'Siswa SMA Harapan Bangsa meraih medali emas dan perak dalam Olimpiade Sains Nasional tingkat provinsi.',
      image: 'https://images.unsplash.com/photo-1759922378123-a1f4f1e39bae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc3Jvb20lMjBsZWFybmluZyUyMGVkdWNhdGlvbnxlbnwxfHx8fDE3NzI0NDg2NTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 3,
      title: 'Workshop Pengembangan Karakter dan Kepemimpinan',
      date: '20 Februari 2026',
      excerpt: 'Kegiatan workshop untuk meningkatkan soft skills dan jiwa kepemimpinan siswa kelas X dan XI.',
      image: 'https://images.unsplash.com/photo-1764025130362-0162c3dd2035?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMGxhYiUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzcyNTQ1NDI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
  ];

  return (
    <section id="news" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Berita & Acara</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Informasi terkini mengenai kegiatan, prestasi, dan acara di sekolah kami.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48">
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-blue-600 mb-3">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{item.date}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.excerpt}</p>
                <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2">
                  Baca Selengkapnya
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
