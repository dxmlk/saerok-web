import type { CollectionItem } from "@/features/saerok/CollectionType";
import { getCollectionsDetailApi } from "@/services/api/collections";
import { useEffect, useState } from "react";

export const useCollectionDetail = (id?: number) => {
  const [data, setData] = useState<CollectionItem | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    if (!id) return;
    const ac = new AbortController();
    setLoading(true);
    getCollectionsDetailApi(id, ac.signal)
      .then(setData)
      .catch((e) => {
        if (
          (e as any)?.name !== "CanceledError" &&
          (e as any)?.name !== "AbortError"
        ) {
          setError(e);
        }
      })
      .finally(() => setLoading(false));
    return () => ac.abort();
  }, [id]);

  return { data, loading, error };
};
