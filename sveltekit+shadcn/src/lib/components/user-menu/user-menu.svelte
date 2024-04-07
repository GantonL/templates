<script lang="ts">
  import * as Avatar from "$lib/components/ui/avatar";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import type { UserMenuItem } from "$lib/models/menu-item";
	import { Button } from "../ui/button";
	import { User, UserRoundCheck, UserX } from "lucide-svelte";
	import { LoggedOutUserMenuConfiguration } from "./configurations";

  export let user: any = null; // Replace with your User model
  let menuItems: UserMenuItem[] = LoggedOutUserMenuConfiguration;

  function onGroupItemClick(item: UserMenuItem) {
    if (item.onClick) {
      item.onClick();
    }
  }
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger asChild let:builder>
    <Button name="User Menu" aria-label="User Menu" variant="ghost" builders={[builder]} class="relative aspect-square rounded-full">
      <Avatar.Root>
        <Avatar.Image src={user?.photoURL} alt={user?.displayName} />
        <Avatar.Fallback>
          {#if user}
            <UserRoundCheck />
          {:else}
            <User />
          {/if}
        </Avatar.Fallback>
      </Avatar.Root>
    </Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content class="w-48" align="end">
    {#if user}
      <div class="bg-secondary/50 text-muted-foreground p-4">
        <DropdownMenu.Label class="font-normal">
          <div class="flex flex-col space-y-1">
            <p class="text-sm font-bold leading-none">{user.displayName || 'Anonymous'}</p>
            {#if user?.email}
              <p class="text-xs leading-none text-muted-foreground">{user.email}</p>
            {/if}
          </div>
        </DropdownMenu.Label>
      </div>
    {/if}
    {#each menuItems as menuItem, i (i)}
      {#if menuItem.group}
        {#if i > 0}
          <DropdownMenu.Separator />
        {/if}
        <DropdownMenu.Group>
          {#each menuItem.group as groupItem}
            <DropdownMenu.Item>
              <a href={groupItem.link} class="flex flex-row gap-2 items-center w-full" on:click={() => onGroupItemClick(groupItem)}>
                {#if groupItem.icon}
                  <svelte:component this={groupItem.icon} size=16/>
                {/if}
                {groupItem.label}
              </a>
            </DropdownMenu.Item>
          {/each}
        </DropdownMenu.Group>
      {/if}      
    {/each}
  </DropdownMenu.Content>
</DropdownMenu.Root>

