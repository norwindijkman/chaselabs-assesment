<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <title>ACME — Introductory Meeting</title>
</svelte:head>

{@render children()}
