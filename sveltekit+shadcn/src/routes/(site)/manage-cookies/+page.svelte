<script>
	import { CookieManagerDefaultConfiguration } from "$lib/client/manage-cookies/configuration";
	import { Button } from "$lib/components/ui/button";
	import { Label } from "$lib/components/ui/label";
	import { Switch } from "$lib/components/ui/switch";

  function saveChanges() {

  }

  function rejectAll() {

  }
</script>

<h1 class="text-2xl">Manage cookie preferences</h1>
<article class="prose prose-xl text-primary text-justify">
  When you visit any of our websites, it may store or retrieve information on your browser, mostly in the form of cookies. This information might be about you, your preferences or your device and is mostly used to make the site work as you expect it to. The information does not usually directly identify you, but it can give you a more personalized web experience. Because we respect your right to privacy, you can choose not to allow some types of cookies. Click on the different category headings to find out more and manage your preferences. Please note, blocking some types of cookies may impact your experience of the site and the services we are able to offer.
</article>
<div class="flex flex-col gap-6">
  {#each CookieManagerDefaultConfiguration['cookies-categories'] as cookieCategory}
    <section class="border rounded-md p-2 prose prose-xl text-primary text-justify prose-headings:text-primary">
      <section class="flex flex-row justify-between items-center">
        <h2 class="text-xl mt-1 capitalize">{cookieCategory["category-name"]}</h2>
        <div class="flex items-center space-x-2">
          <Switch id={cookieCategory["category-name"]} checked={!cookieCategory.rejected} />
          <Label for={cookieCategory["category-name"]}>Accepted</Label>
        </div>
      </section>
      <p>{cookieCategory["description"]}</p>
    </section>
  {/each}
  <section class="flex flex-row items-center justify-center gap-4">
    <Button variant="secondary" size="lg" on:click={saveChanges}>Save changes</Button>
    <Button variant="destructive" size="lg" on:click={rejectAll}>Reject all</Button>
  </section>
</div>