"use client";

import React from "react";
import PasswordResetSuccess from "../components/auth/PasswordResetSuccess";

export default function PasswordResetSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F2F2F] via-[#1A4D4D] to-[#0A1F1F] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <a href="/" className="inline-block">
            <h1 className="text-4xl font-bold text-white font-mont hover:text-[#10B981] transition-colors">
              Escro
            </h1>
          </a>
        </div>

        <div className="bg-[#1F2937] rounded-2xl shadow-2xl p-8 md:p-12 border border-[#10B981]/20">
          <PasswordResetSuccess autoRedirect={true} redirectDelay={5} />
        </div>
      </div>
    </div>
  );
}
