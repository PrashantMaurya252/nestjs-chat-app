import AuthForm from "@/components/AuthForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Chat App",
  description: "Log in to your Chat App account to connect with friends instantly.",
  keywords: ["login", "chat app", "messaging", "authentication"],
  openGraph: {
    title: "Login | Chat App",
    description: "Access your Chat App account securely.",
    url: "https://yourdomain.com/login",
    siteName: "Chat App",
    type: "website",
  },
};

export default function LoginPage() {
  const fields = [
    { label: "Email", name: "email", type: "email", placeholder: "Enter your email" },
    { label: "Password", name: "password", type: "password", placeholder: "Enter your password" },
  ];

  return (
    <AuthForm
    type="login"
      title="Welcome Back"
      fields={fields}
      buttonText="Log In"
      footerText="Don't have an account?"
      footerLinkText="Sign up"
      footerLinkPath="/signup"
      apiEndPoints="/auth/login"
    />
  );
}
