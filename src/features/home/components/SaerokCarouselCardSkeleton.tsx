import { scaledStyle } from "@/utils/scaleStyle";

interface SaerokCarouselCardSkeletonProps {
  scale?: number;
}

const SaerokCarouselCardSkeleton = ({
  scale = 1,
}: SaerokCarouselCardSkeletonProps) => {
  return (
    <div
      className="slide shrink-0 w-343 h-455 flex justify-center items-center bg-background-lightWhitegray border-none rounded-20"
      style={scaledStyle(scale, {
        width: 343,
        height: 455,
        borderRadius: 20,
      })}
    >
      <main
        className="w-323 h-435 border-none bg-white"
        style={scaledStyle(scale, {
          width: 323,
          height: 435,
          borderRadius: 16,
        })}
      >
        {/* 이미지 영역 스켈레톤 */}
        <section
          className="w-full relative overflow-hidden"
          style={scaledStyle(scale, { height: 350, borderRadius: 10 })}
        >
          <div
            className="w-full h-full bg-slate-200 animate-pulse"
            style={scaledStyle(scale, {
              borderRadius: 10,
            })}
          />
          <div className="absolute -bottom-6 left-0 flex items-center">
            <div
              className="bg-background-white h-43 pl-12 pr-4 flex items-center"
              style={scaledStyle(scale, {
                height: 43,
                paddingLeft: 12,
                paddingRight: 16,
              })}
            >
              <div
                className="bg-slate-200 animate-pulse rounded"
                style={scaledStyle(scale, {
                  width: 100,
                  height: 18,
                })}
              />
            </div>
          </div>
        </section>

        {/* 텍스트 영역 스켈레톤 */}
        <section
          className="w-full flex flex-col"
          style={scaledStyle(scale, {
            height: 85,
            paddingTop: 8,
            paddingBottom: 9,
            paddingLeft: 12,
            paddingRight: 9,
            gap: 6,
          })}
        >
          {/* 날짜/닉네임 줄 */}
          <div
            className="w-full flex flex-row justify-between items-center"
            style={scaledStyle(scale, { marginBottom: 2 })}
          >
            <div
              className="bg-slate-200 animate-pulse rounded"
              style={scaledStyle(scale, {
                width: 80,
                height: 14,
              })}
            />
            <div
              className="bg-slate-200 animate-pulse rounded"
              style={scaledStyle(scale, {
                width: 60,
                height: 14,
              })}
            />
          </div>

          {/* locationAlias */}
          <div
            className="bg-slate-200 animate-pulse rounded"
            style={scaledStyle(scale, {
              width: 180,
              height: 14,
            })}
          />

          {/* 해시태그 영역 */}
          <div
            className="flex flex-row gap-2"
            style={scaledStyle(scale, { marginTop: 18 })}
          >
            <div
              className="bg-slate-200 animate-pulse rounded-full"
              style={scaledStyle(scale, {
                width: 90,
                height: 16,
              })}
            />
            <div
              className="bg-slate-200 animate-pulse rounded-full"
              style={scaledStyle(scale, {
                width: 50,
                height: 16,
              })}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default SaerokCarouselCardSkeleton;
