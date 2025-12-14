import { env } from '$env/dynamic/public';
import type { LoadEvent } from '@sveltejs/kit';
import { getMonthRange, resolveMonth, splitInto30MinBlocks } from './calendarUtilities';

export type AvailabilitySlot = {
	start: string;
	end: string;
};

export type AvailabilityByDay = Record<string, AvailabilitySlot[]>;

export type SelectedTimeSlot = {
	use24: boolean;
	timeSlot: AvailabilitySlot;
};

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
	const month = resolveMonth(dateStr);
	if (month.status === 'past') return { month, availableDates: {} };

	const range = getMonthRange(month.month);
	const apiUrl = new URL(env.PUBLIC_CHASE_CALENDAR_URI || 'https://calendar.meetchase.ai');
	apiUrl.pathname = '/api/availability';
	apiUrl.searchParams.set('start', range.start);
	apiUrl.searchParams.set('end', range.end);
	const availabilityData: AvailabilitySlot[] = await fetch(apiUrl.toString()).then((res) =>
		res.json()
	);
  const availabilityDataExpanded = splitInto30MinBlocks(availabilityData)
	const now = new Date();
	const availability =
		month.status === 'current'
			? availabilityDataExpanded.filter((slot) => new Date(slot.start) > now)
			: availabilityDataExpanded;

	const availableDates = groupAvailabilityByDay(availability);
	return {
		month,
		availableDates,
		selectedDay: availability[0]?.start.slice(0, 10) as `${number}-${number}-${number}`
	};
};

export default loadAvailability;
