export const AI_MODELS = {
  OPUS: 'claude-opus-4-7',
  SONNET: 'claude-sonnet-4-6',
  HAIKU: 'claude-haiku-4-5-20251001',
} as const;

export type AIModel = typeof AI_MODELS[keyof typeof AI_MODELS];
