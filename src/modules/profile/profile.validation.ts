import { z } from "zod";
import { requiredText, freeText } from "@shared/form/fields";

export const profileDetailsSchema = z.object({
  firstName: requiredText("First name"),
  lastName: freeText,
  phone: freeText,
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Enter your current password"),
  newPassword: z.string().min(10, "At least 10 characters"),
});

export type ProfileDetailsValues = z.infer<typeof profileDetailsSchema>;
export type ChangePasswordValues = z.infer<typeof changePasswordSchema>;
