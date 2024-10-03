"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import Heading from "../components/Heading";
import Input from "../components/Inputs/Input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn("credentials", { ...data, redirect: false }).then((callback) => {
      setIsLoading(false);
      if (callback?.ok) {
        router.push("/");
        router.refresh();
        toast.success("Logged in");
      } else if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  return (
    <>
      <Heading title="Sign In" />
      <Button
        outline
        disabled={isLoading}
        label="Sign In with Google"
        icon={AiOutlineGoogle}
        onClick={() => {
          setIsLoading(true);
          signIn("google");
        }}
      />
      <hr className="bg-slate-300 w-full h-px" />

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
        label={isLoading ? "Loading" : "Sign in"}
        onClick={handleSubmit(onSubmit)}
        disabled={isLoading}
      />
      <p className="text-sm">
        Don&apos;t have an account?
        <Link className="underline" href="/register">
          {" "}
          Sign up
        </Link>
      </p>
    </>
  );
};

export default LoginForm;