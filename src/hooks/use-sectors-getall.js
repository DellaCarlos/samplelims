import { useState, useEffect } from "react";
import { sectorApi } from "../api/endpoints/sectors";

export function useSectors() {
  const [sectors, setSectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    sectorApi
      .getAll()
      .then(setSectors)
      .catch((e) => setErro(e.message))
      .finally(() => setLoading(false));
  }, []);
  return { sectors, loading, erro };
}
