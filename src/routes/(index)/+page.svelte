<script lang="ts">
  import EventPicker from "./pageComponents/EventPicker/EventPicker.svelte"; 
  let { data } = $props()
</script>


<div class="mt-24 bg-background flex items-center justify-center p-4 md:p-8">
  <EventPicker 
    selectedDay={data.availability.selectedDay}
    currentMonth={data.availability.month.month}
    availableDates={data.availability.availableDates}
  />
</div>
