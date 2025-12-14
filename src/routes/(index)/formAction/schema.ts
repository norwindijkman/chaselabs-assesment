import { z } from 'zod';

export const contactFormSchema = z.object({
	name: z.string().trim().min(1, 'Name is required'),
	email: z.email('Invalid email address').trim(),
	message: z.string().trim().optional(),
	start: z.iso.datetime(),
	end: z.iso.datetime()
});

export default contactFormSchema;
