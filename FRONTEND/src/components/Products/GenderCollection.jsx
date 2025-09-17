import { Link } from "react-router-dom"
import { mens, womens } from "../../assets"

const GenderCollection = () => {
  return (
    <section
      data-scroll
      className="flex flex-col md:flex-row px-6 py-10 md:p-12 gap-10 md:gap-16 justify-center items-center w-full"
    >
      {/* imgs  */}
      <div className="img flex-1 max-w-fit relative">
        <img
          src={mens}
          alt="men"
          className="lg:h-[450px] mx-auto object-cover"
        />
        <div className="absolute inset-0 flex justify-center items-center text-white uppercase">
          <p className="absolute text-5xl font-extrabold inter top-4 right-6">
            men's
          </p>
          <button className="text-white bg-black/80 text-xl px-5 py-2 font-semibold tracking-wider rounded-lg uppercase transition-all duration-150 hover:scale-[102%] active:scale-95">
            <Link to={"collection/all/?gender=men"}>shop now</Link>
          </button>
          <p className="absolute text-4xl font-extrabold inter bottom-4 left-6">
            collection
          </p>
        </div>
      </div>
      <div className="img flex-1 max-w-fit relative">
        <img
          src={womens}
          alt="men"
          className="lg:h-[450px] mx-auto object-cover"
        />
        <div className="absolute inset-0 flex justify-center items-center text-white uppercase">
          <p className="absolute text-5xl font-extrabold inter top-4 left-6">
            women's
          </p>
          <button className="text-white bg-black/80 text-xl px-5 py-2 font-semibold tracking-wider rounded-lg uppercase transition-all duration-300 hover:scale-[102%] active:scale-95">
            <Link to={"/collection/all/?gender=women"}>shop now</Link>
          </button>
          <p className="absolute text-4xl font-extrabold inter bottom-4 right-6">
            collection
          </p>
        </div>
      </div>
    </section>
  );
}

export default GenderCollection