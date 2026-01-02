import { useCuratedCollections } from "@/hooks/useCuratedSaeroks";
import SaerokListCard from "./SaerokListCard";
import { scaledStyle } from "@/utils/scaleStyle";
import SaerokListSkeleton from "../home/components/SaerokListSkeleton";

interface SaerokListProps {
  scale?: number;
}

const SaerokList = ({ scale = 1 }: SaerokListProps) => {
  const curatedIds = [
    1272, 704, 1275, 691, 1522, 486, 464, 692, 1266, 1270, 484, 465, 1105, 516,
    1010, 1276,
  ];

  const { data, loading, error } = useCuratedCollections(curatedIds);

  if (loading) {
    return <SaerokListSkeleton scale={scale} count={curatedIds.length} />;
  }
  if (error) return <></>;
  if (!data || data.length === 0) return <></>;

  const mid = Math.ceil(data.length / 2);
  const left = data.slice(0, mid);
  const right = data.slice(mid);

  return (
    <div
      className=" flex"
      style={scaledStyle(scale, {
        paddingLeft: 120,
        paddingRight: 120,
        gap: 20,
      })}
    >
      {/* 왼쪽 컬럼 */}
      <div
        className=" columns-2 flex-1"
        style={scaledStyle(scale, {
          marginTop: 22,
          columnGap: 20,
        })}
      >
        {left.map((it: any) => (
          <SaerokListCard key={it.collectionId} scale={scale} item={it} />
        ))}
      </div>
      {/* 오른쪽 컬럼 */}
      <div
        className="flex-1"
        style={scaledStyle(scale, {
          marginTop: -260,
        })}
      >
        {right[0] && <SaerokListCard scale={scale} item={right[0]} />}

        <div
          className="columns-2"
          style={scaledStyle(scale, {
            columnGap: 20,
          })}
        >
          {right.slice(1).map((it) => (
            <SaerokListCard key={it.collectionId} item={it} scale={scale} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SaerokList;
