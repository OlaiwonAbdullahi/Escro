"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  Shield,
  Home,
  Truck,
  Store,
  LogIn,
  UserPlus,
  ArrowRight,
} from "lucide-react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsMounted(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (typeof window !== "undefined") {
        const totalScroll =
          document.documentElement.scrollHeight - window.innerHeight;
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(currentProgress);
      }

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        const sections = ["home", "HowItWorks", "sellers"];
        const currentSection = sections.find((section) => {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            return rect.top <= 150 && rect.bottom >= 150;
          }
          return false;
        });

        if (currentSection) {
          setActiveLink(currentSection.toLowerCase());
        }
      }, 100);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      setActiveLink(targetId.toLowerCase());

      setIsOpen(false);

      const startPosition = window.pageYOffset;
      const targetPosition =
        targetElement.getBoundingClientRect().top + startPosition - 80;
      const distance = targetPosition - startPosition;
      const duration = 800;
      let startTime: number | null = null;

      const easeInOutCubic = (t: number) => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };

      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const easeProgress = easeInOutCubic(progress);

        window.scrollTo(0, startPosition + distance * easeProgress);

        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
    } else {
      setActiveLink(targetId.toLowerCase());
      setIsOpen(false);
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveLink("home");
    setIsOpen(false);

    const startPosition = window.pageYOffset;
    const duration = 800;
    let startTime: number | null = null;

    const easeInOutCubic = (t: number) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easeProgress = easeInOutCubic(progress);

      window.scrollTo(0, startPosition * (1 - easeProgress));

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  const navLinks = [
    {
      name: "Home",
      href: "#home",
      icon: Home,
    },
    {
      name: "How It Works",
      href: "#HowItWorks",
      icon: Truck,
    },
    {
      name: "For Sellers",
      href: "#sellers",
      icon: Store,
    },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isOpen
            ? "opacity-0 pointer-events-none"
            : scrolled
            ? "bg-zinc-900/95 backdrop-blur-xl border-b border-zinc-800/50 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <a
              href="#home"
              onClick={handleLogoClick}
              className="flex items-center gap-3 group/logo"
            >
              <div className="relative">
                <div
                  className={`absolute inset-0 rounded-xl ${
                    scrolled
                      ? "bg-emerald-500/20"
                      : "bg-gradient-to-br from-emerald-500/30 to-transparent"
                  } blur-md group-hover/logo:blur-xl transition-all duration-500`}
                />
                <div
                  className={`relative flex items-center justify-center w-12 h-12 rounded-xl ${
                    scrolled
                      ? "bg-zinc-900/80 border border-zinc-800"
                      : "bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border border-emerald-500/20"
                  } backdrop-blur-sm group-hover/logo:scale-105 transition-transform duration-300`}
                >
                  <Shield className="w-6 h-6 text-emerald-400 group-hover/logo:scale-110 transition-transform duration-300" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white font-mont tracking-tight group-hover/logo:text-emerald-400 transition-colors duration-300">
                  Escro
                </span>
                <span className="text-xs text-emerald-400 font-medium -mt-1 group-hover/logo:text-emerald-300 transition-colors duration-300">
                  Secure Marketplace
                </span>
              </div>
            </a>

            <div className="hidden lg:flex items-center gap-2 absolute left-1/2 transform -translate-x-1/2">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 group/navlink ${
                    activeLink === link.name.toLowerCase()
                      ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                  }`}
                >
                  <link.icon className="w-4 h-4 group-hover/navlink:scale-110 transition-transform duration-300" />
                  <span className="font-medium group-hover/navlink:translate-x-0.5 transition-transform duration-300">
                    {link.name}
                  </span>
                </a>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <a
                href="#signup"
                className="group relative overflow-hidden flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold hover:shadow-2xl hover:shadow-emerald-500/25 transition-all hover:scale-105 active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Started
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
            </div>

            <div className="flex lg:hidden items-center gap-3">
              <a
                href="#signup"
                className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold hover:shadow-lg hover:shadow-emerald-500/25 transition-all active:scale-95"
              >
                <span className="hidden sm:inline">Get Started</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2.5 rounded-xl border border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:text-white hover:border-emerald-500/30 transition-all group"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                ) : (
                  <Menu className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`lg:hidden fixed inset-0 z-50 transition-all duration-500 ${
          isOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-xl"
          onClick={() => setIsOpen(false)}
        />

        <div
          className={`absolute top-0 right-0 h-full w-full max-w-sm bg-zinc-950/95 backdrop-blur-2xl border-l border-zinc-800 transform transition-transform duration-500 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6 border-b border-zinc-800">
            <div className="flex items-center justify-between mb-8">
              <a
                href="#home"
                onClick={handleLogoClick}
                className="flex items-center gap-3 group/logo"
              >
                <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border border-emerald-500/30 group-hover/logo:scale-105 transition-transform duration-300">
                  <Shield className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <div className="text-xl font-bold text-white group-hover/logo:text-emerald-400 transition-colors duration-300">
                    Escro
                  </div>
                  <div className="text-xs text-emerald-400 group-hover/logo:text-emerald-300 transition-colors duration-300">
                    Secure Marketplace
                  </div>
                </div>
              </a>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2.5 rounded-lg border border-zinc-800 bg-zinc-900/50 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all group"
              >
                <X className="w-5 h-5 text-zinc-400 group-hover:text-emerald-400 group-hover:rotate-90 transition-all duration-300" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="text-sm text-zinc-500 text-center">
                Join thousands of trusted users
              </div>
              <div className="flex gap-3">
                <a
                  href="#signin"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-zinc-800 bg-zinc-900/50 text-zinc-300 hover:text-white hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all group"
                >
                  <LogIn className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium group-hover:translate-x-0.5 transition-transform duration-300">
                    Sign In
                  </span>
                </a>
                <a
                  href="#signup"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all group"
                >
                  <UserPlus className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium group-hover:translate-x-0.5 transition-transform duration-300">
                    Sign Up
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div className="p-6 overflow-y-auto h-[calc(100vh-200px)]">
            <div className="space-y-1 mb-8">
              <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider px-4 mb-2">
                Navigation
              </div>
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group/navlink ${
                    activeLink === link.name.toLowerCase()
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-900/50 hover:border hover:border-zinc-800"
                  }`}
                >
                  <link.icon className="w-5 h-5 group-hover/navlink:scale-110 transition-transform duration-300" />
                  <span className="font-medium group-hover/navlink:translate-x-1 transition-transform duration-300">
                    {link.name}
                  </span>
                </a>
              ))}
            </div>

            <div className="space-y-1 mb-8">
              <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider px-4 mb-2">
                Learn More
              </div>
              {["Features", "For Customers", "For Couriers", "Pricing"].map(
                (item, idx) => (
                  <a
                    key={idx}
                    href="#"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900/50 hover:border hover:border-zinc-800 transition-all group"
                  >
                    <span className="font-medium group-hover:translate-x-1 transition-transform duration-300">
                      {item}
                    </span>
                  </a>
                )
              )}
            </div>

            <div className="space-y-1">
              <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider px-4 mb-2">
                Support
              </div>
              {["Help Center", "Contact Us", "Privacy Policy", "Terms"].map(
                (item, idx) => (
                  <a
                    key={idx}
                    href="#"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900/50 hover:border hover:border-zinc-800 transition-all group"
                  >
                    <span className="font-medium group-hover:translate-x-1 transition-transform duration-300">
                      {item}
                    </span>
                  </a>
                )
              )}
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-zinc-800 bg-zinc-950">
            <div className="flex flex-col items-center gap-3">
              <div className="text-sm text-zinc-500 text-center">
                Need help getting started?
              </div>
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="w-full py-3 rounded-xl border border-zinc-800 bg-zinc-900/50 text-white font-medium hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all text-center group"
              >
                <span className="group-hover:translate-x-0.5 transition-transform duration-300 inline-block">
                  Contact Support
                </span>
              </a>
              <div className="text-xs text-zinc-600 text-center">
                © {new Date().getFullYear()} Escro. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>

      {isMounted && (
        <div
          className={`fixed top-0 left-0 right-0 z-40 h-0.5 transition-opacity duration-300 ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="h-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-transparent">
            <div
              className="h-full bg-emerald-400 transition-all duration-300"
              style={{
                width: `${scrollProgress}%`,
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
