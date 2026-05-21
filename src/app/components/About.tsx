import { Award, Users, BookOpen, Trophy } from 'lucide-react';

export function About() {
  const stats = [
    { icon: Users, label: 'Siswa Aktif', value: '1.200+' },
    { icon: BookOpen, label: 'Guru Berpengalaman', value: '85+' },
    { icon: Award, label: 'Akreditasi', value: 'A' },
    { icon: Trophy, label: 'Prestasi', value: '150+' },
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Tentang Sekolah</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            SMA Harapan Bangsa adalah institusi pendidikan yang berkomitmen untuk menghasilkan
            lulusan yang berkualitas, berkarakter, dan siap menghadapi tantangan masa depan.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
              >
                <Icon className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Vision Mission */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Visi</h3>
            <p className="text-gray-600">
              Menjadi sekolah unggulan yang menghasilkan lulusan berkualitas, berakhlak mulia,
              berwawasan global, dan mampu bersaing di tingkat nasional maupun internasional.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Misi</h3>
            <ul className="text-gray-600 space-y-2">
              <li>• Menyelenggarakan pendidikan berkualitas dan berkarakter</li>
              <li>• Mengembangkan potensi siswa secara optimal</li>
              <li>• Menciptakan lingkungan belajar yang kondusif</li>
              <li>• Meningkatkan kompetensi guru dan tenaga kependidikan</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
