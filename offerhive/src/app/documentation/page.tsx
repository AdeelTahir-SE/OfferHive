import Image from "next/image";
import HowItWorksSection from "@/components/howItWorksSection";
export default function Documentation() {
  return (
    <section className="flex flex-col items-center justify-center">
      <HowItWorksSection />
      <h2 className="text-2xl text-center font-bold mt-12">Creating offer</h2>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 px-6 py-12 max-w-6xl">
        <div className="max-w-xl text-center md:text-left">
          <p className="text-gray-700">
            Click on an offerer to explore their available offers. <br />
            You can search for offerers based on the title of the offer, or
            simply keep scrolling to browse offers that match your needs and
            preferences. Discover deals tailored to your interest with ease.
          </p>
        </div>

        <div className="relative w-64 h-64">
          <Image
            src="/offers.png"
            alt="Descriptive alt"
            width={1600} // Increased width
            height={600} // Increased height
            objectFit="cover"
            className="absolute top-1/2 left-2/3 z-10 -translate-x-1/2 -translate-y-1/2"
          />

          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full scale-200"
          >
            <path
              fill="#EEEAFF"
              d="M38.7,-58.2C52.2,-59.3,66.5,-53,67.9,-42.1C69.3,-31.1,57.7,-15.6,54.3,-2C50.9,11.7,55.7,23.3,53.5,32.7C51.2,42,41.8,49.1,31.7,52.5C21.6,55.9,10.8,55.7,1.8,52.5C-7.2,49.4,-14.3,43.3,-20,37.3C-25.6,31.4,-29.8,25.5,-32.8,19.3C-35.9,13.1,-37.8,6.5,-39.3,-0.9C-40.9,-8.3,-42.1,-16.7,-39.2,-23.2C-36.4,-29.7,-29.5,-34.5,-22.3,-37.1C-15.1,-39.7,-7.6,-40.1,2.5,-44.5C12.6,-48.9,25.2,-57.2,38.7,-58.2Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 px-6 py-12 max-w-6xl">
        <div className="max-w-xl text-center md:text-left">
          <p className="text-gray-700">
            To create an offer, you first need to create a shop. <br />
            While creating your shop, make sure to add relevant tags related to
            the services you provide, any useful links such as your website, and
            your contact information. <br />
            Once your shop is created, you can head over to the offers section
            to start creating and showcasing your offers.
          </p>
        </div>

        <div className="relative w-64 h-64">
          <Image
            src="/createShop.PNG"
            alt="Descriptive alt"
            width={800}
            height={200}
            className="absolute top-1/2 left-2/3 z-10 border-2 -translate-x-1/2 -translate-y-1/2"
          />

          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full scale-200"
          >
            <path
              fill="#EEEAFF"
              d="M38.7,-58.2C52.2,-59.3,66.5,-53,67.9,-42.1C69.3,-31.1,57.7,-15.6,54.3,-2C50.9,11.7,55.7,23.3,53.5,32.7C51.2,42,41.8,49.1,31.7,52.5C21.6,55.9,10.8,55.7,1.8,52.5C-7.2,49.4,-14.3,43.3,-20,37.3C-25.6,31.4,-29.8,25.5,-32.8,19.3C-35.9,13.1,-37.8,6.5,-39.3,-0.9C-40.9,-8.3,-42.1,-16.7,-39.2,-23.2C-36.4,-29.7,-29.5,-34.5,-22.3,-37.1C-15.1,-39.7,-7.6,-40.1,2.5,-44.5C12.6,-48.9,25.2,-57.2,38.7,-58.2Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 px-6 py-12 max-w-6xl">
        <div className="max-w-xl text-center md:text-left">
          <p className="text-gray-700">
            The dashboard provides insights such as the number of clicks on your
            service card, along with a dedicated section to chat with your
            customers. <br />
            More exciting features will be added in the future to help you grow
            and manage your services more effectively.
          </p>
        </div>

        <div className="relative w-64 h-64">
          <Image
            src="/dashboard.PNG"
            alt="Descriptive alt"
            width={1000}
            height={450}
            className="absolute w-96 h-46 top-1/2 left-2/3 z-10  -translate-x-1/2 -translate-y-1/2"
          />

          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full scale-200"
          >
            <path
              fill="#EEEAFF"
              d="M38.7,-58.2C52.2,-59.3,66.5,-53,67.9,-42.1C69.3,-31.1,57.7,-15.6,54.3,-2C50.9,11.7,55.7,23.3,53.5,32.7C51.2,42,41.8,49.1,31.7,52.5C21.6,55.9,10.8,55.7,1.8,52.5C-7.2,49.4,-14.3,43.3,-20,37.3C-25.6,31.4,-29.8,25.5,-32.8,19.3C-35.9,13.1,-37.8,6.5,-39.3,-0.9C-40.9,-8.3,-42.1,-16.7,-39.2,-23.2C-36.4,-29.7,-29.5,-34.5,-22.3,-37.1C-15.1,-39.7,-7.6,-40.1,2.5,-44.5C12.6,-48.9,25.2,-57.2,38.7,-58.2Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>
       

      </div>
      <p className="text-sm text-gray-500 text-center px-6 pb-8 max-w-4xl">
        OfferHive reserves the right to remove your shop or group, and access your data if necessary for moderation or platform policy enforcement.
      </p>
    </section>
  );
}
