import { dictionaries } from "./i18n/dictionaries";
import { ProjectStatus } from "./types";

type Dict = typeof dictionaries.id;

/** Label status proyek yang sudah diterjemahkan. */
export function projectStatusLabel(t: Dict, status: ProjectStatus | string): string {
  switch (status) {
    case "selesai":
      return t.projects.status_completed;
    case "pengembangan":
      return t.projects.status_dev;
    case "kompetisi/paper":
      return t.projects.status_paper;
    case "aktif":
      return t.projects.status_active;
    default:
      return status;
  }
}
