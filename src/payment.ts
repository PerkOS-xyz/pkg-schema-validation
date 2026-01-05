/**
 * @perkos/validators/payment
 * Payment and x402 protocol validators using Zod
 */

import { z } from "zod";

// ============================================================================
// Network & Chain Validators
// ============================================================================

export const networkSchema = z.enum([
  "avalanche",
  "base",
  "celo",
  "avalanche-fuji",
  "base-sepolia",
  "celo-alfajores",
]);

export const caip2NetworkSchema = z.string().regex(
  /^eip155:\d+$/,
  "Invalid CAIP-2 network format. Expected: eip155:<chainId>"
);

export const ethereumAddressSchema = z.string().regex(
  /^0x[a-fA-F0-9]{40}$/,
  "Invalid Ethereum address"
);

export const transactionHashSchema = z.string().regex(
  /^0x[a-fA-F0-9]{64}$/,
  "Invalid transaction hash"
);

export const signatureSchema = z.string().regex(
  /^0x[a-fA-F0-9]+$/,
  "Invalid signature format"
);

// ============================================================================
// Payment Envelope Validators
// ============================================================================

export const paymentEnvelopeSchema = z.object({
  payload: z.object({
    from: ethereumAddressSchema,
    to: ethereumAddressSchema,
    value: z.string().min(1, "Value is required"),
    validAfter: z.number().int().nonnegative(),
    validBefore: z.number().int().positive(),
    nonce: z.string().min(1, "Nonce is required"),
    network: caip2NetworkSchema,
  }),
  signature: signatureSchema,
});

export const paymentHeaderSchema = z.string().regex(
  /^x402\s+/i,
  "Payment header must start with 'x402'"
);

// ============================================================================
// Payment Configuration Validators
// ============================================================================

export const priceSchema = z.union([
  z.string().regex(/^\d+(\.\d+)?$/, "Invalid price format"),
  z.number().positive(),
]);

export const paymentConfigSchema = z.object({
  recipientAddress: ethereumAddressSchema,
  network: networkSchema,
  tokenAddress: ethereumAddressSchema.optional(),
  prices: z.record(z.string(), priceSchema),
});

export const routeConfigSchema = z.object({
  path: z.string().min(1, "Path is required"),
  price: priceSchema,
  description: z.string().optional(),
});

// ============================================================================
// Payment Request Validators
// ============================================================================

export const paymentRequestSchema = z.object({
  amount: priceSchema,
  recipient: ethereumAddressSchema,
  network: networkSchema,
  memo: z.string().optional(),
  expiresAt: z.number().int().positive().optional(),
});

export const paymentVerificationSchema = z.object({
  envelope: paymentEnvelopeSchema,
  expectedAmount: z.string(),
  expectedRecipient: ethereumAddressSchema,
  tolerance: z.number().min(0).max(1).optional().default(0),
});

// ============================================================================
// Token Validators
// ============================================================================

export const tokenInfoSchema = z.object({
  address: ethereumAddressSchema,
  name: z.string(),
  symbol: z.string(),
  decimals: z.number().int().min(0).max(18),
  chainId: z.number().int().positive(),
});

export const eip712DomainSchema = z.object({
  name: z.string(),
  version: z.string(),
  chainId: z.number().int().positive(),
  verifyingContract: ethereumAddressSchema,
});

// ============================================================================
// Settlement Validators
// ============================================================================

export const settlementRequestSchema = z.object({
  envelope: paymentEnvelopeSchema,
  privateKey: z.string().optional(),
});

export const settlementResultSchema = z.object({
  success: z.boolean(),
  transactionHash: transactionHashSchema.optional(),
  error: z.string().optional(),
  gasUsed: z.string().optional(),
});

// ============================================================================
// Error Response Validators
// ============================================================================

export const paymentErrorSchema = z.object({
  error: z.string(),
  code: z.enum([
    "MISSING_PAYMENT",
    "INVALID_SIGNATURE",
    "INVALID_AMOUNT",
    "EXPIRED_PAYMENT",
    "INSUFFICIENT_BALANCE",
    "SETTLEMENT_FAILED",
    "NETWORK_MISMATCH",
  ]),
  details: z.record(z.string(), z.unknown()).optional(),
});

// ============================================================================
// Type Exports
// ============================================================================

export type Network = z.infer<typeof networkSchema>;
export type CAIP2Network = z.infer<typeof caip2NetworkSchema>;
export type EthereumAddress = z.infer<typeof ethereumAddressSchema>;
export type TransactionHash = z.infer<typeof transactionHashSchema>;
export type Signature = z.infer<typeof signatureSchema>;
export type PaymentEnvelope = z.infer<typeof paymentEnvelopeSchema>;
export type PaymentConfig = z.infer<typeof paymentConfigSchema>;
export type RouteConfig = z.infer<typeof routeConfigSchema>;
export type PaymentRequest = z.infer<typeof paymentRequestSchema>;
export type PaymentVerification = z.infer<typeof paymentVerificationSchema>;
export type TokenInfo = z.infer<typeof tokenInfoSchema>;
export type EIP712Domain = z.infer<typeof eip712DomainSchema>;
export type SettlementRequest = z.infer<typeof settlementRequestSchema>;
export type SettlementResult = z.infer<typeof settlementResultSchema>;
export type PaymentError = z.infer<typeof paymentErrorSchema>;
