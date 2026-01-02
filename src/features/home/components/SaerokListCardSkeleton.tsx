import { scaledStyle } from "@/utils/scaleStyle";

interface SaerokListCardSkeletonProps {
  scale?: number;
}

const SaerokListCardSkeleton = ({ scale = 1 }: SaerokListCardSkeletonProps) => {
  return (
    <div
      className="relative w-full h-auto overflow-visible break-inside-avoid z-10"
      style={scaledStyle(scale, {
        borderRadius: 20,
        marginBottom: 20,
      })}
    >
      {/* 이미지 비율 맞추기용 래퍼 */}
      <div className="w-full relative">
        {/* 비율 유지용 가짜 박스 (대략 3:2 정도) */}
        <div
          className="w-full bg-slate-200/80 animate-pulse"
          style={scaledStyle(scale, {
            borderRadius: 20,
            height: 230, // 실제 카드 이미지 높이에 맞게 조정
          })}
        />

        {/* 오버레이 정보 영역 (닉네임/장소/날짜 자리) */}
        <div
          className="absolute inset-0 flex flex-col justify-end"
          style={scaledStyle(scale, {
            paddingLeft: 17,
            paddingRight: 17,
            paddingBottom: 22,
            gap: 8,
          })}
        >
          <div className="flex flex-row items-center gap-2" aria-hidden>
            <div
              className="rounded-full bg-slate-300/90 animate-pulse"
              style={scaledStyle(scale, {
                width: 64,
                height: 24,
              })}
            />
          </div>

          <div className="flex flex-col gap-2" aria-hidden>
            <div className="flex flex-row items-start gap-2">
              <div
                className="rounded-md bg-slate-300/90 animate-pulse"
                style={scaledStyle(scale, {
                  width: 20,
                  height: 20,
                })}
              />
              <div className="flex-1 flex flex-col gap-2">
                <div
                  className="rounded bg-slate-300/90 animate-pulse"
                  style={scaledStyle(scale, {
                    height: 16,
                  })}
                />
                <div
                  className="rounded bg-slate-200/90 animate-pulse"
                  style={scaledStyle(scale, {
                    height: 14,
                  })}
                />
              </div>
            </div>

            <div className="flex flex-row items-start gap-2">
              <div
                className="rounded-md bg-slate-300/90 animate-pulse"
                style={scaledStyle(scale, {
                  width: 20,
                  height: 20,
                })}
              />
              <div className="flex-1 flex flex-col">
                <div
                  className="rounded bg-slate-300/90 animate-pulse"
                  style={scaledStyle(scale, {
                    height: 14,
                    width: 120,
                  })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaerokListCardSkeleton;
