"use client"

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Lock } from "lucide-react";
import Link from "next/link";

export default function Navbar({ isOnboarded = false }: { isOnboarded?: boolean }) {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="flex items-center justify-between px-8 py-4 max-w-7xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center group-hover:rotate-6 transition-transform">
            <span className="text-white font-bold text-lg">get</span>
          </div>
          <span className="text-2xl font-bold tracking-tight bg-linear-to-r from-black to-gray-600 bg-clip-text text-transparent">
            hired
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {!isOnboarded && (
            <div className="flex items-center gap-8 text-gray-600 font-medium">
              <button
                className="hover:text-black transition-colors hover:cursor-pointer relative group"
                onClick={() => {
                  document
                    .getElementById("solutions")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Solutions
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full" />
              </button>
              <button
                className="hover:text-black transition-colors hover:cursor-pointer relative group"
                onClick={() => {
                  document
                    .getElementById("who-is-it-for")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Who it's for
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full" />
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-6">
          <SignedOut>
            <div className="flex items-center gap-2 text-gray-600 font-medium hover:text-black transition-colors hover:cursor-pointer">
              <Lock size={18} />
              <SignInButton />
            </div>
            <div className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20 hover:cursor-pointer active:scale-95">
              <SignUpButton />
            </div>
          </SignedOut>
          <SignedIn>
            <div className="flex items-center gap-6">
             
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10 border-2 border-gray-100 hover:border-blue-500 transition-colors"
                  }
                }}
              />
            </div>
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
