<script lang="ts">
	import { buttonVariants } from "$lib/components/ui/button/index.js";
	import { cn } from "$lib/utils.js";
	import { Calendar as CalendarPrimitive } from "bits-ui";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: CalendarPrimitive.DayProps = $props();
</script>

<CalendarPrimitive.Day
	bind:ref
	class={cn(
		buttonVariants({ variant: "ghost" }),
		"size-(--cell-size) flex select-none flex-col items-center justify-center gap-1 whitespace-nowrap p-0 font-normal leading-none bg-accent/50 hover:!bg-accent",
		"data-today:relative data-today:after:content-[''] data-today:after:absolute data-today:after:left-1/2 data-today:after:-translate-x-1/2 data-today:after:bottom-2 data-today:after:h-1.5 data-today:after:w-1.5 data-today:after:rounded-full data-today:after:bg-primary",
		"data-[selected]:bg-primary hover:data-[selected]:!bg-primary dark:data-[selected]:hover:bg-accent/50 data-[selected]:!text-primary-foreground",
		// Outside months
		"[&[data-outside-month]:not([data-selected])]:text-muted-foreground [&[data-outside-month]:not([data-selected])]:hover:text-accent-foreground",
		// Disabled
		"data-[disabled]:opacity-100 data-[disabled]:!bg-transparent data-[disabled]:cursor-default",
		// Unavailable
		"data-[unavailable]:opacity-100 data-[unavailable]:!bg-transparent data-[unavailable]:cursor-default",
		// hover
		"dark:hover:text-accent-foreground",
		// focus
		"focus:border-ring focus:ring-ring/50 focus:relative",
		// inner spans
		"[&>span]:text-xs [&>span]:opacity-70",
		className
	)}
	{...restProps}
/>
