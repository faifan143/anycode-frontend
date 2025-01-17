"use client";

import {
  containerVariants,
  itemVariants,
} from "@/components/animations/varients";
import { LoginForm } from "@/components/common/auth/LoginForm";
import GradientBackground from "@/components/common/ui/GradientBackground";
import { useMokkBar } from "@/components/providers/MokkBarContext";
import { loginUser } from "@/redux/reducers/userSlice";
import { AppDispatch } from "@/redux/store";
import { LoginFormData } from "@/types/auth.type";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";

// pages/login.tsx
const LoginScreen: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { setSnackbarConfig } = useMokkBar();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const result = await dispatch(loginUser(data));
      if (result.meta.requestStatus === "fulfilled") {
        setSnackbarConfig({
          open: true,
          severity: "success",
          message: "تم تسجيل الدخول بنجاح",
        });
        router.replace("/");
      }
    } catch (error) {
      setSnackbarConfig({
        open: true,
        severity: "error",
        message:
          error instanceof Error ? error.message : "حدث خطأ أثناء تسجيل الدخول",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden"
      dir="rtl"
    >
      <GradientBackground />

      <motion.div
        className="absolute top-20 right-20 text-orange-400/30 hidden md:block"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <Sparkles size={40} />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative bg-black/50 backdrop-blur-lg p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-2xl shadow-orange-500/5 w-full max-w-[90%] sm:max-w-[440px] md:max-w-md border border-gray-800"
      >
        <motion.div
          variants={itemVariants}
          className="text-center mb-6 sm:mb-8"
        >
          <h1 className="text-3xl py-2 sm:text-4xl font-bold bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent">
            تسجيل الدخول
          </h1>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">
            مرحباً بعودتك
          </p>
        </motion.div>

        <LoginForm onSubmit={handleSubmit} isLoading={isLoading} />
      </motion.div>
    </div>
  );
};
export default LoginScreen;
