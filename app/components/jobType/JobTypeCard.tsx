import Image from "next/image";

interface JobTypeCardProps {
  jobName: string;
  imageUrl: string;
}

const JobTypeCard: React.FC<JobTypeCardProps> = ({ jobName, imageUrl }) => {
  return (
    <div className="border rounded-lg shadow-lg overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={`${jobName} image`}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold">{jobName}</h2>
      </div>
    </div>
  );
};

export default JobTypeCard;
