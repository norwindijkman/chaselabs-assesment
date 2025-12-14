<script lang="ts">
	import EventPicker from './pageComponents/EventPicker/EventPicker.svelte';
	let { data } = $props();
</script>

<div class="flex items-center justify-center bg-background p-4 sm:mt-24 md:p-8">
	<EventPicker
		selectedDay={data.availability.selectedDay}
		currentMonth={data.availability.month.month}
		availableDates={data.availability.availableDates}
	/>
</div>
