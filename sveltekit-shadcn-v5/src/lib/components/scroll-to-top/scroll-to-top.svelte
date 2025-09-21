<script lang="ts">
	import { onMount } from 'svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { t } from '$lib/i18n';
	import { direction } from '$lib/stores';
	import { ChevronUp } from '@lucide/svelte';
	import { Elements } from '$lib/enums/elements';
	import { afterNavigate } from '$app/navigation';

	let showButton = $state(false);
	let scrollContainer: Element | null = null;

	afterNavigate(() => {
		scrollToTop();
	});

	onMount(() => {
		scrollContainer = document.getElementById(Elements.ScrollableContent);

		if (!scrollContainer) {
			scrollContainer = document.documentElement;
		}

		const handleScroll = () => {
			const scrollTop =
				scrollContainer === document.documentElement
					? window.scrollY
					: scrollContainer?.scrollTop || 0;

			showButton = scrollTop > 200;
		};

		if (scrollContainer === document.documentElement) {
			window.addEventListener('scroll', handleScroll);
			return () => window.removeEventListener('scroll', handleScroll);
		} else {
			scrollContainer?.addEventListener('scroll', handleScroll);
			return () => scrollContainer?.removeEventListener('scroll', handleScroll);
		}
	});

	function scrollToTop() {
		if (scrollContainer === document.documentElement) {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} else {
			scrollContainer?.scrollTo({ top: 0, behavior: 'smooth' });
		}
	}
</script>

{#if showButton}
	<Button
		variant="outline"
		size="icon"
		class="fixed bottom-6 z-50 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl {$direction ===
		'lr'
			? 'right-6'
			: 'left-6'}"
		onclick={scrollToTop}
		aria-label={$t('common.scroll_to_top')}
	>
		<ChevronUp size={16} />
	</Button>
{/if}
