"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#fafafa]">
      {/* Left Section - Brand & Value */}
      <div className="lg:w-2/3 bg-white relative overflow-hidden flex flex-col p-8 lg:p-16 border-b-4 lg:border-b-0 lg:border-r-4 border-black">
        {/* Decorative Background */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <pattern
              id="grid"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 10 0 L 0 0 0 10"
                fill="none"
                stroke="black"
                strokeWidth="0.5"
              />
            </pattern>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        {/* Brand Identity */}
        <div className="relative z-10 ">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <span className="text-white font-bold text-xl">get</span>
            </div>
            <span className="text-3xl font-black tracking-tight">hired</span>
          </div>
          <h2 className="text-xl font-bold text-gray-800">
            Practice interviews. Get hired faster.
          </h2>
        </div>

        {/* Content Section */}
        <div className="relative z-10 my-12 lg:my-0">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl lg:text-6xl font-black leading-tight mb-6"
          >
            Practice real interview <br />
            <span className="text-blue-600">questions</span> and get <br />
            instant <span className="text-green-500">AI feedback.</span>
          </motion.h1>

          <div className="space-y-4 mb-12">
            {[
              "Join 5,000+ developers leveling up",
              "Access 500+ real-world scenarios",
              "Get step-by-step career path",
            ].map((text, i) => (
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                key={i}
                className="flex items-center gap-3"
              >
                <div className="w-6 h-6 bg-black rounded-lg flex items-center justify-center shrink-0">
                  <Check size={14} className="text-white stroke-[3]" />
                </div>
                <span className="font-bold text-gray-700">{text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Section - Auth Form */}
      <div className="lg:w-1/3 flex items-center justify-center p-8 bg-[#fafafa]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
