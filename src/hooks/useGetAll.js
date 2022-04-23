import { useState, useEffect, useCallback } from "react";

import { getAll } from "../firebase";

export default function useGetAll(collection) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const getData = useCallback(async () => {
    try {
      const json = await getAll(collection);
      setData(json);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [collection]);
  useEffect(() => {
    getData();
  }, [getData]);
  return { loading, data, error };
}
