import type { User } from "@/features/saerok/CollectionType";
import { scaledStyle } from "@/utils/scaleStyle";

interface NicknameBadgeProps {
  user: User;
  scale?: number;
  isDetailCard?: boolean;
}

const NicknameBadge = ({
  user,
  scale = 1,
  isDetailCard = false,
}: NicknameBadgeProps) => {
  return (
    <div
      className={`flex flex-row items-center ${
        isDetailCard ? "bg-background-white" : "absolute glassmorphism"
      }`}
      style={scaledStyle(scale, {
        top: 10,
        right: 10,
        borderRadius: 20,
        paddingLeft: 10,
        paddingRight: 12,
        paddingTop: 7,
        paddingBottom: 7,
        gap: 7,
        marginTop: isDetailCard ? -12 : 0,
      })}
    >
      <img
        src={user.thumbnailProfileImageUrl}
        alt="Profile Image"
        className="rounded-full border-1 border-background-lightWhitegray object-cover"
        style={scaledStyle(scale, {
          height: 25,
          width: 25,
        })}
      />
      <span
        className="font-400 text-font-black"
        style={scaledStyle(scale, {
          fontSize: 15,
          lineHeight: 20,
        })}
      >
        {user.nickname}
      </span>
    </div>
  );
};

export default NicknameBadge;
