import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/components/ui/use-toast";

// --- Validasi schema pakai Zod
const loginSchema = z.object({
  email: z.string().email({ message: "Email tidak valid" }),
  password: z.string().min(6, { message: "Password minimal 6 karakter" }),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Kalau sudah login, lempar ke dashboard
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      const { error } = await signIn(data.email, data.password);

      if (error) {
        toast({
          title: "Login gagal",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Login berhasil",
          description: "Selamat datang kembali!",
        });
        navigate("/");
      }
    } catch {
      toast({
        title: "Error",
        description: "Terjadi kesalahan, coba lagi.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-2xl shadow-md w-96 space-y-4"
      >
        <h1 className="text-xl font-bold text-center">Login</h1>

        {/* Input Email */}
        <div>
          <Input
            type="email"
            placeholder="Email"
            {...form.register("email")}
          />
          {form.formState.errors.email && (
            <p className="text-sm text-red-500">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        {/* Input Password */}
        <div>
          <Input
            type="password"
            placeholder="Password"
            {...form.register("password")}
          />
          {form.formState.errors.password && (
            <p className="text-sm text-red-500">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>

        {/* Tombol Submit */}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </Button>

        <p className="text-sm text-center mt-2">
          Belum punya akun?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
