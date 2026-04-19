import { useState } from "react";
import { samplesApi } from "../../api/endpoints/samples";

export function useSampleUpdate() {
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);

  const updateSample = async (id, data) => {
    setLoading(true);
    setErro(null);
    try {
      const result = await samplesApi.update(id, data);
      return result;
    } catch (err) {
      setErro(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateSample, loading, erro };
}