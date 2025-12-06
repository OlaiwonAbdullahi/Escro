import React, { useState } from "react";
import { Mail, Lock, Phone, User, Eye, EyeOff } from "lucide-react";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

interface StepOneProps {
  formData: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
  };
  errors: {
    fullName?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
  };
  onChange: (field: string, value: string) => void;
  onNext: () => void;
}

const StepOne: React.FC<StepOneProps> = ({
  formData,
  errors,
  onChange,
  onNext,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const calculatePasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: "", color: "" };

    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 25;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 12.5;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 12.5;

    let label = "";
    let color = "";
    if (strength < 40) {
      label = "Weak";
      color = "bg-red-500";
    } else if (strength < 70) {
      label = "Fair";
      color = "bg-yellow-500";
    } else if (strength < 90) {
      label = "Good";
      color = "bg-blue-500";
    } else {
      label = "Strong";
      color = "bg-[#10B981]";
    }

    return { strength, label, color };
  };

  const passwordStrength = calculatePasswordStrength(formData.password);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2 font-mont">
          Create Your Account
        </h2>
        <p className="text-gray-400 font-noto">
          Let's start with your basic information
        </p>
      </div>

      <Input
        label="Full Name"
        type="text"
        placeholder="John Doe"
        icon={<User size={20} />}
        value={formData.fullName}
        onChange={(e) => onChange("fullName", e.target.value)}
        error={errors.fullName}
        required
      />

      <Input
        label="Email Address"
        type="email"
        placeholder="you@example.com"
        icon={<Mail size={20} />}
        value={formData.email}
        onChange={(e) => onChange("email", e.target.value)}
        error={errors.email}
        required
      />

      <Input
        label="Phone Number"
        type="tel"
        placeholder="+234 800 000 0000"
        icon={<Phone size={20} />}
        value={formData.phone}
        onChange={(e) => onChange("phone", e.target.value)}
        error={errors.phone}
        helperText="We'll use this for order updates and verification"
        required
      />

      <div>
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a strong password"
            icon={<Lock size={20} />}
            value={formData.password}
            onChange={(e) => onChange("password", e.target.value)}
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

        {formData.password && (
          <div className="mt-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400 font-noto">
                Password strength:
              </span>
              <span
                className={`text-sm font-semibold font-mont ${
                  passwordStrength.strength < 40
                    ? "text-red-500"
                    : passwordStrength.strength < 70
                    ? "text-yellow-500"
                    : passwordStrength.strength < 90
                    ? "text-blue-500"
                    : "text-[#10B981]"
                }`}
              >
                {passwordStrength.label}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                style={{ width: `${passwordStrength.strength}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2 font-noto">
              Use 8+ characters with a mix of letters, numbers & symbols
            </p>
          </div>
        )}
      </div>

      <div className="relative">
        <Input
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Re-enter your password"
          icon={<Lock size={20} />}
          value={formData.confirmPassword}
          onChange={(e) => onChange("confirmPassword", e.target.value)}
          error={errors.confirmPassword}
          required
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-[42px] text-gray-400 hover:text-white transition-colors"
        >
          {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <div className="pt-4">
        <Button
          onClick={handleSubmit}
          variant="primary"
          size="lg"
          className="w-full"
        >
          Continue
        </Button>
      </div>

      <div className="text-center">
        <p className="text-gray-400 font-noto">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-[#10B981] hover:text-[#059669] font-semibold transition-colors"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default StepOne;
