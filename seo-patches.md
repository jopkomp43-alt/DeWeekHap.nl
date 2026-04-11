# SEO Patches toegepast op index.html

Deze patches moeten handmatig worden toegepast op index.html:

## Patch 1 — Canonical tag toevoegen (in <head>, na <!-- SEO Optimalisatie -->)
```html
<link rel="canonical" href="https://www.deweekhap.nl/" />
```

## Patch 2 — Nep aggregateRating verwijderen (uit JSON-LD script)
Verwijder dit blok volledig:
```json
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127"
  },
```

## Patch 3 — translatedTitle bug fixen
Verander:
```js
title: translatedTitle,
```
Naar:
```js
title: translateText(meal.strMeal),
```

## Patch 4 — Dubbele googleTranslateElementInit verwijderen
Verwijder het tweede blok onderaan (na de lang-switcher code):
```js
function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'nl',
    autoDisplay: false
  }, 'google_translate_element');
}
```
En ook de bijbehorende `<script src="//translate.google.com/..."></script>` tag eronder.
