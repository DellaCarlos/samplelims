import samplesClient from "../samples-client";

/**
 * @returns {Promise<Sample[]>}
 */
export const samplesApi = {
  getAll: () => samplesClient("/samples"),
  getById: (id) => samplesClient(`/samples/${id}`),
  create: (data) => samplesClient("/samples", { method: "POST", body: data }),
  update: (id, data) => samplesClient(`/samples/${id}`, { method: "PATCH", body: data }),
  delete: (id) => samplesClient(`/samples/d/${id}`, { method: "DELETE" }),
};
