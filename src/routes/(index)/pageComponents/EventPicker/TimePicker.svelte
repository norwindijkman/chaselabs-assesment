<script lang="ts">
	import type {
		AvailabilityByDay,
		SelectedTimeSlot
	} from '../../loadAvailability/loadAvailability';
	import { Button } from '$lib/components/ui/button/index.js';
	import { getLocalTimeZone, type CalendarDate } from '@internationalized/date';
	import ConfirmForm from './ConfirmForm/ConfirmForm.svelte';

	let {
		timeSlots,
		currentDate
	}: {
		timeSlots: AvailabilityByDay[string];
		currentDate: CalendarDate;
	} = $props();

	let use24 = $state(true);
	let selectedTimeSlot = $state<SelectedTimeSlot | null>(null);
</script>

<ConfirmForm
	isOpen={Boolean(selectedTimeSlot)}
	{selectedTimeSlot}
	close={() => (selectedTimeSlot = null)}
/>

<div>
	<div class="mb-6 flex items-center justify-between">
		<h3 class="font-bold text-foreground">
			{currentDate.toDate(getLocalTimeZone()).toLocaleDateString('en-US', {
				weekday: 'short'
			})}
			<span class="text-primary">
				{currentDate.toDate(getLocalTimeZone()).toLocaleDateString('en-US', {
					day: 'numeric'
				})}
			</span>
		</h3>
		<div class="flex rounded-[0.375rem] bg-muted p-0.5">
			<button
				disabled={!use24}
				class:bg-background={!use24}
				class:text-foreground={!use24}
				class:shadow-sm={!use24}
				class:cursor-pointer={use24}
				class:text-muted-foreground={use24}
				class:hover:text-foreground={use24}
				class="rounded px-2 py-1 text-xs font-medium"
				onclick={() => (use24 = false)}
			>
				12h
			</button>
			<button
				disabled={use24}
				class:bg-background={use24}
				class:text-foreground={use24}
				class:shadow-sm={use24}
				class:cursor-pointer={!use24}
				class:text-muted-foreground={!use24}
				class:hover:text-foreground={!use24}
				class="rounded px-2 py-1 text-xs font-medium"
				onclick={() => (use24 = true)}
			>
				24h
			</button>
		</div>
	</div>
	<div class="grid gap-2">
		{#each timeSlots as time (time)}
			<Button
				onclick={() =>
					(selectedTimeSlot = {
						timeSlot: time,
						use24
					})}
				variant="outline"
				class="w-full shadow-none"
			>
				{use24
					? time.start.slice(11, 16)
					: new Date(time.start).toLocaleTimeString('en-UK', {
							hour: 'numeric',
							minute: '2-digit',
							hour12: true
						})}
			</Button>
		{/each}
	</div>
</div>
