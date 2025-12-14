import type { AvailabilitySlot } from './loadAvailability'

/**
 * Split array of available timeslots into 30 min blocks.
 */
export const splitInto30MinBlocks = (slots: AvailabilitySlot[]): AvailabilitySlot[] => {
	const blocks: AvailabilitySlot[] = [];

	for (const { start, end } of slots) {
		let cursor = new Date(start);
		const endDate = new Date(end);

		while (cursor.getTime() + 30 * 60 * 1000 <= endDate.getTime()) {
			const blockStart = new Date(cursor);
			const blockEnd = new Date(cursor.getTime() + 30 * 60 * 1000);

			blocks.push({
				start: blockStart.toISOString(),
				end: blockEnd.toISOString()
			});

			cursor = blockEnd;
		}
	}

	return blocks;
};

/**
 * Parses a 'YYYY-MM' date string and calculates the start and end dates of that month.
 */
export const getMonthRange = (yyyyMm: `${number}-${number}`) => {
	const [y, m] = yyyyMm.split('-').map(Number);
	const daysInMonth = new Date(y, m, 0).getDate();

	return {
		start: `${yyyyMm}-01`,
		end: `${yyyyMm}-${daysInMonth}`
	};
};

/**
 * Parses a 'YYYY-MM' date string, checks if valid and defaults to the current month.
 */
export const resolveMonth = (input: string | null) => {
	const now = new Date();
	const current = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}` as const;

	const isValid = input && /^\d{4}-(0[1-9]|1[0-2])$/.test(input);
	const month = (isValid ? input : current) as `${number}-${number}`;

	const status: 'past' | 'current' | 'future' =
		month === current ? 'current' : month < current ? 'past' : 'future';

	return { month, status };
};

export default resolveMonth;
