import { GiHeartBeats } from "react-icons/gi";

const CoreValues = () => {
  return (
    <div className="flex justify-center items-center ">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg">
        <div className="flex items-center gap-2">
          <div className="bg-blue-700 w-[60px] h-[60px] rounded-full flex items-center justify-center mr-4 ">
            <GiHeartBeats size={28} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Core Values</h2>
        </div>

        <ul className="mt-6 list-disc list-inside text-gray-600 leading-relaxed">
          <li>
            <span className="font-semibold text-gray-800">Integrity:</span> We
            believe in honesty and transparency in all our actions.
          </li>
          <li className="mt-2">
            <span className="font-semibold text-gray-800">
              Personalization:
            </span>{" "}
            Every student is unique, and so is our approach to their needs.
          </li>
          <li className="mt-2">
            <span className="font-semibold text-gray-800">Innovation:</span> We
            stay at the cutting edge of educational strategies to serve our
            clients better.
          </li>
          <li className="mt-2">
            <span className="font-semibold text-gray-800">Collaboration:</span>{" "}
            We work closely with students, parents, and educators to create the
            best outcomes.
          </li>
        </ul>

        <div className="mt-4 flex justify-end">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoreValues;
