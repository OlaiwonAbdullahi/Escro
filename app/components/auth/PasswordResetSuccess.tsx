import React, { useState, useEffect } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Button from "../ui/Button";

interface PasswordResetSuccessProps {
  autoRedirect?: boolean;
  redirectDelay?: number;
}

const PasswordResetSuccess: React.FC<PasswordResetSuccessProps> = ({
  autoRedirect = true,
  redirectDelay = 5,
}) => {
  const [countdown, setCountdown] = useState(redirectDelay);

  useEffect(() => {
    if (autoRedirect) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);

            window.location.href = "/login";
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [autoRedirect]);

  const handleRedirect = () => {
    window.location.href = "/login";
  };

  return (
    <div className="space-y-6 text-center">
      <div className="relative">
        <div className="w-24 h-24 bg-[#10B981]/10 rounded-full flex items-center justify-center mx-auto animate-pulse">
          <CheckCircle2 size={56} className="text-[#10B981]" />
        </div>

        <div className="absolute inset-0 w-24 h-24 mx-auto">
          <div className="w-full h-full border-4 border-[#10B981] rounded-full animate-ping opacity-20"></div>
        </div>
      </div>

      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 font-mont">
          Password Reset Successful!
        </h2>
        <p className="text-lg text-gray-400 font-noto">
          Your password has been changed successfully
        </p>
      </div>

      <div className="bg-[#0F2F2F] border border-[#10B981]/20 rounded-lg p-6 text-left max-w-md mx-auto">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-[#10B981] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">✓</span>
            </div>
            <div>
              <p className="text-white font-semibold font-mont mb-1">
                Secure Password
              </p>
              <p className="text-sm text-gray-400 font-noto">
                Your new password meets all security requirements
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-[#10B981] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">✓</span>
            </div>
            <div>
              <p className="text-white font-semibold font-mont mb-1">
                Account Secured
              </p>
              <p className="text-sm text-gray-400 font-noto">
                All active sessions have been logged out for security
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-[#10B981] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">✓</span>
            </div>
            <div>
              <p className="text-white font-semibold font-mont mb-1">
                Ready to Login
              </p>
              <p className="text-sm text-gray-400 font-noto">
                You can now sign in with your new password
              </p>
            </div>
          </div>
        </div>
      </div>

      {autoRedirect && countdown > 0 && (
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <p className="text-sm text-blue-400 font-noto">
            Redirecting to login page in{" "}
            <span className="font-bold font-mont text-lg">{countdown}</span>{" "}
            seconds...
          </p>
        </div>
      )}

      <div className="pt-4">
        <Button
          onClick={handleRedirect}
          variant="primary"
          size="lg"
          className="w-full max-w-xs mx-auto"
          icon={<ArrowRight size={20} />}
        >
          Continue to Login
        </Button>
      </div>

      <div className="pt-6 border-t border-gray-700">
        <p className="text-sm text-gray-500 font-noto mb-2">Need help?</p>
        <a
          href="/support"
          className="text-[#10B981] hover:text-[#059669] font-semibold transition-colors font-mont"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
};

export default PasswordResetSuccess;
