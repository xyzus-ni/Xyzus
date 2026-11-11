import rawData from "./initialData.json";
import { ProfileData, CategoryItem, ProjectItem, PostItem } from "../types";

export const initialProfile = rawData.profile as ProfileData;
export const initialCategories = rawData.categories as CategoryItem[];
export const initialProjects = rawData.projects as unknown as ProjectItem[];
export const initialPosts = rawData.posts as unknown as PostItem[];
