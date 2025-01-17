import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC } from "react";
import { User, Lock } from "lucide-react";
import { CustomInput } from "../ui/CustomInput";
import { GradientButton } from "../ui/GradientButton";
import { LoginFormData, loginSchema } from "@/types/auth.type";

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void>;
  isLoading?: boolean;
}

export const LoginForm: FC<LoginFormProps> = ({ onSubmit, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
      <CustomInput
        label="اسم المستخدم"
        icon={User}
        type="text"
        name="username"
        register={register}
        error={errors.username}
        placeholder="أدخل اسم المستخدم"
      />

      <CustomInput
        label="كلمة المرور"
        icon={Lock}
        type="password"
        name="password"
        register={register}
        error={errors.password}
        placeholder="أدخل كلمة المرور"
      />

      <GradientButton type="submit" isLoading={isLoading}>
        تسجيل الدخول
      </GradientButton>
    </form>
  );
};
