import { useState } from "react";
import {
  GraduationCap,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useAuth } from "../../context/AuthContext";
import { authAPI } from "../../services/api";

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotLoading, setIsForgotLoading] = useState(false);

  // ✅ LOGIN
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const user = await authAPI.login({
        email: identifier,
        password,
      });

      if (user.token) {
        localStorage.setItem("token", user.token);
      }

      login(user);

      if (user.role === "siswa") {
        navigate("/siswa/dashboard");
      } else if (user.role === "guru") {
        navigate("/guru/dashboard");
      } else {
        navigate("/admin/dashboard");
      }
    } catch (error) {
      alert("Login gagal ❌");
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ FORGOT PASSWORD
  const handleForgotPassword = async () => {
    if (!identifier) {
      alert("Isi email dulu bro 😅");
      return;
    }

    setIsForgotLoading(true);

    try {
      const res = await fetch(
        "http://localhost:5000/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: identifier }),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      alert("Link reset dikirim ke email lu 📩");
    } catch (err: any) {
      alert(err.message || "Gagal kirim email");
    } finally {
      setIsForgotLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT IMAGE */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1771408427146-09be9a1d4535"
          alt="Education"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-900 bg-opacity-40"></div>
        <div className="absolute inset-0 flex items-center justify-center text-white p-12">
          <div className="text-center">
            <GraduationCap className="w-24 h-24 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">
              Portal Sistem Rekomendasi Jurusan SMAN 3 TUBAN
            </h2>
            <p className="text-xl">
              Akses informasi akademik dan layanan sekolah Anda
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* BACK */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Kembali ke Beranda
          </button>

          {/* CARD */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Selamat Datang
            </h1>
            <p className="text-gray-600 mb-6">
              Silakan masuk ke akun Anda
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* EMAIL */}
              <div>
                <label className="block text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    className="w-full pl-10 pr-4 py-3 border rounded-lg"
                    placeholder="Masukkan email"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full pl-10 pr-12 py-3 border rounded-lg"
                    placeholder="Masukkan password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              {/* FORGOT */}
              <div className="flex justify-end">
                <button
  type="button"
  onClick={() => navigate("/forgot-password")}
  className="text-sm text-blue-600 hover:text-blue-700"
>
  Lupa password?
</button>
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Masuk"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}