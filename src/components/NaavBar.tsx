import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Lock } from "lucide-react";
import { checkUser } from "../../prisma/checkUser";

export default async function Navbar() {
  //await checkUser();
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
          <button
            className="flex items-center gap-1 hover:text-black transition-colors hover:cursor-pointer"
            onClick={() => {
              document
                .getElementById("solutions")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Solutions
          </button>
          <button
            className="hover:text-black transition-colors hover:cursor-pointer"
            onClick={() => {
              document
                .getElementById("who-is-it-for")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Who it's for
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <SignedOut>
          <div className="flex items-center gap-2 text-gray-600 font-medium hover:text-black transition-colors hover:cursor-pointer">
            <Lock size={18} />
            <SignInButton />
          </div>
          <div className="bg-[#3b82f6] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20 hover:cursor-pointer">
            <SignUpButton />
          </div>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
