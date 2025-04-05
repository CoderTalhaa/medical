export default function About() {
  return (
    <main className=" relative h-full ">
      <div className="fixed inset-0 -z-[1] h-full  bg-gradient-to-r from-[#374151] via-[#f43f5e] to-[#fb923c] "></div>
      <div className="container pt-36">
        <div className=" w-full h-full">
          <img
            src={"/INFOGRAPHICS.jpg"}
            alt="INFOGRAPHIC"
            className="h-full w-full object-cover "
          />
        </div>
      </div>
    </main>
  );
}
