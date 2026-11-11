import PocketBase from "pocketbase";
import {
  ProfileData,
  CategoryItem,
  ProjectItem,
  PostItem,
  ContactMessage,
} from "./types";
import {
  initialProfile,
  initialCategories,
  initialProjects,
  initialPosts,
} from "./data/initialData";

const PB_URL =
  process.env.NEXT_PUBLIC_POCKETBASE_URL ||
  process.env.POCKETBASE_URL ||
  "http://127.0.0.1:8090";

export function createPocketBaseClient(): PocketBase {
  const pb = new PocketBase(PB_URL);
  pb.autoCancellation(false);
  return pb;
}

// Global client untuk browser
let browserClient: PocketBase | null = null;
export function getPocketBase(): PocketBase {
  if (typeof window !== "undefined") {
    if (!browserClient) {
      browserClient = createPocketBaseClient();
      // Restore auth state dari localStorage jika ada
      try {
        const storedAuth = localStorage.getItem("pocketbase_auth");
        if (storedAuth) {
          browserClient.authStore.loadFromCookie(storedAuth);
        }
      } catch {
        // Abaikan bila localStorage tidak tersedia
      }
      browserClient.authStore.onChange(() => {
        try {
          localStorage.setItem("pocketbase_auth", browserClient?.authStore.exportToCookie() || "");
        } catch {
          // Abaikan
        }
      });
    }
    return browserClient;
  }
  return createPocketBaseClient();
}

export function getFileUrl(
  collectionName: string,
  recordId: string,
  fileName?: string
): string {
  if (!fileName) return "";
  if (fileName.startsWith("http://") || fileName.startsWith("https://")) {
    return fileName;
  }
  return `${PB_URL}/api/files/${collectionName}/${recordId}/${fileName}`;
}

export async function getProfile(): Promise<ProfileData> {
  const pb = getPocketBase();
  try {
    const records = await pb.collection("profile").getList<ProfileData>(1, 1, {
      requestKey: null,
    });
    if (records.items.length > 0) {
      return records.items[0];
    }
  } catch {
    // Gunakan fallback data jika PocketBase belum menyala atau kosong
  }
  return initialProfile;
}

export async function getCategories(): Promise<CategoryItem[]> {
  const pb = getPocketBase();
  try {
    const records = await pb.collection("categories").getFullList<CategoryItem>({
      sort: "name",
      requestKey: null,
    });
    if (records.length > 0) {
      return records;
    }
  } catch {
    // Fallback
  }
  return initialCategories;
}

export async function getProjects(options?: {
  featuredOnly?: boolean;
  category?: string;
}): Promise<ProjectItem[]> {
  const pb = getPocketBase();
  try {
    const filterParts: string[] = ["visible = true"];
    if (options?.featuredOnly) {
      filterParts.push("featured = true");
    }
    const records = await pb.collection("projects").getFullList<ProjectItem>({
      filter: filterParts.join(" && "),
      sort: "order",
      requestKey: null,
    });
    if (records.length > 0) {
      return records;
    }
  } catch {
    // Fallback
  }

  let filtered = initialProjects.filter((p) => p.visible);
  if (options?.featuredOnly) {
    filtered = filtered.filter((p) => p.featured);
  }
  return filtered.sort((a, b) => a.order - b.order);
}

export async function getProjectBySlug(slug: string): Promise<ProjectItem | null> {
  const pb = getPocketBase();
  try {
    const record = await pb
      .collection("projects")
      .getFirstListItem<ProjectItem>(`slug = "${slug}" && visible = true`, {
        requestKey: null,
      });
    if (record) return record;
  } catch {
    // Fallback
  }

  const found = initialProjects.find((p) => p.slug === slug && p.visible);
  return found || null;
}

export interface PostFilterOptions {
  category?: string;
  tag?: string;
  search?: string;
  page?: number;
  perPage?: number;
}

export interface PaginatedPosts {
  items: PostItem[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
}

export async function getPosts(
  options: PostFilterOptions = {}
): Promise<PaginatedPosts> {
  const { category, tag, search, page = 1, perPage = 6 } = options;
  const pb = getPocketBase();

  try {
    const filterParts: string[] = ["status = 'published'"];
    if (category) {
      filterParts.push(`category = "${category}"`);
    }
    if (tag) {
      filterParts.push(`tags ~ "${tag}"`);
    }
    if (search) {
      filterParts.push(`(title ~ "${search}" || excerpt ~ "${search}" || content ~ "${search}")`);
    }

    const res = await pb.collection("posts").getList<PostItem>(page, perPage, {
      filter: filterParts.join(" && "),
      sort: "-published_at,-created",
      requestKey: null,
    });

    if (res.items.length > 0) {
      return {
        items: res.items,
        page: res.page,
        perPage: res.perPage,
        totalItems: res.totalItems,
        totalPages: res.totalPages,
      };
    }
  } catch {
    // Fallback
  }

  // Gunakan data fallback
  let list = initialPosts.filter((p) => p.status === "published");
  if (category) {
    list = list.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }
  if (tag) {
    list = list.filter((p) =>
      p.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
    );
  }
  if (search) {
    const q = search.toLowerCase();
    list = list.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        (p.excerpt && p.excerpt.toLowerCase().includes(q)) ||
        p.content.toLowerCase().includes(q)
    );
  }

  const totalItems = list.length;
  const totalPages = Math.ceil(totalItems / perPage) || 1;
  const offset = (page - 1) * perPage;
  const items = list.slice(offset, offset + perPage);

  return {
    items,
    page,
    perPage,
    totalItems,
    totalPages,
  };
}

export async function getPostBySlug(slug: string): Promise<PostItem | null> {
  const pb = getPocketBase();
  try {
    const record = await pb
      .collection("posts")
      .getFirstListItem<PostItem>(`slug = "${slug}" && status = 'published'`, {
        requestKey: null,
      });
    if (record) return record;
  } catch {
    // Fallback
  }

  const found = initialPosts.find(
    (p) => p.slug === slug && p.status === "published"
  );
  return found || null;
}

export async function submitContactMessage(
  data: ContactMessage
): Promise<{ success: boolean; error?: string }> {
  const pb = getPocketBase();
  try {
    await pb.collection("messages").create(data);
    return { success: true };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || "Gagal mengirim pesan ke database.",
    };
  }
}
