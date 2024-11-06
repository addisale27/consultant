"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import Heading from "../components/Heading";
import Input from "../components/Inputs/Input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { CurrentUser } from "../components/NavgationBar/UserMenu";

interface RegisterFormProps {
  currentUser: CurrentUser | null;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailIsSent, setIsEmailSent] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    setUserEmail(data.email); // Store the email entered by the user for display

    try {
      const response = await axios.post("/api/register", data);
      if (response.status === 200) {
        setIsEmailSent(true);
        toast.success(
          "Account Created! Please check your email to activate your account."
        );
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          const message = error.response.data.error;
          if (message.includes("active")) {
            toast.error(
              "An account with this email already exists and is active."
            );
          } else if (message.includes("inactive")) {
            toast(
              "A new activation email has been sent to your email address."
            );
            setIsEmailSent(true);
          } else {
            toast.error(message || "Invalid request.");
          }
        } else if (error.response?.status === 500) {
          toast.error("Server error. Please try again later.");
        } else {
          console.error("API error:", error.message, error.response?.data);
          toast.error(
            "A network or server error occurred. Please check your connection."
          );
        }
      } else {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser?.active) {
      router.push("/");
      router.refresh();
    }
  }, [currentUser, router]);

  if (currentUser?.active) {
    return <p className="text-center">Logged in. Redirecting...</p>;
  }

  if (emailIsSent) {
    return (
      <p className="text-center text-lg font-semibold text-blue-700">
        We&apos;ve sent an activation link to{" "}
        <span className="font-bold">{userEmail}</span>. Please check your inbox
        and follow the link to activate your account.
      </p>
    );
  }

  return (
    <>
      <Heading title="Sign up" />
      <Button
        outline
        label="Sign up with Google"
        icon={AiOutlineGoogle}
        onClick={() => signIn("google")}
      />
      <hr className="bg-slate-300 w-full h-px" />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
      />
      <Button
        label={isLoading ? "Loading..." : "Sign Up"}
        onClick={handleSubmit(onSubmit)}
        disabled={isLoading}
      />
      <p className="text-sm">
        Already have an account?
        <Link className="underline" href="/login">
          {" "}
          Log in
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
