<script lang="ts">
  import Cal from '$lib/components/calendar-20.svelte'
  let { data } = $props()

  $inspect(data)
</script>


<div class="mt-24 bg-background flex items-center justify-center p-4 md:p-8">
  <Cal />
</div>
