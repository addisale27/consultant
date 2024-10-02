"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import Heading from "../components/Heading";
import Input from "../components/Inputs/Input";

const LoginForm = () => {
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
  };

  return (
    <>
      <Heading title="Sign In" />
      <Button
        outline
        label="Sign In with Google"
        icon={AiOutlineGoogle}
        onClick={() => {}}
      />
      <hr className="bg-slate-300 w-full h-px" />
      <Input
        id="name"
        label="Name"
        // disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="email"
        label="Email"
        // disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        // disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
      />
      <Button label="Sign in" onClick={handleSubmit(onSubmit)} />
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
