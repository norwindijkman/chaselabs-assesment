<script lang="ts">
	import MeetingInfo from './MeetingInfo.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import Calendar from '$lib/components/ui/calendar/calendar.svelte';
	import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date';
	import type { AvailabilityByDay } from '../../loadAvailability/loadAvailability';
	import TimePicker from './TimePicker.svelte';

	let {
		selectedDay,
		currentMonth,
		availableDates
	}: {
		selectedDay?: `${number}-${number}-${number}`;
		currentMonth: `${number}-${number}`;
		availableDates: AvailabilityByDay;
	} = $props();

	const todayDate = today(getLocalTimeZone());
	const dateStrToCalendarDate = (dateStr: string) => {
		const nums = dateStr.split('-').map((num) => Number(num));
		return new CalendarDate(nums[0], nums[1], nums[2] || 1);
	};

	let value = $derived(selectedDay ? dateStrToCalendarDate(selectedDay) : undefined);
</script>

<Card.Root class="gap-0 p-0">
	<Card.Content class="relative divide-y p-0 lg:flex lg:divide-x lg:divide-y-0">
		<div class="flex flex-col gap-6 p-6 lg:max-w-[320px] lg:min-w-[280px]">
			<MeetingInfo />
		</div>
		<div class="grid divide-y md:grid-cols-2 md:divide-x md:divide-y-0 lg:flex">
			<div class="p-6">
				<Calendar
					weekStartsOn={1}
					type="single"
					placeholder={dateStrToCalendarDate(currentMonth)}
					bind:value
					minValue={todayDate}
					isDateUnavailable={(date) => !availableDates[date.toString()]?.length}
					class="
            mx-auto max-w-88 bg-transparent p-0 [--cell-size:--spacing(10)]
            md:[--cell-size:--spacing(12)] [&_[data-outside-month]]:opacity-0
          "
					weekdayFormat="short"
				/>
			</div>
			{#if value}
				<div
					class="
            no-scrollbar inset-y-0 end-0 flex max-h-72 w-full scroll-pb-6 flex-col gap-4 overflow-y-auto
            p-6 md:max-h-none md:w-56
          "
				>
					<TimePicker timeSlots={availableDates[value.toString()]} currentDate={value} />
				</div>
			{/if}
		</div>
	</Card.Content>
</Card.Root>
