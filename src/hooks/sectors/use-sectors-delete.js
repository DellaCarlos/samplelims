import { useState } from "react";
import { sectorApi } from "../../api/endpoints/sectors";

export function useDeleteSector() {
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);

  const deleteSector = async (id) => {
    setLoading(true);
    setErro(null);
    try {
      await sectorApi.delete(id);
    } catch (e) {
      setErro(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { deleteSector, loading, erro };
}