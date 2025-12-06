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
    { number: 1, title: "Account Info", description: "Basic details" },
    { number: 2, title: "Choose Role", description: "Select your role" },
    {
      number: 3,
      title: "Additional Info",
      description: "Role-specific details",
    },
    { number: 4, title: "Review", description: "Confirm & submit" },
  ];

  const handleChange = (field: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: undefined }));
    }
  };

  // DEMO. I GO COMOT AM FOR PROD
  const handleFillDemo = (demoData: any) => {
    setFormData(demoData);
    setErrors({});
    setCurrentStep(1);
  };

  const validateStepOne = () => {
    const newErrors: any = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStepThree = () => {
    const newErrors: any = {};

    if (formData.role === "customer") {
      if (!formData.deliveryAddress)
        newErrors.deliveryAddress = "Delivery address is required";
      if (!formData.city) newErrors.city = "City is required";
      if (!formData.state) newErrors.state = "State is required";
    }

    if (formData.role === "store_owner") {
      if (!formData.businessName)
        newErrors.businessName = "Business name is required";
      if (!formData.businessRegNumber)
        newErrors.businessRegNumber = "Registration number is required";
      if (!formData.storeCategory)
        newErrors.storeCategory = "Store category is required";
      if (!formData.businessAddress)
        newErrors.businessAddress = "Business address is required";
    }

    if (formData.role === "courier") {
      if (!formData.vehicleType)
        newErrors.vehicleType = "Vehicle type is required";
      if (!formData.licenseNumber)
        newErrors.licenseNumber = "License number is required";
      if (!formData.vehicleRegNumber)
        newErrors.vehicleRegNumber = "Vehicle registration is required";
      if (!formData.workingArea)
        newErrors.workingArea = "Working area is required";
    }

    if (formData.role === "agency") {
      if (!formData.agencyName)
        newErrors.agencyName = "Agency name is required";
      if (!formData.agencyRegNumber)
        newErrors.agencyRegNumber = "Registration number is required";
      if (!formData.courierCount)
        newErrors.courierCount = "Number of couriers is required";
      if (!formData.serviceAreas || formData.serviceAreas.length === 0) {
        newErrors.serviceAreas = "Please select at least one service area";
      }
      if (!formData.officeAddress)
        newErrors.officeAddress = "Office address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStepOneNext = () => {
    if (validateStepOne()) {
      setCurrentStep(2);
    }
  };

  const handleStepTwoNext = () => {
    if (formData.role) {
      setCurrentStep(3);
    }
  };

  const handleStepThreeNext = () => {
    if (validateStepThree()) {
      setCurrentStep(4);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted!", formData);
      alert("Account created successfully!");
      setIsLoading(false);
      // I'll rededirect to /login when I write it
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F2F2F] via-[#1A4D4D] to-[#0A1F1F] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white font-mont">Escro</h1>
          <p className="text-gray-400 mt-2 font-noto">Create your account</p>
        </div>

        <StepIndicator steps={steps} currentStep={currentStep} />

        {/* DEMO - I GO COMOT AM FOR PROD */}
        {currentStep === 1 && <DemoCreds onFillDemo={handleFillDemo} />}

        <div className="bg-[#1F2937] rounded-2xl shadow-2xl p-8 border border-[#10B981]/20">
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
    </div>
  );
}
