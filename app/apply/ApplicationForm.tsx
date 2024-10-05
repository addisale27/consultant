"use client";

import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Input from "../components/Inputs/Input";
import TextArea from "../components/Inputs/TextArea";
import Button from "../components/Button";
import { FaPlay } from "react-icons/fa";

const ApplicationForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFormSubmited, setIsFormSubmited] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      message: "",
    },
  });

  useEffect(() => {
    if (isFormSubmited) {
      reset();
      setIsFormSubmited(false);
    }
  }, [isFormSubmited]);

  const onsubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    setIsLoading(false);
    setIsFormSubmited(true);
  };

  return (
    <>
      <div className="flex items-center gap-4 p-5 justify-center">
        <span className="bg-blue-600 w-[50px] h-[50px] md:w-[60px] md:h-[60px] flex justify-center items-center rounded-full shadow-lg transition-transform transform hover:scale-110">
          <FaPlay size={24} className="text-white" />
        </span>
        <h1 className="text-3xl md:text-6xl font-bold text-center text-gray-800">
          Apply Now
        </h1>
      </div>
      <p className="p-5 text-sm md:text-base text-gray-700 text-center">
        Welcome to the application process! We’re excited to help you achieve
        your educational goals. Please complete the form below to provide us
        with your personal details and needs. Our team will review your
        application and reach out to discuss the next steps. Thank you for
        choosing [Your Company Name]; we look forward to supporting you on your
        educational journey!
      </p>
      <div className="flex flex-col md:flex-row gap-6 justify-center p-5">
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          <Input
            id="name"
            label="Name"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <Input
            id="age"
            label="Age"
            disabled={isLoading}
            register={register}
            errors={errors}
            type="number"
            required
          />
          <Input
            id="pob"
            label="Place of Birth"
            disabled={isLoading}
            register={register}
            errors={errors}
            type="text"
            required
          />
          <Input
            id="nationality"
            label="Nationality"
            disabled={isLoading}
            register={register}
            errors={errors}
            type="text"
            required
          />
        </div>
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          <Input
            id="phone"
            label="Phone Number"
            disabled={isLoading}
            register={register}
            errors={errors}
            type="tel"
            required
          />
          <Input
            id="destination"
            label="Destination Country"
            disabled={isLoading}
            register={register}
            errors={errors}
            type="text"
            required
          />
          <Input
            id="email"
            label="Email"
            disabled={isLoading}
            register={register}
            errors={errors}
            type="email"
            required
          />
          <TextArea
            id="message"
            label="Message"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
        </div>
      </div>
      <div className="max-w-[300px] mx-auto my-6">
        <Button
          label={isLoading ? `Loading...` : `Submit`}
          onClick={handleSubmit(onsubmit)}
        />
      </div>
    </>
  );
};

export default ApplicationForm;
