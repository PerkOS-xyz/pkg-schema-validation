/**
 * @perkos/validators/ai
 * AI endpoint request validators using Zod
 */

import { z } from "zod";

// ============================================================================
// Vision & Image Validators
// ============================================================================

export const imageAnalyzeSchema = z.object({
  image: z.string().min(1, "Image URL is required"),
  question: z.string().optional(),
  maxTokens: z.number().int().positive().optional(),
});

export const imageGenerateSchema = z.object({
  prompt: z.string().min(1, "Prompt is required"),
  size: z.enum(["1024x1024", "1792x1024", "1024x1792"]).optional().default("1024x1024"),
  quality: z.enum(["standard", "hd"]).optional().default("standard"),
  style: z.enum(["vivid", "natural"]).optional().default("vivid"),
  n: z.number().int().min(1).max(10).optional().default(1),
});

export const ocrExtractSchema = z.object({
  image: z.string().min(1, "Image URL is required"),
  language: z.string().optional(),
});

// ============================================================================
// Audio Validators
// ============================================================================

export const textSynthesizeSchema = z.object({
  text: z.string().min(1, "Text is required").max(4096, "Text too long"),
  voice: z.enum(["alloy", "echo", "fable", "onyx", "nova", "shimmer"])
    .optional()
    .default("alloy"),
  speed: z.number().min(0.25).max(4.0).optional().default(1.0),
});

export const audioTranscribeSchema = z.object({
  audio: z.string().min(1, "Audio URL is required"),
  language: z.string().optional(),
  prompt: z.string().optional(),
});

// ============================================================================
// Text Processing Validators
// ============================================================================

export const textSummarizeSchema = z.object({
  text: z.string().min(1, "Text is required"),
  length: z.enum(["short", "medium", "long"]).optional().default("medium"),
  format: z.enum(["paragraph", "bullets"]).optional().default("paragraph"),
});

export const textTranslateSchema = z.object({
  text: z.string().min(1, "Text is required"),
  sourceLang: z.string().min(2, "Source language is required"),
  targetLang: z.string().min(2, "Target language is required"),
  formality: z.enum(["formal", "informal", "neutral"]).optional(),
});

export const sentimentAnalyzeSchema = z.object({
  text: z.string().min(1, "Text is required"),
  detailed: z.boolean().optional().default(false),
});

export const contentModerateSchema = z.object({
  content: z.string().min(1, "Content is required"),
  categories: z.array(z.string()).optional(),
});

export const textSimplifySchema = z.object({
  text: z.string().min(1, "Text is required"),
  targetLevel: z.enum(["elementary", "middle", "high", "college"]).optional().default("middle"),
});

export const entityExtractSchema = z.object({
  text: z.string().min(1, "Text is required"),
  types: z.array(z.enum(["person", "organization", "location", "date", "money", "product"])).optional(),
});

// ============================================================================
// Content Generation Validators
// ============================================================================

export const emailGenerateSchema = z.object({
  context: z.string().min(1, "Context is required"),
  tone: z.enum(["professional", "friendly", "formal", "casual"]).optional().default("professional"),
  length: z.enum(["short", "medium", "long"]).optional().default("medium"),
});

export const productDescriptionSchema = z.object({
  product: z.string().min(1, "Product name/description is required"),
  features: z.array(z.string()).optional(),
  audience: z.string().optional(),
  tone: z.enum(["professional", "casual", "luxury", "technical"]).optional().default("professional"),
});

export const seoOptimizeSchema = z.object({
  content: z.string().min(1, "Content is required"),
  keywords: z.array(z.string()).optional(),
  targetUrl: z.string().url().optional(),
});

// ============================================================================
// Code & Technical Validators
// ============================================================================

export const codeGenerateSchema = z.object({
  prompt: z.string().min(1, "Prompt is required"),
  language: z.string().min(1, "Programming language is required"),
  framework: z.string().optional(),
  style: z.enum(["concise", "documented", "verbose"]).optional().default("documented"),
});

export const codeReviewSchema = z.object({
  code: z.string().min(1, "Code is required"),
  language: z.string().optional(),
  focus: z.array(z.enum(["security", "performance", "readability", "bugs", "best-practices"])).optional(),
});

export const sqlQuerySchema = z.object({
  description: z.string().min(1, "Description is required"),
  schema: z.string().optional(),
  dialect: z.enum(["postgresql", "mysql", "sqlite", "mssql"]).optional().default("postgresql"),
});

export const regexGenerateSchema = z.object({
  description: z.string().min(1, "Description is required"),
  examples: z.array(z.object({
    input: z.string(),
    shouldMatch: z.boolean(),
  })).optional(),
  flavor: z.enum(["javascript", "python", "pcre"]).optional().default("javascript"),
});

export const apiDocsSchema = z.object({
  code: z.string().min(1, "Code is required"),
  format: z.enum(["openapi", "markdown", "jsdoc"]).optional().default("markdown"),
  includeExamples: z.boolean().optional().default(true),
});

// ============================================================================
// Educational Validators
// ============================================================================

export const quizGenerateSchema = z.object({
  topic: z.string().min(1, "Topic is required"),
  questionCount: z.number().int().min(1).max(50).optional().default(10),
  difficulty: z.enum(["easy", "medium", "hard"]).optional().default("medium"),
  type: z.enum(["multiple-choice", "true-false", "mixed"]).optional().default("multiple-choice"),
});

// ============================================================================
// Type Exports
// ============================================================================

export type ImageAnalyzeInput = z.infer<typeof imageAnalyzeSchema>;
export type ImageGenerateInput = z.infer<typeof imageGenerateSchema>;
export type OCRExtractInput = z.infer<typeof ocrExtractSchema>;
export type TextSynthesizeInput = z.infer<typeof textSynthesizeSchema>;
export type AudioTranscribeInput = z.infer<typeof audioTranscribeSchema>;
export type TextSummarizeInput = z.infer<typeof textSummarizeSchema>;
export type TextTranslateInput = z.infer<typeof textTranslateSchema>;
export type SentimentAnalyzeInput = z.infer<typeof sentimentAnalyzeSchema>;
export type ContentModerateInput = z.infer<typeof contentModerateSchema>;
export type TextSimplifyInput = z.infer<typeof textSimplifySchema>;
export type EntityExtractInput = z.infer<typeof entityExtractSchema>;
export type EmailGenerateInput = z.infer<typeof emailGenerateSchema>;
export type ProductDescriptionInput = z.infer<typeof productDescriptionSchema>;
export type SEOOptimizeInput = z.infer<typeof seoOptimizeSchema>;
export type CodeGenerateInput = z.infer<typeof codeGenerateSchema>;
export type CodeReviewInput = z.infer<typeof codeReviewSchema>;
export type SQLQueryInput = z.infer<typeof sqlQuerySchema>;
export type RegexGenerateInput = z.infer<typeof regexGenerateSchema>;
export type APIDocsInput = z.infer<typeof apiDocsSchema>;
export type QuizGenerateInput = z.infer<typeof quizGenerateSchema>;
