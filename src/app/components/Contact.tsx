import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Hubungi Kami</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Kami siap membantu Anda. Hubungi kami untuk informasi lebih lanjut.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="bg-blue-100 p-3 rounded-lg h-fit">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">Alamat</h3>
                <p className="text-gray-600">
                  Jl. Pendidikan No. 123<br />
                  Jakarta Selatan, DKI Jakarta 12345
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-blue-100 p-3 rounded-lg h-fit">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">Telepon</h3>
                <p className="text-gray-600">
                  (021) 1234-5678<br />
                  0812-3456-7890
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-blue-100 p-3 rounded-lg h-fit">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">Email</h3>
                <p className="text-gray-600">
                  info@smaharapanbangsa.sch.id<br />
                  admission@smaharapanbangsa.sch.id
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-blue-100 p-3 rounded-lg h-fit">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">Jam Operasional</h3>
                <p className="text-gray-600">
                  Senin - Jumat: 07.00 - 16.00<br />
                  Sabtu: 07.00 - 13.00
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Kirim Pesan</h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Masukkan nama Anda"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Masukkan email Anda"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-gray-700 mb-2">
                  Subjek
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Subjek pesan"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700 mb-2">
                  Pesan
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Tulis pesan Anda"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors"
              >
                Kirim Pesan
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
