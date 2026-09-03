/**
 * Generic helpers used across components.
 * Keep this file small — only truly reusable, framework-agnostic utilities.
 */

/** Split a comma-separated string into a trimmed, non-empty array. */
export function splitField(value: string | undefined): string[] {
    if (!value) return []
    return value.split(',').map((s) => s.trim()).filter(Boolean)
}
