"use client";

import { useState } from "react";
import {
  IconTruck,
  IconMapPin,
  IconClock,
  IconGift,
  IconPlus,
  IconTrash,
  IconEdit,
  IconWorld,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ShippingZone {
  id: string;
  name: string;
  regions: string[];
  methods: { name: string; rate: number; estimatedDays: string }[];
}

const ShippingSettings = () => {
  const [zones, setZones] = useState<ShippingZone[]>([
    {
      id: "1",
      name: "Domestic",
      regions: ["United States"],
      methods: [
        { name: "Standard Shipping", rate: 5.99, estimatedDays: "5-7" },
        { name: "Express Shipping", rate: 14.99, estimatedDays: "2-3" },
        { name: "Overnight", rate: 29.99, estimatedDays: "1" },
      ],
    },
    {
      id: "2",
      name: "International",
      regions: ["Canada", "UK", "Europe", "Australia"],
      methods: [
        { name: "International Standard", rate: 19.99, estimatedDays: "10-14" },
        { name: "International Express", rate: 39.99, estimatedDays: "5-7" },
      ],
    },
  ]);

  return (
    <div className="space-y-8">
      {/* Shipping Zones */}
      <div className="bg-white border border-emerald-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <IconMapPin className="w-5 h-5 text-emerald-600" />
            Shipping Zones & Rates
          </h3>
          <Button
            variant="outline"
            size="sm"
            className="text-emerald-600 border-emerald-200 hover:bg-emerald-50"
          >
            <IconPlus className="w-4 h-4 mr-2" />
            Add Zone
          </Button>
        </div>

        <div className="space-y-6">
          {zones.map((zone) => (
            <div
              key={zone.id}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              {/* Zone Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
                <div>
                  <h4 className="font-medium text-gray-900">{zone.name}</h4>
                  <p className="text-sm text-gray-500">
                    {zone.regions.join(", ")}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-500 hover:text-emerald-600"
                  >
                    <IconEdit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-500 hover:text-red-600"
                  >
                    <IconTrash className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Shipping Methods */}
              <div className="divide-y divide-gray-100">
                {zone.methods.map((method, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <IconTruck className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">
                          {method.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {method.estimatedDays} business days
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-semibold text-gray-900">
                        ${method.rate.toFixed(2)}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <IconEdit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="px-4 py-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-emerald-600 hover:text-emerald-700"
                  >
                    <IconPlus className="w-4 h-4 mr-2" />
                    Add Shipping Method
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery Methods & Carriers */}
      <div className="bg-white border border-emerald-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <IconTruck className="w-5 h-5 text-emerald-600" />
          Delivery Carriers
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "USPS", enabled: true },
            { name: "FedEx", enabled: true },
            { name: "UPS", enabled: true },
            { name: "DHL", enabled: false },
            { name: "Local Courier", enabled: true },
            { name: "Self Pickup", enabled: false },
          ].map((carrier) => (
            <label
              key={carrier.name}
              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                carrier.enabled
                  ? "border-emerald-300 bg-emerald-50"
                  : "border-gray-200 bg-gray-50 hover:border-gray-300"
              }`}
            >
              <input
                type="checkbox"
                defaultChecked={carrier.enabled}
                className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
              />
              <span className="text-sm font-medium text-gray-700">
                {carrier.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Handling Time */}
      <div className="bg-white border border-emerald-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <IconClock className="w-5 h-5 text-emerald-600" />
          Handling Time
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">
              Order Processing Time
            </Label>
            <Select defaultValue="1-2">
              <SelectTrigger className="h-11 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500">
                <SelectValue placeholder="Select processing time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="same-day">Same Day</SelectItem>
                <SelectItem value="1">1 Business Day</SelectItem>
                <SelectItem value="1-2">1-2 Business Days</SelectItem>
                <SelectItem value="2-3">2-3 Business Days</SelectItem>
                <SelectItem value="3-5">3-5 Business Days</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">
              Time needed to prepare and pack orders before shipment
            </p>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">
              Cutoff Time for Same-Day Processing
            </Label>
            <Select defaultValue="14:00">
              <SelectTrigger className="h-11 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500">
                <SelectValue placeholder="Select cutoff time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10:00">10:00 AM</SelectItem>
                <SelectItem value="12:00">12:00 PM</SelectItem>
                <SelectItem value="14:00">2:00 PM</SelectItem>
                <SelectItem value="16:00">4:00 PM</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">
              Orders placed after this time will be processed the next business
              day
            </p>
          </div>
        </div>
      </div>

      {/* Free Shipping */}
      <div className="bg-white border border-emerald-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <IconGift className="w-5 h-5 text-emerald-600" />
          Free Shipping
        </h3>

        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
            <input
              type="checkbox"
              id="enable-free-shipping"
              defaultChecked
              className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
            />
            <label
              htmlFor="enable-free-shipping"
              className="text-sm text-gray-700"
            >
              <span className="font-medium">
                Enable free shipping threshold
              </span>
              <span className="text-gray-500 ml-2">
                Offer free shipping on orders above a certain amount
              </span>
            </label>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="free-shipping-threshold"
                className="text-sm font-semibold text-gray-700"
              >
                Minimum Order Amount
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  $
                </span>
                <Input
                  id="free-shipping-threshold"
                  type="number"
                  defaultValue="50"
                  min="0"
                  step="0.01"
                  className="h-11 pl-8 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700">
                Applies To
              </Label>
              <Select defaultValue="domestic">
                <SelectTrigger className="h-11 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500">
                  <SelectValue placeholder="Select zones" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Shipping Zones</SelectItem>
                  <SelectItem value="domestic">Domestic Only</SelectItem>
                  <SelectItem value="selected">Selected Zones</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <input
              type="checkbox"
              id="show-progress"
              defaultChecked
              className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
            />
            <label htmlFor="show-progress" className="text-sm text-gray-700">
              <span className="font-medium">Show progress bar</span>
              <span className="text-gray-500 ml-2">
                Display how close customers are to free shipping at checkout
              </span>
            </label>
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

export default ShippingSettings;
