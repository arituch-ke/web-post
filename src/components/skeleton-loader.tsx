import { Skeleton } from "@nextui-org/react";

type Props = {
  length: number;
};

const SkeletonLoader = ({ length }: Props) => {
  const skeletons = Array.from(Array(length).keys());

  return (
    <>
      {skeletons.map((skeleton) => (
        <div
          key={skeleton}
          className="max-w-[300px] w-full flex items-center gap-3 mb-3"
        >
          <Skeleton className="flex rounded-full w-12 h-12" />
          <div className="w-full flex flex-col gap-2">
            <Skeleton className="h-3 w-3/5 rounded-lg" />
            <Skeleton className="h-3 w-4/5 rounded-lg" />
          </div>
        </div>
      ))}
    </>
  );
};

export default SkeletonLoader;
