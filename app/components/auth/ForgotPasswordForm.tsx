import React, { useState } from "react";
import { Mail, ArrowLeft, Send, CheckCircle } from "lucide-react";
import Input from "../ui/Input";
import Button from "../ui/Button";

interface ForgotPasswordFormProps {
  onSubmit?: (email: string) => void;
  isLoading?: boolean;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onSubmit,
  isLoading = false,
}) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setError("Email is required");
      return false;
    } else if (!emailRegex.test(email)) {
      setError("Please enter a valid email");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (validateEmail()) {
      if (onSubmit) {
        onSubmit(email);
      }
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="space-y-6 text-center">
        <div className="w-20 h-20 bg-[#10B981]/10 rounded-full flex items-center justify-center mx-auto animate-bounce">
          <CheckCircle size={40} className="text-[#10B981]" />
        </div>

        <div>
          <h2 className="text-3xl font-bold text-white mb-3 font-mont">
            Check Your Email
          </h2>
          <p className="text-gray-400 font-noto mb-2">
            We've sent a password reset link to
          </p>
          <p className="text-[#10B981] font-semibold font-mont text-lg">
            {email}
          </p>
        </div>

        <div className="bg-[#0F2F2F] border border-[#10B981]/20 rounded-lg p-4 text-left">
          <p className="text-sm text-gray-300 font-noto mb-3">
            <strong className="text-white">Next steps:</strong>
          </p>
          <ul className="space-y-2 text-sm text-gray-400 font-noto">
            <li className="flex items-start gap-2">
              <span className="text-[#10B981] mt-1">•</span>
              <span>Check your inbox for an email from Escro</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#10B981] mt-1">•</span>
              <span>Click the reset link in the email</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#10B981] mt-1">•</span>
              <span>Create a new password</span>
            </li>
          </ul>
        </div>

        <div className="pt-4">
          <p className="text-sm text-gray-400 font-noto mb-3">
            Didn't receive the email?
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="text-[#10B981] hover:text-[#059669] font-semibold transition-colors font-mont"
          >
            Try again
          </button>
        </div>

        <div className="pt-4 border-t border-gray-700">
          <a
            href="/login"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-noto"
          >
            <ArrowLeft size={16} />
            Back to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-[#10B981]/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail size={32} className="text-[#10B981]" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2 font-mont">
          Forgot Password?
        </h2>
        <p className="text-gray-400 font-noto">
          No worries! Enter your email and we'll send you reset instructions
        </p>
      </div>

      <Input
        label="Email Address"
        type="email"
        placeholder="you@example.com"
        icon={<Mail size={20} />}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (error) setError("");
        }}
        error={error}
        required
      />

      <Button
        onClick={handleSubmit}
        variant="primary"
        size="lg"
        className="w-full"
        isLoading={isLoading}
        icon={<Send size={20} />}
      >
        Send Reset Link
      </Button>

      <div className="text-center pt-4">
        <a
          href="/login"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-noto"
        >
          <ArrowLeft size={16} />
          Back to Login
        </a>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
