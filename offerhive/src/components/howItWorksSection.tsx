import Image from "next/image";

export default function HowItWorksSection() {
  return (
    <section className="flex flex-col items-start justify-center max-w-fit   py-[40px] gap-[30px] px-[40px] md:px-[100px] xl:px-[200px] xxl-[450px]  ">
      <h1 className="heading-1">How it Works</h1>
      <h2 className="heading-2">Requesting providers about deals and offers</h2>
      <div className="flex flex-col items-center justify-center sm:flex-row gap-[30px]">
        <p className="description">
          Click on a provider to explore their available offers. <br />
          You can search for offerers based on the title of the offer, or simply
          keep scrolling to browse offers that match your needs and preferences.
          Discover deals tailored to your interests with ease.
        </p>
        <Image
          src="/image.png"
          alt="Browsing offers"
          className="object-fit xl:min-w-[200px] rounded-lg"
          width={300}
          height={300}
        />
      </div>

      <div className="flex flex-col items-center justify-center sm:flex-row gap-[30px]">
        <p className="description">
          After signing up and signing in, you can chat directly with offerers
          and ask about their deals. <br />
          To start a chat, simply click on the chat button shown on the right
          side of the offerer&apos;s shop page. This allows you to connect with
          them instantly and get more details about any offers that interest
          you.
        </p>
        <div>
          <Image
          src="/chatButton.PNG"
          alt="chat Button"
          className="object-fit xl:min-w-[200px] rounded-lg"
          width={300}
          height={300}
        />
        </div>
      </div>
    </section>
  );
}
