"use client";

import { useState } from "react";
import {
  IconBuilding,
  IconMail,
  IconPhone,
  IconMapPin,
  IconWorld,
  IconClock,
  IconCurrency,
  IconUpload,
  IconCamera,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const GeneralSettings = () => {
  const [storeLogo, setStoreLogo] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      {/* Store Branding */}
      <div className="bg-white border border-emerald-500/30 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <IconBuilding className="w-5 h-5 text-emerald-600" />
          Agency Branding
        </h3>

        <div className="grid gap-6">
          {/* Store Logo */}
          <div className="flex items-start gap-6">
            <div className="relative">
              <div className="w-24 h-24 bg-emerald-500/20 rounded-md flex items-center justify-center overflow-hidden border-2 border-dashed border-emerald-300">
                {storeLogo ? (
                  <img
                    src={storeLogo}
                    alt="Agency logo"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <IconCamera className="w-8 h-8 text-emerald-400" />
                )}
              </div>
              <label
                htmlFor="logo-upload"
                className="absolute -bottom-2 -right-2 p-2 bg-emerald-500 rounded-full cursor-pointer hover:bg-emerald-700 transition-colors"
              >
                <IconUpload className="w-4 h-4 text-white" />
                <input
                  type="file"
                  id="logo-upload"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setStoreLogo(URL.createObjectURL(file));
                    }
                  }}
                />
              </label>
            </div>
            <div className="flex-1">
              <Label className="text-sm font-semibold text-gray-700">
                Agency Logo
              </Label>
              <p className="text-sm text-gray-500 mt-1 mb-3">
                Upload a logo for your agency. Recommended size: 200x200px
              </p>
              <Button
                variant="outline"
                size="sm"
                className="text-emerald-600 border-emerald-500/50 rounded-sm hover:bg-emerald-50"
              >
                <IconUpload className="w-4 h-4 mr-2" />
                Upload Logo
              </Button>
            </div>
          </div>

          {/* Store Name */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="store-name"
                className="text-sm font-semibold text-gray-700"
              >
                Agency Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="store-name"
                placeholder="Your store name"
                defaultValue="Nexorra Studio"
                className="h-11 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="tagline"
                className="text-sm font-semibold text-gray-700"
              >
                Tagline
              </Label>
              <Input
                id="tagline"
                placeholder="Your store's tagline"
                defaultValue="Quality Solutions for Modern Businesses"
                className="h-11 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Store Description */}
          <div className="space-y-2">
            <Label
              htmlFor="description"
              className="text-sm font-semibold text-gray-700"
            >
              Agency Description
            </Label>
            <Textarea
              id="description"
              placeholder="Describe your agency..."
              defaultValue="We build cool stuff"
              className="min-h-[100px] border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
            />
            <p className="text-xs text-gray-500">
              This description will appear on your agency&apos;s public page.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white border border-emerald-500/30 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <IconMail className="w-5 h-5 text-emerald-600" />
          Contact Information
        </h3>

        <div className="grid gap-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-semibold text-gray-700"
              >
                Business Email <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <IconMail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="contact@yourstore.com"
                  defaultValue="contact@nexorra.com"
                  className="h-11 pl-10 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="text-sm font-semibold text-gray-700"
              >
                Phone Number
              </Label>
              <div className="relative">
                <IconPhone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  defaultValue="+1 (555) 987-6543"
                  className="h-11 pl-10 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="address"
              className="text-sm font-semibold text-gray-700"
            >
              Business Address
            </Label>
            <div className="relative">
              <IconMapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Textarea
                id="address"
                placeholder="Enter your business address"
                defaultValue="123 Tech Street, Suite 456&#10;San Francisco, CA 94102&#10;United States"
                className="min-h-[80px] pl-10 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Regional Settings */}
      <div className="bg-white border border-emerald-500/30 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <IconWorld className="w-5 h-5 text-emerald-600" />
          Regional Settings
        </h3>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <IconClock className="w-4 h-4 text-gray-500" />
                Timezone
              </div>
            </Label>
            <Select defaultValue="america-los-angeles">
              <SelectTrigger className="h-11 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500">
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="america-new-york">
                  (UTC-05:00) Eastern Time
                </SelectItem>
                <SelectItem value="america-chicago">
                  (UTC-06:00) Central Time
                </SelectItem>
                <SelectItem value="america-denver">
                  (UTC-07:00) Mountain Time
                </SelectItem>
                <SelectItem value="america-los-angeles">
                  (UTC-08:00) Pacific Time
                </SelectItem>
                <SelectItem value="europe-london">
                  (UTC+00:00) London
                </SelectItem>
                <SelectItem value="europe-paris">
                  (UTC+01:00) Paris, Berlin
                </SelectItem>
                <SelectItem value="asia-tokyo">(UTC+09:00) Tokyo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <IconWorld className="w-4 h-4 text-gray-500" />
                Language
              </div>
            </Label>
            <Select defaultValue="en">
              <SelectTrigger className="h-11 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
                <SelectItem value="zh">Chinese</SelectItem>
                <SelectItem value="ja">Japanese</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <IconCurrency className="w-4 h-4 text-gray-500" />
                Currency
              </div>
            </Label>
            <Select defaultValue="usd">
              <SelectTrigger className="h-11 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usd">USD ($)</SelectItem>
                <SelectItem value="eur">EUR (€)</SelectItem>
                <SelectItem value="gbp">GBP (£)</SelectItem>
                <SelectItem value="jpy">JPY (¥)</SelectItem>
                <SelectItem value="cad">CAD (C$)</SelectItem>
                <SelectItem value="aud">AUD (A$)</SelectItem>
                <SelectItem value="ngn">NGN (₦)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" className="border-gray-300">
          Cancel
        </Button>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default GeneralSettings;
