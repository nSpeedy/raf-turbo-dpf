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
│   ├── BusinessDetails.astro     # Blok danych rejestrowych (nazwa, adres, NIP, REGON) — strony prawne
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
    ├── index.astro               # Strona główna (pl)
    ├── features.astro            # Przykładowa podstrona
    ├── privacy.astro, terms.astro
    ├── 404.astro
    ├── api/hello.ts              # Przykładowy API endpoint
    └── en/                       # Pełne lustro powyższych (en)

public/
├── fonts/*.woff2                 # Subsetowane fonty — zero external requests
├── images/hero-turbo.webp        # Zdjęcie hero — generowane przez scripts/gen-hero.mjs
├── og-default.jpg                # Domyślna karta OG (1200×630)
├── favicon.svg, favicon.ico
├── robots.txt                    # Otwarty dla Googlebota i AI scraperów
└── llms.txt                      # Streszczenie strony dla AI — uzupełnij per projekt

scripts/
├── gen-og.mjs                    # scripts/og-default.html → public/og-default.jpg
├── gen-hero.mjs                  # scripts/hero-source.jpg → public/images/hero-turbo.webp (kadr + kompresja)
├── hero-source.jpg               # Oryginał zdjęcia hero (poza public/ — nie trafia na serwer)
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
- **Fonty**: Inter (nagłówki *i* body), Orbitron (mono — tylko cyfry/etykiety ASCII), Zen Dots / Doto (display) — lokalne woff2, zero external requests
- ⚠ **Syncopate i Orbitron nie mają subsetu Latin Extended-A w wadze 700** — polskie znaki w tekście ustawionym tym krojem spadają do innej wagi w środku wyrazu. Nie używaj ich do polskiej treści
- **Kwadratowe rogi** — `--radius-card` (karty, panele) i `--radius-control` (przyciski, badge, kafle ikon) są ustawione na `0rem`. To jedyne dwa miejsca decydujące o zaokrągleniu: zmiana na np. `0.75rem` zaokrągla całą stronę naraz. **Nigdy nie wpisuj `rounded-xl`/`rounded-full` w markup** — decyzja wypada wtedy z warstwy tokenów i ginie w pliku strony
- **Utility classes**: `.gradient-text`, `.theme-card`, `.card-grid`, `.theme-cta`, `.theme-ghost`, `.theme-badge`, `.theme-nav`, `.theme-footer`, `.scroll-progress`, `.cv-auto`
- `.theme-card` jest płaska: hairline, zero cienia, hover = delikatny tint + akcentowa linia „dorysowująca się" wzdłuż górnej krawędzi (`::after`, `scaleX`). Bez `translateY` i bez shadow — karta ma siedzieć w siatce, nie unosić się nad nią
- `.card-grid` to siatka hairline'owa: komórki dzielą jedną kreskę (`gap: 1px` na tle w kolorze linii) zamiast mieć własne ramki i rynny. **Używaj jej tylko, gdy liczba elementów wypełnia siatkę** w każdym breakpoincie (6 elementów przy 1/2/3 kolumnach — tak; 10 przy 3 — nie, ostatni rząd zostawi goły prostokąt w kolorze linii). Reveal (`.animate`) idzie na kontener, nigdy na komórki — komórka przy `opacity: 0` odsłania szare tło siatki
- **Tailwind theme bridge** (`@theme inline` w globals.css): tokeny są dostępne jako natywne utility — `text-accent`, `bg-accent/10` (dowolna przezroczystość przez color-mix), `bg-accent-soft`, `bg-surface`, `bg-surface-soft`, `bg-surface-nav`, `text-fg`, `border-line`, `shadow-panel`, `rounded-card`, `rounded-control`. **Używaj ich zamiast** wartości arbitralnych `bg-[var(--…)]` i inline styles — hardkodowane kolory łamią motywy
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
- **Fonty**: `font-display: swap`, preload tylko wariantów above-the-fold (Inter var + ext — nagłówek LCP i body idą tym samym krojem). Reszta leci lazy przez `unicode-range`
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
| 2026-09 | Kwadratowe rogi w całym systemie: `--radius-card: 0` + nowy `--radius-control: 0`; `rounded-xl`/`rounded-lg`/`rounded-full` w markupie zastąpione przez `rounded-card`/`rounded-control` | Zaokrąglenie było rozsypane po plikach stron jako literały, więc „zaokrąglij/wyprostuj wszystko" wymagało obejścia całego markupu. Teraz to dwie zmienne |
| 2026-09 | `.theme-card`: usunięty cień i `translateY(-2px)`, hover = tint + akcentowa linia `::after` (`scaleX`) | Cień na białym tle podnosi kartę nad layout; siatka unoszących się kafelków to dokładnie ten wygląd, od którego strona odchodzi. `scaleX` jest kompozytowane, animacja `border-top` repaintowałaby całą kartę |
| 2026-09 | `.card-grid` (siatka hairline'owa) dla usług i paska liczb | Kafelki z własnymi ramkami w rynnach dają podwójne kreski i „pudełka"; wspólna kreska czyta się jak strona katalogu. Efekt uboczny: `divide-x` dawał trzeciej komórce lewą ramkę na mobile, gdzie zaczyna rząd |
| 2026-09 | Reveal `.animate` na kontenerze siatki, nie na komórkach | Kolor linii żyje na kontenerze — komórki przy `opacity: 0` odsłaniały pełny szary prostokąt do czasu wejścia Observera |
| 2026-09 | Usunięta martwa klasa `.glow-card` | Nieużywana w żadnym pliku, a `border-radius: 1.5rem` na sztywno przeczył kwadratowemu systemowi |
| 2026-09 | Sticky nagłówek w sekcji „Dlaczego my", hairline'owe kolumny w bloku kontaktowym, FAQ w ramce | Zmiana layoutu ma iść dalej niż rogi kart — inaczej strona zostaje tą samą kompozycją z ostrymi narożnikami |
| 2026-09 | Sekcja `#injectors` (regeneracja wtryskiwaczy) jako własny blok, nie siódmy kafel w siatce usług | `.card-grid` wymaga liczby elementów dzielącej się przez 1/2/3 — siódmy kafel zostawiłby goły prostokąt w kolorze linii. Wtryskiwaczy szuka się przez objaw („dymi", „ciężko odpala"), a nie przez nazwę części, więc potrzebna była lista objawów, na którą w kafelku nie ma miejsca. Do siatki wszedł krótki kafel `s3`, geometria zmienna i aktuatory dopisane do kafla turbo |
| 2026-09 | Sekcja wtryskiwaczy na białym tle, rozdzielona hairline'owym panelem, nie drugim tintem | Tinted band tuż nad tintowanym `#process` skleiłby dwie ramki `border-y` w jedną kreskę 2 px |
| 2026-09 | Cała treść PL przepisana na język warsztatowy (krótsze zdania, „naprawa" zamiast „regeneracja do parametrów fabrycznych", „wydruk" zamiast „raport") | Poprzednia wersja była pisana rejestrem oferty B2B; klient warsztatu czyta ją jak instrukcję obsługi. Terminologia zostaje branżowa (rozpylacz, przelew, stół probierczy), zmienia się składnia |
| 2026-09 | Usunięta obsługa kurierska z całej treści (kafel `s6` → „Demontaż i montaż", `areaServed` z `PL` na miasto, typ JSON-LD `Country` → `City`) | Decyzja klienta: zwykły warsztat stacjonarny. `areaServed: 'PL'` deklarowałby Google zasięg usługi, której firma nie świadczy |
| 2026-09 | Proces skrócony do „dzwonisz albo przyjeżdżasz"; nowe FAQ „Trzeba się wcześniej umawiać?" | Decyzja klienta: nie ma osobnej ścieżki kontaktu (formularza, wyceny zdalnej, umawiania terminu). Opis kroku „wyślij zdjęcie i numer katalogowy" obiecywał proces, którego warsztat nie prowadzi |
| 2026-09 | Usunięte badge'e nad H1 i nad H2 wtryskiwaczy; usunięte klucze `home.hero.badge` i `home.injectors.badge` | Badge powtarzał to, co mówi nagłówek linijkę niżej. Klucze bez odbiorcy zostają w `content.ts` jako martwa treść, którą następna osoba tłumaczy „na wszelki wypadek" |
| 2026-09 | Zdjęty `mt-*` z H1 i z H2 wtryskiwaczy po usunięciu badge'y; `lg:pr-12` → `lg:pr-16` w kolumnie hero | Marginesy były liczone względem usuniętego elementu: H2 wtryskiwaczy siedział 24 px niżej niż H3 w sąsiedniej kolumnie. Kolumna hero po zmianie 55% → 60% zostawiała przy 1024 px tylko 32 px do krawędzi zdjęcia |
| 2026-09 | `Logo.astro` bez glifu, sam wordmark; znak zostaje w `favicon.svg` i na karcie OG | Płomień obok nazwy konkurował z czerwonym przyciskiem telefonu dwa elementy dalej. W faviconie i na OG ikona niesie markę sama, więc tam zostaje |
| 2026-09 | 404 linkuje do `/#services` i `/#contact` zamiast do `/features` | `/features` to strona ze startera, reklamująca „Astro starter kit" — na stronie warsztatu jest treścią-sierotą (nadal w sitemapie, do usunięcia osobną decyzją) |
| 2026-09 | Zakres usług przepisany na cztery filary: turbosprężarki (wszystkie typy), wtryskiwacze diesla **i benzynowe**, pompy wtryskowe, DPF. Kafel `s4` „Katalizatory i AdBlue" → „Regeneracja pomp wtryskowych" | Zakres podany przez klienta. Siatka `.card-grid` musi mieć 6 komórek (1/2/3 kolumny), więc pompy weszły na miejsce usługi, której klient nie wymienił — reklamowanie AdBlue byłoby obietnicą bez pokrycia. Diagnostyka i demontaż zostają: to nie osobne usługi, tylko sposób przyjęcia zlecenia |
| 2026-09 | Odbiorcy rozszerzeni o maszyny budowlane i rolnicze (hero, `services.sub`, nowe FAQ `q8`, JSON-LD) | Ciągnika ani koparki nikt nie przyprowadzi na lawecie po turbinę — FAQ mówi wprost, że wystarczy przywieźć wykręconą część, bo inaczej właściciel maszyny zakłada, że warsztat obsługuje tylko auta |
| 2026-09 | Sekcja `#injectors` objęła też pompy wtryskowe (etykieta nav została „Wtryskiwacze") | Wtryskiwacze i pompy dzielą objawy i stół probierczy — osobny blok powtarzałby tę samą listę. Nav zostaje krótki: 6 pozycji + CTA telefoniczne + przełącznik języka już raz wymusiły przeniesienie desktopowej nawigacji na `lg` |
| 2026-09 | Dane rejestrowe (`legalName`, `owner`, `nip`, `regon`, `region`) w `business`; `BusinessDetails.astro` na stronach prawnych, NIP/REGON w stopce | Firma musi być identyfikowalna na własnej stronie, a NIP to najmocniejszy sygnał tożsamości, jaki ma jednooddziałowy warsztat (JSON-LD `vatID`). Komponent zamiast czterech kopii markupu: privacy i terms żyją w dwóch locale, a NIP poprawny na trzech stronach z czterech jest gorszy niż jego brak |
| 2026-09 | E-mail na stronach prawnych doklejany z `business`, nie wpisany w `content.ts` | Adres był zaszyty w czterech stringach (`privacy@example.com`, `contact@example.com`) i rozjeżdżał się z danymi kontaktowymi warsztatu |
| 2026-09 | Godziny: pon.–pt. 8:00–17:00, weekend wypisany jako nieczynny (nie pominięty) | Warsztat przyjmuje bez umawiania się, więc brak informacji o sobocie to kurs pod zamkniętą bramę. `openingHours` w JSON-LD skrócone do `Mo-Fr` — sobotni wpis obiecywałby Google godziny, których firma nie ma |
