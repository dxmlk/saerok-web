import { scaledStyle } from "@/utils/scaleStyle";
import type { CollectionItem } from "../CollectionType";
import NicknameBadge from "../NicknameBadge";
import { ReactComponent as LocationIcon } from "@/assets/icons/location.svg";
import { ReactComponent as TimeIcon } from "@/assets/icons/time.svg";
import { useEffect, useState } from "react";

interface SaerokDetailCardProps {
  item: CollectionItem;
  scale?: number;
}

const formatKoreanDateFromISODate = (iso: string) => {
  const [datePart] = iso.split("T");
  const [y, m, d] = datePart.split("-");

  return `${y}년 ${Number(m)}월 ${Number(d)}일`;
};

const SaerokDetailCard = ({ item, scale = 1 }: SaerokDetailCardProps) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    setImgLoaded(false);
  }, [item.imageUrl]);

  return (
    <div
      className="flex flex-col items-center justify-start h-full"
      style={scaledStyle(scale, { width: 703 })}
    >
      {/* 이미지 */}
      <img
        src={item.imageUrl}
        className="flex items-center justify-center object-cover overflow-hidden w-full"
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
        {/* 새 이름, 유저명 */}
        <div className="flex flex-row justify-between items-center w-full z-10">
          <div
            className="bg-background-white text-center font-moneygraphy font-400 text-font-black"
            style={scaledStyle(scale, {
              paddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 20,
              paddingRight: 20,
              fontSize: 35,
              lineHeight: 60,
              borderRadius: 20,
              boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.15)",
            })}
          >
            {item.bird.koreanName}
          </div>
          <NicknameBadge user={item.user} scale={scale} isDetailCard={true} />
        </div>
        {/* 한 줄 평, 시간 */}
        <div
          className=" bg-background-white flex flex-col z-0"
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
          <div
            className="font-haru font-400 text-font-black w-full break-words whitespace-normal"
            style={scaledStyle(scale, {
              fontSize: 20,
              lineHeight: 22,
            })}
          >
            {item.note}
          </div>
          <div
            className="font-pretendard font-400 text-font-darkGray"
            style={scaledStyle(scale, {
              fontSize: 15,
              lineHeight: 16,
            })}
          >
            {formatKoreanDateFromISODate(item.createdAt)}에 업로드
          </div>
        </div>
        {/* 정보 */}
        <div
          className=" bg-background-white flex flex-col z-0"
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
          <div
            className="flex flex-row items-start justify-start"
            style={scaledStyle(scale, { gap: 15 })}
          >
            <LocationIcon
              style={scaledStyle(scale, {
                width: 24,
                height: 24,
              })}
            />
            <div
              className="font-400  flex flex-col"
              style={scaledStyle(scale, { lineHeight: 24, gap: 6 })}
            >
              <div
                className="text-font-black"
                style={scaledStyle(scale, { fontSize: 21 })}
              >
                {item.locationAlias}
              </div>
              <div
                className="text-font-darkGray"
                style={scaledStyle(scale, { fontSize: 17 })}
              >
                {item.address}
              </div>
            </div>
          </div>
          <div
            className="flex flex-row items-start justify-start"
            style={scaledStyle(scale, { gap: 15 })}
          >
            <TimeIcon
              style={scaledStyle(scale, {
                width: 24,
                height: 24,
              })}
            />
            <div
              className="font-400 text-font-black"
              style={scaledStyle(scale, { fontSize: 21, lineHeight: 24 })}
            >
              {formatKoreanDateFromISODate(item.discoveredDate)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaerokDetailCard;
