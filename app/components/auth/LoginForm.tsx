import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Checkbox from "../ui/Checkbox";
import SocialLogin from "./SocialLogin";

interface LoginFormProps {
  onSubmit?: (data: {
    email: string;
    password: string;
    rememberMe: boolean;
  }) => void;
  isLoading?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState<any>({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: any = {};

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (validateForm()) {
      if (onSubmit) {
        onSubmit(formData);
      } else {
        // Default behavior for testing
        console.log("Login data:", formData);
        alert("Login functionality will be connected to Better Auth");
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-[#10B981]/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <LogIn size={32} className="text-[#10B981]" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2 font-mont">
          Welcome Back
        </h2>
        <p className="text-gray-400 font-noto">
          Sign in to continue to your account
        </p>
      </div>

      {/* Email Field */}
      <Input
        label="Email Address"
        type="email"
        placeholder="you@example.com"
        icon={<Mail size={20} />}
        value={formData.email}
        onChange={(e) => handleChange("email", e.target.value)}
        error={errors.email}
        required
      />

      {/* Password Field */}
      <div>
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            icon={<Lock size={20} />}
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            error={errors.password}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[42px] text-gray-400 hover:text-white transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <Checkbox
          label="Remember me"
          checked={formData.rememberMe}
          onChange={(e) => handleChange("rememberMe", e.target.checked)}
        />
        <a
          href="/forgot-password"
          className="text-sm text-[#10B981] hover:text-[#059669] font-semibold transition-colors font-mont"
        >
          Forgot Password?
        </a>
      </div>

      {/* Login Button */}
      <Button
        onClick={handleSubmit}
        variant="primary"
        size="lg"
        className="w-full"
        isLoading={isLoading}
      >
        Sign In
      </Button>

      {/* Social Login */}
      <SocialLogin />

      {/* Sign Up Link */}
      <div className="text-center pt-4">
        <p className="text-gray-400 font-noto">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-[#10B981] hover:text-[#059669] font-semibold transition-colors"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
