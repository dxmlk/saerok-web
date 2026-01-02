import { scaledStyle } from "@/utils/scaleStyle";

interface SaerokDetailCardSkeletonProps {
  scale?: number;
}

const SaerokDetailCardSkeleton = ({
  scale = 1,
}: SaerokDetailCardSkeletonProps) => {
  return (
    <div
      className="flex flex-col items-center justify-start h-full animate-pulse"
      style={scaledStyle(scale, { width: 703 })}
    >
      {/* 이미지 스켈레톤 */}
      <div
        className="w-full bg-neutral-200"
        style={scaledStyle(scale, { height: 505, borderRadius: 35 })}
      />

      <div
        className="flex flex-col bg-transparent w-full"
        style={scaledStyle(scale, {
          marginTop: -29,
          paddingLeft: 20,
          paddingRight: 20,
        })}
      >
        {/* 새 이름 + 닉네임 배지 영역 */}
        <div className="flex flex-row justify-between items-center w-full z-10">
          {/* 새 이름 박스 */}
          <div
            className="bg-background-white"
            style={scaledStyle(scale, {
              paddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 20,
              paddingRight: 20,
              borderRadius: 20,
              boxShadow: "0 0 10px 0 rgba(0,0,0,0.15)",
            })}
          >
            <div
              className="bg-neutral-200 rounded"
              style={scaledStyle(scale, {
                width: 200,
                height: 40,
              })}
            />
          </div>

          {/* NicknameBadge 자리 */}
          <div
            className="bg-background-white"
            style={scaledStyle(scale, {
              width: 150,
              height: 46,
              borderRadius: 9999,
              boxShadow: "0 0 10px 0 rgba(0,0,0,0.15)",
            })}
          />
        </div>

        {/* 한 줄 평 + 업로드 시간 */}
        <div
          className="bg-background-white flex flex-col z-0"
          style={scaledStyle(scale, {
            paddingTop: 45,
            paddingBottom: 31,
            paddingLeft: 27,
            paddingRight: 17,
            marginTop: -16,
            gap: 16,
            borderRadius: "0 8px 20px 20px",
          })}
        >
          {/* note 텍스트 (2~3줄 느낌) */}
          <div
            className="flex flex-col"
            style={scaledStyle(scale, { gap: 10 })}
          >
            <div
              className="bg-neutral-200 rounded"
              style={scaledStyle(scale, { width: "95%", height: 18 })}
            />
            <div
              className="bg-neutral-200 rounded"
              style={scaledStyle(scale, { width: "85%", height: 18 })}
            />
          </div>

          {/* 업로드 날짜 */}
          <div
            className="bg-neutral-200 rounded"
            style={scaledStyle(scale, { width: 180, height: 14 })}
          />
        </div>

        {/* 정보 블록 */}
        <div
          className="bg-background-white flex flex-col z-0"
          style={scaledStyle(scale, {
            paddingTop: 26,
            paddingBottom: 27,
            paddingLeft: 23,
            paddingRight: 20,
            marginTop: 14,
            gap: 24,
            borderRadius: 20,
          })}
        >
          {/* 위치 정보 */}
          <div
            className="flex flex-row items-start justify-start"
            style={scaledStyle(scale, { gap: 15 })}
          >
            {/* 아이콘 */}
            <div
              className="bg-neutral-200 rounded"
              style={scaledStyle(scale, { width: 24, height: 24 })}
            />

            {/* 텍스트 */}
            <div
              className="flex flex-col"
              style={scaledStyle(scale, { gap: 6 })}
            >
              <div
                className="bg-neutral-200 rounded"
                style={scaledStyle(scale, { width: 220, height: 18 })}
              />
              <div
                className="bg-neutral-200 rounded"
                style={scaledStyle(scale, { width: 300, height: 16 })}
              />
            </div>
          </div>

          {/* 관찰 날짜 */}
          <div
            className="flex flex-row items-start justify-start"
            style={scaledStyle(scale, { gap: 15 })}
          >
            {/* 아이콘 */}
            <div
              className="bg-neutral-200 rounded"
              style={scaledStyle(scale, { width: 24, height: 24 })}
            />

            {/* 날짜 텍스트 */}
            <div
              className="bg-neutral-200 rounded"
              style={scaledStyle(scale, { width: 200, height: 18 })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaerokDetailCardSkeleton;
