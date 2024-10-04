import { FaEnvelope } from "react-icons/fa";

import ContactForm from "./ContactForm";
import FormWrap from "../components/FormWrap";
import ContactInformation from "./ContactInformation";
import ContactMedia from "./ContactMedia";
import Location from "./Location";

const Contact = () => {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center gap-4">
          <span className="bg-blue-600 w-[40px] h-[40px] md:w-[60px] md:h-[60px] flex justify-center items-center rounded-full shadow-lg transition-transform transform hover:scale-110">
            <FaEnvelope size={24} className="text-white" />
          </span>
          <h1 className="md:text-6xl text-2xl font-bold text-center text-gray-800">
            Contact Us
          </h1>
        </div>
      </div>

      {/* Contact Information and Map */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex flex-col">
          {/* Contact Information */}
          <ContactInformation />
          {/* Contact Media */}
          <ContactMedia />
        </div>

        <div className="">
          <FormWrap>
            <ContactForm />
          </FormWrap>
        </div>
      </div>

      {/* Footer */}
      <Location />
    </div>
  );
};

export default Contact;
