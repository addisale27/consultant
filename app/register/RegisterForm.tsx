"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import Heading from "../components/Heading";
import Input from "../components/Inputs/Input";

const RegisterForm = () => {
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
      <Heading title="Sign up" />
      <Button
        outline
        label="Sign up with Google"
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
      <Button label="Sign Up" onClick={handleSubmit(onSubmit)} />
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
