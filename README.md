# @perkos/schema-validation

Zod validation schemas for AI and payment services.

## Installation

```bash
npm install @perkos/schema-validation
```

## Usage

### AI Validators

```typescript
import {
  imageAnalyzeSchema,
  imageGenerateSchema,
  textSummarizeSchema,
  validate,
  safeValidate,
} from "@perkos/schema-validation";

// Or import specifically from ai subpath
import { codeGenerateSchema } from "@perkos/schema-validation/ai";

// Validate with parse (throws on error)
const input = validate(imageAnalyzeSchema, {
  image: "https://example.com/image.jpg",
  question: "What is in this image?",
});

// Safe validate (returns result object)
const result = safeValidate(imageGenerateSchema, requestBody);
if (result.success) {
  console.log(result.data.prompt);
} else {
  console.error(result.error.errors);
}
```

### Payment Validators

```typescript
import {
  paymentEnvelopeSchema,
  ethereumAddressSchema,
  networkSchema,
} from "@perkos/schema-validation";

// Or import from payment subpath
import { paymentConfigSchema } from "@perkos/schema-validation/payment";

// Validate Ethereum address
const address = ethereumAddressSchema.parse("0x1234...");

// Validate payment envelope
const envelope = paymentEnvelopeSchema.parse({
  payload: {
    from: "0x...",
    to: "0x...",
    value: "1000000",
    validAfter: 0,
    validBefore: Date.now() + 3600000,
    nonce: "abc123",
    network: "eip155:43114",
  },
  signature: "0x...",
});
```

## AI Schemas

### Vision & Image

- `imageAnalyzeSchema` - Image analysis requests
- `imageGenerateSchema` - Image generation (DALL-E, SDXL)
- `ocrExtractSchema` - OCR text extraction

### Audio

- `textSynthesizeSchema` - Text-to-speech
- `audioTranscribeSchema` - Speech-to-text

### Text Processing

- `textSummarizeSchema` - Text summarization
- `textTranslateSchema` - Translation
- `sentimentAnalyzeSchema` - Sentiment analysis
- `contentModerateSchema` - Content moderation
- `textSimplifySchema` - Text simplification
- `entityExtractSchema` - Named entity extraction

### Content Generation

- `emailGenerateSchema` - Email generation
- `productDescriptionSchema` - Product descriptions
- `seoOptimizeSchema` - SEO optimization

### Code & Technical

- `codeGenerateSchema` - Code generation
- `codeReviewSchema` - Code review
- `sqlQuerySchema` - SQL query generation
- `regexGenerateSchema` - Regex generation
- `apiDocsSchema` - API documentation

### Educational

- `quizGenerateSchema` - Quiz generation

## Payment Schemas

### Network & Chain

- `networkSchema` - Supported networks enum
- `caip2NetworkSchema` - CAIP-2 network format
- `ethereumAddressSchema` - Ethereum address validation
- `transactionHashSchema` - Transaction hash validation
- `signatureSchema` - Signature format validation

### Payment

- `paymentEnvelopeSchema` - x402 payment envelope
- `paymentConfigSchema` - Payment configuration
- `paymentRequestSchema` - Payment request
- `paymentVerificationSchema` - Payment verification

### Token

- `tokenInfoSchema` - ERC20 token info
- `eip712DomainSchema` - EIP-712 domain

### Settlement

- `settlementRequestSchema` - Settlement request
- `settlementResultSchema` - Settlement result

## Utility Functions

### `validate(schema, data)`

Parse and validate data, throwing on errors.

### `safeValidate(schema, data)`

Safely validate, returning `{ success, data }` or `{ success, error }`.

### `formatZodErrors(error)`

Format Zod errors for API responses.

```typescript
import { formatZodErrors } from "@perkos/schema-validation";

try {
  schema.parse(data);
} catch (error) {
  if (error instanceof z.ZodError) {
    const formatted = formatZodErrors(error);
    // [{ path: "email", message: "Invalid email", code: "invalid_string" }]
  }
}
```

## Type Inference

All schemas export inferred TypeScript types:

```typescript
import type {
  ImageAnalyzeInput,
  PaymentEnvelope,
  Network,
} from "@perkos/schema-validation";
```

## License

MIT
