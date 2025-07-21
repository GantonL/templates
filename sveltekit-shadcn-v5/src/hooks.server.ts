import locale from '$lib/hooks/locale';
import { sequence } from '@sveltejs/kit/hooks';

export const handle = sequence(locale);
