import { useState } from "react";
import { faqs } from "@/utils/faqs";
import {
  FaChevronDown,
  FaChevronRight,
  FaQuestionCircle,
} from "react-icons/fa";

const FAQS = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="flex flex-col gap-8 p-6 bg-gray-100 rounded-lg shadow-md max-w-3xl mx-auto">
      <div className="flex gap-2 items-center">
        <span className=" w-[50px] h-[50px] rounded-full bg-blue-700 flex justify-center items-center p-3">
          <span className="text-white">
            <FaQuestionCircle size={36} />
          </span>
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          Frequently Asked Questions
        </h2>
      </div>
      <div className="space-y-4">
        {faqs.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={item.question} className="border-b last:border-0">
              <div
                onClick={() => toggleFAQ(index)}
                className={`flex justify-between items-center p-4 cursor-pointer rounded-lg transition-all duration-300 ${
                  isOpen ? "bg-blue-100" : "bg-white hover:bg-gray-50"
                }`}
                aria-expanded={isOpen}
                aria-controls={`faq-${index}`}
              >
                <span className="text-xl">
                  {isOpen ? <FaChevronDown /> : <FaChevronRight />}
                </span>
                <h3
                  className={`flex-1 ml-4 text-left ${
                    isOpen ? "font-semibold" : "font-medium"
                  }`}
                >
                  {item.question}
                </h3>
              </div>
              {isOpen && (
                <div
                  id={`faq-${index}`}
                  className="p-4 transition-max-height duration-300 ease-in-out"
                  style={{
                    maxHeight: isOpen ? "150px" : "0",
                    overflowY: "auto",
                  }}
                >
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQS;
