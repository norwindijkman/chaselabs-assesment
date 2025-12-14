<script lang="ts">
	import type { AvailabilityByDay } from '../../loadAvailability/loadAvailability';
	import acmaLogo from '$lib/assets/acma-logo.svg';

	let {
		selectedTimeSlot
	}: {
		selectedTimeSlot?: {
			timeSlot: AvailabilityByDay[string][number];
			use24: boolean;
		};
	} = $props();

	const formatTimeRange = (timeSlot: AvailabilityByDay[string][number], use24: boolean) => {
		const { start, end } = timeSlot;

		const startDate = new Date(start);
		const endDate = new Date(end);

		const dateFormatter = new Intl.DateTimeFormat('en-UK', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			timeZone: 'UTC'
		});

		const timeFormatter = new Intl.DateTimeFormat('en-UK', {
			hour: 'numeric',
			minute: '2-digit',
			hour12: !use24,
			timeZone: 'UTC'
		});

		const datePart = dateFormatter.format(startDate);
		const timePart = `${timeFormatter.format(startDate)} – ${timeFormatter.format(endDate)}`;

		return `${datePart}\n${timePart}`;
	};
</script>

<div>
	<div>
		<img class="mb-6" width="128" height="32" alt="ACMA" src={acmaLogo} />
		<div
			class:hidden={selectedTimeSlot}
			class:sm:flex={selectedTimeSlot}
			class:flex={!selectedTimeSlot}
			class="mb-4 -space-x-2"
		>
			<div
				class="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background text-xs font-medium text-foreground"
				title="Company"
				style="background-color: rgb(99, 102, 241);"
			>
				C
			</div>
			<div
				class="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background text-xs font-medium text-foreground"
				title="Peter"
				style="background-color: rgb(245, 158, 11);"
			>
				P
			</div>
			<div
				class="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background text-xs font-medium text-foreground"
				title="Sales Rep"
				style="background-color: rgb(16, 185, 129);"
			>
				S
			</div>
		</div>
		<h1 class="mb-1 text-xl leading-tight font-semibold text-foreground">
			ACME — Introductory Meeting
		</h1>
	</div>
	<p class:hidden={selectedTimeSlot} class="text-sm leading-relaxed text-muted-foreground">
		A 30-minute introductory call to learn more about your needs and explore how ACME can help.
		You’ll be meeting with a member of the ACME team to discuss next steps and answer any questions
		you may have.
	</p>
	<div class="mt-3 flex flex-col gap-3">
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
					<path
						d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"
					/>
				</svg>
				<span class="text-sm font-semibold"
					>{formatTimeRange(selectedTimeSlot.timeSlot, selectedTimeSlot.use24)}</span
				>
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
				<circle cx="12" cy="12" r="10"></circle>
				<polyline points="12 6 12 12 16 14"></polyline>
			</svg><span class="text-sm font-semibold">30m</span>
		</div>
		<div class="flex items-center gap-3 text-muted-foreground">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="18px" height="18px"
				><rect
					width="16"
					height="16"
					x="12"
					y="16"
					fill="#fff"
					transform="rotate(-90 20 24)"
				/><polygon fill="#1e88e5" points="3,17 3,31 8,32 13,31 13,17 8,16" /><path
					fill="#4caf50"
					d="M37,24v14c0,1.657-1.343,3-3,3H13l-1-5l1-5h14v-7l5-1L37,24z"
				/><path fill="#fbc02d" d="M37,10v14H27v-7H13l-1-5l1-5h21C35.657,7,37,8.343,37,10z" /><path
					fill="#1565c0"
					d="M13,31v10H6c-1.657,0-3-1.343-3-3v-7H13z"
				/><polygon fill="#e53935" points="13,7 13,17 3,17" /><polygon
					fill="#2e7d32"
					points="38,24 37,32.45 27,24 37,15.55"
				/><path
					fill="#4caf50"
					d="M46,10.11v27.78c0,0.84-0.98,1.31-1.63,0.78L37,32.45v-16.9l7.37-6.22C45.02,8.8,46,9.27,46,10.11z"
				/></svg
			>
			<span class="text-sm font-semibold">Google Meet</span>
		</div>
	</div>
</div>
