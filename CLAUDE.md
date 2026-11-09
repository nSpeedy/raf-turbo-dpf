# RAF Turbo DPF — Astro Starter Template

## Wizja projektu
Minimalna podstawka (starter) do tworzenia stron internetowych w Astro. Priorytety:
- **Maksymalna prostota** — programista ma szybko zmodyfikować pod dowolny frontend
- **Transformowalność** — starter daje się przekształcić w cokolwiek
- **Gotowość pod CMS** — przygotowany pod dodanie bazy danych, formularzy, dynamicznych treści

## Zasady nadrzędne
1. **Performance above all** — Core Web Vitals na zielono z automatu. Zero JS tam, gdzie wystarczy CSS.
2. **Wysoka personalizacja** — re-branding przez zmienne CSS i propsy komponentów, nigdy przez przepisywanie wnętrza komponentów.
3. **Safe code** — TypeScript strict, zero `any`. Kod czytelny dla następnego developera od pierwszej minuty.
4. **Dostępność to nie opcja** — kontrast WCAG AA, `prefers-reduced-motion`, semantyczny HTML.

## Stack technologiczny
- **Astro 7** (SSR, `output: 'server'`) — framework z adapterem Node.js
- **Tailwind CSS v4** — stylowanie (plugin Vite, nie PostCSS)
- **TypeScript** (strict) — typowanie
- **i18n** — pl (domyślny) + en, routing bez prefiksu dla domyślnego locale
- **Node >= 22.12.0**

## Architektura — kluczowe zasady

### 1. Content-first: `content.ts`
Treści UI/tłumaczenia żyją w `src/lib/content.ts` jako flat key-value pairs. Jedyna funkcja: `useTranslations(locale)`. Dzięki temu:
- Programista edytuje **jeden plik** żeby zmienić treść
- Pełne typowanie (`UiKey`) — TypeScript pilnuje brakujących tłumaczeń
- Przy dodawaniu CMS-a — content.ts zostaje dla statycznych UI strings, dane dynamiczne z bazy

### 2. Zero abstrakcji
- Brak PageRenderer, brak rejestru stron, brak systemu sekcji
- Każda strona to zwykły plik `.astro` — pełna kontrola nad HTML
- Nowa strona = nowy plik w `src/pages/` + import BaseLayout + Tailwind
- Komponenty przyjmują dane przez props, nie z globalnych rejestrów

### 3. Struktura katalogów
```
src/
├── assets/styles/globals.css     # Design tokens, motywy, utility classes, @font-face
├── components/
│   ├── Navbar.astro              # Nav: linki z site.config + przełącznik motywu/języka + menu mobilne; sloty: logo, actions
│   ├── Footer.astro              # Footer: linki z site.config + legal; slot: logo
│   ├── Logo.astro                # Logo + wordmark (jedno źródło — podmień SVG = rebranding)
│   ├── LanguageSwitcher.astro    # Opcjonalny boczny przełącznik języka (nieużywany domyślnie)
│   └── Observer.astro            # IntersectionObserver do animacji scroll-in
├── layouts/
│   └── BaseLayout.astro          # SEO, meta, OG, hreflang, canonical, JSON-LD, ClientRouter; importuje globals.css
├── lib/
│   ├── content.ts                # UI strings / tłumaczenia (useTranslations)
│   ├── i18n.ts                   # Helpery: hreflangTags, canonicalUrl, localizePath
│   ├── locales.ts                # Config: SITE_URL, locales, defaultLocale, LEGAL_LAST_UPDATED
│   ├── site.config.ts            # Nawigacja (nav/footerNav/legalNav) + `business` (telefon, adres, godziny)
│   └── utils.ts                  # Drobne helpery (splitField)
├── middleware.ts                 # Kompresja brotli/gzip odpowiedzi SSR (jedyny middleware)
└── pages/
    ├── index.astro               # Strona główna (pl) — cały landing warsztatu
    ├── privacy.astro, terms.astro
    ├── 404.astro
    ├── api/hello.ts              # Przykładowy API endpoint
    └── en/                       # Pełne lustro powyższych (en)

public/
├── fonts/*.woff2                 # Subsetowane fonty — zero external requests
├── images/photo-*.webp           # Wycinanki części (alfa) — generowane przez scripts/gen-photos.mjs
├── images/texture-*.webp         # Warstwy tła — generowane przez scripts/gen-textures.mjs
├── og-default.jpg                # Domyślna karta OG (1200×630)
├── favicon.svg, favicon.ico
├── robots.txt                    # Otwarty dla Googlebota i AI scraperów
└── llms.txt                      # Streszczenie strony dla AI — uzupełnij per projekt

scripts/
├── gen-og.mjs                    # scripts/og-default.html → public/og-default.jpg
├── gen-hero.mjs                  # scripts/hero-source.jpg → public/images/hero-turbo.webp (kadr + kompresja)
├── gen-photos.mjs                # scripts/photo-*-source.jpg → public/images/photo-*.webp (wycinanka z alfą)
├── hero-source.jpg               # Oryginał zdjęcia hero (poza public/ — nie trafia na serwer)
├── photo-turbo-source.jpg        # Oryginał turbosprężarki → public/images/photo-turbo-original.webp (sharp, bez wycinania; patrz `.hero-bg`)
└── gen-favicon.mjs               # public/favicon.svg → favicon.ico (16/32/48)
```

### 4. Konwencje dodawania nowej strony
1. Dodaj treść do `src/lib/content.ts` (klucze UI dla obu locale)
2. Stwórz `src/pages/nazwa.astro` (pl) i `src/pages/en/nazwa.astro` (en)
3. Zaimportuj `BaseLayout` + `useTranslations` + Navbar + Footer
4. Dodaj link w `src/lib/site.config.ts` (tablica `nav`; ścieżka bez prefiksu locale)
5. Gotowe — zero konfiguracji routingu

### 5. Konwencje dodawania nowego komponentu
1. Plik `src/components/NazwaKomponentu.astro`
2. Props przez interface w frontmatter
3. Stylowanie wyłącznie Tailwind (utility classes) + CSS variables z globals.css
4. Brak client-side JS jeśli nie jest konieczny
5. Jeśli JS musi być — skrypt **processed** (nie `is:inline`), spięty z `astro:page-load`, ze sprzątaniem przez `AbortController`. Inaczej każda nawigacja SPA zostawia kolejny żywy listener

### 6. Design system (globals.css)
- **Jeden motyw** — biało-czerwony, w `:root`. Brak wariantów `[data-theme]`, brak przełącznika, brak `localStorage`. Cała paleta to jeden blok tokenów
- Kontrasty policzone i wpisane w komentarzu przy palecie — **przy zmianie akcentu przelicz je ponownie**. Rampa czerwona startuje od red-500 (3.76:1), bo jaśniejsze czerwienie nie łapią 3:1 na bieli; `--accent-solid` to red-600 (4.83:1), więc jest bezpieczny także dla tekstu
- Szarości są **neutralne**, nie slate — slate ma niebieski odcień, który przy czerwieni czyta się jak brud. Zmieniając rodzinę akcentu, sprawdź też szarości
- **Fonty**: Arimo (tylko H1/H2 — nagłówek hero i tytuły sekcji), Inter (body, H3 i niżej), Orbitron (mono — logo, cyfry/etykiety ASCII; **nazwa w H1 hero jest składana tak samo jak logo w `Logo.astro`: `font-mono font-semibold tracking-tight`**, zmiana jednego wymaga zmiany drugiego), Zen Dots / Doto (display, obecnie nieużywane) — lokalne woff2, zero external requests
- ⚠ **Syncopate i Orbitron nie mają subsetu Latin Extended-A w wadze 700** — polskie znaki w tekście ustawionym tym krojem spadają do innej wagi w środku wyrazu. Nie używaj ich do polskiej treści
- **Utility classes**: `.gradient-text` (płaski czerwony `--accent-solid`, nazwa historyczna), `.theme-card`, `.card-grid`, `.theme-nav`, `.theme-footer`, `.hero-bg`, `.photo-feather`, `.texture-layer` / `.texture-flank` / `.texture-band`
- **Przyciski**: `.theme-cta` (czerwony) i `.theme-ghost` (obrys) + `rounded-control`; geometria (`inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold`) jest w markupie, więc **kopiuj ją 1:1** z istniejących przycisków. Promień zawsze przez token — nigdy `rounded-xl`/`rounded-full`
- **Układ kwadratowy**: `--radius-card` i `--radius-control` = 0 w `:root` (jedyne miejsce, które o tym decyduje). Karty płaskie, cienka ramka, bez cieni; siatki liniowe `.card-grid` (1 px przerwy nad kolorem linii — liczba komórek musi dzielić się przez liczbę kolumn, inaczej zostaje goły prostokąt koloru linii)
- **Tło hero**: sekcja ma `.hero-bg` (`--hero-bg` `#f7f7f9` = średnia kolorów tła zdjęcia). Jest ciemniejsze niż bezpieczne `#fafafa`, więc **w hero wolno używać tylko `text-fg` i `text-muted`** — `text-dim` tam nie przejdzie AA. Zmieniasz zdjęcie → pobierz próbki z jego rogów i zaktualizuj token
- **Tailwind theme bridge** (`@theme inline` w globals.css): tokeny są dostępne jako natywne utility — `text-accent`, `bg-accent/10` (dowolna przezroczystość przez color-mix), `bg-accent-soft`, `bg-surface`, `bg-surface-soft`, `bg-surface-nav`, `text-fg`, `border-line`, `shadow-panel`, `rounded-card`. **Używaj ich zamiast** wartości arbitralnych `bg-[var(--…)]` i inline styles — hardkodowane kolory łamią motywy
- Re-skinning = zmiana zmiennych w `:root`. To jedyne miejsce — jeśli kusi Cię dopisanie drugiego motywu, najpierw sprawdź, czy projekt naprawdę go potrzebuje

## SEO i widoczność (Google + AI scrapery)
Każda strona musi być **samodzielnym, kompletnym dokumentem** — czytelnym bez JS, z pełnym kontekstem semantycznym.

### Fundamenty
- H1, treść główna i meta zawsze w statycznym HTML — nigdy generowane client-side
- **Jeden H1 na stronę**, dalej H2–H6 bez przeskoków (Lighthouse `heading-order` tego pilnuje)
- Canonical i hreflang generowane automatycznie (`src/lib/i18n.ts`), sitemap przez `@astrojs/sitemap`
- `404.astro` ustawia `Astro.response.status = 404` — bez tego Astro zwraca 200 i crawler indeksuje soft-404

### Meta i Open Graph
- Każda strona: unikalny `<title>`, `<meta description>`, `og:*`, `twitter:*`
- `og:image` renderowany **zawsze** — domyślnie `/og-default.jpg` (absolutny URL + `width`/`height`/`alt`). Bez tego linki na LinkedIn/Slack idą bez podglądu
- Kartę regenerujesz po re-brandingu: `npm i -D sharp && node scripts/gen-og.mjs`
- JSON-LD (`Organization`) inline w `BaseLayout` przez `is:inline` — processed script byłby odroczony poza moment czytania dokumentu przez scrapera

### AI scrapery
- `robots.txt` domyślnie otwarty dla GPTBot / ChatGPT-User / ClaudeBot / PerplexityBot / CCBot — blokada tylko na jawną decyzję klienta
- `llms.txt` w root: czym jest strona, dla kogo, główne usługi. Uzupełnij przy każdym nowym projekcie
- Semantyczny HTML (`<main>`, `<article>`, `<section>`, `<nav>`) z sensownymi `aria-label`
- Opisowe teksty linków — zero „kliknij tutaj"
- Zero cloakingu: identyczna treść dla ludzi i botów

## Wydajność — reguły obowiązujące
- **Fonty**: `font-display: swap`, preload tylko wariantów above-the-fold (Arimo var + ext — nagłówek LCP; Inter var + ext — body). Reszta leci lazy przez `unicode-range`. Arimo ext jest wycięty do Latin Extended-A (9 KB zamiast 97 KB)
- **CSS**: `build.inlineStylesheets: 'always'` — zero render-blocking `<link rel=stylesheet>`
- **Animacje tła**: wyłącznie `transform: translate3d` (kompozytowane). `background-position` wymusza paint całego viewportu co klatkę
- Animacje ambientowe gated przez `html.bg-anim`, dokładane przez `Observer` po pierwszym paincie — nie konkurują z LCP
- **`content-visibility: auto`** na sekcjach poniżej folda
- **Reveal on scroll** przez IntersectionObserver — nigdy przez `getBoundingClientRect` w pętli scrolla (wymusza reflow i psuje `content-visibility`)
- `will-change` tylko na czas animacji, sprzątane na `transitionend` — trwałe zostawienie trzyma każdą sekcję w pamięci GPU
- **Mobile**: `backdrop-filter` zdjęty poniżej 768px (blur sticky navbara repaintuje się co klatkę scrolla)
- **Obrazy**: WebP/AVIF, `loading="lazy"` poza foldem, jawne `width`/`height`, opisowy `alt`

## Dostępność
- Kontrast tekstu ≥ 4.5:1 (AA). Tokeny `--color-text-muted` / `--color-text-dim` są policzone — przy zmianie palety **przelicz kontrast**, nie „dobierz na oko"
- Każda animacja ma wariant `prefers-reduced-motion: reduce` (fade-iny, glitch 404, View Transitions)
- Przyciski ikonowe: `aria-label` + `title`. Dropdowny: `aria-expanded` aktualizowane w JS

## Zasady dla developera

### Co ROBIĆ
- Używaj `@/` jako aliasu dla `src/` w importach
- Treści UI zawsze w `content.ts`, nigdy hardkodowane w komponentach
- Nowe strony zawsze w obu locale (pl + en)
- Trzymaj się istniejących tokenów CSS — nowe dodawaj tylko gdy uzasadnione
- Dokumentuj decyzje architektoniczne w logu na dole tego pliku
- Testuj zmiany Lighthouse'em — regresja performance to blocker

### Czego NIE ROBIĆ
- Nie dodawaj middleware — jedyny dozwolony to kompresja w `src/middleware.ts` (nie dotyka routingu ani i18n)
- Nie rób redirectów na domyślnym locale (SEO) ani tłumaczonych slugów (złożoność bez zysku)
- Nie dodawaj JS bez udowodnienia, że nie da się tego zrobić w CSS
- Nie używaj `is:inline` dla skryptów, które mają żyć przez nawigacje SPA — re-egzekucja przy każdym swapie mnoży listenery
- Nie używaj `@apply` — Tailwind v4, utility-first w HTML
- Nie duplikuj URL-i (trailing slash, www/non-www) — jeden canonical
- Nie blokuj AI scraperów w robots.txt bez jawnej decyzji klienta

## Wyspy interaktywności (React — opt-in)
Rdzeń startera świadomie NIE zawiera Reacta. Gdy projekt potrzebuje złożonej
interaktywności (formularz wieloetapowy, konfigurator, search-as-you-type,
panel admina po dodaniu CMS), dodaj go jedną komendą:

```bash
npx astro add react
```

Komponenty React renderują się **domyślnie na serwerze do czystego HTML — zero
JS w przeglądarce**. Runtime (~40 KB gz, współdzielony między stronami) jedzie
do klienta dopiero przy pierwszej wyspie z dyrektywą `client:*`.

### Reguły (obowiązują przy każdej wyspie)
- `client:visible` lub `client:idle` jako default. **Nigdy `client:load` nad
  foldem** — hydratacja konkuruje z LCP
- Nie budować wysp dla rzeczy osiągalnych w CSS/vanilla (dropdowny, tabsy,
  akordeony, menu — obecny vanilla JS Navbara to ~2 KB)
- ClientRouter odmontowuje wyspy przy nawigacji SPA — stan ginie; wyspa, która
  ma przeżyć nawigację, wymaga `transition:persist`
- Tłumaczenia do wysp **wyłącznie przez propsy** z pliku `.astro` — import
  `content.ts` w komponencie klienckim wysyła cały słownik obu locale do
  przeglądarki
- Budżet JS: ≤ 50 KB gz na stronę (sprawdzaj w Lighthouse / network panelu)
- Rozważ Preact + `@preact/compat` zamiast Reacta (~4 KB vs ~40 KB, zgodne
  API) — dla stron klienckich zwykle lepszy default; React gdy potrzebna
  pełna zgodność ekosystemu

## Rozszerzanie pod CMS / custom features
- SSR jest włączony — API routes w `src/pages/api/` działają out of the box
- Dodaj połączenie do bazy w `src/lib/db.ts` (MongoDB, Postgres, etc.) — cienki helper, zero ORM i schema w rdzeniu
- Dynamiczne strony: `src/pages/blog/[slug].astro` z danymi z bazy
- Formularze: `<form>` + API route obsługujący POST
- `content.ts` zostaje dla statycznych UI strings (nav, footer, 404)
- Pojedynczą stronę można wyjąć z SSR przez `export const prerender = true` — middleware kompresji sam się wtedy pomija

## Checklista przed mergem
- [ ] Lighthouse Performance ≥ 95, CLS = 0
- [ ] Zero blokującego JS w `<head>` (poza jednolinijkowym skryptem `js-anim`)
- [ ] Jeden H1, hierarchia nagłówków bez przeskoków
- [ ] Komplet meta: title, description, OG, twitter, hreflang, canonical
- [ ] JSON-LD obecny i zwalidowany (Rich Results Test)
- [ ] Nowe teksty w `content.ts` w obu locale
- [ ] Kontrast nowych kolorów policzony (AA)
- [ ] Nowe animacje respektują `prefers-reduced-motion`
- [ ] `npm run build` przechodzi bez ostrzeżeń

## Komendy
```bash
npm run dev      # Dev server (localhost:4321)
npm run check    # Type-check (astro check)
npm run build    # astro check && build produkcyjny
npm run preview  # Podgląd builda

npm i -D sharp && node scripts/gen-og.mjs       # Regeneracja karty OG
node scripts/gen-hero.mjs                       # Regeneracja zdjęcia hero (kadr + WebP)
node scripts/gen-textures.mjs                   # Regeneracja tekstur tła (#faq + panel kontaktu)
node scripts/gen-photos.mjs                     # Regeneracja wycinanek części (alfa + WebP)
npm i -D sharp && node scripts/gen-favicon.mjs  # Regeneracja favicon.ico
```

## Deploy
- `Dockerfile` + `docker-compose.yml` — Node standalone na porcie 4321, TLS terminowany wyżej (reverse proxy / CDN)
- **`SITE_URL` jest wpalany na etapie builda** (canonical, OG, sitemap, hreflang). Ustaw go w build args, inaczej cały build wskazuje na `localhost:4321`
- `ASTRO_ORIGIN` musi odpowiadać publicznemu originowi (CSRF guard Astro)

## Ważne dla AI asystenta
- Zawsze używaj `@/` jako aliasu dla `src/`
- Treści UI zawsze w `content.ts`, nigdy hardkodowane
- Nowe strony zawsze w obu locale (pl + en)
- BaseLayout obsługuje: `title`, `description`, `ogImage?`, `noindex?` — zawsze go używaj
- Navbar przyjmuje: `links?`, `showLanguageSwitcher?` + sloty `logo` i `actions`; Footer: `links?` + slot `logo`
- Dane firmy (telefon, e-mail, adres, godziny) w `business` w `site.config.ts` — jedno źródło dla `tel:`/`mailto:`, widocznej treści i JSON-LD
- **Nie łącz `.section-padding*` ze skrótem `padding`** — te klasy są poza `@layer`, więc skrót nadpisuje `px-*` z Tailwinda
- Linki nawigacji definiuje `src/lib/site.config.ts` (klucze tłumaczeń + ścieżki bez locale); komponenty prefiksują przez `localizePath`
- Kolory zawsze przez tokeny lub bridge utilities (`text-accent`, `bg-accent/10`, `border-line`…) — nigdy hardkodowane rgba/hex w markupie
- Data aktualizacji stron prawnych: stała `LEGAL_LAST_UPDATED` w `locales.ts`, nie hardkod w `.astro`

## Log decyzji architektonicznych
| Data | Decyzja | Powód |
|---|---|---|
| — | Brak middleware i18n | Potencjalna interferencja z crawlerami |
| — | Brak tłumaczonych slugów | Zbędna złożoność, zero zysku SEO |
| — | CSS custom properties zamiast configu Tailwinda per projekt | Szybszy override, zero rebuildu |
| — | `@/` alias dla `src/` | Czyste importy, zero relative path hell |
| — | robots.txt otwarty na AI boty | Maksymalna widoczność w odpowiedziach AI |
| 2026-04 | `build.inlineStylesheets: 'always'` | Eliminuje render-blocking `<link rel=stylesheet>` przy SSR |
| 2026-04 | Middleware kompresji brotli/gzip | SSR nie kompresuje odpowiedzi automatycznie; bez tego audyt `uses-text-compression` = 0. Jedyny dozwolony middleware |
| 2026-04 | Preload 3 krytycznych wariantów fontów | Mniej preloadów = mniejsza kontencja o pierwszy paint; reszta lazy przez `unicode-range` |
| 2026-04 | Metric-matched fallback dla Syncopate | Swap fontu LCP-owego H1 przestaje generować CLS |
| 2026-04 | Animacje tła przez `translate3d`, gated `html.bg-anim` | GPU-composited, startują po pierwszym paincie |
| 2026-04 | `content-visibility: auto` poniżej folda | Przeglądarka pomija layout+paint do zbliżenia sekcji do viewportu |
| 2026-07 | Upgrade Astro 6 → 7 (`@astrojs/node` 11) | Wyrównanie z wersją produkcyjną projektu głównego; build przechodzi bez zmian w kodzie |
| 2026-07 | Usunięcie pakietów `@fontsource/*` | Martwe zależności — fonty i tak są serwowane z `public/fonts` przez własne `@font-face` |
| 2026-07 | Domyślny `og:image` renderowany zawsze (`/og-default.jpg`) | Bez tego strony bez jawnego `ogImage` udostępniały się bez podglądu |
| 2026-07 | Guard `context.isPrerendered` w middleware | Przy `prerender = true` middleware czytał build-time'owy stub nagłówków i wykonywał martwy transform |
| 2026-07 | Kontrast: `--color-text-dim` 5.84:1 (dark) / 7.50:1 (light) | Poprzednie wartości (4.43:1 w obu motywach) nie przechodziły WCAG AA |
| 2026-07 | Synchronizacja `opacity` i `transform` w reveal-animacjach (0.5 s, jedna krzywa) | Rozjazd 0.25 s / 0.6 s czytał się na wolniejszych CPU jako dwie osobne fazy |
| 2026-07 | `will-change` tylko na czas tranzycji + pomijanie elementów już `visible` | Trwały `will-change` trzyma każdą sekcję w pamięci GPU; ponowna obserwacja odsłoniętych elementów to praca bez efektu |
| 2026-07 | Odsłanianie sekcji w viewporcie w `astro:after-swap` | ClientRouter robi snapshot po swapie — bez tego cross-fade pokazywał stronę pełną dziur, a potem osobno grały fade-iny |
| 2026-07 | Przywrócenie UI przełącznika motywów w Navbarze | Logika i CSS 5 motywów istniały, brakowało samego markupu — przełącznik był martwy |
| 2026-07 | Zero-JS smaczki: `::selection` w akcencie, scroll-progress przez `animation-timeline`, glitch na 404 | Podnoszą odbiór jakości przy ~zerowym koszcie perf; brak wsparcia `animation-timeline` = pasek zostaje w `scaleX(0)`, bez fallbacku |
| 2026-07 | `LEGAL_LAST_UPDATED` w `locales.ts` + `Intl.DateTimeFormat` | Data była zduplikowana w 4 plikach; teraz jedno źródło, formatowanie per locale |
| 2026-08 | `globals.css` importowany raz w `BaseLayout` | Import per strona = ryzyko gołej strony po zapomnieniu; layout renderuje każdą stronę |
| 2026-08 | `astro check` w `npm run build` (`@astrojs/check`) | „TypeScript strict, zero any" nie było niczym egzekwowane; usunięte `as any` z features |
| 2026-08 | `@font-face` dla Syncopate 700 / Orbitron 700 + preload 700 | H1 używa `font-bold` — bez wagi 700 przeglądarka syntetyzowała bold z 400 (rozmyte glify); pliki woff2 już istniały |
| 2026-08 | Sitemap `serialize` ucina trailing slash | Sitemap emitowała `/features/`, canonical `/features` — sprzeczne sygnały dla crawlerów |
| 2026-08 | Aria-labels Navbara/Footera z `content.ts` | Były hardkodowane po angielsku — czytnik ekranu na PL stronie dostawał „Toggle menu" |
| 2026-08 | Fix: menu mobilne renderuje props `links`, nie domyślne `nav` | Strona z własnymi `links` pokazywała inne menu na desktopie i mobile |
| 2026-08 | Tailwind theme bridge (`@theme inline`) | Tokeny jako natywne utility (`bg-accent/10`, `text-fg`, `border-line`…); koniec hardkodowanych rgba w markupie — pełny re-skinning przez zmienne |
| 2026-08 | `site.config.ts` (struktura nav) + `themes.ts` (rejestr motywów) + `Logo.astro` | Rebranding = config + content.ts + tokeny; logo było zduplikowane w Navbar/Footer, tablica motywów żyła w komponencie nawigacji |
| 2026-08 | `localizePath` w i18n.ts | Logika prefiksowania locale była potrojona (i18n.ts, Navbar, LanguageSwitcher) |
| 2026-08 | Sloty `logo`/`actions` w Navbarze, `logo` w Footerze + propsy `show*Switcher` | Customizacja bez edycji wnętrza komponentów (np. strona jednego brandu chowa przełącznik motywów) |
| 2026-08 | React NIE w rdzeniu — sekcja „Wyspy interaktywności" z przepisem | Integracja opt-in jedną komendą; reguły dyrektyw client:* chronią LCP i budżet JS |
| 2026-09 | Landing warsztatu na `index.astro` (hero / usługi / proces / dlaczego / FAQ / kontakt) | Starter przekształcony w docelowy produkt; nawigacja kotwicowa zamiast podstron |
| 2026-09 | Jeden jasny motyw; usunięte `themes.ts`, przełącznik, warianty `[data-theme]`, `theme` w BaseLayout | Decyzja klienta. Zostawienie martwej logiki 5 motywów kosztowałoby JS w Navbarze i blokujący skrypt w `<head>` bez żadnego zysku |
| 2026-09 | `--font-heading` = Inter zamiast Syncopate | Subset Syncopate 700 kończy się na Latin-1 — „turbospr**ę**żarek" renderowało się dwoma krojami w jednym wyrazie. Efekt uboczny: 17 KB mniej na ścieżce krytycznej |
| 2026-09 | `.section-padding*` → `padding-block` zamiast skrótu `padding` | Skrót zerował `padding-inline`, a reguła jest poza `@layer utilities`, więc wygrywała z `px-4`. Wszystkie sekcje (też `features.astro`) przylegały do krawędzi ekranu |
| 2026-09 | Nawigacja desktopowa od `lg`, nie `md` | 5 pozycji + CTA telefoniczne + przełącznik języka nie mieściły się w 768–1024 px i łamały navbar na dwie linie |
| 2026-09 | `business` w `site.config.ts` (nie w `content.ts`) | Telefon i adres są identyczne w każdym locale i zasilają JSON-LD oraz `tel:`/`mailto:` — to konfiguracja, nie tłumaczenie |
| 2026-09 | `AutoRepair` + `FAQPage` JSON-LD na landingu | Lokalny warsztat żyje z lokalnych wyników wyszukiwania; `FAQPage` odwzorowuje 1:1 widoczny blok `<details>` (inaczej = cloaking) |
| 2026-09 | Klasa `.cv-auto` (`content-visibility`) | Reguła z CLAUDE.md nie miała klasy, więc strony nie mogły z niej skorzystać bez inline style |
| 2026-09 | Hero split (tekst lewo / zdjęcie prawo) zamiast zdjęcia pod tekstem | Fotografia turbosprężarki jest ciemna i gęsta; ilość bieli potrzebna, by ciemny tekst był czytelny na niej, spłaszcza zdjęcie do szarości. Split zachowuje i kontrast tekstu, i zdjęcie |
| 2026-09 | Zdjęcie hero z Pexels (licencja: komercyjnie, bez atrybucji) w `public/images/` | Rysowany SVG czytał się jak ikona, nie jak zdjęcie. Ścieżka do pliku to jedna stała `heroPhoto` w `index.astro` — podmiana to jedna linia |
| 2026-09 | Akcent pomarańczowy → czerwony; szarości slate → neutralne | Decyzja klienta (biało-czerwony). Slate pod czerwienią daje brudny, sinawy ton — zmiana rodziny akcentu wymaga zmiany szarości |
| 2026-09 | Usunięty gradientowy fade na styku zdjęcia i kolumny tekstu; zamiast niego zaokrąglona krawędź | Biała poświata na ciemnej, zagęszczonej krawędzi zdjęcia nie czyta się jak miękkie przejście, tylko jak mgła rozmazana po jednej trzeciej kadru |
| 2026-09 | Karta OG przepisana na biało-czerwoną + treść warsztatu | Była czarno-pomarańczowa i nadal głosiła „Astro starter" — każde udostępnienie linku pokazywało stary starter |
| 2026-09 | `gen-og.mjs`: ścieżki do Chrome dla Windows i macOS | Lista kandydatów była wyłącznie linuksowa, więc skrypt nie startował na maszynie deweloperskiej projektu |
| 2026-10 | Pełne nazwy usług w całej treści — „turbosprężarka" zamiast „turbo", „filtr cząstek stałych DPF" zamiast samego „DPF", „układ selektywnej redukcji katalitycznej SCR" zamiast „układy SCR" | Decyzja klienta. Skrót mówi coś tylko komuś, kto już wie, czego szuka; pełna nazwa trafia też w zapytania opisowe i daje scraperom AI jednoznaczny kontekst |
| 2026-10 | Zakres usług: 8 kart — do dotychczasowych sześciu doszły wtryskiwacze paliwa i pompy wtryskowe | Dwie realne usługi, których na stronie nie było. Reszta kart została bez zmian |
| 2026-10 | Długość tekstów landingu zostaje jak w oryginale (opisy usług 110–160 znaków) | Przy okazji poprawiania nazw opisy urosły do ~300 znaków i strona zaczęła się czytać jak elaborat. Zmiana nazewnictwa nie jest pretekstem do przepisywania copy — przy edycji treści pilnuj, czy nie wydłużasz tego, o co nikt nie prosił |
| 2026-10 | Nagłówek karty OG z 76 px na 58 px | „Czyszczenie filtrów cząstek stałych" to dużo dłuższa pierwsza linia niż „Czyszczenie DPF" — powyżej ~60 px zawija się przed jawnym `<br/>`, zostawiając „stałych" samo w linii i wypychając kreskę poza kadr 1200×630 |
| 2026-10 | Linki wyjścia z `404.astro` przez `localizePath` na sekcje landingu zamiast na `/features` | 404 prowadziło do startowej strony „Astro starter kit"; `${prefix}/#services` dałoby `/en/#services`, czyli trailing slash, który `canonicalUrl()` i sitemap celowo usuwają |
| 2026-10 | Usunięta strona `/features` (oba locale) wraz z kluczami `features.*` i `nav.features` | Pozostałość po starterze: reklamowała „RAF Turbo DPF Starter Kit", Astro 7 i nieistniejący już system 5 motywów. Odpowiadała 200 i siedziała w sitemapie, więc Google i scrapery AI indeksowały ją obok treści warsztatu |
| 2026-11 | Zdjęcia warsztatowe jako warstwy tła (`.texture-layer`), nie jako galeria ani sekcja „przed/po" | Materiał to w większości fotki katalogowe na białym tle — w galerii czytałyby się jak cudzy katalog części. Jako tło wnoszą fakturę warsztatu bez obietnicy, że to zdjęcie konkretnego zlecenia |
| 2026-11 | Tekstura plastra miodu pod `#faq`, nie pod `#process` | `--accent-solid` na `--color-bg-soft` daje 4.48:1 — **poniżej AA jeszcze bez tekstury** (4.83:1 z CLAUDE.md liczono na czystej bieli), a numery kroków w `#process` to tekst akcentem. `#faq` używa akcentu tylko jako ikony (grafika = próg 3:1) i ma wąską kolumnę treści, więc tekstura oddycha na flankach |
| 2026-11 | Krycie warstw tła liczone pikselowo, nie dobierane na oko | Każdy piksel tekstury skomponowany nad tłem sekcji i zmierzony względem tekstu, który na nim leży (tekst z alfą ponownie komponowany nad lokalnym tłem). Stąd 0.09 dla plastra miodu i 0.14 dla panelu kontaktu — wartości graniczne są o włos, więc „wygląda dobrze" nie jest testem |
| 2026-11 | Jeden system przycisków: `.btn` + warianty, zamiast `.theme-cta`/`.theme-ghost` ze stylami rozsypanymi po markupie | Ta sama klasa CTA renderowała się jako trzy różne przyciski (radius 8 vs 12 px, `font-medium` vs `font-semibold`, dwa paddingi), a drugi przycisk w panelu kontaktu był jednorazowcem, który nie dzielił niczego z ghostem obok. Przy okazji: widoczny focus-ring, którego wcześniej nie było na żadnym przycisku |
| 2026-11 | Hover przycisku to wyłącznie zmiana koloru | Stary CTA podnosił się o 1 px i rzucał poświatę — czego nie robił żaden inny element na stronie, więc dwa sąsiadujące przyciski hero zachowywały się inaczej |
| 2026-11 | Filtr cząstek stałych wychodzący zza lewej krawędzi hero, naprzeciw turbosprężarki po prawej | Dwie części, z których warsztat żyje, klamrują nagłówek. Ile go widać, rośnie z szerokością okna (~169 / 241 / 358 px przy 1280 / 1536 / 1800+), bo prześwit obok kolumny tekstu też rośnie — stały offset albo wchodziłby na tekst przy 1280, albo zostawiał pasek na szerokim monitorze |
| 2026-11 | Wszystkie trzy progi filtra jako `min-[…]`, nie `xl:`/`2xl:` | Tailwind sortuje nazwane breakpointy i arbitralne w osobnych grupach, więc `2xl:` wygrywało z `min-[1800px]:` przy 1920 px i najszerszy krok nigdy nie wchodził |
| 2026-11 | Plaster miodu w `#faq` jako dwie flanki (`.texture-flank`), nie warstwa na całą sekcję | Pełna warstwa mierzyła 5.92:1 na tekście FAQ, czyli formalnie AA, i nadal czytała się jak szum pod 14 px tekstu — współczynnik kontrastu nic nie mówi o siatce, której podziałka jest zbliżona do grubości kreski pisma. Szerokość flanki to sam prześwit: `max(0rem, (100% - 50rem) / 2)`, więc tekstura kończy się przed pierwszą literą i sama znika na wąskich ekranach |
| 2026-11 | Usunięta usługa „wysyłka kurierska" i wszystkie wzmianki o kurierze (`content.ts`, `llms.txt`, karta OG) | Decyzja klienta: warsztat takiej usługi nie świadczy. Siedziała w ośmiu miejscach, w tym w `makesOffer` w JSON-LD i w opisie meta |
| 2026-11 | Usunięty badge nad H1 (+ martwe `.theme-badge` i `.accent-dot`) | Decyzja klienta. Powtarzał to, co mówi nagłówek, i był jedynym elementem na stronie z `rounded-full` |
| 2026-11 | Zdjęcia części jako wycinanki z **prawdziwym kanałem alfa**, nie jako „i tak są na białym" | Pierwsza wersja tylko podciągała biel do 255 i wysyłała nieprzezroczysty plik — na stronie rysował się widoczny prostokąt, bo tła nie są płaskie (turbo ma 249 w rogach, ale miękki cień schodzi do 240 przy krawędzi kadru, a 6 poziomów różnicy na białym widać na całej szerokości 400 px). Mocniejsze przycięcie bieli tylko wybiela aluminium |
| 2026-11 | Maska alfy przez **flood fill od krawędzi**, nie przez globalny próg jasności | Części mają refleksy jaśniejsze od tła; globalny próg robi dziury w chromie. Przed wypełnieniem dokładana jest 2-pikselowa biała ramka, dzięki czemu część dotykająca krawędzi kadru nie wpuszcza wypełnienia do środka |
| 2026-11 | Cień kontaktowy znika razem z tłem | Strona kładzie te części jako swobodne obiekty; cień z cudzego oświetlenia padałby w każdym zdjęciu w inną stronę |
| 2026-11 | Główny obraz hero: turbosprężarka z kolektorem jako wycinanka wewnątrz kontenera, nie zdjęcie wypełniające prawą krawędź viewportu | Decyzja klienta („może zamiast tego głównego obrazu"). Przy okazji dwie rzeczy: hero czyta się teraz jako dwie części klamrujące nagłówek, a nie wycinanka obok panelu ze zdjęciem; i przypięty do krawędzi ekranu obraz odpływał od tekstu tym bardziej, im szerszy monitor — przy 1920 zostawiał dziurę na środku |
| 2026-11 | Pompa wtryskowa przy nagłówku `#services`, wtryskiwacze w lewej kolumnie `#why` | Obie te kolumny były puste z definicji: nagłówek `max-w-2xl` nad siatką trzykolumnową zostawia jedną trzecią wiersza, a `#why` to krótki H2 nad 20 rem pustki obok listy na pełną wysokość |
| 2026-11 | Pułapka sharpa: `blur()` na jednokanałowym rawie zwraca 3 kanały | Maska robiła się 3× za długa, `joinChannel` czytał ją z przesunięciem i alfa wychodziła w poziome prążki. Lekarstwo: `toColourspace('b-w').raw()` przed `toBuffer()` |
| 2026-11 | Układ strony z `main` (kwadratowy: tokeny `--radius-*` = 0, `.theme-cta`/`.theme-ghost`, `.card-grid`, sekcja `#injectors`), zdjęcia i tekstury z `s` | Decyzja klienta: układ ze strony produkcyjnej, ale z wycinankami części i teksturami. Zastępuje wpisy o systemie `.btn` i zaokrąglonych przyciskach powyżej — klasa `.btn` już nie istnieje |
| 2026-11 | Hero: oryginalne zdjęcie turbosprężarki (`photo-turbo-original.webp`) z `.hero-bg` i `.photo-feather` zamiast wycinanki z alfą | Decyzja klienta: wycięcie wyglądało dziwnie. Backdrop zdjęcia jest bliski bieli, więc zamiast maski alfa tło sekcji dopasowano do jego średniego koloru, a brzeg rozmyto (~5%). Zastępuje wpis o wycinance w hero |
| 2026-11 | Arimo tylko w H1/H2; body, logo i cyfry bez zmian (Inter / Orbitron) | Decyzja klienta po próbie z Barlow Condensed („mega brzydko"). Ext Arimo wycięty do Latin Extended-A, bo pełny plik ma 97 KB |
| 2026-11 | Plaster miodu na telefonie jako pas u góry sekcji (`.texture-band`), filtr DPF w hero lustrzanie za nagłówkiem przy krycie 0.12 | Boczne pasy potrzebują luki obok kolumny, a na telefonie jej nie ma. Pas zanika w dół i leży tylko za nagłówkiem; najgorszy kontrast tekstu pod nim ~5.8:1 |
| 2026-11 | Plaster miodu (boczne pasy) także w `#process` | Numery kroków leżą w białych kwadratach, więc nie stoją na teksturze; skrajne kroki zachodzą pod pas z krycia 0.14. Ostrzeżenie o `#process` w komentarzu CSS dotyczyło starego układu, w którym numery kroków stały bezpośrednio na tle sekcji |
| 2026-11 | Usunięty pasek postępu przewijania i czwarta statystyka („100% napraw z pomiarem") | Decyzja klienta. Siatka statystyk: 3 kolumny od `sm`, wcześniej 4 |
| 2026-11 | Słownictwo formalne w `content.ts` („odwiedź warsztat", „samochód" zamiast „auto", „zgłoś się" zamiast „wpadnij/podjedź") | Decyzja klienta: kolokwializmy brzmiały nieprofesjonalnie. Przy nowych tekstach unikaj „wpadnij", „po prostu", „sypie się", „siada" |
| 2026-11 | Strony prawne i `BusinessDetails` z `main`; dane firmy (NIP, REGON, adres, telefon, e-mail `raf-turbo@op.pl`) w `business` | Operator „RAF-Turbo-DPF Rafał Markiewicz" zamiast „Szafruga Software Inc."; jedno źródło danych dla stopki, JSON-LD i stron prawnych |
