import React, { useState, useEffect } from "react";
import {
  Mail,
  Lock,
  Phone,
  User,
  Eye,
  EyeOff,
  CheckCircle2,
  ShieldCheck,
  Circle,
} from "lucide-react";
// We are replacing the generic Input/Button with inline styled versions
// to guarantee the SOTA look without seeing your ui folder.

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
  const [passwordFocus, setPasswordFocus] = useState(false);

  // SOTA Password Logic: Granular Requirements
  const getPasswordRequirements = (pass: string) => [
    { label: "8+ Chars", met: pass.length >= 8 },
    { label: "Number", met: /[0-9]/.test(pass) },
    { label: "Symbol", met: /[^a-zA-Z0-9]/.test(pass) },
    { label: "Uppercase", met: /[A-Z]/.test(pass) },
  ];

  const requirements = getPasswordRequirements(formData.password);
  const strengthScore = requirements.filter((r) => r.met).length;

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* --- HEADER: Engineered Feel --- */}
      <div className="mb-10 text-center relative">
        <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md">
          <ShieldCheck size={14} />
          Secure Encryption
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 font-mont tracking-tight">
          Initialize{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">
            Identity
          </span>
        </h2>
        <p className="text-zinc-400 font-noto text-sm">
          Step 01 <span className="text-zinc-600 px-2">/</span> 04
        </p>
      </div>

      <form className="space-y-5">
        {/* --- FULL NAME --- */}
        <div className="group relative">
          <div
            className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
              errors.fullName
                ? "text-red-500"
                : "text-zinc-500 group-focus-within:text-emerald-400"
            }`}
          >
            <User size={20} />
          </div>
          <input
            type="text"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={(e) => onChange("fullName", e.target.value)}
            className={`w-full bg-zinc-900/50 text-white placeholder-zinc-600 pl-12 pr-4 py-4 rounded-xl border-2 outline-none transition-all duration-300 font-medium ${
              errors.fullName
                ? "border-red-500/50 focus:border-red-500 bg-red-500/5"
                : "border-zinc-800 focus:border-emerald-500 focus:bg-zinc-900 focus:shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)]"
            }`}
          />
        </div>

        {/* --- EMAIL --- */}
        <div className="group relative">
          <div
            className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
              errors.email
                ? "text-red-500"
                : "text-zinc-500 group-focus-within:text-emerald-400"
            }`}
          >
            <Mail size={20} />
          </div>
          <input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => onChange("email", e.target.value)}
            className={`w-full bg-zinc-900/50 text-white placeholder-zinc-600 pl-12 pr-4 py-4 rounded-xl border-2 outline-none transition-all duration-300 font-medium ${
              errors.email
                ? "border-red-500/50 focus:border-red-500 bg-red-500/5"
                : "border-zinc-800 focus:border-emerald-500 focus:bg-zinc-900 focus:shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)]"
            }`}
          />
        </div>

        {/* --- PHONE --- */}
        <div className="group relative">
          <div
            className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
              errors.phone
                ? "text-red-500"
                : "text-zinc-500 group-focus-within:text-emerald-400"
            }`}
          >
            <Phone size={20} />
          </div>
          <input
            type="tel"
            placeholder="+234 800 000 0000"
            value={formData.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            className={`w-full bg-zinc-900/50 text-white placeholder-zinc-600 pl-12 pr-4 py-4 rounded-xl border-2 outline-none transition-all duration-300 font-medium ${
              errors.phone
                ? "border-red-500/50 focus:border-red-500 bg-red-500/5"
                : "border-zinc-800 focus:border-emerald-500 focus:bg-zinc-900 focus:shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)]"
            }`}
          />
        </div>

        {/* --- PASSWORD FIELD with Matrix --- */}
        <div className="space-y-3 pt-2">
          <div className="group relative">
            <div
              className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                errors.password
                  ? "text-red-500"
                  : "text-zinc-500 group-focus-within:text-emerald-400"
              }`}
            >
              <Lock size={20} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create Password"
              value={formData.password}
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
              onChange={(e) => onChange("password", e.target.value)}
              className={`w-full bg-zinc-900/50 text-white placeholder-zinc-600 pl-12 pr-12 py-4 rounded-xl border-2 outline-none transition-all duration-300 font-medium ${
                errors.password
                  ? "border-red-500/50 focus:border-red-500 bg-red-500/5"
                  : "border-zinc-800 focus:border-emerald-500 focus:bg-zinc-900 focus:shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)]"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* The SOTA Security Matrix (Only shows when user interacts or has input) */}
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              passwordFocus || formData.password.length > 0
                ? "max-h-32 opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="bg-zinc-900/80 rounded-lg p-4 border border-zinc-800 grid grid-cols-2 gap-3">
              {requirements.map((req, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-xs font-medium transition-colors duration-300"
                >
                  {req.met ? (
                    <CheckCircle2 size={14} className="text-emerald-400" />
                  ) : (
                    <Circle size={14} className="text-zinc-600" />
                  )}
                  <span
                    className={req.met ? "text-emerald-100" : "text-zinc-500"}
                  >
                    {req.label}
                  </span>
                </div>
              ))}
            </div>
            {/* Strength Line */}
            <div className="h-1 w-full bg-zinc-800 mt-3 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ease-out ${
                  strengthScore <= 1
                    ? "bg-red-500 w-1/4"
                    : strengthScore === 2
                    ? "bg-amber-500 w-2/4"
                    : strengthScore === 3
                    ? "bg-blue-500 w-3/4"
                    : "bg-emerald-500 w-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                }`}
              />
            </div>
          </div>
        </div>

        {/* --- CONFIRM PASSWORD --- */}
        <div className="group relative">
          <div
            className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
              errors.confirmPassword
                ? "text-red-500"
                : "text-zinc-500 group-focus-within:text-emerald-400"
            }`}
          >
            <Lock size={20} />
          </div>
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e) => onChange("confirmPassword", e.target.value)}
            className={`w-full bg-zinc-900/50 text-white placeholder-zinc-600 pl-12 pr-12 py-4 rounded-xl border-2 outline-none transition-all duration-300 font-medium ${
              errors.confirmPassword
                ? "border-red-500/50 focus:border-red-500 bg-red-500/5"
                : "border-zinc-800 focus:border-emerald-500 focus:bg-zinc-900 focus:shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)]"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* --- ACTIONS --- */}
        <div className="pt-6">
          <button
            onClick={handleSubmit}
            className="w-full relative group overflow-hidden rounded-xl bg-emerald-500 p-4 font-bold text-white shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)] transition-all duration-300 hover:bg-emerald-400 hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.6)] hover:scale-[1.01] active:scale-[0.98]"
          >
            <span className="relative z-10">Initialize Account</span>
            {/* Shine Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </button>
        </div>

        <div className="text-center pt-2">
          <p className="text-zinc-500 font-noto text-sm">
            Already have an identity?{" "}
            <a
              href="/login"
              className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors border-b border-transparent hover:border-emerald-400"
            >
              Access Login
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default StepOne;
