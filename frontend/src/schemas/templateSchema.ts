import { z } from 'zod';

export const templateSchema = z.object({
  name: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
});