<script lang="ts">
  import { page } from '$app/stores';
</script>
<div class="flex items-center justify-center h-80">
  {#if $page?.error}
      <div class="flex flex-col gap-4 border border-destructive/50 bg-accent/50 text-destructive-foreground rounded-lg p-8">
          <h1 class="text-xl">
            Oh no! 
            {#if $page?.status === 404}
              This page probably doesn't exist.
            {:else}
              Something went wrong.
            {/if} 
          </h1>
          <section class="text-destructive-foreground/60">
            {#if $page?.status}
                <p>Error Code: {$page?.status}</p>
            {/if}
            {#if $page?.error?.message}
                <p>Details: {$page?.error?.message}</p>
            {/if}
          </section>
      </div>
  {/if}
</div>