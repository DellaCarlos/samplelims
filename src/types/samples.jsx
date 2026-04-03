/**
 * It represents a sample of the system.
 * @typedef {object} Sample
 * @property {numer} id_sample
 * @property {string} name_sample
 * @property {string} sector_sample
 * @property {string[]} analysis_sample
 * @property {string} created_by_user_id_sample
 * @property {string} created_at_sample
 * @property {string} updated_at_sample
 * @property {string|null} [deletec_at_sample]
 * @property {boolean} is_active_sample
 */

// ToDo: get this from DB
export const SECTORS = [
  "Microbiology",
  "Chemistry",
  "Hematology",
  "Immunology",
  "Pathology",
  "Toxicology",
  "Genetics",
];

// ToDo: get this from DB
export const ANALYSIS = [
  "pH Analysis",
  "Spectrophotometry",
  "Chromatography",
  "PCR",
  "ELISA",
  "Mass Spectrometry",
  "Electrophoresis",
  "Culture & Sensitivity",
  "Microscopy",
  "Turbidity",
];