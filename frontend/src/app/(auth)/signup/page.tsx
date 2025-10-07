import AuthForm from "@/components/AuthForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | Chat App",
  description: "Create your Chat App account and start chatting instantly.",
  keywords: ["signup", "chat app", "create account", "messaging"],
  openGraph: {
    title: "Sign Up | Chat App",
    description: "Join Chat App and connect with your friends in real time.",
    url: "https://yourdomain.com/signup",
    siteName: "Chat App",
    type: "website",
  },
};

export default function SignupPage() {
   
  const fields = [
    { label: "Username", name: "username", type: "text", placeholder: "Enter your username" },
    { label: "Email", name: "email", type: "email", placeholder: "Enter your email" },
    { label: "Password", name: "password", type: "password", placeholder: "Enter your password" },
  ];

  return (
    <AuthForm
      title="Create Account"
      fields={fields}
      buttonText="Sign Up"
      footerText="Already have an account?"
      footerLinkText="Log in"
      footerLinkPath="/login"
    />
  );
}
