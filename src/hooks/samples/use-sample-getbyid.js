import { useState, useEffect } from "react";
import { samplesApi } from "../../api/endpoints/samples";

export function useSampleGetById(id) {
  const [sample, setSample] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);

  const fetchSample = async () => {
    setLoading(true);
    setErro(null);
    try {
      const result = await samplesApi.getById(id);
      setSample(result);
    } catch (err) {
      setErro(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchSample();
  }, [id]);

  return { sample, loading, erro, refetch: fetchSample };
}