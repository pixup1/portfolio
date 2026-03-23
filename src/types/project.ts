export interface Project {
  name: string;
  type: "personal" | "community" | "academic";
  year_start: number;
  year_end: number;
  link?: string;
  description: string;
  long_description: string;
  technologies: string[];
}
