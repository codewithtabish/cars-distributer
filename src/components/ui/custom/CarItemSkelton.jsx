import { Skeleton } from "@/components/ui/skeleton";

function SkeletonCard() {
  return (
    <div className="cursor-pointer border bg-white rounded-xl pb-1 relative">
      {/* Placeholder for the image */}
      <Skeleton className="h-[200px] w-full rounded-md" />

      {/* Placeholder for the title */}
      <div className="flex flex-col space-y-2 mt-2 ml-2">
        <Skeleton className="h-5 w-[200px]" />
      </div>

      {/* Placeholder for details */}
      <div className="flex gap-3 items-center justify-between max-w-[80%] mx-auto my-2">
        <div className="flex justify-center items-center flex-col gap-2">
          <Skeleton className="w-5 h-5 bg-gray-200 rounded-full" />
          <Skeleton className="h-4 w-[60px]" />
        </div>
        <div className="flex justify-center items-center flex-col gap-2">
          <Skeleton className="w-5 h-5 bg-gray-200 rounded-full" />
          <Skeleton className="h-4 w-[60px]" />
        </div>
        <div className="flex justify-center items-center flex-col gap-2">
          <Skeleton className="w-5 h-5 bg-gray-200 rounded-full" />
          <Skeleton className="h-4 w-[60px]" />
        </div>
      </div>

      {/* Placeholder for the price */}
      <div className="flex justify-between items-center max-w-[80%] mx-auto mb-2">
        <Skeleton className="h-5 w-[100px]" />
        <Skeleton className="h-4 w-[80px]" />
      </div>

      {/* Placeholder for buttons */}
      <div className="flex justify-between items-center mt-4 px-2">
        <Skeleton className="h-10 w-full rounded-md bg-gray-200" />
        <Skeleton className="h-10 w-[100px] rounded-md bg-gray-200" />
      </div>
    </div>
  );
}

export default SkeletonCard;
