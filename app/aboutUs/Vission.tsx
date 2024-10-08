import { HiEye } from "react-icons/hi";

const VisionSection = () => {
  return (
    <div className="flex justify-center items-center  ">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg ">
        <div className="flex items-center gap-2">
          <div className="bg-blue-700 w-[60px] h-[60px] rounded-full flex items-center justify-center mr-4 ">
            <HiEye size={28} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Our Vision</h2>
        </div>
        <p className="mt-6 text-gray-600 leading-relaxed">
          We envision a future where every student has access to the guidance
          they need to succeed in their academic journey, shaping a better world
          through education.
        </p>

        <div className="mt-4 flex justify-end">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default VisionSection;
