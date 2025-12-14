<script lang="ts">
  import MeetingInfo from './MeetingInfo.svelte'
	import * as Card from "$lib/components/ui/card/index.js";
	import Calendar from "$lib/components/ui/calendar/calendar.svelte";
	import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date";
	import type { AvailabilityByDay } from '../../loadAvailability/loadAvailability';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import TimePicker from './TimePicker.svelte';

  let {
    selectedDay,
    currentMonth,
    availableDates,
  }: {
    selectedDay?: `${number}-${number}-${number}`
    currentMonth: `${number}-${number}`
    availableDates: AvailabilityByDay
  } = $props()

  const todayDate = today(getLocalTimeZone());
  const dateStrToCalendarDate = (dateStr: string) => {
    const nums = dateStr.split('-').map(num => Number(num))
    return new CalendarDate(nums[0], nums[1], nums[2]||1)
  }

  let value = $derived(selectedDay 
    ? dateStrToCalendarDate(selectedDay)
    : undefined
  )

  $inspect(availableDates)
</script>

<Card.Root class="gap-0 p-0">
	<Card.Content class="relative md:flex p-0 md:pe-56">
    <MeetingInfo />
		<div class="p-6">
			<Calendar
        weekStartsOn={1}
				type="single"
        placeholder={dateStrToCalendarDate(currentMonth)}
				bind:value
        minValue={todayDate}
				isDateUnavailable={(date) => !availableDates[date.toString()]?.length}
				class="
          bg-transparent p-0 [--cell-size:--spacing(10)] 
          md:[--cell-size:--spacing(12)] [&_[data-outside-month]]:opacity-0
        "
				weekdayFormat="short"
        onPlaceholderChange={dateValue => {
          const currentMonth = `${dateValue.year}-${dateValue.month.toString().padStart(2, "0")}`
          const newUrl = new URL(page.url)
          if (todayDate.toString().slice(0, 7) === currentMonth) {
            newUrl.searchParams.delete('month')
          } else {
            newUrl.searchParams.set('month', `${dateValue.year}-${dateValue.month.toString().padStart(2, "0")}`)
          }
          goto(newUrl, {
            keepFocus: true,
            replaceState: false,
            noScroll: true,
          })
        }}
			/>
		</div>
    {#if value}
      <div
        class="no-scrollbar inset-y-0 end-0 flex max-h-72 w-full scroll-pb-6 flex-col gap-4 overflow-y-auto border-t p-6 md:absolute md:max-h-none md:w-56 md:border-s md:border-t-0"
      >
        <TimePicker 
          timeSlots={availableDates[value.toString()]} 
          currentDate={value}
        />
      </div>
    {/if}
	</Card.Content>
</Card.Root>
