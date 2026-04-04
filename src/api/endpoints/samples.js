import samplesClient from "../samplesClient";

/**
 * @returns {Promise<Sample[]>}
 */
export const samplesApi = {
  list: () => samplesClient("/samples"),
  listById: (id) => samplesClient(`/samples/${id}`),
};
