import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex justify-center">
      <SignIn
        forceRedirectUrl="/onboarding"
        appearance={{
          elements: {
            formButtonPrimary: 
              "bg-[#3b82f6] hover:bg-blue-600 text-sm normal-case shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-black",
            card: "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-4 border-black rounded-3xl",
            headerTitle: "text-2xl font-black text-gray-900",
            headerSubtitle: "text-gray-600 font-medium",
            socialButtonsBlockButton: "border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
            formFieldInput: "border-2 border-black rounded-xl",
            footerActionLink: "text-blue-600 font-bold",
          },
        }}
      />
    </div>
  );
}
