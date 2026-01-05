/**
 * @perkos/validators
 * Zod validation schemas for AI and payment services
 */

// Re-export all AI validators
export * from "./ai";

// Re-export all payment validators
export * from "./payment";

// Utility functions
import { z } from "zod";

/**
 * Validate data against a schema and return typed result
 */
export function validate<T extends z.ZodSchema>(
  schema: T,
  data: unknown
): z.infer<T> {
  return schema.parse(data);
}

/**
 * Safely validate data, returning result or null
 */
export function safeValidate<T extends z.ZodSchema>(
  schema: T,
  data: unknown
): { success: true; data: z.infer<T> } | { success: false; error: z.ZodError } {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}

/**
 * Create a partial version of a schema (all fields optional)
 */
export function partial<T extends z.ZodRawShape>(schema: z.ZodObject<T>) {
  return schema.partial();
}

/**
 * Create a required version of a schema (all fields required)
 */
export function required<T extends z.ZodRawShape>(schema: z.ZodObject<T>) {
  return schema.required();
}

/**
 * Format Zod errors for API responses
 */
export function formatZodErrors(error: z.ZodError): Array<{
  path: string;
  message: string;
  code: string;
}> {
  return error.errors.map((e) => ({
    path: e.path.join("."),
    message: e.message,
    code: e.code,
  }));
}
