import { AvailableLocals } from '$lib/enums/available-locales';
import type { MarkdownResource } from '$lib/models/markdown';

export const MarkdownResources: Record<string, MarkdownResource> = {
	[`site-terms-${AvailableLocals.English_US}`]: {
		file: import.meta.glob('./en-US/site-terms.md', { eager: true }),
		path: `./${AvailableLocals.English_US}/site-terms.md`
	},
	[`privacy-policy-${AvailableLocals.English_US}`]: {
		file: import.meta.glob('./en-US/privacy-policy.md', { eager: true }),
		path: `./${AvailableLocals.English_US}/privacy-policy.md`
	},
	[`cookies-policy-${AvailableLocals.English_US}`]: {
		file: import.meta.glob('./en-US/cookies-policy.md', { eager: true }),
		path: `./${AvailableLocals.English_US}/cookies-policy.md`
	},
	[`site-terms-${AvailableLocals.Hebrew}`]: {
		file: import.meta.glob('./he/site-terms.md', { eager: true }),
		path: `./${AvailableLocals.Hebrew}/site-terms.md`
	},
	[`privacy-policy-${AvailableLocals.Hebrew}`]: {
		file: import.meta.glob('./he/privacy-policy.md', { eager: true }),
		path: `./${AvailableLocals.Hebrew}/privacy-policy.md`
	},
	[`cookies-policy-${AvailableLocals.Hebrew}`]: {
		file: import.meta.glob('./he/cookies-policy.md', { eager: true }),
		path: `./${AvailableLocals.Hebrew}/cookies-policy.md`
	}
};
