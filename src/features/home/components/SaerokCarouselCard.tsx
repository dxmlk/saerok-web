import { ReactComponent as RectangleEdge } from "@/assets/images/edge.svg";
import { scaledStyle } from "@/utils/scaleStyle";
import type { CollectionItem } from "@/features/saerok/CollectionType";
import { useNavigate } from "react-router-dom";

interface SaerokCarouselCardProps {
  scale?: number;
  item: CollectionItem;
}

const SaerokCarouselCard = ({ scale = 1, item }: SaerokCarouselCardProps) => {
  const navigate = useNavigate();
  return (
    <div
      className="slide cursor-pointer shrink-0 w-343 h-455 flex justify-center items-center bg-background-lightWhitegray border-none rounded-20"
      style={scaledStyle(scale, {
        width: 343,
        height: 455,
        borderRadius: 20,
      })}
      onClick={() => navigate(`/saerok/detail/${item.collectionId}`)}
    >
      <main
        className="w-323 h-435 border-none bg-white"
        style={scaledStyle(scale, {
          width: 323,
          height: 435,
          borderRadius: 16,
        })}
      >
        <section
          className="w-full h-350 relative"
          style={scaledStyle(scale, { height: 350 })}
        >
          <img
            className="absolute inset-0 h-auto object-cover"
            style={scaledStyle(scale, {
              width: 322.8,
              height: 350,
              borderRadius: 10,
            })}
            src={item.imageUrl}
            alt="BirdImage"
          />
          <div className="absolute -bottom-6 left-0 flex -space-x-1 items-center">
            <div className="bg-background-white h-43 pl-12 pr-4 flex items-center">
              <span className="text-headline-2-2 font-moneygraphy text-black font-400">
                {item.bird.koreanName}
              </span>
            </div>
            <RectangleEdge />
          </div>
        </section>
        <section
          className="w-full h-85 pt-8 pb-9 pl-12 pr-9 flex flex-col text-caption-1 font-400 "
          style={scaledStyle(scale, {
            height: 85,
            paddingTop: 8,
            paddingBottom: 9,
            paddingLeft: 12,
            paddingRight: 9,
            fontSize: 13,
            lineHeight: 16,
          })}
        >
          <div
            className="w-full flex flex-row justify-between mb-2"
            style={scaledStyle(scale, { marginBottom: 2 })}
          >
            <span className="text-font-darkGray">{item.discoveredDate}</span>
            <span className="text-font-gray">{item.user.nickname}</span>
          </div>
          <span className="text-font-darkGray ">{item.locationAlias}</span>
          <div
            className="text-mainBlue mt-18 space-x-3"
            style={scaledStyle(scale, { marginTop: 18 })}
          >
            <span>#일상속의탐조일지</span>
            <span className="font-700">#새록</span>
          </div>
        </section>
      </main>
    </div>
  );
};
export default SaerokCarouselCard;
