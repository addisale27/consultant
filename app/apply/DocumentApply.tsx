"use client";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const DocumentApply = () => {
  const [passportFile, setPassportFile] = useState<File | null>(null);
  const [idFile, setIdFile] = useState<File | null>(null);
  const [educationFiles, setEducationFiles] = useState<File[]>([]);
  const [showPassportImage, setShowPassportImage] = useState(false); // To toggle passport preview
  const [showIDImage, setShowIDImage] = useState(false); // To toggle ID preview
  const [showEducationImages, setShowEducationImages] = useState(false); // To toggle education images

  // Cleanup URLs for previews
  useEffect(() => {
    return () => {
      if (passportFile) URL.revokeObjectURL(URL.createObjectURL(passportFile));
      if (idFile) URL.revokeObjectURL(URL.createObjectURL(idFile));
      educationFiles.forEach((file) =>
        URL.revokeObjectURL(URL.createObjectURL(file))
      );
    };
  }, [passportFile, idFile, educationFiles]);

  // Handler for Passport Photo upload
  const onDropPassport = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setPassportFile(acceptedFiles[0]); // Only handle one file
      setShowPassportImage(false); // Initially show the "Preview" text
    }
  }, []);

  // Handler for Proof of ID Photo upload
  const onDropID = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setIdFile(acceptedFiles[0]); // Only handle one file
      setShowIDImage(false); // Initially show the "Preview" text
    }
  }, []);

  // Handler for Educational Background upload (multiple files)
  const onDropEducation = useCallback((acceptedFiles: File[]) => {
    setEducationFiles((prevFiles) => [...prevFiles, ...acceptedFiles]); // Append new files
    setShowEducationImages(false); // Initially show the "Preview" text
  }, []);

  // Dropzone for Passport Photo
  const {
    getRootProps: getRootPropsPassport,
    getInputProps: getInputPropsPassport,
    isDragActive: isDragActivePassport,
  } = useDropzone({
    onDrop: onDropPassport,
    accept: { "image/*": [] }, // Accept all image types
    // Only allow one file
  });

  // Dropzone for Proof of ID Photo
  const {
    getRootProps: getRootPropsID,
    getInputProps: getInputPropsID,
    isDragActive: isDragActiveID,
  } = useDropzone({
    onDrop: onDropID,
    accept: { "image/*": [] }, // Accept all image types
    // Only allow one file
  });

  // Dropzone for Educational Background (multiple files)
  const {
    getRootProps: getRootPropsEducation,
    getInputProps: getInputPropsEducation,
    isDragActive: isDragActiveEducation,
  } = useDropzone({
    onDrop: onDropEducation,
    accept: { "image/*": [] }, // Accept all image types
    // Allow multiple files
  });

  // Helper function to render image previews
  const renderImagePreview = (file: File | null, isVisible: boolean) => {
    if (!file || !isVisible) return null;
    const previewUrl = URL.createObjectURL(file);
    return (
      <Image
        src={previewUrl}
        alt="preview"
        className="w-full h-full object-cover"
        width={100}
        height={100}
      />
    );
  };

  const renderMultipleImagePreviews = (files: File[], isVisible: boolean) => {
    if (!isVisible) return null;
    return files.map((file, index) => {
      const previewUrl = URL.createObjectURL(file);
      return (
        <Image
          key={index}
          src={previewUrl}
          alt={`education-file-${index}`}
          className="w-24 h-24 object-cover rounded-lg mr-2"
          width={100}
          height={100}
        />
      );
    });
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Passport Photo Dropzone */}
      <div
        {...getRootPropsPassport()}
        className={`border-2 p-2 border-dashed cursor-pointer rounded-lg text-sm font-normal text-slate-400 flex items-center justify-center ${
          isDragActivePassport ? "border-blue-500" : "border-slate-400"
        }`}
        style={{
          height: passportFile
            ? showPassportImage
              ? "300px"
              : "100px"
            : "100px",
          width: "full",
          position: "relative",
          overflow: "hidden",
        }}
        onClick={() => setShowPassportImage(!showPassportImage)}
      >
        <input {...getInputPropsPassport()} className="hidden" />
        {passportFile ? (
          showPassportImage ? (
            <div className="w-full h-full">
              {renderImagePreview(passportFile, showPassportImage)}
            </div>
          ) : (
            <p>Click to Preview Passport Photo</p>
          )
        ) : (
          <p>+ Passport Photo</p>
        )}
      </div>

      {/* Proof of ID Photo Dropzone */}
      <div
        {...getRootPropsID()}
        className={`border-2 p-2 border-dashed cursor-pointer rounded-lg text-sm font-normal text-slate-400 flex items-center justify-center ${
          isDragActiveID ? "border-blue-500" : "border-slate-400"
        }`}
        style={{
          height: idFile ? (showIDImage ? "300px" : "100px") : "100px",
          width: "full",
          position: "relative",
          overflow: "hidden",
        }}
        onClick={() => setShowIDImage(!showIDImage)}
      >
        <input {...getInputPropsID()} className="hidden" />
        {idFile ? (
          showIDImage ? (
            <div className="w-full h-full">
              {renderImagePreview(idFile, showIDImage)}
            </div>
          ) : (
            <p>Click to Preview ID Photo</p>
          )
        ) : (
          <p>+ Proof of ID Photo</p>
        )}
      </div>

      {/* Educational Background Dropzone (multiple files) */}
      <div
        {...getRootPropsEducation()}
        className={`border-2 p-2 border-dashed cursor-pointer rounded-lg text-sm font-normal text-slate-400 flex items-center justify-center ${
          isDragActiveEducation ? "border-blue-500" : "border-slate-400"
        }`}
        style={{
          minHeight:
            educationFiles.length > 0
              ? showEducationImages
                ? "300px"
                : "100px"
              : "100px",
          width: "full",
          position: "relative",
          overflow: "hidden",
        }}
        onClick={() => setShowEducationImages(!showEducationImages)}
      >
        <input {...getInputPropsEducation()} className="hidden" />
        {educationFiles.length > 0 ? (
          showEducationImages ? (
            <div className="w-full flex flex-wrap">
              {renderMultipleImagePreviews(educationFiles, showEducationImages)}
            </div>
          ) : (
            <p>Click to Preview Educational Images</p>
          )
        ) : (
          <p>+ Educational Background Images</p>
        )}
      </div>

      {/* Display the uploaded file details */}
      {/* <div className="mt-4 space-y-2">
        {passportFile && <p>Uploaded Passport Photo: {passportFile.name}</p>}
        {idFile && <p>Uploaded Proof of ID Photo: {idFile.name}</p>}
        {educationFiles.length > 0 && (
          <div>
            <p>Uploaded Educational Background Images:</p>
            <ul>
              {educationFiles.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default DocumentApply;
