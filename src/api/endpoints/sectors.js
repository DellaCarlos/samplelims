import samplesClient from "../samples-client";

export const sectorApi = {
    getAll: () => samplesClient("/sectors"),
    getById: (name) => samplesClient(`/sectors/${name}`)
}