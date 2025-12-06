"use client";

import React, { useState } from "react";
import LoginForm from "../components/auth/LoginForm";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (data: {
    email: string;
    password: string;
    rememberMe: boolean;
  }) => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Login data:", data);

      // Here you'll integrate Better Auth
      // Example:
      // const { error } = await authClient.signIn.email({
      //   email: data.email,
      //   password: data.password,
      //   rememberMe: data.rememberMe
      // });

      alert("Login successful! (This will be connected to Better Auth)");
      setIsLoading(false);

      // Redirect to dashboard
      // window.location.href = '/dashboard';
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F2F2F] via-[#1A4D4D] to-[#0A1F1F] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <a href="/" className="inline-block">
            <h1 className="text-4xl font-bold text-white font-mont hover:text-[#10B981] transition-colors">
              Escro
            </h1>
          </a>
        </div>

        {/* Login Form Card */}
        <div className="bg-[#1F2937] rounded-2xl shadow-2xl p-8 border border-[#10B981]/20">
          <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-sm text-gray-400 hover:text-[#10B981]
            transition-colors font-noto"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
