import Skeleton from "react-loading-skeleton";

export default function DetailSkeletonPlaceholder() {
  return (
    <div>
      <Skeleton width={200} height={20} />
      <Skeleton width={150} height={20} />
      <Skeleton width={300} height={100} />
    </div>
  );
}
