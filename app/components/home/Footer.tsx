"use client";

import React, { useState } from "react";
import {
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Shield,
  Lock,
  Globe,
  MessageSquare,
  ChevronRight,
  CreditCard,
  Award,
  CheckCircle2,
  Zap,
  Users,
  TrendingUp,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribed with:", email);
    setEmail("");
    // You can add API call here
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Data-driven configuration
  const footerLinks = {
    platform: {
      title: "Platform",
      icon: Globe,
      links: [
        { name: "Marketplace", href: "#marketplace", highlight: true },
        { name: "For Sellers", href: "#sellers" },
        { name: "For Buyers", href: "#buyers" },
        { name: "For Couriers", href: "#couriers" },
        { name: "For Agencies", href: "#agencies" },
      ],
    },
    resources: {
      title: "Resources",
      icon: MessageSquare,
      links: [
        { name: "Help Center", href: "#help", highlight: true },
        { name: "Blog & Guides", href: "#blog" },
        { name: "API Documentation", href: "#api" },
        { name: "Community Forum", href: "#community" },
        { name: "Webinars", href: "#webinars" },
      ],
    },
    company: {
      title: "Company",
      icon: Users,
      links: [
        { name: "About Us", href: "#about" },
        { name: "Careers", href: "#careers", highlight: true },
        { name: "Press & Media", href: "#press" },
        { name: "Partnerships", href: "#partnerships" },
        { name: "Contact Sales", href: "#sales" },
      ],
    },
    legal: {
      title: "Legal",
      icon: Shield,
      links: [
        { name: "Privacy Policy", href: "#privacy" },
        { name: "Terms of Service", href: "#terms" },
        { name: "Cookie Policy", href: "#cookies" },
        { name: "GDPR Compliance", href: "#gdpr", highlight: true },
        { name: "Security Overview", href: "#security" },
      ],
    },
  };

  const socialLinks = [
    {
      name: "Twitter",
      icon: Twitter,
      href: "#",
      color:
        "hover:bg-[#1DA1F2]/10 hover:text-[#1DA1F2] hover:border-[#1DA1F2]/20",
      followerCount: "15.2K",
    },
    {
      name: "Facebook",
      icon: Facebook,
      href: "#",
      color:
        "hover:bg-[#4267B2]/10 hover:text-[#4267B2] hover:border-[#4267B2]/20",
      followerCount: "24.7K",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "#",
      color:
        "hover:bg-[#E4405F]/10 hover:text-[#E4405F] hover:border-[#E4405F]/20",
      followerCount: "38.5K",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "#",
      color:
        "hover:bg-[#0077B5]/10 hover:text-[#0077B5] hover:border-[#0077B5]/20",
      followerCount: "12.1K",
    },
  ];

  return (
    <footer className="relative bg-zinc-950 overflow-hidden border-t border-zinc-800">
      {/* Background Decor */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900/50 to-zinc-950" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-emerald-500/20 via-emerald-500/10 to-transparent" />
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur" />
                <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white font-mont tracking-tight">
                  Escro
                </h3>
                <span className="text-sm text-emerald-400 font-medium">
                  Secure Marketplace
                </span>
              </div>
            </div>

            <p className="text-zinc-400 font-noto leading-relaxed mb-8 max-w-lg">
              Your trusted multi-vendor marketplace where every transaction is
              protected by escrow technology. Trade with confidence, backed by
              enterprise-grade security.
            </p>

            {/* Newsletter */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Mail className="w-5 h-5 text-emerald-400" />
                <span className="text-white font-medium">Stay Updated</span>
              </div>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 rounded-lg border border-zinc-800 bg-zinc-900/50 text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold hover:shadow-lg hover:shadow-emerald-500/20 transition-all active:scale-95"
                >
                  Subscribe
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <a
                href="mailto:support@escro.com"
                className="flex items-center gap-3 text-zinc-400 hover:text-emerald-400 transition-colors group"
              >
                <div className="p-2 rounded-lg border border-zinc-800 bg-zinc-900/50 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10 transition-all">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-medium">Support</div>
                  <div className="font-noto">support@escro.com</div>
                </div>
              </a>

              <a
                href="tel:+995555317927"
                className="flex items-center gap-3 text-zinc-400 hover:text-emerald-400 transition-colors group"
              >
                <div className="p-2 rounded-lg border border-zinc-800 bg-zinc-900/50 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10 transition-all">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-medium">Sales</div>
                  <div className="font-noto">+995 555 31 79 27</div>
                </div>
              </a>
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {Object.values(footerLinks).map((section, idx) => (
                <div key={idx} className="group">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="p-2 rounded-lg border border-zinc-800 bg-zinc-900/50 text-emerald-400">
                      <section.icon className="w-4 h-4" />
                    </div>
                    <h4 className="text-white font-bold font-mont">
                      {section.title}
                    </h4>
                  </div>

                  <ul className="space-y-3">
                    {section.links.map((link, linkIdx) => (
                      <li key={linkIdx}>
                        <a
                          href={link.href}
                          className={`flex items-center gap-2 text-sm font-noto transition-all ${
                            link.highlight
                              ? "text-emerald-400 hover:text-emerald-300"
                              : "text-zinc-400 hover:text-white"
                          } group/link`}
                        >
                          <ChevronRight
                            className={`w-3 h-3 transition-transform group-hover/link:translate-x-1 ${
                              link.highlight
                                ? "text-emerald-500"
                                : "text-zinc-600"
                            }`}
                          />
                          {link.name}
                          {link.highlight && (
                            <span className="ml-2 px-1.5 py-0.5 text-xs font-medium bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/20">
                              New
                            </span>
                          )}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Social & Payment Section */}
        <div className="py-8 border-y border-zinc-800 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            {/* Social Links */}
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-white font-medium">Follow Us</span>
                <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
              </div>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    aria-label={social.name}
                    className="group relative"
                  >
                    <div
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-sm transition-all duration-300 ${social.color} group-hover:scale-105`}
                    >
                      <social.icon className="w-5 text-white h-5" />
                      <div className="text-sm text-white font-medium">
                        {social.name}
                      </div>
                      <div className="text-xs text-white text-zinc-500 group-hover:text-current">
                        {social.followerCount}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-zinc-500 text-sm font-noto mb-2">
                © {currentYear} Escro Technologies. All rights reserved.
              </p>
              <p className="text-xs text-zinc-600">
                Secure marketplace platform powered by blockchain escrow
                technology.
              </p>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-800 bg-zinc-900/40">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-zinc-400">SSL Secured</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-800 bg-zinc-900/40">
                <Lock className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-zinc-400">GDPR Compliant</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-800 bg-zinc-900/40">
                <Award className="w-4 h-4 text-amber-400" />
                <span className="text-sm text-zinc-400">Trusted Partner</span>
              </div>
            </div>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:text-white hover:border-emerald-500/50 transition-all hover:scale-105"
            >
              <span className="text-sm font-medium">Back to Top</span>
              <ChevronRight className="w-4 h-4 rotate-270 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-8 pt-8 border-t border-zinc-800 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="text-sm text-zinc-400">
              <span className="text-white font-medium">Security Notice:</span>{" "}
              All transactions are protected by our escrow system. Never share
              your password or 2FA codes.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
