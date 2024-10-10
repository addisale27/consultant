"use client";

import Image from "next/image";
import Button from "../Button";
import { useRouter } from "next/navigation";

interface JobTypeCardProps {
  jobName: string;
  imageUrl: string;
}

const JobTypeCard: React.FC<JobTypeCardProps> = ({ jobName, imageUrl }) => {
  const router = useRouter();
  return (
    <div className="">
      <div className="border rounded-md hover:scale-105 transition">
        <Image
          src={imageUrl}
          alt={`${jobName} image`}
          width={300}
          height={300}
          className="object-cover relative"
        />

        <div className="p-4 h-1/4 flex flex-col justify-center">
          <h2 className="text-xl font-bold text-gray-800 text-center">
            {jobName}
          </h2>
          <div className="mt-2 flex justify-center">
            <Button
              label="Apply Now"
              onClick={() => {
                router.push("/apply");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobTypeCard;
