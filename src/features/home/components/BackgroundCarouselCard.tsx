import { ReactComponent as RectangleEdge } from "@/assets/images/edge.svg";
import type { CollectionItem } from "@/features/saerok/CollectionType";

interface BackgroundCarouselCardProps {
  item: CollectionItem;
}

const BackgroundCarouselCard = ({ item }: BackgroundCarouselCardProps) => {
  return (
    <div
      className="shrink-0 flex justify-center items-center bg-background-lightWhitegray border-none"
      style={{
        width: 204.3,
        height: 271,
        borderRadius: 11.913,
      }}
    >
      <main
        className="border-none bg-white"
        style={{
          width: 192.3,
          height: 259.1,
          borderRadius: 9.531,
        }}
      >
        <section className="w-full relative " style={{ height: 208.5 }}>
          <img
            className="absolute block inset-0 h-auto object-cover"
            style={{
              width: 192.331,
              height: 208.5,
              borderRadius: "9.531px 9.531px 0 0",
            }}
            src={item.imageUrl}
            alt="BirdImage"
            loading="eager"
            decoding="async"
            draggable={false}
          />
          <div className="absolute -bottom-6 left-0 flex -space-x-1 items-center">
            <div
              className="bg-background-white flex items-center"
              style={{
                height: 25.6,
                paddingLeft: 7.15,
                paddingRight: 1.79,
              }}
            >
              <span
                className="font-moneygraphy text-black font-400"
                style={{ fontSize: 13.105 }}
              >
                {item.bird.koreanName}
              </span>
            </div>
            <RectangleEdge style={{ width: 11.913, height: 25.6 }} />
          </div>
        </section>
        <section
          className="w-full flex flex-col font-400 "
          style={{
            height: 56,
            paddingTop: 4.77,
            paddingBottom: 4.89,
            paddingLeft: 7.15,
            paddingRight: 5.27,
            fontSize: 7.744,
          }}
        >
          <div
            className="w-full flex flex-row justify-between "
            style={{ marginBottom: -2 }}
          >
            <span className="text-font-darkGray">{item.discoveredDate}</span>
            <span className="text-font-gray">{item.user.nickname}</span>
          </div>
          <span className="text-font-darkGray ">{item.locationAlias}</span>
          <div className="text-mainBlue space-x-3" style={{ marginTop: 10.25 }}>
            <span>#일상속의탐조일지</span>
            <span className="font-700">#새록</span>
          </div>
        </section>
      </main>
    </div>
  );
};
export default BackgroundCarouselCard;
