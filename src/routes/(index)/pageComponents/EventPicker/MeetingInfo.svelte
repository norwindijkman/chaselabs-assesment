<script lang="ts">
	import type { AvailabilityByDay } from "../../loadAvailability/loadAvailability";

  let { 
    selectedTimeSlot,
  }: {
    selectedTimeSlot?: {
      timeSlot: AvailabilityByDay[string][number], 
      use24: boolean
    }
  } = $props()

  const formatTimeRange = (
    timeSlot: AvailabilityByDay[string][number], use24: boolean ) => {
    const {
        start,
        end
    } = timeSlot;

    const startDate = new Date(start);
    const endDate = new Date(end);

    const dateFormatter = new Intl.DateTimeFormat(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const timeFormatter = new Intl.DateTimeFormat(undefined, {
      hour: "numeric",
      minute: "2-digit",
      hour12: !use24,
    });

    const datePart = dateFormatter.format(startDate);
    const timePart = `${timeFormatter.format(startDate)} – ${timeFormatter.format(endDate)}`;

    return `${datePart}\n${timePart}`;
  };
</script>

<div>
    <div>
        <p class="mb-2 text-sm text-muted-foreground">ChaseLabs</p>
        <div class="mb-4 flex -space-x-2">
            <div
                class="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background text-xs font-medium text-foreground"
                title="Company"
                style="background-color: rgb(99, 102, 241);"
            >
                C
            </div>
            <div
                class="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background text-xs font-medium text-foreground"
                title="Maya"
                style="background-color: rgb(245, 158, 11);"
            >
                M
            </div>
            <div
                class="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background text-xs font-medium text-foreground"
                title="Jacob"
                style="background-color: rgb(16, 185, 129);"
            >
                J
            </div>
        </div>
        <h1 class="text-xl leading-tight font-semibold text-foreground mb-1">
            Senior Design Engineer - Intro Call
        </h1>
    </div>
    <p class="mb-2 text-sm leading-relaxed text-muted-foreground">
        Intro call (30 minutes)- you'll meet <a
            href="#"
            class="text-primary hover:underline"
        >some of the team</a>
        (<a
            href="#"
            class="text-primary hover:underline"
        >Maya</a> and
        <a
            href="#"
            class="text-primary hover:underline"
        >Jacob</a>), and we get to know more about you
        and your experience.
    </p>
    <div class="flex flex-col gap-3">
      {#if selectedTimeSlot}
        <div class="flex items-center gap-3 text-muted-foreground">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="18"
            height="18"
            viewBox="0 -960 960 960" 
            fill="currentColor"
            class="relative bottom-px"
          >
            <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"/>
          </svg>
          <span class="text-sm">{formatTimeRange(selectedTimeSlot.timeSlot, selectedTimeSlot.use24)}</span>
        </div>
      {/if}
        <div class="flex items-center gap-3 text-muted-foreground">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-clock h-4 w-4"
            >
                <circle
                    cx="12"
                    cy="12"
                    r="10"
                ></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
            </svg><span class="text-sm">30m</span>
        </div>
        <div class="flex items-center gap-3 text-muted-foreground">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-link2 h-4 w-4"
            >
                <path d="M9 17H7A5 5 0 0 1 7 7h2"></path>
                <path d="M15 7h2a5 5 0 1 1 0 10h-2"></path>
                <line
                    x1="8"
                    x2="16"
                    y1="12"
                    y2="12"
                ></line>
            </svg><span class="text-sm">Organizer's default app</span>
        </div>
    </div>
</div>
