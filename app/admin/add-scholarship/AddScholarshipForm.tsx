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
import axios from "axios";
import { useRouter } from "next/navigation";

const AddScholarshipForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<File | null>(null);
  const router = useRouter();

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

  // Handle image uploads
  const handleAllImageUploads = async () => {
    if (imageUrl) {
      try {
        const uploadedImages = await handleImageUpload(imageUrl);
        setValue("flag_url", uploadedImages[0].image); // Store image URL in form state
      } catch (error) {
        console.error("Image upload failed:", error);
        toast.error("Failed to upload the image.");
        throw error; // Re-throw error to prevent further processing
      }
    }
  };

  // Handle form submission
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    setIsLoading(true);

    if (!imageUrl) {
      toast.error("Image is required!");
      setIsLoading(false);
      return;
    }

    try {
      toast("Uploading image and adding scholarship...");
      await handleAllImageUploads();

      const formData = getValues();
      await axios.post("/api/scholarship", formData);

      toast.success("Scholarship successfully added!");
      router.refresh(); // Refresh page after submission
      resetForm(); // Reset form on success
    } catch (error) {
      console.error("Failed to submit scholarship:", error);
      toast.error("Failed to add scholarship.");
    } finally {
      setIsLoading(false);
    }
  };

  // Reset form state
  const resetForm = () => {
    reset();
    setImageUrl(null);
  };

  // Reset form and image state on successful submission
  useEffect(() => {
    resetForm();
  }, [reset]);

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

      <Button
        label={isLoading ? "Adding..." : "Add Scholarship"}
        onClick={handleSubmit(onSubmit)}
        disabled={isLoading}
      />
    </div>
  );
};

export default AddScholarshipForm;
