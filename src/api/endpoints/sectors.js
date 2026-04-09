import samplesClient from "../samplesClient";

export const sectorApi = {
    getAll: () => samplesClient("/api/v1/sectors"),
    getById: (id) => samplesClient(`/api/v1/sectors/${id}`)
}