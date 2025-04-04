import Image from "next/image";

export default function About() {
  return (
    <div className="mt-32">
      <div className="container">
        <div className="w-full h-full">
          <Image
            src={"/INFOGRAPHICS.jpg"}
            width={1000}
            height={1000}
            alt="logo"
          />
        </div>
      </div>
    </div>
  );
}
