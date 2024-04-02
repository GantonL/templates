interface CookieCategory {
  "category-name": 'essential' | 'analytics' | 'advertising',
  optional: boolean,
  description: string;
  rejected: boolean;
  cookies?: string[],
}

export interface ManageCookiesConfiguration {
  'user-preference-cookies-expiry-days': number;
  'show-manage-cookies-banner': boolean;
  'cookies-categories': CookieCategory[];
}
