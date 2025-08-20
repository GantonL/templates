<script lang="ts">
	import { createAvatar, type Style } from '@dicebear/core';
	import { adventurer } from '@dicebear/collection';
	import * as Avatar from '../ui/avatar';

	let {
		id,
		size,
		src,
		collection,
		styleClass
	}: {
		id?: string;
		size?: number;
		src?: string;
		collection?: Style<{
			size: number;
			seed: string;
		}>;
		styleClass?: string;
	} = $props();
	let avatar =
		src ??
		createAvatar(collection ?? adventurer, {
			size: size ?? 128,
			seed: id ?? crypto.randomUUID()
		}).toDataUri();
</script>

<Avatar.Root class={styleClass} {id}>
	<Avatar.Image src={avatar} alt="Avatar" />
	<Avatar.Fallback></Avatar.Fallback>
</Avatar.Root>
