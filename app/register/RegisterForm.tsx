"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import Heading from "../components/Heading";
import Input from "../components/Inputs/Input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

// Define the callback type
const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    setIsLoading(true);
    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Account Created!");
        return signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        });
      })
      .then((callback) => {
        console.log("Sign-in callback:", callback); // Log the callback
        if (callback?.ok) {
          router.push("/");
          router.refresh();
          toast.success("Logged in");
        } else if (callback?.error) {
          toast.error(callback.error);
          console.log("Sign-in error:", callback.error); // Log the error
        }
      })
      .catch((err) => {
        toast.error("Something went wrong!");
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Heading title="Sign up" />
      <Button
        outline
        label="Sign up with Google"
        icon={AiOutlineGoogle}
        onClick={() => {
          signIn("google");
        }}
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
        label={isLoading ? "Loading" : "Sign Up"}
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
