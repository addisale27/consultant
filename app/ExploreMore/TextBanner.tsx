const TextBanner = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-start gap-10 px-8 py-12 max-w-[1000px] mx-auto">
      <div className="flex flex-col text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-sky-500 text-right md:text-left whitespace-nowrap">
        <div>Personalized Support</div>
        <div>from Experienced</div>
        <div>Advisors</div>
      </div>

      <div className="flex flex-col gap-6 text-lg md:text-lg leading-relaxed text-gray-700">
        <p>
          Whether you&#39; re planning to study abroad or looking for job
          opportunities, our expert advisors are here to guide you every step of
          the way. From selecting the right university or program to navigating
          job applications and visa processes, get personalized support through
          our easy and convenient video counselling sessions.
        </p>
        <div>
          <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105">
            Your Future Starts Here!
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextBanner;
