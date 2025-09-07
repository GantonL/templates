import locale from '$lib/hooks/locale';
import { sequence } from '@sveltejs/kit/hooks';
import { handle as authHandle } from '$lib/server/auth/handle';

export const handle = sequence(locale, authHandle);
