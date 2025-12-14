<script lang="ts">
	import { enhance } from '$app/forms';
	import { fade, scale } from 'svelte/transition';
	import MeetingInfo from '../MeetingInfo.svelte';
	import { Button } from "$lib/components/ui/button";
	import type { SelectedTimeSlot } from '../../../loadAvailability/loadAvailability';
	
	let { 
    selectedTimeSlot,
    isOpen = false, 
    close,
  } = $props<{ 
    selectedTimeSlot: SelectedTimeSlot
		isOpen: boolean; 
		close: () => void 
	}>();

	let isSubmitting = $state(false);
	let isSuccess = $state(false);
  let errorMsg = $state('')
  let formElem = $state<HTMLFormElement|null>(null);

  const handleClose = () => {
    isSuccess = false
    errorMsg = ''
    close()
  }
	
	// Close on Escape key
	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && isOpen) handleClose();
	}

  // Focus on first element
  $effect(() => {
    if (!isOpen || !formElem) return
    const focusElem = Array.from(formElem.querySelectorAll<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>
      ('input, textarea')).find(el => !(el.value?.trim()))
    focusElem?.scrollIntoView({
      block: 'center',
      inline: 'nearest',
      behavior: 'instant',
    });
    focusElem?.focus({ preventScroll: true });
  })
</script>

<svelte:window onkeydown={handleKeydown} />

<div 
  class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
  class:hidden={!isOpen}
  role="dialog"
  aria-modal="true"
>
  <!-- Backdrop -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div 
    class="absolute inset-0 bg-ink-900/60 backdrop-blur-sm transition-opacity"
    onclick={handleClose}
    transition:fade={{ duration: 200 }}
  ></div>

  <!-- Modal Panel -->
  <div 
    class="relative w-full max-w-lg overflow-hidden max-h-[75vh] overflow-y-auto rounded-2xl bg-white shadow-2xl ring-1 ring-black/5"
    transition:scale={{ duration: 200, start: 0.95 }}
  >
    
    {#if isSuccess}
      <!-- Success State -->
      <div class="p-10 text-center" in:fade>
        <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 class="mt-4 text-lg font-bold text-gray-900">Your meeting with <b>ACME</b> is confirmed</h3>
        <p class=" mt-2 text-sm text-gray-500">
          You’ll receive a calendar invite and confirmation email shortly with all the details.
          If you need to reschedule or cancel, you can do so from the link in the email.
        </p>
        <div class="mt-6">
          <button
            onclick={handleClose}
            class="
              w-full rounded-lg bg-gray-100 px-4 py-2.5 text-sm font-semibold text-gray-900 
              hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300
              cursor-pointer
            "
          >
            Close
          </button>
        </div>
      </div>
    {:else}
      <!-- Form State -->
      <form 
        method="POST" 
        class="p-6 sm:p-8"
        bind:this={formElem}
        use:enhance={() => {
          isSubmitting = true;
          return async ({ result }) => {
            isSubmitting = false;
            if (result.type === 'success') {
              isSuccess = true;
            } else if (result.type === 'error') {
              errorMsg = 'Something went wrong'
            } else if (result.type === 'failure') {
              errorMsg = result.data?.['errorMsg'] as string || 'Something went wrong'
            }
          };
        }}
      >
        <button 
          type="button" 
          onclick={handleClose} 
          class="absolute top-6 right-6 text-gray-400 hover:text-gray-500 cursor-pointer"
        >
          <span class="sr-only">Close</span>
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <MeetingInfo {selectedTimeSlot} />

        <div class="space-y-4 mt-4">

          <input hidden name="start" value={selectedTimeSlot?.timeSlot.start} />
          <input hidden name="end" value={selectedTimeSlot?.timeSlot.end} />

          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Your name *</label>
            <input 
              type="text" 
              name="name" 
              autocomplete="name"
              required 
              class="mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-600 focus:ring-primary-600 sm:text-sm" 
            />
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Your email *</label>
            <input 
              type="text" 
              name="email" 
              autocomplete="email"
              required 
              class="mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-600 focus:ring-primary-600 sm:text-sm" 
            />
          </div>

          <div>
            <label for="message" class="block text-sm font-medium text-gray-700">Meeting notes</label>
            <textarea 
              name="message" 
              rows="2" 
              placeholder="Add any details that may help us prepare for our meeting" 
              class="mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-600 focus:ring-primary-600 sm:text-sm"
            ></textarea>
          </div>

          {#if errorMsg}
            <p class="mt-2 text-sm text-red-600">
              {errorMsg}
            </p>
          {/if}

        </div>

        <div class="mt-6 flex">
          <Button 
            type="submit"
            disabled={isSubmitting}
            variant="default" 
            class="ml-auto"
          >
            Confirm
          </Button>
        </div>
      </form>
    {/if}
  </div>
</div>
