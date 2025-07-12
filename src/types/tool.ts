export interface Tool {
  id: string;
  name: string;
  tagline: string;
  category: string;
  tags?: string[];
  badge?: "our-pick" | "trending";
  description?: string;
  icon?: string;
  link: string;
}
