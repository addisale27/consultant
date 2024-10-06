"use client";

import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Input from "../components/Inputs/Input";
import TextArea from "../components/Inputs/TextArea";
import Button from "../components/Button";
import { FaPlay } from "react-icons/fa";
import DocumentApply from "./DocumentApply";
import toast from "react-hot-toast";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import firebaseApp from "@/libs/firebase";

// Define an interface for the uploaded images
interface UploadedImage {
  image: string;
}

// Function to handle image uploads
export const handleImageUpload = async (
  images: File | File[]
): Promise<UploadedImage[]> => {
  const uploadedImages: UploadedImage[] = []; // Store uploaded image URLs

  // Normalize the input to always be an array
  const imagesArray = Array.isArray(images) ? images : [images];

  for (const item of imagesArray) {
    const fileName = new Date().getTime() + "-" + item.name; // Using item.name directly
    const storage = getStorage(firebaseApp);
    const storageRef = ref(storage, `documents/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, item);

    await new Promise<void>((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          console.error(error);
          reject(error);
          toast.error("Something went wrong please try again later!");
        },
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              uploadedImages.push({ image: downloadURL });
              console.log("File available at", downloadURL);
              resolve();
            })
            .catch((error) => {
              reject(error);
            });
        }
      );
    });
  }

  return uploadedImages; // Return the uploaded images
};

const ApplicationForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFormSubmited, setIsFormSubmited] = useState(false);
  const [passportFile, setPassportFile] = useState<File | null>(null);
  const [idFile, setIdFile] = useState<File | null>(null);
  const [educationFiles, setEducationFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    getValues, // Use getValues to retrieve form values
  } = useForm<FieldValues>({
    defaultValues: {
      fullName: "",
      nationality: "",
      destinationCountry: "",
      field: "",
      email: "",
      message: "",
      passportImage: "",
      birthCerteficateImage: "",
      educationalBackground: [],
    },
  });

  useEffect(() => {
    if (isFormSubmited) {
      reset();
      setIsFormSubmited(false);
    }
  }, [isFormSubmited]);

  const onsubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    toast("Submitting your application. please wait...");
    if (!passportFile || !idFile || educationFiles.length === 0) {
      setIsLoading(false);
      return toast.error("All documents are needed!");
    }

    await handleAllImageUploads();
    setIsLoading(false);
    console.log("Form Data here is the form:", getValues()); // Log the form data after setting image URLs
    //sent the form data to the mongodb
    const formData = getValues();
    toast.success("Application Submitted!");
    console.log(formData);
    ///////////////////////////////////////////////////////////////
    ///////////////////////////////////////////
  };

  const handleAllImageUploads = async () => {
    const uploadedImages: {
      passport: UploadedImage[];
      id: UploadedImage[];
      education: UploadedImage[];
    } = {
      passport: [],
      id: [],
      education: [],
    };

    try {
      // Upload the passport file if it exists
      if (passportFile) {
        uploadedImages.passport = await handleImageUpload(passportFile);
        // Set the uploaded passport image URL in the form state
        setValue("passportImage", uploadedImages.passport[0].image); // Assuming you only upload one passport image
      }

      // Upload the ID file if it exists
      if (idFile) {
        uploadedImages.id = await handleImageUpload(idFile);
        // Set the uploaded ID image URL in the form state
        setValue("birthCerteficateImage", uploadedImages.id[0].image); // Assuming you only upload one ID image
      }

      // Upload the educational background images if they exist
      if (educationFiles.length > 0) {
        uploadedImages.education = await handleImageUpload(educationFiles);
        // Set the uploaded educational background images in the form state
        setValue(
          "educationalBackground",
          uploadedImages.education.map((img) => img.image)
        ); // Assuming multiple educational background images
      }

      // Optionally, show a success message after all uploads are complete
      // toast.success("All images uploaded successfully!");
      console.log("Uploaded images:", uploadedImages);
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Failed to upload some images.");
    }
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
            id="fullName"
            label="Full Name"
            disabled={isLoading}
            register={register}
            errors={errors}
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
            id="field"
            label="Field of study"
            disabled={isLoading}
            register={register}
            errors={errors}
            type="text"
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
        </div>
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          <DocumentApply
            passportFile={passportFile}
            idFile={idFile}
            educationFiles={educationFiles}
            setPassportFile={setPassportFile}
            setEducationFiles={setEducationFiles}
            setIdFile={setIdFile}
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
          disabled={isLoading}
        />
      </div>
    </>
  );
};

export default ApplicationForm;
