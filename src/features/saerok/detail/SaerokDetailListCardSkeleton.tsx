import { scaledStyle } from "@/utils/scaleStyle";

interface SaerokDetailListCardSkeletonProps {
  scale?: number;
}

const SaerokDetailListCardSkeleton = ({
  scale = 1,
}: SaerokDetailListCardSkeletonProps) => {
  return (
    <div
      className="flex flex-row items-center justify-start bg-background-white animate-pulse"
      style={scaledStyle(scale, {
        width: 409,
        height: 164,
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 7,
        gap: 13,
        borderRadius: 20,
      })}
    >
      {/* 이미지 스켈레톤 */}
      <div
        className="bg-neutral-200 shrink-0"
        style={scaledStyle(scale, {
          width: 150,
          height: 150,
          borderRadius: 15,
        })}
      />

      {/* 텍스트 영역 */}
      <div
        className="flex flex-col h-full justify-between"
        style={scaledStyle(scale, { paddingTop: 8, paddingBottom: 8 })}
      >
        {/* 새 이름 + 한 줄 평 */}
        <div
          className="flex flex-col items-start"
          style={scaledStyle(scale, { gap: 8 })}
        >
          {/* 새 이름 */}
          <div
            className="bg-neutral-200 rounded"
            style={scaledStyle(scale, {
              width: 120,
              height: 20,
            })}
          />

          {/* 한 줄 평 */}
          <div
            className="bg-neutral-200 rounded"
            style={scaledStyle(scale, {
              width: 200,
              height: 16,
            })}
          />
        </div>

        {/* 유저 정보 */}
        <div
          className="flex flex-row justify-start items-center"
          style={scaledStyle(scale, { gap: 7 })}
        >
          {/* 유저 이미지 */}
          <div
            className="bg-neutral-200 rounded-full"
            style={scaledStyle(scale, { width: 25, height: 25 })}
          />

          {/* 유저 닉네임 */}
          <div
            className="bg-neutral-200 rounded"
            style={scaledStyle(scale, { width: 90, height: 15 })}
          />
        </div>
      </div>
    </div>
  );
};

export default SaerokDetailListCardSkeleton;
