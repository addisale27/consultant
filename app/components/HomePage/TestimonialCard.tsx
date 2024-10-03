import React from "react";
import { FaQuoteRight } from "react-icons/fa";
import Avatar from "../Avatar";
interface TestimonialCardProps {
  testimony: testimoniasType;
}
interface testimoniasType {
  id: number;
  name: string;
  testimonial: string;
  date: string;
  avatar: string;
}
const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimony }) => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6">
        <FaQuoteRight className="text-gray-400 text-3xl mb-4" />
        <p className="text-gray-600 italic mb-4 px-3">
          {testimony.testimonial}
        </p>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2">
            <span className="">
              <Avatar src={testimony.avatar} />
            </span>

            <h3 className="text-lg font-semibold text-gray-800">
              {testimony.name}
            </h3>
          </div>

          <p className="text-sm text-gray-500">
            {new Date(testimony.date).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="bg-gray-100 p-4 text-center">
        <p className="text-sm text-gray-500">— Happy Parent</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
