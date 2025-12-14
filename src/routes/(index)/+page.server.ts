import { env } from '$env/dynamic/public';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import schema from './formAction/schema'
import { ZodError } from 'zod';
import { formatInTimeZone } from 'date-fns-tz';

const toUkIso = (isoUtc: string) =>
	formatInTimeZone(
		isoUtc,
		'Europe/London',
		"yyyy-MM-dd'T'HH:mm:ssXXX"
	);

export const actions = {
	default: async ({ request, fetch }) => {
    try {
      const formData = await request.formData();
      const rawData = Object.fromEntries(formData);
      const parsed = schema.parse(rawData);
      const apiUrl = new URL(env.PUBLIC_CHASE_CALENDAR_URI || 'https://calendar.meetchase.ai');
      apiUrl.pathname = '/api/meetings';
      const result = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          start: toUkIso(parsed.start),
          end: toUkIso(parsed.end),
          attendees: [{
            email: parsed.email,
            name: parsed.name,
          }]
        })
      })
      if (!result.ok) {
        if (result.status === 400) return fail(400, { errorMsg: 'Requested meeting time is not available' })
        return fail(500, { errorMsg: 'Something went wrong' })
      }

      return { success: true }
    } catch(err) {
      if (err instanceof ZodError) return fail(400, { errorMsg: err.issues[0].message })
      throw err;
    }

	}
} satisfies Actions;
