import { Link } from "react-router-dom";
import { hero } from "../../assets"

const Hero = () => {
  return (
    <section
      className="relative h-[400px] md:h-[600px] lg-[750px] w-full"
      data-scroll
    >
      {/* bg hero img  */}
      <img
        src={hero}
        alt="Lumen Wear"
        className="absolute inset-0 object-cover object-top h-[400px] md:h-[600px] lg-[750px] w-full"
      />
      {/* hero container  */}
      <div className="flex flex-col absolute inset-0 justify-center md:pb-14 pb-6 items-center text-white bg-black/40 gap-3">
        <h3 className="uppercase select-none text-sm">men & women</h3>
        <h2 className="lg:text-8xl md:text-7xl sm:text-6xl text-5xl select-none uppercase font-extrabold text-center">
          Love Draped in Royalty
        </h2>
        <Link to="/collection/all" className="capitalize border-b">
          discover the capsule
        </Link>
      </div>
    </section>
  );
}

export default Hero