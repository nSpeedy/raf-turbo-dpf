import type { Locale } from '@/lib/locales'
import { defaultLocale } from '@/lib/locales'

// ─── Flat UI strings ─────────────────────────────────────────────
// All translatable UI text lives here as flat key-value pairs.
// Convention:  {page}.{section}.{field}

const ui = {
    pl: {
        'site.name':            'RAF Turbo DPF',
        'site.description':     'Warsztat: czyszczenie DPF, regeneracja turbo i wtryskiwaczy',
        'nav.home':             'Strona główna',
        'nav.features':         'Funkcje',
        'nav.services':         'Usługi',
        'nav.injectors':        'Wtryskiwacze',
        'nav.process':          'Proces',
        'nav.why':              'Dlaczego my',
        'nav.faq':              'FAQ',
        'nav.contact':          'Kontakt',
        'nav.aria.main':        'Główna nawigacja',
        'nav.aria.language':    'Język',
        'nav.aria.menu':        'Przełącz menu',

        'footer.rights':        'Wszelkie prawa zastrzeżone',
        'footer.aria.nav':      'Nawigacja stopki',
        'footer.privacy':       'Polityka prywatności',
        'footer.terms':         'Regulamin',
        'footer.company':       'RAF Turbo DPF',
        'footer.tagline':       'Czyszczenie DPF, regeneracja turbo i wtryskiwaczy. Pomiar przed i po każdej naprawie.',

        'common.readMore':      'Czytaj więcej',
        'common.backToTop':     'Wróć na górę',
        'common.error':         'Coś poszło nie tak. Spróbuj ponownie.',
        'common.lastUpdated':   'Ostatnia aktualizacja',

        '404.title':            'Nie znaleziono strony',
        '404.message':          'Strona nie istnieje lub została przeniesiona.',
        '404.cta':              'Wróć na stronę główną',
        '404.explore':          'Albo sprawdź',

        // ── Landing: meta ──
        'home.meta.title':         'Czyszczenie DPF, regeneracja turbo i wtryskiwaczy',
        'home.meta.description':   'Czyścimy filtry DPF i FAP, regenerujemy turbosprężarki i wtryskiwacze. Pomiar przed i po, gwarancja, zwykle 24–48 h. Demontaż i montaż na miejscu w warsztacie.',

        // ── Landing: hero ──
        'home.hero.heading':       'Czyszczenie DPF, regeneracja turbo i',
        'home.hero.headingAccent': 'wtryskiwaczy',
        'home.hero.sub':           'Naprawiamy zamiast wymieniać. Filtr, turbina i wtryskiwacze wracają do Ciebie sprawne — z pomiarem przed i po oraz gwarancją. Zwykle w 24–48 godzin.',
        'home.hero.photoAlt':      'Zbliżenie turbosprężarki z widocznym kołem kompresora, zamontowanej w komorze silnika',
        'home.hero.cta':           'Zadzwoń po wycenę',
        'home.hero.ctaAlt':        'Zobacz, co robimy',

        // ── Landing: liczby ──
        'home.stats.aria':         'Warsztat w liczbach',
        'home.stats.s1.value':     '24–48 h',
        'home.stats.s1.label':     'Zwykle tyle czekasz',
        'home.stats.s2.value':     '8 000+',
        'home.stats.s2.label':     'Naprawionych części',
        'home.stats.s3.value':     '12 mies.',
        'home.stats.s3.label':     'Gwarancji na naprawę',
        'home.stats.s4.value':     '100%',
        'home.stats.s4.label':     'Napraw z pomiarem przed i po',

        // ── Landing: usługi ──
        'home.services.title':     'Co robimy',
        'home.services.sub':       'Auta osobowe, dostawcze i ciężarowe — diesel i benzyna.',
        'home.services.s1.title':  'Czyszczenie DPF i FAP',
        'home.services.s1.desc':   'Wypłukujemy sadzę, popiół i olej z wkładu — na mokro i ultradźwiękami. Bez wypalania i bez wycinania filtra.',
        'home.services.s2.title':  'Regeneracja turbosprężarek',
        'home.services.s2.desc':   'Rozkładamy turbinę na części, sprawdzamy wał i łożyska, dajemy nowe uszczelnienia i wyważamy rdzeń. Naprawiamy też geometrię i aktuatory.',
        'home.services.s3.title':  'Naprawa wtryskiwaczy',
        'home.services.s3.desc':   'Common Rail i pompowtryskiwacze. Czyszczenie, nowy rozpylacz, ustawienie dawki i test na stole probierczym.',
        'home.services.s4.title':  'Katalizatory i AdBlue',
        'home.services.s4.desc':   'Czyścimy katalizatory, filtry SCR i moduły dozujące AdBlue. Bez grzebania w oprogramowaniu silnika.',
        'home.services.s5.title':  'Diagnostyka i pomiary',
        'home.services.s5.desc':   'Odczyt sterownika, pomiar ciśnienia i przepływu. Oceniamy część, zanim weźmiemy zlecenie — i zanim wydasz złotówkę.',
        'home.services.s6.title':  'Demontaż i montaż',
        'home.services.s6.desc':   'Przyjeżdżasz autem, my wykręcamy część, naprawiamy i wkładamy z powrotem. Nie musisz nic rozkręcać sam.',

        // ── Landing: wtryskiwacze ──
        'home.injectors.title':    'Regeneracja wtryskiwaczy',
        'home.injectors.sub':      'Sprawdzamy każdy wtryskiwacz osobno na stole probierczym — dawkę, przelew i szczelność. Zużyte części wymieniamy na nowe i ustawiamy dawkę od nowa. Na koniec dostajesz wydruk z wynikami.',
        'home.injectors.doTitle':  'Co robimy',
        'home.injectors.d1':       'Test na stole probierczym — przed naprawą i po niej',
        'home.injectors.d2':       'Rozbiór i mycie ultradźwiękowe',
        'home.injectors.d3':       'Nowy rozpylacz, uszczelki i miedziane podkładki',
        'home.injectors.d4':       'Ustawienie dawki i nowe kody korekty do sterownika',
        'home.injectors.symTitle': 'Kiedy przywieźć wtryskiwacze',
        'home.injectors.y1':       'Auto ciężko odpala, zwłaszcza na zimno',
        'home.injectors.y2':       'Nierówna praca na wolnych obrotach',
        'home.injectors.y3':       'Dymi z rury i pali więcej niż zwykle',
        'home.injectors.y4':       'Stuka, szarpie, brakuje mocy',
        'home.injectors.y5':       'Świeci kontrolka silnika, błędy od przelewu',
        'home.injectors.note':     'Bosch, Delphi, Denso, Siemens (VDO). Nie wiesz, który wtryskiwacz siada? Sprawdzamy cały komplet i mówimy, co da się naprawić, a co jest do wymiany.',
        'home.injectors.cta':      'Zadzwoń w sprawie wtryskiwaczy',

        // ── Landing: proces ──
        'home.process.title':      'Jak to wygląda',
        'home.process.sub':        'Od kontaktu do odebrania części.',
        'home.process.p1.title':   'Dzwonisz albo przyjeżdżasz',
        'home.process.p1.desc':    'Zadzwoń i opisz, co się dzieje, albo po prostu przyjedź do naszego warsztatu w godzinach otwarcia.',
        'home.process.p2.title':   'Sprawdzamy część i podajemy cenę',
        'home.process.p2.desc':    'Mierzymy przepływ, luzy i stan wkładu, a potem mówimy, ile to wyjdzie. Jeśli naprawa nie ma sensu, powiemy wprost i nie policzymy za sprawdzenie.',
        'home.process.p3.title':   'Naprawiamy',
        'home.process.p3.desc':    'Czyszczenie albo pełny rozbiór z wymianą zużytych części. Uszczelki, łożyska i rozpylacze zawsze nowe, nigdy z odzysku.',
        'home.process.p4.title':   'Odbierasz część',
        'home.process.p4.desc':    'Pomiar kontrolny, wydruk z wynikami przed i po, montaż jeśli chcesz. Część wraca do Ciebie z gwarancją na piśmie.',

        // ── Landing: dlaczego my ──
        'home.why.title':          'Dlaczego naprawa, a nie nowa część',
        'home.why.w1.title':       'Kosztuje ułamek nowej części',
        'home.why.w1.desc':        'Naprawa wychodzi znacznie taniej niż nowy filtr, turbina czy komplet wtryskiwaczy. A część po naprawie pracuje tak, jak powinna.',
        'home.why.w2.title':       'Bez wycinania i przeróbek',
        'home.why.w2.desc':        'Wycięty DPF to utrata homologacji i niezaliczony przegląd. Czyścimy filtr tak, żeby auto dalej było zgodne z normą.',
        'home.why.w3.title':       'Pomiar zamiast obietnic',
        'home.why.w3.desc':        'Każdą część mierzymy przed naprawą i po niej. Dostajesz wydruk z liczbami, a nie zapewnienie, że powinno być dobrze.',
        'home.why.w4.title':       'Gwarancja na piśmie',
        'home.why.w4.desc':        'Na każdą naprawę wystawiamy dokument gwarancyjny. Reklamacje załatwiamy u siebie, nie odsyłamy Cię do producenta.',

        // ── Landing: FAQ ──
        'home.faq.title':          'Częste pytania',
        'home.faq.q1':             'Ile to trwa?',
        'home.faq.a1':             'Zwykle 24–48 godzin od dnia, w którym część do nas trafi. Jeśli zostawiasz całe auto, dochodzi jeszcze demontaż i montaż. Pilne zlecenia dogadujemy przez telefon.',
        'home.faq.q2':             'Czy każdy filtr da się uratować?',
        'home.faq.a2':             'Nie. Pęknięty, stopiony albo wypalony wkład nadaje się już tylko na wymianę. Widzimy to przy sprawdzeniu i mówimy, zanim zaczniemy pracę.',
        'home.faq.q3':             'Muszę sam zdjąć część?',
        'home.faq.a3':             'Nie. Możesz przyjechać całym autem — zdejmiemy i zamontujemy na miejscu. Jeśli część jest już wykręcona, po prostu przywieź ją do warsztatu.',
        'home.faq.q4':             'Po czym poznać, że wtryskiwacze się sypią?',
        'home.faq.a4':             'Auto ciężko odpala na zimno, nierówno chodzi na wolnych obrotach, dymi albo pali więcej. Pewność daje dopiero test na stole probierczym — sprawdzamy cały komplet i mówimy, który wtryskiwacz jest do naprawy.',
        'home.faq.q5':             'Trzeba potem kasować błędy?',
        'home.faq.a5':             'Tak, i robimy to my. Po montażu kasujemy adaptacje i licznik popiołu, a jak trzeba — wymuszamy regenerację. To wchodzi w cenę usługi.',
        'home.faq.q6':             'Trzeba się wcześniej umawiać?',
        'home.faq.a6':             'Nie. Możesz po prostu podjechać w godzinach otwarcia. Telefon przed przyjazdem przydaje się tylko o tyle, że od razu powiemy, czy warto brać część ze sobą.',
        'home.faq.q7':             'Obsługujecie warsztaty i floty?',
        'home.faq.a7':             'Tak. Warsztaty i firmy z flotą obsługujemy w pierwszej kolejności, z jedną fakturą zbiorczą i stałymi cenami. Warunki ustalamy na miejscu.',

        // ── Landing: kontakt ──
        'home.contact.title':      'Zadzwoń albo przyjedź',
        'home.contact.sub':        'Zadzwoń po wycenę albo wpadnij do warsztatu — z częścią albo całym autem.',
        'home.contact.phone':      'Telefon',
        'home.contact.email':      'E-mail',
        'home.contact.address':    'Adres warsztatu',
        'home.contact.hours':      'Godziny otwarcia',
        'home.contact.hoursValue': 'Pon.–Pt. 8:00–17:00 · Sob. 9:00–13:00',
        'home.contact.cta':        'Zadzwoń teraz',
        'home.contact.ctaAlt':     'Napisz e-mail',

        // ── Features page ──
        'features.title':          'Funkcje',
        'features.description':    'Co dostaniesz w RAF Turbo DPF — starter kit do budowania stron w Astro',
        'features.hero.heading':   'Wszystko czego potrzebujesz',
        'features.hero.sub':       'RAF Turbo DPF to gotowy punkt startowy — zamiast konfigurować od zera, zaczynasz od działającego systemu i go adaptujesz.',
        'features.badge':          'RAF Turbo DPF Starter Kit',
        'features.cta.note':       'Gotowy w minutę. Modyfikuj do woli.',
        'features.cta.back':       'Strona główna',

        'features.f1.title':       'Astro 7 + SSR',
        'features.f1.desc':        'Nowoczesny framework z adapterem Node.js. Server-side rendering gotowy od razu, API routes działają out of the box.',

        'features.f2.title':       'Tailwind CSS v4',
        'features.f2.desc':        'Nowa architektura z pluginem Vite — bez PostCSS, szybsza kompilacja, pełna paleta utility classes.',

        'features.f3.title':       'TypeScript (strict)',
        'features.f3.desc':        'Ścisłe typowanie w całym projekcie. Kompilator pilnuje typów w komponentach, tłumaczeniach i layoutach.',

        'features.f4.title':       'i18n bez bibliotek',
        'features.f4.desc':        'Obsługa języków pl i en wbudowana w routing Astro. Domyślny locale bez prefiksu URL, pełne hreflang i canonical.',

        'features.f5.title':       'Zero abstrakcji',
        'features.f5.desc':        'Każda strona to zwykły plik .astro. Żadnych rejestrów, żadnych PageRenderer — modyfikujesz HTML wprost.',

        'features.f6.title':       'System motywów',
        'features.f6.desc':        'Pięć gotowych motywów. Re-skinning przez zmianę zmiennych CSS w :root — jeden plik, cały wygląd.',

        'features.f7.title':       'CMS-ready',
        'features.f7.desc':        'SSR włączony, API routes gotowe. Podłącz MongoDB, Postgres lub dowolną bazę — architektura już na to czeka.',

        'features.f8.title':       'SEO z pudełka',
        'features.f8.desc':        'BaseLayout obsługuje meta, OG, Twitter Card, hreflang, canonical i JSON-LD strukturalny dla każdej strony.',

        'features.f9.title':       'Wydajność',
        'features.f9.desc':        'Lokalne fonty (zero external requests), animacje po LCP, View Transitions API, grid animowany post-LCP.',

        'features.f10.title':      'Szybki start',
        'features.f10.desc':       'npm install && npm run dev — i masz działający projekt z nawigacją, stopką, motywami i i18n.',

        // ── Privacy policy ──
        'privacy.title':        'Polityka prywatności',
        'privacy.description':  'Polityka prywatności serwisu RAF Turbo DPF',
        'privacy.intro':        'Niniejsza Polityka Prywatności opisuje, w jaki sposób Szafruga Software Inc. (dalej „my", „nas" lub „nasz") gromadzi, wykorzystuje i chroni informacje dotyczące użytkowników naszej strony internetowej.',
        'privacy.collect.heading':     'Jakie dane zbieramy',
        'privacy.collect.text':        'Podczas korzystania z naszej strony możemy zbierać następujące informacje: dane podane dobrowolnie w formularzach kontaktowych (imię, adres e-mail, treść wiadomości), dane techniczne gromadzone automatycznie (adres IP, typ przeglądarki, system operacyjny, czas wizyty), pliki cookies niezbędne do prawidłowego działania strony.',
        'privacy.use.heading':         'Jak wykorzystujemy dane',
        'privacy.use.text':            'Zebrane dane wykorzystujemy wyłącznie w celu: odpowiedzi na zapytania przesłane przez formularz kontaktowy, analizy ruchu na stronie i poprawy jej funkcjonalności, zapewnienia bezpieczeństwa i prawidłowego działania serwisu.',
        'privacy.cookies.heading':     'Pliki cookies',
        'privacy.cookies.text':        'Nasza strona wykorzystuje pliki cookies w celu zapewnienia prawidłowego działania serwisu. Użytkownik może zarządzać ustawieniami cookies w swojej przeglądarce. Wyłączenie cookies może ograniczyć funkcjonalność strony.',
        'privacy.thirdparty.heading':  'Usługi zewnętrzne',
        'privacy.thirdparty.text':     'Nie przekazujemy danych osobowych podmiotom trzecim w celach marketingowych. Możemy korzystać z narzędzi analitycznych (np. Google Analytics) w celu analizy ruchu na stronie. Dane te są przetwarzane zgodnie z politykami prywatności tych usług.',
        'privacy.rights.heading':      'Prawa użytkownika',
        'privacy.rights.text':         'Zgodnie z obowiązującymi przepisami o ochronie danych osobowych, przysługuje Ci prawo do: dostępu do swoich danych, ich sprostowania, usunięcia lub ograniczenia przetwarzania, wniesienia sprzeciwu wobec przetwarzania, przenoszenia danych oraz złożenia skargi do organu nadzorczego (UODO).',
        'privacy.contact.heading':     'Kontakt',
        'privacy.contact.text':        'W sprawach dotyczących ochrony danych osobowych prosimy o kontakt pod adresem e-mail: privacy@example.com.',
        'privacy.changes.heading':     'Zmiany w polityce',
        'privacy.changes.text':        'Zastrzegamy sobie prawo do aktualizacji niniejszej Polityki Prywatności. Wszelkie zmiany zostaną opublikowane na tej stronie wraz z datą ostatniej aktualizacji.',

        // ── Terms of service ──
        'terms.title':          'Regulamin',
        'terms.description':    'Regulamin korzystania z serwisu RAF Turbo DPF',
        'terms.intro':          'Niniejszy Regulamin określa zasady korzystania z serwisu internetowego prowadzonego przez Szafruga Software Inc. Korzystanie z serwisu oznacza akceptację poniższych warunków.',
        'terms.definitions.heading':   'Definicje',
        'terms.definitions.text':      'Serwis — strona internetowa dostępna pod adresem domeny, na której opublikowany jest niniejszy Regulamin. Operator — Szafruga Software Inc., podmiot odpowiedzialny za prowadzenie Serwisu. Użytkownik — każda osoba korzystająca z Serwisu.',
        'terms.rules.heading':         'Zasady korzystania',
        'terms.rules.text':            'Użytkownik zobowiązuje się do korzystania z Serwisu zgodnie z obowiązującym prawem i dobrymi obyczajami. Zabrania się podejmowania działań mogących zakłócić prawidłowe funkcjonowanie Serwisu, w tym prób nieautoryzowanego dostępu do systemów informatycznych.',
        'terms.ip.heading':            'Własność intelektualna',
        'terms.ip.text':               'Wszelkie treści dostępne w Serwisie, w tym teksty, grafiki, logotypy, ikony i oprogramowanie, stanowią własność Operatora lub są wykorzystywane na podstawie stosownych licencji. Kopiowanie, rozpowszechnianie lub modyfikowanie tych treści bez zgody Operatora jest zabronione.',
        'terms.liability.heading':     'Odpowiedzialność',
        'terms.liability.text':        'Operator dokłada wszelkich starań, aby informacje zamieszczone w Serwisie były aktualne i prawidłowe, jednak nie ponosi odpowiedzialności za ewentualne błędy lub nieścisłości. Serwis udostępniany jest w stanie „takim, jaki jest" (as is), bez gwarancji jakiegokolwiek rodzaju.',
        'terms.changes.heading':       'Zmiany regulaminu',
        'terms.changes.text':          'Operator zastrzega sobie prawo do zmiany niniejszego Regulaminu. Zmiany wchodzą w życie z chwilą ich opublikowania w Serwisie. Dalsze korzystanie z Serwisu po wprowadzeniu zmian oznacza ich akceptację.',
        'terms.contact.heading':       'Kontakt',
        'terms.contact.text':          'W sprawach związanych z Regulaminem prosimy o kontakt pod adresem e-mail: contact@example.com.',
    },
    en: {
        'site.name':            'RAF Turbo DPF',
        'site.description':     'Workshop: DPF cleaning, turbo and injector repair',
        'nav.home':             'Home',
        'nav.features':         'Features',
        'nav.services':         'Services',
        'nav.injectors':        'Injectors',
        'nav.process':          'Process',
        'nav.why':              'Why us',
        'nav.faq':              'FAQ',
        'nav.contact':          'Contact',
        'nav.aria.main':        'Main navigation',
        'nav.aria.language':    'Language',
        'nav.aria.menu':        'Toggle menu',

        'footer.rights':        'All rights reserved',
        'footer.aria.nav':      'Footer navigation',
        'footer.privacy':       'Privacy policy',
        'footer.terms':         'Terms of service',
        'footer.company':       'RAF Turbo DPF',
        'footer.tagline':       'DPF cleaning, turbocharger and injector repair. Measured before and after, every job.',

        'common.readMore':      'Read more',
        'common.backToTop':     'Back to top',
        'common.error':         'Something went wrong. Please try again.',
        'common.lastUpdated':   'Last updated',

        '404.title':            'Page not found',
        '404.message':          'The page does not exist or has been moved.',
        '404.cta':              'Back to home',
        '404.explore':          'Or check out',

        // ── Landing: meta ──
        'home.meta.title':         'DPF cleaning, turbocharger and injector repair',
        'home.meta.description':   'We clean DPF and FAP filters and rebuild turbochargers and injectors. Measured before and after, warranty included, usually 24–48 h. Removal and refitting at the workshop.',

        // ── Landing: hero ──
        'home.hero.heading':       'DPF cleaning, turbocharger and injector',
        'home.hero.headingAccent': 'repair',
        'home.hero.sub':           'We repair rather than replace. Your filter, turbo and injectors come back working — measured before and after, with a warranty. Usually within 24 to 48 hours.',
        'home.hero.photoAlt':      'Close-up of a turbocharger with its compressor wheel visible, mounted in an engine bay',
        'home.hero.cta':           'Call for a quote',
        'home.hero.ctaAlt':        'See what we do',

        // ── Landing: numbers ──
        'home.stats.aria':         'The workshop in numbers',
        'home.stats.s1.value':     '24–48 h',
        'home.stats.s1.label':     'Usual waiting time',
        'home.stats.s2.value':     '8,000+',
        'home.stats.s2.label':     'Parts repaired',
        'home.stats.s3.value':     '12 months',
        'home.stats.s3.label':     'Warranty on every repair',
        'home.stats.s4.value':     '100%',
        'home.stats.s4.label':     'Jobs measured before and after',

        // ── Landing: services ──
        'home.services.title':     'What we do',
        'home.services.sub':       'Passenger cars, vans and trucks — diesel and petrol.',
        'home.services.s1.title':  'DPF and FAP cleaning',
        'home.services.s1.desc':   'We wash the soot, ash and oil out of the core — wet cleaning and ultrasound. No burning, no cutting the filter out.',
        'home.services.s2.title':  'Turbocharger regeneration',
        'home.services.s2.desc':   'We strip the turbo down, check the shaft and bearings, fit new seals and balance the core. Variable geometry and actuators too.',
        'home.services.s3.title':  'Injector repair',
        'home.services.s3.desc':   'Common Rail and unit injectors. Cleaning, a new nozzle, fuel delivery set up again and a test on the injector rig.',
        'home.services.s4.title':  'Catalytic converters and AdBlue',
        'home.services.s4.desc':   'We clean catalytic converters, SCR filters and AdBlue dosing modules. Without touching the engine software.',
        'home.services.s5.title':  'Diagnostics and measurement',
        'home.services.s5.desc':   'ECU readout, pressure and flow measurement. We assess the part before taking the job on — and before you spend anything.',
        'home.services.s6.title':  'Removal and refitting',
        'home.services.s6.desc':   'Bring the car in — we take the part off, repair it and put it back. You do not have to dismantle anything yourself.',

        // ── Landing: injectors ──
        'home.injectors.title':    'Injector repair',
        'home.injectors.sub':      'We test every injector separately on the rig — fuel delivery, back-leakage and sealing. Worn parts are replaced with new ones and delivery is set up again. You get a printout of the results.',
        'home.injectors.doTitle':  'What we do',
        'home.injectors.d1':       'Rig test — before the repair and after it',
        'home.injectors.d2':       'Teardown and ultrasonic cleaning',
        'home.injectors.d3':       'New nozzle, seals and copper washers',
        'home.injectors.d4':       'Delivery set up and new correction codes for the ECU',
        'home.injectors.symTitle': 'When to bring your injectors in',
        'home.injectors.y1':       'The engine struggles to start, especially cold',
        'home.injectors.y2':       'Rough running at idle',
        'home.injectors.y3':       'Smoke from the exhaust and higher fuel use',
        'home.injectors.y4':       'Knocking, hesitation, loss of power',
        'home.injectors.y5':       'Engine light on, back-leakage fault codes',
        'home.injectors.note':     'Bosch, Delphi, Denso, Siemens (VDO). Not sure which injector is failing? We test the whole set and tell you what can be repaired and what needs replacing.',
        'home.injectors.cta':      'Call us about injectors',

        // ── Landing: process ──
        'home.process.title':      'How it works',
        'home.process.sub':        'From the first call to picking the part up.',
        'home.process.p1.title':   'You call or drive over',
        'home.process.p1.desc':    'Ring us and describe what the car is doing, or simply come by the workshop during opening hours.',
        'home.process.p2.title':   'We check it and quote',
        'home.process.p2.desc':    'We measure flow, clearances and the state of the core, then tell you what it will cost. If a repair makes no sense, we say so plainly — and we do not charge for the check.',
        'home.process.p3.title':   'We repair it',
        'home.process.p3.desc':    'Cleaning, or a full teardown with worn parts replaced. Seals, bearings and nozzles are always new, never salvaged.',
        'home.process.p4.title':   'You collect it',
        'home.process.p4.desc':    'Control measurement, a printout with before and after figures, and refitting if you want it. The part comes back with a written warranty.',

        // ── Landing: why us ──
        'home.why.title':          'Why repair instead of buying new',
        'home.why.w1.title':       'A fraction of the price of a new part',
        'home.why.w1.desc':        'A repair costs far less than a new filter, turbo or set of injectors. And the part works as it should afterwards.',
        'home.why.w2.title':       'No cutting out, no modifications',
        'home.why.w2.desc':        'A DPF cut out means losing type approval and failing inspection. We clean the filter so the car stays within its emission standard.',
        'home.why.w3.title':       'Measurements, not promises',
        'home.why.w3.desc':        'We measure every part before the repair and after it. You get a printout with numbers, not a promise that it should be fine.',
        'home.why.w4.title':       'Warranty in writing',
        'home.why.w4.desc':        'Every repair comes with a warranty document. Claims are handled here, not passed on to a manufacturer.',

        // ── Landing: FAQ ──
        'home.faq.title':          'Common questions',
        'home.faq.q1':             'How long does it take?',
        'home.faq.a1':             'Usually 24 to 48 hours from the day the part reaches us. If you leave the whole car with us, add removal and refitting on top. Urgent jobs can be arranged by phone.',
        'home.faq.q2':             'Can every filter be saved?',
        'home.faq.a2':             'No. A cracked, melted or burnt-through core is only fit for replacement. We see this during the check and tell you before any work starts.',
        'home.faq.q3':             'Do I have to remove the part myself?',
        'home.faq.a3':             'No. You can bring the whole car in and we will remove and refit it here. If the part is already off, just drop it in at the workshop.',
        'home.faq.q4':             'How do I know the injectors are failing?',
        'home.faq.a4':             'The car struggles to start cold, runs roughly at idle, smokes or uses more fuel. Only a rig test settles it — we test the whole set and tell you which injector needs work.',
        'home.faq.q5':             'Do fault codes need clearing afterwards?',
        'home.faq.a5':             'Yes, and we do it. After refitting we reset the adaptations and the ash counter, and force a regeneration if needed. It is included in the price.',
        'home.faq.q6':             'Do I need an appointment?',
        'home.faq.a6':             'No. Just come by during opening hours. Calling ahead only helps in that we can tell you straight away whether to bring the part with you.',
        'home.faq.q7':             'Do you work with workshops and fleets?',
        'home.faq.a7':             'Yes. Workshops and fleet operators get served first, with one consolidated invoice and fixed pricing. Terms are agreed here at the workshop.',

        // ── Landing: contact ──
        'home.contact.title':      'Call us or drive over',
        'home.contact.sub':        'Call for a quote or come by the workshop — with the part or with the whole car.',
        'home.contact.phone':      'Phone',
        'home.contact.email':      'Email',
        'home.contact.address':    'Workshop address',
        'home.contact.hours':      'Opening hours',
        'home.contact.hoursValue': 'Mon-Fri 8:00-17:00 · Sat 9:00-13:00',
        'home.contact.cta':        'Call now',
        'home.contact.ctaAlt':     'Send an email',

        // ── Features page ──
        'features.title':          'Features',
        'features.description':    'What you get with RAF Turbo DPF — the Astro starter kit',
        'features.hero.heading':   'Everything you need',
        'features.hero.sub':       'RAF Turbo DPF is a ready-made starting point — instead of configuring from scratch, you start with a working system and adapt it.',
        'features.badge':          'RAF Turbo DPF Starter Kit',
        'features.cta.note':       'Ready in a minute. Modify freely.',
        'features.cta.back':       'Home',

        'features.f1.title':       'Astro 7 + SSR',
        'features.f1.desc':        'Modern framework with a Node.js adapter. Server-side rendering ready out of the box, API routes work immediately.',

        'features.f2.title':       'Tailwind CSS v4',
        'features.f2.desc':        'New Vite plugin architecture — no PostCSS, faster compilation, full utility class palette.',

        'features.f3.title':       'TypeScript (strict)',
        'features.f3.desc':        'Strict typing across the entire project. The compiler enforces types in components, translations, and layouts.',

        'features.f4.title':       'i18n without libraries',
        'features.f4.desc':        'Built-in pl and en support via Astro routing. Default locale without URL prefix, full hreflang and canonical.',

        'features.f5.title':       'Zero abstractions',
        'features.f5.desc':        'Every page is a plain .astro file. No registries, no PageRenderer — you edit HTML directly.',

        'features.f6.title':       'Theme system',
        'features.f6.desc':        'Five built-in themes. Re-skin by changing CSS variables in :root — one file, the whole look.',

        'features.f7.title':       'CMS-ready',
        'features.f7.desc':        'SSR enabled, API routes ready. Connect MongoDB, Postgres, or any database — the architecture already supports it.',

        'features.f8.title':       'SEO out of the box',
        'features.f8.desc':        'BaseLayout handles meta, OG, Twitter Card, hreflang, canonical, and JSON-LD structured data for every page.',

        'features.f9.title':       'Performance',
        'features.f9.desc':        'Local fonts (zero external requests), post-LCP animations, View Transitions API, animated grid post-LCP.',

        'features.f10.title':      'Quick start',
        'features.f10.desc':       'npm install && npm run dev — and you have a working project with navigation, footer, themes, and i18n.',

        // ── Privacy policy ──
        'privacy.title':        'Privacy Policy',
        'privacy.description':  'Privacy policy for the RAF Turbo DPF website',
        'privacy.intro':        'This Privacy Policy describes how Szafruga Software Inc. ("we", "us", or "our") collects, uses, and protects information about users of our website.',
        'privacy.collect.heading':     'What data we collect',
        'privacy.collect.text':        'When you use our website, we may collect the following information: data you voluntarily provide through contact forms (name, email address, message content), technical data collected automatically (IP address, browser type, operating system, visit time), cookies necessary for the proper functioning of the website.',
        'privacy.use.heading':         'How we use data',
        'privacy.use.text':            'We use collected data solely for the purpose of: responding to inquiries submitted through the contact form, analyzing website traffic and improving its functionality, ensuring security and proper operation of the service.',
        'privacy.cookies.heading':     'Cookies',
        'privacy.cookies.text':        'Our website uses cookies to ensure proper functioning. You can manage cookie settings in your browser. Disabling cookies may limit website functionality.',
        'privacy.thirdparty.heading':  'Third-party services',
        'privacy.thirdparty.text':     'We do not share personal data with third parties for marketing purposes. We may use analytics tools (e.g., Google Analytics) to analyze website traffic. Such data is processed in accordance with the privacy policies of those services.',
        'privacy.rights.heading':      'User rights',
        'privacy.rights.text':         'In accordance with applicable data protection laws, you have the right to: access your data, rectify, erase, or restrict processing, object to processing, data portability, and file a complaint with a supervisory authority.',
        'privacy.contact.heading':     'Contact',
        'privacy.contact.text':        'For data protection inquiries, please contact us at: privacy@example.com.',
        'privacy.changes.heading':     'Policy changes',
        'privacy.changes.text':        'We reserve the right to update this Privacy Policy. Any changes will be published on this page along with the date of the last update.',

        // ── Terms of service ──
        'terms.title':          'Terms of Service',
        'terms.description':    'Terms of service for the RAF Turbo DPF website',
        'terms.intro':          'These Terms of Service govern the use of the website operated by Szafruga Software Inc. By using the website, you agree to the following terms.',
        'terms.definitions.heading':   'Definitions',
        'terms.definitions.text':      'Service — the website available at the domain where these Terms are published. Operator — Szafruga Software Inc., the entity responsible for operating the Service. User — any person using the Service.',
        'terms.rules.heading':         'Rules of use',
        'terms.rules.text':            'The User agrees to use the Service in accordance with applicable law and good practices. Any actions that may disrupt the proper functioning of the Service are prohibited, including attempts at unauthorized access to IT systems.',
        'terms.ip.heading':            'Intellectual property',
        'terms.ip.text':               'All content available on the Service, including texts, graphics, logos, icons, and software, is the property of the Operator or is used under appropriate licenses. Copying, distributing, or modifying this content without the Operator\'s consent is prohibited.',
        'terms.liability.heading':     'Liability',
        'terms.liability.text':        'The Operator makes every effort to ensure that the information published on the Service is up-to-date and accurate, but assumes no responsibility for any errors or inaccuracies. The Service is provided "as is", without warranties of any kind.',
        'terms.changes.heading':       'Changes to terms',
        'terms.changes.text':          'The Operator reserves the right to amend these Terms. Changes take effect upon publication on the Service. Continued use of the Service after changes constitutes acceptance thereof.',
        'terms.contact.heading':       'Contact',
        'terms.contact.text':          'For inquiries related to these Terms, please contact us at: contact@example.com.',
    },
} as const satisfies Record<Locale, Record<string, string>>

export type UiKey = keyof typeof ui[typeof defaultLocale]

// ─── Core translation helper ────────────────────────────────────

export function useTranslations(locale: Locale) {
    return (key: UiKey): string =>
        ui[locale]?.[key] ?? ui[defaultLocale][key]
}

// ─── Generic content helpers ────────────────────────────────────

export function collectItems(locale: Locale, prefix: string): Record<string, string>[] {
    const dict: Record<string, string> = { ...ui[defaultLocale], ...ui[locale] }
    const items: Record<string, string>[] = []

    for (let i = 1; i <= 50; i++) {
        const itemPrefix = `${prefix}.item${i}.`
        const matching = Object.keys(dict).filter((k) => k.startsWith(itemPrefix))
        if (matching.length === 0) break

        const item: Record<string, string> = {}
        for (const k of matching) {
            item[k.slice(itemPrefix.length)] = dict[k]
        }
        items.push(item)
    }

    return items
}

/** Collect numbered text blocks: prefix.paragraph1, prefix.paragraph2, ... */
export function collectList(locale: Locale, prefix: string): string[] {
    const dict: Record<string, string> = { ...ui[defaultLocale], ...ui[locale] }
    const out: string[] = []
    for (let i = 1; i <= 20; i++) {
        const v = dict[`${prefix}${i}`]
        if (!v) break
        out.push(v)
    }
    return out
}

/** Optional lookup that returns empty string when key is missing, instead of echoing the key. */
export function tryT(locale: Locale, key: string): string {
    const dict: Record<string, string> = { ...ui[defaultLocale], ...ui[locale] }
    return dict[key] ?? ''
}
