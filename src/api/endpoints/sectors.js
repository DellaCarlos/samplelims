import samplesClient from "../samples-client";

export const sectorApi = {
    getAll: () => samplesClient("/api/v1/sectors"),
    getById: (name) => samplesClient(`/api/v1/sectors/${name}`)
}