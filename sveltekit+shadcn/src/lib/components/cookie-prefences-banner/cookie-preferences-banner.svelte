<script lang="ts">
	import { goto } from "$app/navigation";
  import * as Card from "$lib/components/ui/card";
	import { Cookie } from "lucide-svelte";
	import Button from "../ui/button/button.svelte";
	import { CookieManagerConfiguration } from "$lib/manage-cookies/configuration";
	import { cookieSetRequest } from "$lib/manage-cookies/manager";
	import { toast } from "svelte-sonner";
  export let open: boolean;
  export let preferences: Record<string, boolean>;

  function setCookiesPreferences(acceptAll: boolean) {
    Object.keys(preferences).forEach(key => {
      preferences[key] = acceptAll;
    });
    cookieSetRequest({[CookieManagerConfiguration['user-preference-cookie-name']]: JSON.stringify(preferences)})
    toast.success('Cookie preferences saved');
    removeBanner();
  }

  function removeBanner() {
    open = false;
    cookieSetRequest({['show-manage-cookies-banner']: JSON.stringify(undefined)})
  }
  
</script>
<div class="fixed bottom-6 left-6 p-4 z-50 mr-6 max-w-[420px]" class:hidden={!open}>
  <Card.Root>
    <Card.Header>
      <Card.Title>
        <div class="flex flex-row gap-4 items-center">
          <Cookie /> Cookie preferences
        </div>
      </Card.Title>
      <Card.Description>
        <div class="text-primary">
          By clicking “Accept all cookies”, you agree My Brand can store cookies on your device and disclose information in accordance with our <a href="/policies/cookies" class="underline inderline-offset-2 text-muted-foreground">Cookie Policy.</a>
        </div>
      </Card.Description>
    </Card.Header>
    <Card.Footer>
      <div class="flex flex-col gap-2">
        <div class="flex flex-row flex-wrap gap-2">
          <Button variant="default" class="flex-grow" on:click={() => setCookiesPreferences(true)}>Accept all cookies</Button>
          <Button variant="default" class="flex-grow" on:click={() => setCookiesPreferences(false)}>Necessary cookies only</Button>
        </div>
        <Button variant="secondary" on:click={() => {
            goto('/manage-cookies');
            open = false;
          }
        }>Manage preferences</Button>
      </div>
    </Card.Footer>
  </Card.Root>
</div>
