export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/gi, "-") 
    .replace(/^-+|-+$/g, ""); 
}
