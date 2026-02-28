# 🚀 DeWeekHap Taalswitch & Fixes Installatie

## Automatische Installatie (Aanbevolen)

Voeg deze één regel toe aan het **einde van de `<body>` sectie** in `index.html` (vlak voor `</body>`):

```html
<script src="loader.js"></script>
```

## Wat wordt er toegevoegd?

✅ **Taalswitch (NL/EN)** - Gebruikers kunnen kiezen tussen Nederlands en Engels voor internationale recepten  
✅ **Wit scherm fix** - Verwijdert eventuele loading issues  
✅ **Recepten vertaling** - TheMealDB recepten worden automatisch vertaald  

## Handmatige Installatie (Als je de `<script>` tag niet wilt toevoegen)

### Optie 1: Browser Console (Tijdelijk - voor testen)

Plak dit in de browser console op deweekhap.nl:

```javascript
const script = document.createElement('script');
script.src = 'https://deweekhap.nl/loader.js';
document.body.appendChild(script);
```

### Optie 2: Bookmark (Permanent - zonder code aanpassen)

1. Maak een nieuwe bookmark/favoriet
2. Als URL/locatie, plak:

```javascript
javascript:(function(){const s=document.createElement('script');s.src='https://deweekhap.nl/loader.js';document.body.appendChild(s);})();
```

3. Klik op de bookmark elke keer als je de site bezoekt

## 🎯 De Simpelste Oplossing

Voeg gewoon **één regel** toe aan `index.html`:

**Zoek naar:** `</body>`  
**Voeg hiervoor toe:** `<script src="loader.js"></script>`

**Klaar!** 🎉