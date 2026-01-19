import { RegisterErrors, RegisterFormData } from "@/types/user/authTypes";
import { LoginErrors, LoginFormData } from "@/types/user/authTypes";

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateEmail = (email: string): string => {
  const trimmed = email.trim();
  if (!trimmed) return "Email is required";
  if (!emailRegex.test(trimmed)) return "Please enter a valid email address";
  return "";
};

export const validatePassword = (password: string): string => {
  if (!password) return "Password is required";
  if (password.length < 8) return "Password must be at least 8 characters";
  if (password.length > 64) return "Password cannot exceed 64 characters";
  return "";
};

export const validateFullName = (name: string): string => {
  const trimmed = name.trim();
  if (!trimmed) return "Full name is required";
  if (trimmed.length < 3) return "Full name must be at least 3 characters";
  if (trimmed.length > 50) return "Full name cannot exceed 50 characters";
  return "";
};

export const validateRegister = (data: RegisterFormData): RegisterErrors => {
  const errors: RegisterErrors = {};

  const nameError = validateFullName(data.fullName);
  if (nameError) errors.fullName = nameError;

  const emailError = validateEmail(data.email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(data.password);
  if (passwordError) errors.password = passwordError;

  if (!data.confirmPassword) {
    errors.confirmPassword = "Confirm password is required";
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};

export const validateLogin = (data: LoginFormData): LoginErrors => {
  const errors: LoginErrors = {};

  const emailError = validateEmail(data.email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(data.password);
  if (passwordError) errors.password = passwordError;

  return errors;
};

export const validateOtp = (otp: string): string => {
  if (!otp || otp.trim().length === 0) {
    return "OTP is required";
  }
  if (otp.length !== 6) {
    return "OTP must be exactly 6 digits";
  }
  if (!/^\d+$/.test(otp)) {
    return "OTP must contain only numbers";
  }
  return "";
};
