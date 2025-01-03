import { init, register } from "svelte-i18n"
import { browser } from "$app/environment"

const defaultLocale = "de"

register("en", () => import("./locales/en.json"))
register("de", () => import("./locales/de.json"))

init({
  fallbackLocale: defaultLocale,
  initialLocale: browser ? window.navigator.language : defaultLocale
})
