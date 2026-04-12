import samplesClient from "../samplesClient";

/**
 * @returns {Promise<Sample[]>}
 */
export const samplesApi = {
  getAll: () => samplesClient("/api/v1/samples"),
  getById: (id) => samplesClient(`/api/v1/samples/${id}`),
  create: (data) => samplesClient("/api/v1/samples", { method: "POST", body: data }),
  update: (id, data) => samplesClient(`/api/v1/samples/${id}`, { method: "PUT", body: data }),
  remove: (id) => samplesClient(`/api/v1/samples/${id}`, { method: "DELETE" }),
};
