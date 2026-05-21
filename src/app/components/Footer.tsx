import { GraduationCap, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="w-8 h-8 text-blue-400" />
              <span className="text-xl font-bold">SMA Harapan Bangsa</span>
            </div>
            <p className="text-gray-400">
              Membentuk generasi unggul, berkarakter, dan berprestasi untuk masa depan Indonesia.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">Tautan Cepat</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-400 hover:text-white transition-colors">
                  Beranda
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-white transition-colors">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="#programs" className="text-gray-400 hover:text-white transition-colors">
                  Program
                </a>
              </li>
              <li>
                <a href="#news" className="text-gray-400 hover:text-white transition-colors">
                  Berita
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4">Kontak</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Jl. Pendidikan No. 123</li>
              <li>Jakarta Selatan, DKI Jakarta</li>
              <li>(021) 1234-5678</li>
              <li>info@smaharapanbangsa.sch.id</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-bold mb-4">Ikuti Kami</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="bg-gray-700 p-2 rounded-lg hover:bg-blue-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-gray-700 p-2 rounded-lg hover:bg-pink-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-gray-700 p-2 rounded-lg hover:bg-blue-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-gray-700 p-2 rounded-lg hover:bg-red-600 transition-colors"
                aria-label="Youtube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2026 SMA Harapan Bangsa. Seluruh hak cipta dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}
