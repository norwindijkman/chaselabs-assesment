<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils.js';
	import { Calendar as CalendarPrimitive } from 'bits-ui';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: CalendarPrimitive.DayProps = $props();
</script>

<CalendarPrimitive.Day
	bind:ref
	class={cn(
		buttonVariants({ variant: 'ghost' }),
		'flex size-(--cell-size) flex-col items-center justify-center gap-1 bg-accent/50 p-0 leading-none font-normal whitespace-nowrap select-none hover:!bg-accent',
		"data-today:relative data-today:after:absolute data-today:after:bottom-2 data-today:after:left-1/2 data-today:after:h-1.5 data-today:after:w-1.5 data-today:after:-translate-x-1/2 data-today:after:rounded-full data-today:after:bg-primary data-today:after:content-['']",
		'data-[selected]:bg-primary data-[selected]:!text-primary-foreground hover:data-[selected]:!bg-primary dark:data-[selected]:hover:bg-accent/50',
		// Outside months
		'[&[data-outside-month]:not([data-selected])]:text-muted-foreground [&[data-outside-month]:not([data-selected])]:hover:text-accent-foreground',
		// Disabled
		'data-[disabled]:cursor-default data-[disabled]:!bg-transparent data-[disabled]:opacity-100',
		// Unavailable
		'data-[unavailable]:cursor-default data-[unavailable]:!bg-transparent data-[unavailable]:opacity-100',
		// hover
		'dark:hover:text-accent-foreground',
		// focus
		'focus:relative focus:border-ring focus:ring-ring/50',
		// inner spans
		'[&>span]:text-xs [&>span]:opacity-70',
		className
	)}
	{...restProps}
/>
