import { scaledStyle } from "@/utils/scaleStyle";
import SaerokDetailListCardSkeleton from "./SaerokDetailListCardSkeleton";

interface SaerokDetailListSkeletonProps {
  scale?: number;
  pageSize?: number; // 기본 7
  totalPages?: number; // 기본 3 (최대 3 가정)
}

const SaerokDetailListSkeleton = ({
  scale = 1,
  pageSize = 7,
  totalPages = 3,
}: SaerokDetailListSkeletonProps) => {
  return (
    <div className="flex flex-col animate-pulse">
      {/* 카드 리스트 스켈레톤 */}
      <div className="flex flex-col" style={scaledStyle(scale, { gap: 10 })}>
        {Array.from({ length: pageSize }).map((_, idx) => (
          <SaerokDetailListCardSkeleton
            key={`detail-list-skel-${idx}`}
            scale={scale}
          />
        ))}
      </div>

      {/* 페이지네이션 스켈레톤 */}
      <div
        className="flex items-center justify-between"
        style={scaledStyle(scale, { marginTop: 19, height: 49, gap: 60 })}
      >
        {/* 왼쪽: 화살표 + 페이지 버튼 */}
        <div className="flex flex-row items-center">
          {/* BackIcon 자리 */}
          <div
            className="bg-neutral-200 rounded"
            style={scaledStyle(scale, { width: 17, height: 17 })}
          />

          {/* 페이지 버튼들 */}
          <div
            className="flex flex-row"
            style={scaledStyle(scale, {
              gap: 9,
              marginLeft: 34,
              marginRight: 34,
            })}
          >
            {Array.from({ length: totalPages }).map((_, idx) => (
              <div
                key={`page-btn-skel-${idx}`}
                className="bg-neutral-200 rounded-full"
                style={scaledStyle(scale, {
                  width: 49,
                  height: 49,
                })}
              />
            ))}
          </div>

          {/* ForwardIcon 자리 */}
          <div
            className="bg-neutral-200 rounded"
            style={scaledStyle(scale, { width: 17, height: 17 })}
          />
        </div>

        {/* 오른쪽: "목록" 버튼 자리 */}
        <div
          className="bg-neutral-200"
          style={scaledStyle(scale, {
            width: 92, // padding 대신 고정 폭으로 자리 유지 (취향에 맞게 조정 가능)
            height: 49,
            borderRadius: 30.5,
          })}
        />
      </div>
    </div>
  );
};

export default SaerokDetailListSkeleton;
