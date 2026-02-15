import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
  const locale = "en"; // You can determine the locale based on the request or user preferences

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
