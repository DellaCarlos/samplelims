import samplesClient from "../samples-client";

/**
 * @returns {Promise<Sample[]>}
 */
export const samplesApi = {
  getAll: () => samplesClient("/samples"),
  getById: (id) => samplesClient(`/samples/${id}`),
  create: (data) => samplesClient("/samples", { method: "POST", body: data }),
  update: (id, data) => samplesClient(`/samples/${id}`, { method: "PUT", body: data }),
  remove: (id) => samplesClient(`/samples/${id}`, { method: "DELETE" }),
};
