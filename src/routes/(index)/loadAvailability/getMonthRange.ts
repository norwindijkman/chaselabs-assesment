/**
 * Parses a 'YYYY-MM' date string and calculates the start and end dates of that month.
 */
const getMonthRange = (yyyyMm: `${number}-${number}`) => {
	const [y, m] = yyyyMm.split('-').map(Number);
	const daysInMonth = new Date(y, m, 0).getDate();

	return {
		start: `${yyyyMm}-01`,
		end: `${yyyyMm}-${daysInMonth}`
	};
};

export default getMonthRange;
