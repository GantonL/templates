import { AvailableLocals } from '$lib/enums/available-locales';
import { error, type Handle } from '@sveltejs/kit';

const locale: Handle = async ({ event, resolve }) => {
	const lang = event.params['lang'];
	if (lang && !Object.values(AvailableLocals).includes(lang as AvailableLocals)) {
		error(404, 'No such locale');
	}
	const response = await resolve(event);
	return response;
};
export default locale;
