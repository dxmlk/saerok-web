import { useEffect, useMemo, useState } from "react";
import SaerokDetailListCard from "./SaerokDetailListCard";
import { curatedIds } from "@/constants/curatedIds";
import { useCuratedCollections } from "@/hooks/useCuratedSaeroks";
import { scaledStyle } from "@/utils/scaleStyle";
import { useNavigate } from "react-router-dom";
import { ReactComponent as BackIcon } from "@/assets/icons/back.svg";
import { ReactComponent as ForwardIcon } from "@/assets/icons/forward.svg";
import SaerokDetailListSkeleton from "./SaerokDetailListSkeleton";

interface SaerokDetailListProps {
  currentId?: number;
  scale?: number;
}

const PAGE_SIZE = 7;

const SaerokDetailList = ({ currentId, scale = 1 }: SaerokDetailListProps) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const rotatedIds = useMemo(() => {
    const ids = [...curatedIds];
    const idx = ids.indexOf(currentId as number);
    if (idx < 0) return ids;

    const after = ids.slice(idx + 1);
    const before = ids.slice(0, idx);

    return [...after, ...before];
  }, [currentId]);

  const totalPages = Math.ceil(rotatedIds.length / PAGE_SIZE);
  const safePage = Math.min(Math.max(page, 1), totalPages);

  const pageIds = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return rotatedIds.slice(start, start + PAGE_SIZE);
  }, [rotatedIds, safePage]);

  const { data, loading, error } = useCuratedCollections(pageIds);

  if (loading)
    return (
      <SaerokDetailListSkeleton scale={scale} pageSize={7} totalPages={3} />
    );
  if (error) return <></>;
  if (!data || data.length === 0) return <></>;

  return (
    <div className="flex flex-col">
      <div className="flex flex-col " style={scaledStyle(scale, { gap: 10 })}>
        {data.map((item) => (
          <SaerokDetailListCard
            key={item.collectionId}
            item={item}
            scale={scale}
          />
        ))}
      </div>

      {/* 페이지네이션 */}
      <div
        className="flex items-center justify-between"
        style={scaledStyle(scale, { marginTop: 19, height: 49, gap: 60 })}
      >
        <div className="flex flex-row items-center">
          <BackIcon
            style={scaledStyle(scale, { width: 17, height: 17 })}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          />
          <div
            className="flex flex-row "
            style={scaledStyle(scale, {
              gap: 9,
              marginLeft: 34,
              marginRight: 34,
            })}
          >
            {Array.from({ length: totalPages }).map((_, idx) => {
              const pageNum = idx + 1;
              const isActive = page === pageNum;

              return (
                <div
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`flex items-center justify-center rounded-full font-400 cursor-pointer
            ${
              isActive
                ? "bg-mainBlue text-background-white"
                : "bg-background-white text-font-darkGray"
            }
          `}
                  style={scaledStyle(scale, {
                    width: 49,
                    height: 49,
                    fontSize: 20,
                    lineHeight: 19,
                  })}
                >
                  {pageNum}
                </div>
              );
            })}
          </div>
          <ForwardIcon
            style={scaledStyle(scale, { width: 17, height: 17 })}
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          />
        </div>
        <div
          className="flex items-center justify-center text-center font-700 text-mainBlue bg-background-white h-full"
          style={scaledStyle(scale, {
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 9,
            paddingBottom: 9,
            fontSize: 20,
            lineHeight: 19,
            borderRadius: 30.5,
          })}
          onClick={() => navigate("/saerok")}
        >
          <span>목록</span>
        </div>
      </div>
    </div>
  );
};

export default SaerokDetailList;
