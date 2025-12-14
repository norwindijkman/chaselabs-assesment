import { z } from "zod";

const isoUtc = z
	.string()
	.regex(
		/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/,
		"Invalid date format"
	);

export const contactFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.email("Invalid email address").trim(),
  message: z.string().trim().optional(),
	start: isoUtc,
	end: isoUtc,
});

export default contactFormSchema
