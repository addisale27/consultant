"use client";
import { useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/Inputs/Input";
import Button from "@/app/components/Button";

const PasswordReset = ({ params }: { params: { token: string } }) => {
  const { token } = params;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (data: FieldValues) => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    // Check if passwords match
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/verifyResetToken", {
        token,
        password: data.password,
      });

      if (response.status === 200) {
        setSuccessMessage(
          "Your password has been reset successfully. Redirecting to login..."
        );
        setTimeout(() => router.push("/login"), 3000); // Redirect after success
      } else {
        setError("Failed to reset password. Please try again.");
      }
    } catch (err) {
      setError("Failed to reset password. Please try again later.");
      console.error("Password reset error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <Heading title="Reset Your Password" />
        {successMessage ? (
          <p className="text-center text-green-600 font-semibold">
            {successMessage}
          </p>
        ) : (
          <div className="space-y-4">
            <Input
              id="password"
              label="Password"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              type="password"
            />
            <Input
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              disabled={isLoading}
              register={register}
              errors={errors}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button
              label={isLoading ? "Resetting..." : "Reset Password"}
              disabled={isLoading}
              onClick={handleSubmit(onSubmit)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordReset;
