import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BookNexa SignIn Page",
  description: "This is BookNexa Signin Page",
};

export default function SignIn() {
  return <SignInForm />;
}
