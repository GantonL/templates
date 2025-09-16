<script lang="ts">
	import { page } from '$app/state';
	import BasePage from '$lib/components/base-page/base-page.svelte';
	import UserProfileCard from '$lib/components/user-profile-card/user-profile-card.svelte';
</script>

<BasePage title="common.protected" description="seo.pages.example.description">
	<UserProfileCard user={page.data.user} />
</BasePage>
