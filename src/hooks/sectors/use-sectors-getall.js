import { useState, useEffect, useCallback } from "react";
import { sectorApi } from "../../api/endpoints/sectors";

export function useSectors() {
  const [sectors, setSectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  const fetchSectors = useCallback(() => {
    setLoading(true);
    sectorApi
      .getAll()
      .then(setSectors)
      .catch((e) => setErro(e.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchSectors();
  }, [fetchSectors]);

  return { sectors, loading, erro, refetch: fetchSectors };
}