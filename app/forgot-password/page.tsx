"use client";

import React, { useState } from "react";
import ForgotPasswordForm from "../components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (email: string) => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Password reset email sent to:", email);

      // Better Auth integration here
      // await authClient.forgetPassword({ email });

      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F2F2F] via-[#1A4D4D] to-[#0A1F1F] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <a href="/" className="inline-block">
            <h1 className="text-4xl font-bold text-white font-mont hover:text-[#10B981] transition-colors">
              Escro
            </h1>
          </a>
        </div>

        <div className="bg-[#1F2937] rounded-2xl shadow-2xl p-8 border border-[#10B981]/20">
          <ForgotPasswordForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
