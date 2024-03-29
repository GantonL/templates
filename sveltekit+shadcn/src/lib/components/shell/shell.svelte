<script lang="ts">
  import Header from '../header/header.svelte';
	import Footer from '../footer/footer.svelte';
  import { onNavigate } from '$app/navigation';
	import { mainContentScrollEvent } from '$lib/client/stores';
  import * as Tooltip from "../ui/tooltip";
	import { Button } from '../ui/button';
	import { ArrowUp } from 'lucide-svelte';

  export let navigationPath: string = '';
  let scrollable: HTMLElement;
  let scrolled: boolean = false;

  onNavigate((navigation) => {
    //@ts-ignore
    if (!document.startViewTransition) return;

    return new Promise((resolve) => {
      //@ts-ignore
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
	  });
  });

  function onMainContentScrolled(event: Event) {
    mainContentScrollEvent.set(event);
    scrolled = scrollable?.scrollTop > 100;
  }

</script>
<div class="h-[calc(100vh-0.75rem)] overflow-hidden">
  <Header />
  <main class="flex flex-col relative overflow-y-auto overflow-x-hidden h-[calc(100%-56px)]" bind:this={scrollable} on:scroll={(e) => onMainContentScrolled(e)}>
    <div class="flex flex-col items-center m-auto gap-8 p-4 flex-auto">
      <slot />
    </div>
    <Footer />
    <div class="fixed bottom-4 right-4 z-50" class:hidden={!scrolled} class:block={scrolled}>
      <Tooltip.Root>
        <Tooltip.Trigger>
          <Button variant="outline" class="rounded-full" on:click={() => scrollable.scroll({ top: 0, behavior: 'smooth' })} >
            <span class="text-xs"><ArrowUp /></span>
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content>
          Scroll to top
        </Tooltip.Content>
      </Tooltip.Root>
    </div>
  </main>
</div>