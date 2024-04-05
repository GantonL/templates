import { AppName } from "$lib/consts";
import type { ManageCookiesConfiguration } from "$lib/models/manage-cookies-configuration";

export const CookieManagerConfiguration: ManageCookiesConfiguration = {
  'user-preference-cookie-name': `${AppName.split(' ').join('-')}-user-preferences`,
  'show-manage-cookies-banner': true,
  'user-preference-cookies-expiry-days': 365,
  'cookies-categories': [
    {
      name: "essential",
      optional: false,
      accepted: true,
      description: 'We use these essential cookies to perform essential website functions and to provide the services. These cookies enable us to improve performance and user experience. These cookies are necessary for the website to work.',
      cookies: [
        "essential-cookie",
      ],
    },
    {
      name: "analytics",
      optional: true,
      accepted: true,
      description: 'We allow third parties to use analytics cookies to understand how you use the website so we can make it better. Analytics cookies are used to gather information about the pages you visit.',
      cookies: [
        "_ga",
        "_gtm"
      ]
    },
    {
      name: "advertising",
      optional: true,
      accepted: true,
      description: 'We and third parties use advertising cookies to show you new ads based on ads you have already seen. Cookies also track which ads you click or purchases you make after clicking an ad. This is done to show you ads that are more relevant to you and for business purposes with our advertising partners.',
      cookies: [
        "advertising-cookie"
      ]
    } 
  ]
}