"use client";

import Heading from "@/app/components/Heading";
import Input from "@/app/components/Inputs/Input";
import TextArea from "@/app/components/Inputs/TextArea";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import DropCountryImage from "./DropCountryImage";
import toast from "react-hot-toast";

import { handleImageUpload } from "@/libs/handleImageUpload";
import Button from "@/app/components/Button";

const AddScholarshipForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isScholarshipCreated, setIsScholarshipCreated] = useState(false);
  const [imageUrl, setImageUrl] = useState<File | null>(null);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = useForm<FieldValues>({
    defaultValues: { name: "", title: "", introduction: "", flag_url: "" },
  });

  const handleAllImageUploads = async () => {
    try {
      if (imageUrl) {
        const uploadedImages = await handleImageUpload(imageUrl);
        setValue("flag_url", uploadedImages[0].image); // Assuming single image upload
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Failed to upload the image.");
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    setIsLoading(true);

    if (!imageUrl) {
      setIsLoading(false);
      return toast.error("Image is required!");
    }
    toast("Adding a new Scholarship. Please wait...");

    try {
      await handleAllImageUploads();
      setIsLoading(false);
      console.log("Form Data here is the form:", getValues()); // Log the form data after setting image URLs
      //sent the form data to the mongodb
      const formData = getValues();
      toast.success("Scholarship Successfully Added!");
      console.log(formData);
      setIsScholarshipCreated(true);
    } catch (error) {
      console.error("Submission failed:", error);
      toast.error("Failed to add scholarship.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isScholarshipCreated) {
      reset();
      setImageUrl(null); // Reset uploaded image state
      setIsScholarshipCreated(false);
    }
  }, [isScholarshipCreated, reset]);

  return (
    <div className="flex flex-col gap-4">
      <Heading title="Add Scholarship" center />

      <Input
        id="name"
        label="Nation"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <TextArea
        id="title"
        label="Title"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <TextArea
        id="introduction"
        label="Introduction"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <DropCountryImage imageUrl={imageUrl} setImageUrl={setImageUrl} />

      <Button label="Add Scholarship" onClick={handleSubmit(onSubmit)} />
    </div>
  );
};

export default AddScholarshipForm;
