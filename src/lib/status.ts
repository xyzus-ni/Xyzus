import { dictionaries } from "./i18n/dictionaries";

type Dict = typeof dictionaries.id;

export type ProjectStage =
  | "field_tested"
  | "simulation_validated"
  | "prototype"
  | "in_development"
  | "research";

/**
 * Pemetaan stage jujur per proyek berdasarkan fakta yang ada di data.
 * Hanya pakai label yang bisa dipertanggungjawabkan:
 * - field_tested: ada pengujian lapangan nyata
 * - simulation_validated: hasil diverifikasi lewat simulasi (mis. Factory I/O)
 * - prototype: sistem jadi/prototipe, belum ada bukti validasi lapangan
 * - in_development: masih dibangun
 * - research: karya riset/paper/kompetisi, bukan sistem jadi
 */
const STAGE_BY_SLUG: Record<string, ProjectStage> = {
  "soil-sensor-calibration-field-testing": "field_tested",
  "factory-io-conveyor-automation-simulation": "simulation_validated",
  "industrial-control-logic": "simulation_validated",
  "autonomous-weed-harvester-catamaran-cirata": "research",
  "uav-yolo-palm-pest-early-detection": "in_development",
  "crewai-telegram-multi-agent-assistant": "in_development",
  "color-blind-assistant-raspberry-pi": "prototype",
  "modular-bed-frame-cad-ai-visualization": "prototype",
  "web-based-oee-industrial-system": "prototype",
};

export function projectStage(project: { slug?: string; status?: string }): ProjectStage {
  if (project.slug && STAGE_BY_SLUG[project.slug]) {
    return STAGE_BY_SLUG[project.slug];
  }
  switch (project.status) {
    case "kompetisi/paper":
      return "research";
    case "pengembangan":
    case "aktif":
      return "in_development";
    default:
      return "prototype";
  }
}

export function projectStageLabel(t: Dict, project: { slug?: string; status?: string }): string {
  switch (projectStage(project)) {
    case "field_tested":
      return t.projects.status_field_tested;
    case "simulation_validated":
      return t.projects.status_simulation;
    case "in_development":
      return t.projects.status_dev;
    case "research":
      return t.projects.status_research;
    default:
      return t.projects.status_prototype;
  }
}

/** @deprecated gunakan projectStageLabel */
export function projectStatusLabel(t: Dict, status: string): string {
  switch (status) {
    case "kompetisi/paper":
      return t.projects.status_research;
    case "pengembangan":
    case "aktif":
      return t.projects.status_dev;
    default:
      return t.projects.status_prototype;
  }
}
