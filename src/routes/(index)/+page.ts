import type { PageLoad } from './$types';
import loadAvailability from './loadAvailability/loadAvailability';

export const load: PageLoad = async ({ url, fetch }) => {
	return {
		availability: await loadAvailability({
			dateStr: url.searchParams.get('month'),
			fetch
		})
	};
};
