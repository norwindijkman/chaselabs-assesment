import type { PageLoad } from './$types';
import loadAvailability from './loadAvailability/loadAvailability';

export const load: PageLoad = async ({ url, fetch }) => {
  const availability = await loadAvailability({
    dateStr: url.searchParams.get('month'),
    fetch,
  })

  // active day =   
	return {
    availability: await loadAvailability({
      dateStr: url.searchParams.get('month'),
      fetch,
    })
	};
};
