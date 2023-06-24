import {
  default as ReactSkeleton,
  type SkeletonProps,
  SkeletonTheme,
} from "react-loading-skeleton";
import "./Skeleton.scss";

export const Skeleton = (props: SkeletonProps) => {
  return (
    <SkeletonTheme
      baseColor="var(--skeleton-color)"
      highlightColor="var(--skeleton-highlight)"
    >
      <ReactSkeleton borderRadius={props.borderRadius || 4} {...props} />
    </SkeletonTheme>
  );
};
