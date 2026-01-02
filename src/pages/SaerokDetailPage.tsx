import { curatedIds } from "@/constants/curatedIds";
import { useResponsive } from "@/design/ResponsiveContext";
import SaerokDetailCard from "@/features/saerok/detail/SaerokDetailCard";
import SaerokDetailCardSkeleton from "@/features/saerok/detail/SaerokDetailCardSkeleton";
import SaerokDetailList from "@/features/saerok/detail/SaerokDetailList";
import SaerokDetailListSkeleton from "@/features/saerok/detail/SaerokDetailListSkeleton";
import { useCollectionDetail } from "@/hooks/useCollectionDetail";
import { scaledStyle } from "@/utils/scaleStyle";
import { Navigate, useParams } from "react-router-dom";

const SaerokDetailPage = () => {
  const { layout, scale } = useResponsive();

  const { id } = useParams<{ id: string }>();
  const currentId = Number(id);

  if (!Number.isFinite(currentId) || !curatedIds.includes(currentId)) {
    return <Navigate to="/saerok" replace />;
  }

  const { data, loading, error } = useCollectionDetail(Number(id));

  return (
    <div
      className="bg-background-lightWhitegray min-h-screen flex flex-row justify-center"
      style={scaledStyle(scale, {
        paddingLeft: 120,
        paddingRight: 120,
        paddingTop: 87,
        paddingBottom: 114,
        gap: 88,
      })}
    >
      {loading && (
        <>
          <SaerokDetailCardSkeleton scale={scale} />
          <SaerokDetailListSkeleton scale={scale} pageSize={7} totalPages={3} />
        </>
      )}

      {!loading && !error && data && (
        <>
          <SaerokDetailCard item={data} scale={scale} />
          <SaerokDetailList currentId={currentId} scale={scale} />
        </>
      )}
    </div>
  );
};

export default SaerokDetailPage;
