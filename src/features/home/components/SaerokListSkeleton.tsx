import SaerokListCardSkeleton from "./SaerokListCardSkeleton";
import { scaledStyle } from "@/utils/scaleStyle";

interface SaerokListSkeletonProps {
  scale?: number;
  count?: number; // 필요하면 개수 조정
}

const SaerokListSkeleton = ({
  scale = 1,
  count = 17,
}: SaerokListSkeletonProps) => {
  const mid = Math.ceil(count / 2);
  const left = Array.from({ length: mid });
  const right = Array.from({ length: count - mid });

  return (
    <div
      className="flex"
      style={scaledStyle(scale, {
        paddingLeft: 120,
        paddingRight: 120,
        gap: 20,
      })}
    >
      {/* 왼쪽 컬럼 */}
      <div
        className="columns-2 flex-1"
        style={scaledStyle(scale, {
          marginTop: 22,
          columnGap: 20,
        })}
      >
        {left.map((_, idx) => (
          <SaerokListCardSkeleton key={`left-skeleton-${idx}`} scale={scale} />
        ))}
      </div>

      {/* 오른쪽 컬럼 */}
      <div
        className="flex-1"
        style={scaledStyle(scale, {
          marginTop: -260,
        })}
      >
        {/* 오른쪽 첫 개 (단일) */}
        {right.length > 0 && (
          <SaerokListCardSkeleton key="right-top-skeleton" scale={scale} />
        )}

        {/* 나머지 2열 */}
        <div
          className="columns-2"
          style={scaledStyle(scale, {
            columnGap: 20,
          })}
        >
          {right.slice(1).map((_, idx) => (
            <SaerokListCardSkeleton
              key={`right-skeleton-${idx}`}
              scale={scale}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SaerokListSkeleton;
