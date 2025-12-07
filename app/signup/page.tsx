"use client";

import React, { useState } from "react";
import StepIndicator from "../components/auth/StepIndicator";
import StepOne from "../components/auth/steps/StepOne";
import StepTwo from "../components/auth/steps/StepTwo";
import StepThree from "../components/auth/steps/StepThree";
import StepFour from "../components/auth/steps/StepFour";
import DemoCreds from "../components/auth/DemoCreds";

export default function SignupPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "",
    deliveryAddress: "",
    city: "",
    state: "",
    businessName: "",
    businessRegNumber: "",
    storeCategory: "",
    businessAddress: "",
    taxId: "",
    vehicleType: "",
    licenseNumber: "",
    vehicleRegNumber: "",
    workingArea: "",
    agencyName: "",
    agencyRegNumber: "",
    courierCount: "",
    serviceAreas: [] as string[],
    officeAddress: "",
  });

  const [errors, setErrors] = useState<any>({});

  const steps = [
    { number: 1, title: "Basic Details", description: "Basic credentials" },
    { number: 2, title: "Choose Role", description: "Select role" },
    {
      number: 3,
      title: "Additional Info",
      description: "Role-specific details",
    },
    { number: 4, title: "Review", description: "Confirm and submit" },
  ];

  const handleChange = (field: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field])
      setErrors((prev: any) => ({ ...prev, [field]: undefined }));
  };

  const handleFillDemo = (demoData: any) => {
    setFormData(demoData);
    setErrors({});
    setCurrentStep(1);
  };

  const validateStepOne = () => {
    const newErrors: any = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) newErrors.email = "Required";
    else if (!emailRegex.test(formData.email))
      newErrors.email = "Invalid email";
    if (!formData.phone) newErrors.phone = "Required";
    if (!formData.password) newErrors.password = "Required";
    else if (formData.password.length < 8) newErrors.password = "Too short";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Mismatch";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStepThree = () => {
    const newErrors: any = {};

    if (formData.role === "customer" && !formData.deliveryAddress)
      newErrors.deliveryAddress = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStepOneNext = () => {
    if (validateStepOne()) setCurrentStep(2);
  };
  const handleStepTwoNext = () => {
    if (formData.role) setCurrentStep(3);
  };
  const handleStepThreeNext = () => {
    if (validateStepThree()) setCurrentStep(4);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setTimeout(() => {
      console.log("Form submitted!", formData);
      alert("Welcome to the future of Commerce.");
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full bg-white relative flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f5f5f5_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f5_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#fff_70%,transparent_100%)] pointer-events-none" />

      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-2xl relative z-10">
        <div className="text-center mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-8 w-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold text-xl">
              E
            </div>
            <span className="text-2xl font-bold text-gray-900 tracking-tight font-mont">
              Escro
            </span>
          </div>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 font-mont tracking-tight">
            Create your account
          </h1>
        </div>

        <div className="mb-8">
          <StepIndicator steps={steps} currentStep={currentStep} />
        </div>

        <div className="relative group rounded-3xl border border-gray-200 bg-white/90 backdrop-blur-xl shadow-xl transition-all duration-500">
          <div className="relative p-6 sm:p-10">
            {currentStep === 1 && (
              <StepOne
                formData={formData}
                errors={errors}
                onChange={handleChange}
                onNext={handleStepOneNext}
              />
            )}

            {currentStep === 2 && (
              <StepTwo
                selectedRole={formData.role}
                onSelectRole={(role) => handleChange("role", role)}
                onNext={handleStepTwoNext}
                onBack={() => setCurrentStep(1)}
              />
            )}

            {currentStep === 3 && (
              <StepThree
                role={formData.role}
                formData={formData}
                errors={errors}
                onChange={handleChange}
                onNext={handleStepThreeNext}
                onBack={() => setCurrentStep(2)}
              />
            )}

            {currentStep === 4 && (
              <StepFour
                formData={formData}
                onSubmit={handleSubmit}
                onBack={() => setCurrentStep(3)}
                isLoading={isLoading}
              />
            )}
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500 font-noto">
            © 2025 Escro Inc. Secure Transactions Protocol.
          </p>
        </div>
      </div>

      {currentStep === 1 && (
        <div className="fixed bottom-4 right-4 z-50 opacity-50 hover:opacity-100 transition-opacity">
          <DemoCreds onFillDemo={handleFillDemo} />
        </div>
      )}
    </div>
  );
}
