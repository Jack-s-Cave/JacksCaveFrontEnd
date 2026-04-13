import { Tag } from "./filters";

export interface Blog {
  id: number;
  title: string;
  date: string;
  author: string;
  image?: string;
  tags: Tag[];
}

export type ViewMode = 'grid' | 'list';
