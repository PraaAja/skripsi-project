import { ImageWithFallback } from './figma/ImageWithFallback';
import { BookOpen, Beaker, Monitor, Dumbbell } from 'lucide-react';

export function Programs() {
  const programs = [
    {
      title: 'Program Akademik',
      description: 'Kurikulum yang komprehensif dengan pendekatan pembelajaran modern dan interaktif.',
      image: 'https://images.unsplash.com/photo-1759922378123-a1f4f1e39bae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc3Jvb20lMjBsZWFybmluZyUyMGVkdWNhdGlvbnxlbnwxfHx8fDE3NzI0NDg2NTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      icon: BookOpen,
    },
    {
      title: 'Laboratorium Sains',
      description: 'Fasilitas laboratorium lengkap untuk praktikum Fisika, Kimia, dan Biologi.',
      image: 'https://images.unsplash.com/photo-1766297247072-93fd815afef3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwbGFib3JhdG9yeSUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NzI0NjIwMjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      icon: Beaker,
    },
    {
      title: 'Teknologi & Komputer',
      description: 'Lab komputer dengan perangkat terkini untuk mendukung pembelajaran digital.',
      image: 'https://images.unsplash.com/photo-1764025130362-0162c3dd2035?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMGxhYiUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzcyNTQ1NDI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      icon: Monitor,
    },
    {
      title: 'Ekstrakurikuler',
      description: 'Berbagai kegiatan olahraga, seni, dan organisasi siswa untuk pengembangan diri.',
      image: 'https://images.unsplash.com/photo-1759763494425-58fc490742ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBmaWVsZCUyMHN0dWRlbnRzJTIwcGxheWluZ3xlbnwxfHx8fDE3NzI0NDMyNDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      icon: Dumbbell,
    },
  ];

  return (
    <section id="programs" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Program & Fasilitas</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Kami menyediakan berbagai program dan fasilitas terbaik untuk mendukung
            perkembangan siswa secara akademik dan non-akademik.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program) => {
            const Icon = program.icon;
            return (
              <div
                key={program.title}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48">
                  <ImageWithFallback
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-blue-600 p-3 rounded-lg">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{program.title}</h3>
                  <p className="text-gray-600">{program.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}