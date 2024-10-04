"use client";

const Location = () => {
  return (
    <div className="w-full  mt-8 md:mt-0">
      {" "}
      {/* Set width to full */}
      <h3 className="text-3xl font-semibold text-gray-700 mb-4">
        Our Location
      </h3>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8365724670785!2d144.9556523156615!3d-37.81720974202126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce760!2sVictoria%20Harbour!5e0!3m2!1sen!2sau!4v1632868717050!5m2!1sen!2sau"
        className="w-full h-64 rounded-lg shadow-lg"
        loading="lazy"
        title="Google Maps Location"
      ></iframe>
    </div>
  );
};

export default Location;
