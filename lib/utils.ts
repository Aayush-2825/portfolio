export { cn } from "cn";

/**
 * Returns true when the string has real content (not blank, not a TODO).
 * Used to filter out placeholder data across sections.
 */
export function isRenderable(value: string) {
  return value.trim().length > 0 && !value.includes("TODO(aayush)");
}

/**
 * Returns the first available link for a project (live URL or repo).
 */
export function projectHref(project: { links: { live?: string; repo?: string } }) {
  return project.links.live ?? project.links.repo;
}
