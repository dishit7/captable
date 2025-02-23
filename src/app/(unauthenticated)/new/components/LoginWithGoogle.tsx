"use client";

import { Button } from "@/components/ui/button";
import { RiGoogleFill as GoogleIcon } from "@remixicon/react";
import { signIn } from "next-auth/react";

async function signInWithGoogle() {
  try {
    console.log("Attempting Google sign-in...");
    const result = await signIn("google", { callbackUrl: "/onboarding" });

    if (result?.error) {
      console.error("Sign-in error:", result.error);
    } else {
      console.log("Sign-in successful:", result);
    }
  } catch (error) {
    console.error("Unexpected error during sign-in:", error);
  }
}


const LoginWithGoogle = () => {
  return (
    <Button
      type="button"
      size="xl"
      onClick={signInWithGoogle}
      className="rounded-xl"
    >
      <GoogleIcon className="mr-2 h-6 w-6" />
      <span className="text-lg">
        Continue with <span className="font-bold">Google</span>
      </span>
    </Button>
  );
};

export default LoginWithGoogle;
