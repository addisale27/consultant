"use client";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaTrash } from "react-icons/fa"; // Trash icon from react-icons

interface DropCountryImageProps {
  imageUrl: File | null;
  setImageUrl: (file: File | null) => void;
}

const DropCountryImage: React.FC<DropCountryImageProps> = ({
  imageUrl,
  setImageUrl,
}) => {
  const [showCountryImage, setShowCountryImage] = useState(false);

  // Cleanup URLs for previews on component unmount or file change
  useEffect(() => {
    let previewUrl: string | undefined;
    if (imageUrl) {
      previewUrl = URL.createObjectURL(imageUrl);
    }
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [imageUrl]);

  // Handler for image upload
  const onDropImageUrl = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        setImageUrl(acceptedFiles[0]);
        setShowCountryImage(false); // Initially hide the preview
      }
    },
    [setImageUrl]
  );

  // Dropzone configuration
  const {
    getRootProps: getRootPropsImageUrl,
    getInputProps: getInputPropsImageUrl,
    isDragActive: isDragActiveImageUrl,
    open: openImageUrlDialog, // Manual file dialog open
  } = useDropzone({
    onDrop: onDropImageUrl,
    accept: { "image/*": [] }, // Accept all image types
    multiple: false, // Only one image allowed
  });

  // Handler to delete the uploaded image
  const deleteImageUrl = () => setImageUrl(null);

  // Render image preview with a delete icon
  const renderImagePreview = () => {
    if (!imageUrl || !showCountryImage) return null;
    const previewUrl = URL.createObjectURL(imageUrl);
    return (
      <div className="relative">
        <div
          className="cursor-pointer"
          onClick={(e) => {
            e.stopPropagation(); // Prevent opening file dialog
            setShowCountryImage(false);
          }}
        >
          <Image
            src={previewUrl}
            alt="Country Image Preview"
            className="w-full h-full object-cover"
            width={100}
            height={100}
          />
        </div>
        <FaTrash
          className="absolute top-1 right-1 text-red-500 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation(); // Prevent opening file dialog
            deleteImageUrl();
          }}
        />
      </div>
    );
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Image Upload Dropzone */}
      <div
        {...getRootPropsImageUrl()}
        className={`border-2 p-2 border-dashed cursor-pointer rounded-lg text-sm font-normal text-slate-400 flex items-center justify-center ${
          isDragActiveImageUrl ? "border-blue-500" : "border-slate-400"
        }`}
        style={{
          height: imageUrl ? (showCountryImage ? "300px" : "100px") : "100px",
          width: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <input {...getInputPropsImageUrl()} className="hidden" />
        {imageUrl ? (
          showCountryImage ? (
            renderImagePreview()
          ) : (
            <div className="flex flex-col items-center gap-4">
              <p
                onClick={(e) => {
                  e.stopPropagation(); // Prevent opening file dialog
                  setShowCountryImage(true);
                }}
                className="cursor-pointer"
              >
                Click to Preview Country Image
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent opening file dialog
                  openImageUrlDialog();
                }}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Replace Country Image
              </button>
            </div>
          )
        ) : (
          <p>+ Upload Country Image</p>
        )}
      </div>
    </div>
  );
};

export default DropCountryImage;
