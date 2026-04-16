import { useState, useEffect } from "react";
import { samplesApi } from "../../api/endpoints/samples";
/** @typedef {import("../../types/samples-type").Sample} Sample */

export function useSamples() {
  /** @type {[Sample[], Function]} */
  const [samples, setSamples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    samplesApi
      .getAll()
      .then((data) => setSamples(data ?? []))
      .catch((e) => setErro(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { samples, loading, erro };
}
