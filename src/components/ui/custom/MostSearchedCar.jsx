import FakeData from "@/shared/FakeData";
import CarItem from "./CarItem";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import SkeletonCard from "./CarItemSkelton";

const MostSearchedCar = ({ listing, loading }) => {
  return (
    <div className="mt-6 mb-12">
      <h2 className="text-2xl font-primaryBold text-center mb-10 ">
        Most Searched Cars
      </h2>
      <Carousel>
        <CarouselContent>
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <CarouselItem key={index} className="basis-1/4">
                  <SkeletonCard />
                </CarouselItem>
              ))
            : listing?.map((item, index) => (
                <CarouselItem key={index} className="basis-1/4">
                  <CarItem item={item} index={index} fromHome={true} />
                </CarouselItem>
              ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default MostSearchedCar;
