import { Skeleton, Card } from "@nextui-org/react";

type Props = {
  length: number;
};

const SkeletonLoader = ({ length }: Props) => {
  const skeletons = Array.from(Array(length).keys());

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {skeletons.map((skeleton) => (
        <div
          key={skeleton}
          className="max-w-[1000px] w-full flex items-center gap-3 mb-3"
        >
          <Card
            className="border-1 w-[1000px] space-y-5 p-4"
            shadow="none"
            radius="sm"
          >
            <Skeleton className="rounded-lg">
              <div className="h-24 rounded-lg bg-default-300"></div>
            </Skeleton>
            <div className="space-y-3">
              <Skeleton className="w-3/5 rounded-lg">
                <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
              </Skeleton>
              <Skeleton className="w-4/5 rounded-lg">
                <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
              </Skeleton>
              <Skeleton className="w-2/5 rounded-lg">
                <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
              </Skeleton>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
