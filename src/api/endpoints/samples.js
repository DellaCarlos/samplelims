import samplesClient from "../samplesClient";

/**
 * @returns {Promise<Sample[]>}
 */
export const samplesApi = {
  list: () => samplesClient("/api/v1/samples"),
  listById: (id) => samplesClient(`/api/v1/samples/${id}`),
};
