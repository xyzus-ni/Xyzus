export type ProjectStatus = "selesai" | "pengembangan" | "kompetisi/paper" | "aktif";

export interface ProjectItem {
  id?: string;
  title: string;
  slug: string;
  summary: string;
  description?: string;
  tech: string[];
  cover?: string;
  gallery?: string[];
  video_url?: string;
  repo_url?: string;
  demo_url?: string;
  status: ProjectStatus;
  featured: boolean;
  visible: boolean;
  order: number;
}

export type PostStatus = "draft" | "published";
export type PostLang = "id" | "en";

export interface PostItem {
  id?: string;
  title: string;
  slug: string;
  excerpt?: string;
  abstract?: string;
  content: string;
  cover?: string;
  attachments?: string[];
  category: string;
  tags: string[];
  lang: PostLang;
  references?: string;
  status: PostStatus;
  published_at?: string;
  reading_time: number;
  created?: string;
  updated?: string;
}

export interface CategoryItem {
  id?: string;
  name: string;
  slug: string;
  description?: string;
}

export interface ProfileData {
  id?: string;
  name: string;
  headline: string;
  bio: string;
  lokasi: string;
  social_links: {
    linkedin: string;
    github: string;
    email: string;
  };
  cv?: string;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  created?: string;
}
