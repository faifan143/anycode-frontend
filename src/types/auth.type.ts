import * as yup from "yup";
// types/auth.ts
export interface LoginFormData {
  username: string;
  password: string;
}

// schemas/auth.schema.ts
export const loginSchema = yup.object({
  username: yup
    .string()
    .required("اسم المستخدم مطلوب")
    .min(3, "اسم المستخدم يجب أن يكون 3 أحرف على الأقل"),
  password: yup
    .string()
    .required("كلمة المرور مطلوبة")
    .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
});
