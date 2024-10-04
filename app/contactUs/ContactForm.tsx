"use client";

import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Heading from "../components/Heading";
import Input from "../components/Inputs/Input";
import TextArea from "../components/Inputs/TextArea";
import Button from "../components/Button";

const ContactForm = () => {
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
    //upload images to fb
    console.log(data);
    setIsLoading(false);
    setIsFormSubmited(true);
    //save products to mongodb
    // axios
    //   .post("/api/product", productData)
    //   .then(() => {
    //     toast.success("Product Created");
    //     setIsProductCreated(true);
    //     router.refresh();
    //   })
    //   .catch((error) => {
    //     toast.error("something went wrong");
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
  };
  return (
    <>
      <Heading title="Get In Touch" center />
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
        type="email"
        required
      />
      <Input
        id="phoneNumber"
        label="Phone Number"
        disabled={isLoading}
        register={register}
        errors={errors}
        type="number"
      />
      <TextArea
        id="message"
        label="Message"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Button
        label={isLoading ? `Loading...` : `Send Message`}
        onClick={handleSubmit(onsubmit)}
      />
    </>
  );
};

export default ContactForm;
