"use client";

import { useState } from "react";
import {
  IconSettings,
  IconBuilding,
  IconCreditCard,
  IconTruck,
} from "@tabler/icons-react";
import GeneralSettings from "./_components/general-settings";
import PaymentSettings from "./_components/payment-settings";
import ShippingSettings from "./_components/shipping-settings";

type SettingsTab = "general" | "payment" | "shipping";

const tabs: { id: SettingsTab; label: string; icon: React.ElementType }[] = [
  { id: "general", label: "General", icon: IconBuilding },
  { id: "payment", label: "Payment", icon: IconCreditCard },
  { id: "shipping", label: "Shipping", icon: IconTruck },
];

const Page = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>("general");

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return <GeneralSettings />;
      case "payment":
        return <PaymentSettings />;
      case "shipping":
        return <ShippingSettings />;
      default:
        return <GeneralSettings />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-mont">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-black text-3xl font-bold font-noto">
              Settings
            </h1>
          </div>
          <p className="text-gray-500 ">
            Manage your store configuration and preferences
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white border border-emerald-500/30 rounded-lg p-1.5 inline-flex gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium transition-all ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="mt-6">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default Page;
