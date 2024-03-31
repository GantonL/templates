<script>
	import { AppName } from "$lib/consts";
	import { PoliciesLinksConfiguration } from "./configurations";

</script>
<footer class="flex flex-col items-center w-full text-secondary-foreground/50 bg-secondary/50">
  <div class="flex flex-col items-center w-full gap-4 p-12">
    <section class="text-center">Copyright &#169; {new Date().getFullYear()} {AppName}, All rights reserved.</section>
    <section class="flex flex-row flex-wrap items-center justify-center gap-2">
      {#each PoliciesLinksConfiguration as link, i (i)}
        <a href={link.link} class="text-center underline underline-offset-2">
          <span class="flex flex-row items-center gap-2">
            {#if link.icon}
              <svelte:component this={link.icon} size=16/>
            {/if}
            {link.label}
          </span>
        </a>
        {#if i < PoliciesLinksConfiguration.length - 1}
          <span>|</span>
        {/if}
      {/each}
    </section>
  </div>
  <section class="text-center">Built & Designed by Guy Lahav | Powered by SvelteKit</section>
</footer>