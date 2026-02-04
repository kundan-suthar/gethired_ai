"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check, ChevronDown, Lock, MousePointer2 } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 p-6 bg-black rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl ">get</span>
          </div>
          <span className="text-2xl font-bold tracking-tight">hired</span>
        </div>
        
        <div className="hidden md:flex items-center gap-6 text-gray-600 font-medium">
          <button className="flex items-center gap-1 hover:text-black transition-colors">
            Product 
          </button>
          <button className="flex items-center gap-1 hover:text-black transition-colors">
            Solutions 
          </button>
          <button className="hover:text-black transition-colors">Who it's for</button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 text-gray-600 font-medium hover:text-black transition-colors">
          <Lock size={18} />
          Login
        </button>
        <button className="bg-[#3b82f6] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20">
          Sign up For Free
        </button>
      </div>
    </nav>
  );
};

const Badge = () => (
  <motion.div 
    initial={{ rotate: -5, scale: 0.9, opacity: 0 }}
    animate={{ rotate: -2, scale: 1, opacity: 1 }}
    transition={{ delay: 0.2 }}
    className="inline-flex items-center gap-2 bg-[#fef08a] border-2 border-black px-4 py-1.5 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-8"
  >
    <span className="font-bold text-sm">Be professional</span>
    <div className="w-4 h-4 text-black italic">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 17L17 7M17 7H7M17 7V17" />
      </svg>
    </div>
  </motion.div>
);

const CheckItem = ({ text }: { text: string }) => (
  <div className="flex items-center gap-2">
    <div className="w-5 h-5 bg-[#a78bfa] rounded-md flex items-center justify-center">
      <Check size={14} className="text-white stroke-[3]" />
    </div>
    <span className="text-gray-700 font-medium">{text}</span>
  </div>
);

const CourseCard = () => (
  <motion.div 
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.4 }}
    className="bg-white border-2 border-black rounded-3xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] w-80"
  >
    <div className="p-4 flex items-center justify-between border-b-2 border-black/5">
      <span className="font-bold text-gray-800">Today's quiz</span>
      <div className="flex gap-1">
        <div className="w-1.5 h-1.5 bg-black rounded-full" />
        <div className="w-1.5 h-1.5 bg-black rounded-full" />
        <div className="w-1.5 h-1.5 bg-black rounded-full" />
      </div>
    </div>
    <div className="bg-[#10b981] p-6 m-2 rounded-2xl text-white relative overflow-hidden">
      <div className="relative z-10">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center border-4 border-white/30">
            <div className="w-6 h-6 bg-yellow-400 rounded-full" />
          </div>
          <div>
            <h3 className="font-bold text-lg leading-tight text-gray-900">confirm output</h3>
            <h3 className="font-bold text-lg leading-tight">
              <code>
                console.log(a);<br /> 
                var a = 10;
              </code>
            </h3>
            <div className="flex items-center gap-3 text-xs mt-1 text-white/80">
              <span className="flex items-center gap-1"> a = 10</span>
              <span className="flex items-center gap-1"> a = undefined </span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end mt-6">
          <button className="bg-white text-black px-4 py-1.5 rounded-full text-xs font-bold hover:scale-105 transition-transform">
            Continue
          </button>
        </div>
      </div>
    </div>
  </motion.div>
);

const PerformanceCard = () => (
  <motion.div 
    initial={{ x: -20, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ delay: 0.5 }}
    className="bg-white border-2 border-black rounded-3xl p-5 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] w-64 absolute -bottom-12 -left-60"
  >
    <h3 className="font-bold mb-4">Performance</h3>
    <div className="h-24 relative">
      <svg className="w-full h-full" viewBox="0 0 100 40">
        <path d="M0 35 Q10 10 20 25 T40 15 T60 30 T80 5 T100 20" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
        <path d="M0 30 Q10 25 20 35 T40 30 T60 20 T80 35 T100 30" fill="none" stroke="#facc15" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
    <div className="flex justify-between text-[8px] text-gray-400 mt-2 font-bold uppercase tracking-widest">
      <span>Nov</span><span>Dec</span><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span>
    </div>
  </motion.div>
);

const ScheduledCard = () => (
  <motion.div 
    initial={{ x: 20, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ delay: 0.6 }}
    className="bg-white border-2 border-black rounded-3xl p-5 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] w-72 absolute -bottom-16 -right-12"
  >
    <h3 className="font-bold mb-4">Scheduled</h3>
    <div className="space-y-3">
      <div className="bg-[#a78bfa] p-3 rounded-xl flex items-center justify-between border border-black/10">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
            <Check size={10} className="text-white" />
          </div>
          <span className="text-white font-bold text-xs">UI Design</span>
        </div>
        <span className="text-[8px] text-white/70">May 2, 2022 8 AM</span>
      </div>
      <div className="bg-[#facc15] p-3 rounded-xl flex items-center justify-between border border-black/10">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
            <Check size={10} className="text-white" />
          </div>
          <span className="text-black font-bold text-xs">Illustration</span>
        </div>
        <span className="text-[8px] text-black/50">May 2, 2022 8 AM</span>
      </div>
    </div>
  </motion.div>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fafafa] font-[family-name:var(--font-geist-sans)] selection:bg-blue-100 relative overflow-hidden">
      {/* Decorative background lines */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 1200 800">
        <path d="M-100 150 C 200 50, 400 300, 600 150 S 1000 200, 1300 100" fill="none" stroke="black" strokeWidth="2" strokeDasharray="10 10" />
        <path d="M-50 600 C 150 700, 400 500, 700 650 S 1100 550, 1250 750" fill="none" stroke="black" strokeWidth="1" />
      </svg>

      <Navbar />

      <main className="max-w-7xl mx-auto px-8 pt-12 pb-24 grid lg:grid-cols-2 gap-20 items-center">
        {/* Left Content */}
        <div className="z-10">
          <Badge />
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-7xl font-bold tracking-tight text-gray-900 leading-[1.1] mb-12"
          >
            Your learning <br />
            <span className="text-gray-800">wonderfully <br />connected</span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-8 mb-12"
          >
            <CheckItem text="Save time" />
            <CheckItem text="Simplify workflows" />
            <CheckItem text="Expand reach" />
          </motion.div>
        </div>

        {/* Right Content - Visual Elements */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="relative">
            {/* Background decorative blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-50/50 rounded-full blur-3xl -z-10" />
            
            <CourseCard />
            <PerformanceCard />
            {/* <ScheduledCard /> */}
            
            {/* Floating Cursor Interaction */}
            <motion.div
              animate={{
                x: [100, 150, 80, 100],
                y: [20, -10, 30, 20],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-40 right-10 z-20"
            >
              <MousePointer2 size={32} fill="white" className="text-black drop-shadow-lg" />
              <div className="bg-black text-white px-2 py-1 rounded-md text-[10px] font-bold mt-2 shadow-xl whitespace-nowrap">
                Better collaboration
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Footer / Bottom Links (Optional) */}
      <footer className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 text-sm font-medium">
      © 2026 Get Hired AI.
      </footer>
    </div>
  );
}
