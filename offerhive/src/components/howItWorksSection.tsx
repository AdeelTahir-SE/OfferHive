import Image from "next/image";
export default function HowItWorksSection() {
  return (
    <section className="flex flex-col items-center justify-center w-full max-w-screen">
      {/* Decorative Wave SVG */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#efb100"
          fillOpacity="1"
          d="M0,160L12.6,186.7C25.3,213,51,267,76,250.7C101.1,235,126,149,152,112C176.8,75,202,85,227,90.7C252.6,96,278,96,303,80C328.4,64,354,32,379,58.7C404.2,85,429,171,455,218.7C480,267,505,277,531,240C555.8,203,581,117,606,112C631.6,107,657,181,682,202.7C707.4,224,733,192,758,192C783.2,192,808,224,834,224C858.9,224,884,192,909,154.7C934.7,117,960,75,985,69.3C1010.5,64,1036,96,1061,117.3C1086.3,139,1112,149,1137,170.7C1162.1,192,1187,224,1213,218.7C1237.9,213,1263,171,1288,165.3C1313.7,160,1339,192,1364,213.3C1389.5,235,1415,245,1427,250.7L1440,256L1440,0L1427.4,0C1414.7,0,1389,0,1364,0C1338.9,0,1314,0,1288,0C1263.2,0,1238,0,1213,0C1187.4,0,1162,0,1137,0C1111.6,0,1086,0,1061,0C1035.8,0,1011,0,985,0C960,0,935,0,909,0C884.2,0,859,0,834,0C808.4,0,783,0,758,0C732.6,0,707,0,682,0C656.8,0,632,0,606,0C581.1,0,556,0,531,0C505.3,0,480,0,455,0C429.5,0,404,0,379,0C353.7,0,328,0,303,0C277.9,0,253,0,227,0C202.1,0,177,0,152,0C126.3,0,101,0,76,0C50.5,0,25,0,13,0L0,0Z"
        ></path>
      </svg>
      <h1 className="text-4xl text-center font-extrabold">How it Works</h1>
      <h2 className="text-2xl text-center font-bold mt-12">
        Requesting providers about deals and offers
      </h2>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 px-6 py-12 max-w-6xl">
        <div className="max-w-xl text-center md:text-left">
          <p className="text-gray-700">
            Click on an provider to explore their available offers. <br />
            You can search for offerers based on the title of the offer, or
            simply keep scrolling to browse offers that match your needs and
            preferences. Discover deals tailored to your interest with ease.
          </p>
        </div>

        <div className="relative w-64 h-64">
          <Image
            src="/image.png"
            alt="Descriptive alt"
            width={200}
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
              After signing up and signing in, you can chat directly with
              offerers and ask about their deals. <br />
              To start a chat, simply click on the chat button shown on the
              right side of the offerer&apos;s shop page. This allows you to connect
              with them instantly and get more details about any offers that
              interest you.
            
          </p>
        </div>

        <div className="relative w-64 h-64">
          <Image
            src="/chatButton.PNG"
            alt="Descriptive alt"
            width={200}
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
      
    </section>
  );
}
