import { useState } from "react";
import { samplesApi } from "../../api/endpoints/samples";

export function useSampleCreate() {
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);

  const createSample = async (data) => {
    setLoading(true);
    setErro(null);
    try {
      const result = await samplesApi.create(data);
      return result;
    } catch (err) {
      setErro(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createSample, loading, erro };
}