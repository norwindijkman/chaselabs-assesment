<script lang="ts">
	import type { AvailabilityByDay } from "../../loadAvailability/loadAvailability";
	import { Button } from "$lib/components/ui/button/index.js";
	import { getLocalTimeZone, type CalendarDate } from "@internationalized/date";

  let {
    timeSlots,
    currentDate,
  }: {
    timeSlots: AvailabilityByDay[string]
    currentDate: CalendarDate
  } = $props()

  let use24 = $state(true);
</script>

<div>
  <div class="flex items-center justify-between mb-6">
    <h3 class="font-bold text-foreground">
      {currentDate.toDate(getLocalTimeZone()).toLocaleDateString("en-US", {
        weekday: "short",
      })}
      <span class="text-primary">
        {currentDate.toDate(getLocalTimeZone()).toLocaleDateString("en-US", {
          day: "numeric",
        })}
      </span>
    </h3>
    <div class="flex bg-muted rounded-lg p-0.5">
      <button 
        class:bg-background={!use24}
        class:text-foreground={!use24} 
        class:shadow-sm={!use24}
        class:text-muted-foreground={use24}
        class:hover:text-foreground={use24}
        class="cursor-pointer px-2 py-1 text-xs rounded font-medium"
        onclick={() => use24 = false}
      >
        12h
      </button>
      <button 
        class:bg-background={use24}
        class:text-foreground={use24} 
        class:shadow-sm={use24}
        class:text-muted-foreground={!use24}
        class:hover:text-foreground={!use24}
        class="cursor-pointer px-2 py-1 text-xs rounded font-medium"
        onclick={() => use24 = true}
      >
        24h
      </button>
    </div>
  </div>
  <div class="grid gap-2">
    {#each timeSlots as time (time)}
      <Button variant="outline" class="w-full shadow-none">
        {use24
          ? time.start.slice(11, 16)
          : new Date(time.start).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
      </Button>
    {/each}
  </div>
</div>
