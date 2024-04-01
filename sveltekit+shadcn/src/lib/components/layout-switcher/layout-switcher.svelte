<script lang="ts">
  import { LayoutMode } from "$lib/client/stores";
	import type { Layout } from "$lib/types/layout";
	import Button from "../ui/button/button.svelte";
	import { Skeleton } from "../ui/skeleton";

  function switchLayout(layout: Layout) {
    $LayoutMode = layout;
  }
</script>
<div class="flex flex-col gap-2 items-center">
  <h2 class="text-xl">Choose a layouts</h2>
  <div class="flex flex-row flex-wrap justify-center p-2 gap-2 bg-muted-foreground/50 rounded-md">
    <Button on:click={() => switchLayout('vertical-left')} variant="ghost" class="w-fit h-fit hover:bg-muted-foreground/20">
      <div class="flex flex-col gap-2">
        <h3>Vertical Left</h3>
        <div class="flex flex-col border-2 rounded-md p-2 gap-1 h-40 aspect-video" class:border-accent-foreground={$LayoutMode === 'vertical-left'}>
          <div class="h-6 border rounded-sm flex flex-row items-center justify-end gap-1 px-1">
            <Skeleton class="w-4 h-4 rounded-full" />
            <Skeleton class="w-4 h-4 rounded-full" />
          </div>
          <div class="h-28 flex flex-row gap-1">
            <Skeleton class="w-4 h-full" />
            <div class="h-full flex-grow border rounded-sm">
              <div class="h-3/4"></div>
              <div class="h-1/4 border-t"></div>
            </div>
          </div>
        </div>
      </div>
    </Button>
    <Button on:click={() => switchLayout('horizontal-bottom')} variant="ghost" class="w-fit h-fit hover:bg-muted-foreground/20">
      <div class="flex flex-col gap-2">
        <h3>Horizontal bottom</h3>
        <div class="flex flex-col border-2 rounded-md p-2 gap-1 h-40 aspect-video" class:border-accent-foreground={$LayoutMode === 'horizontal-bottom'}>
          <div class="h-6 border rounded-sm flex flex-row items-center justify-end gap-1 px-1">
            <Skeleton class="w-4 h-4 rounded-full" />
            <Skeleton class="w-4 h-4 rounded-full" />
          </div>
          <div class="h-28 border rounded-sm flex flex-row gap-1 p-1">
            <div class="h-full flex-grow">
              <div class="h-3/4"></div>
              <div class="h-1/4 border-t flex items-center justify-center">
                <Skeleton class="w-12 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Button>
    <Button on:click={() => switchLayout('horizontal-top')} variant="ghost" class="w-fit h-fit hover:bg-muted-foreground/20">
      <div class="flex flex-col gap-2">
        <h3>Horizontal top</h3>
        <div class="flex flex-col border-2 rounded-md p-2 gap-1 h-40 aspect-video" class:border-accent-foreground={$LayoutMode === 'horizontal-top'}>
          <div class="h-6 border rounded-sm grid grid-cols-3 gap-1 px-1">
            <div></div>
            <div class="flex items-center justify-center">
              <Skeleton class="w-12 h-4" />
            </div>
            <div class="flex flex-row items-center justify-end gap-1">
              <Skeleton class="w-4 h-4 rounded-full" />
              <Skeleton class="w-4 h-4 rounded-full" />
            </div>
          </div>
          <div class="h-28 border rounded-sm flex flex-row gap-1 p-1">
            <div class="h-full flex-grow">
              <div class="h-3/4"></div>
              <div class="h-1/4 border-t"></div>
            </div>
          </div>
        </div>
      </div>
    </Button>
  </div>

</div>
