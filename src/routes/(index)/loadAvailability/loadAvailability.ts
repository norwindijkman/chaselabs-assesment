import { env } from '$env/dynamic/public';
import type { LoadEvent } from '@sveltejs/kit';
import getMonthRange from './getMonthRange';
import resolveMonth from './resolveMonth';

type AvailabilitySlot = {
	start: string;
	end: string;
};

type AvailabilityByDay = Record<string, AvailabilitySlot[]>;

const groupAvailabilityByDay = (slots: AvailabilitySlot[]) => {
	return slots.reduce<AvailabilityByDay>((acc, slot) => {
		const day = slot.start.split('T')[0];
		acc[day] = acc[day] ?? [];
		acc[day].push(slot);
		return acc;
	}, {});
};

const loadAvailability = async ({
	fetch,
	dateStr
}: {
	fetch: LoadEvent['fetch'];
	dateStr: string | null;
}) => {
	const range = getMonthRange(resolveMonth(dateStr));
	const apiUrl = new URL(env.PUBLIC_CHASE_CALENDAR_URI || 'https://calendar.meetchase.ai');
	apiUrl.pathname = '/api/availability';
	apiUrl.searchParams.set('start', range.start);
	apiUrl.searchParams.set('end', range.end);
	const availability: AvailabilitySlot[] = await fetch(apiUrl.toString()).then((res) => res.json());

	return groupAvailabilityByDay(availability);
};

export default loadAvailability;
