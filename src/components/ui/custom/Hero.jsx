import HeroSearch from "./HeroSearch";

const Hero = () => {
  return (
    <div className="flex min-h-[80vh] items-center p-8 py-10 flex-col ">
      <div className="flex-1 max-w-[80%]">
        <h2 className="font-primaryBold text-2xl">
          Drive Your Dream Car Today
        </h2>
        <h2 className="font-primaryRegular text-[18px] text-gray-600 py-4">
          Explore our exclusive collection of cars for sale and rent. Whether
          you`re looking to buy or just drive for the day, we have the perfect
          vehicle fo
        </h2>
        <HeroSearch />
      </div>
      <div className="flex-1 max-w-[80%]">
        <img src={"./infocar.png"} width={""} className="" />
      </div>
    </div>
  );
};

export default Hero;
