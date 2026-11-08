import type { Locale } from '@/lib/locales'
import { defaultLocale } from '@/lib/locales'

// ─── Flat UI strings ─────────────────────────────────────────────
// All translatable UI text lives here as flat key-value pairs.
// Convention:  {page}.{section}.{field}

const ui = {
    pl: {
        'site.name':            'RAF Turbo DPF',
        'site.description':     'Warsztat specjalistyczny: czyszczenie filtrów cząstek stałych i regeneracja turbosprężarek',
        'nav.home':             'Strona główna',
        'nav.services':         'Usługi',
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
        'footer.tagline':       'Regeneracja filtrów cząstek stałych i turbosprężarek. Pomiar przed i po każdym zleceniu.',

        'common.readMore':      'Czytaj więcej',
        'common.backToTop':     'Wróć na górę',
        'common.error':         'Coś poszło nie tak. Spróbuj ponownie.',
        'common.lastUpdated':   'Ostatnia aktualizacja',

        '404.title':            'Nie znaleziono strony',
        '404.message':          'Strona nie istnieje lub została przeniesiona.',
        '404.cta':              'Wróć na stronę główną',
        '404.explore':          'Albo sprawdź',

        // ── Landing: meta ──
        'home.meta.title':         'Regeneracja turbosprężarek i wtryskiwaczy paliwa',
        'home.meta.description':   'Warsztat specjalistyczny: czyszczenie filtrów cząstek stałych DPF i FAP, regeneracja turbosprężarek, wtryskiwaczy paliwa, pomp wtryskowych, katalizatorów i układów SCR. Pomiar przed i po, raport z każdego zlecenia, gwarancja.',

        // ── Landing: hero ──
        'home.hero.heading':       'Czyszczenie filtrów cząstek stałych i regeneracja',
        'home.hero.headingAccent': 'turbosprężarek',
        'home.hero.sub':           'Przywracamy filtry cząstek stałych i turbosprężarki do parametrów fabrycznych — bez wycinania i bez wymiany na nową część. Każde zlecenie kończy się pomiarem kontrolnym i raportem.',
        'home.hero.photoAlt':      'Turbosprężarka z kolektorem wydechowym po regeneracji, na białym tle',
        'home.hero.filterAlt':     'Wyczyszczony filtr cząstek stałych z widocznym plastrem miodu wkładu',
        'home.hero.cta':           'Zadzwoń i wyceń',
        'home.hero.ctaAlt':        'Zobacz zakres usług',

        // ── Landing: liczby ──
        'home.stats.aria':         'Warsztat w liczbach',
        'home.stats.s1.value':     '24–48 h',
        'home.stats.s1.label':     'Typowy czas realizacji',
        'home.stats.s2.value':     '8 000+',
        'home.stats.s2.label':     'Obsłużonych filtrów i turbosprężarek',
        'home.stats.s3.value':     '12 mies.',
        'home.stats.s3.label':     'Gwarancji na regenerację',
        'home.stats.s4.value':     '100%',
        'home.stats.s4.label':     'Zleceń z pomiarem przed i po',

        // ── Landing: usługi ──
        'home.services.title':     'Zakres usług',
        'home.services.photoAlt':  'Pompa wtryskowa wysokiego ciśnienia po regeneracji',
        'home.services.sub':       'Samochody osobowe, dostawcze i ciężarowe — diesel i benzyna. Przyjmujemy części w warsztacie.',
        'home.services.s1.title':  'Regeneracja turbosprężarek',
        'home.services.s1.desc':   'Pełny rozbiór, weryfikacja wału i łożysk, wymiana uszczelnień oraz wyważanie dynamiczne rdzenia na stanowisku wysokoobrotowym.',
        'home.services.s2.title':  'Regeneracja wtryskiwaczy paliwa',
        'home.services.s2.desc':   'Mycie ultradźwiękowe, wymiana rozpylaczy i uszczelnień, test na stanowisku probierczym. Po naprawie kodujemy wtryskiwacz w sterowniku.',
        'home.services.s3.title':  'Regeneracja pomp wtryskowych',
        'home.services.s3.desc':   'Pompy rzędowe, rozdzielaczowe i wysokiego ciśnienia. Wymiana elementów tłoczących, regulacja dawki, próba na stanowisku probierczym.',
        'home.services.s4.title':  'Czyszczenie filtrów cząstek stałych DPF i FAP',
        'home.services.s4.desc':   'Mycie hydrodynamiczne i ultradźwiękowe wkładu — bez wypalania i bez wycinania. Usuwamy sadzę, popiół i osad olejowy, przywracając przepustowość filtra.',
        'home.services.s5.title':  'Katalizatory i układy selektywnej redukcji katalitycznej SCR',
        'home.services.s5.desc':   'Czyszczenie katalizatorów, filtrów SCR i modułów dozujących AdBlue. Przywracamy przepływ bez ingerencji w oprogramowanie silnika.',
        'home.services.s6.title':  'Diagnostyka i pomiary',
        'home.services.s6.desc':   'Odczyt sterownika, pomiar ciśnienia różnicowego i przepływu, ocena stanu wkładu przed przyjęciem zlecenia — zanim wydasz złotówkę.',
        'home.services.s7.title':  'Geometria zmienna i aktuatory',
        'home.services.s7.desc':   'Naprawa i kalibracja geometrii zmiennej, wymiana czujników położenia, regeneracja aktuatorów podciśnieniowych i elektronicznych.',

        // ── Landing: proces ──
        'home.process.title':      'Jak wygląda zlecenie',
        'home.process.sub':        'Cztery kroki, jasne warunki na starcie. Bez niespodzianek na fakturze.',
        'home.process.p1.title':   'Kontakt i wstępna wycena',
        'home.process.p1.desc':    'Dzwonisz lub wysyłasz zdjęcie części i numer katalogowy. Podajemy zakres prac i widełki cenowe jeszcze przed przyjęciem zlecenia.',
        'home.process.p2.title':   'Diagnostyka i pomiar',
        'home.process.p2.desc':    'Sprawdzamy stan wkładu i rdzenia, mierzymy przepustowość oraz luzy. Jeśli regeneracja nie ma sensu, mówimy to wprost i nie liczymy za to.',
        'home.process.p3.title':   'Regeneracja',
        'home.process.p3.desc':    'Czyszczenie albo pełny rozbiór z wymianą elementów zużytych. Części eksploatacyjne wymieniamy zawsze na nowe, nigdy na regenerowane.',
        'home.process.p4.title':   'Test i odbiór',
        'home.process.p4.desc':    'Pomiar kontrolny, raport z wynikami przed i po, montaż na życzenie. Część wraca do Ciebie z dokumentem gwarancyjnym.',

        // ── Landing: dlaczego my ──
        'home.why.title':          'Dlaczego regeneracja, a nie wymiana',
        'home.why.photoAlt':       'Komplet czterech wtryskiwaczy paliwa po regeneracji',
        'home.why.w1.title':       'Ułamek ceny nowej części',
        'home.why.w1.desc':        'Regeneracja kosztuje zwykle znacznie mniej niż nowy filtr czy turbosprężarka od producenta, a parametry po usłudze mieszczą się w normie fabrycznej.',
        'home.why.w2.title':       'Bez wycinania i modyfikacji',
        'home.why.w2.desc':        'Usunięcie filtra cząstek stałych to utrata homologacji i niezaliczony przegląd. Czyścimy filtr tak, aby auto pozostało zgodne z normą emisji.',
        'home.why.w3.title':       'Pomiar zamiast deklaracji',
        'home.why.w3.desc':        'Każda część ma pomiar przed i po usłudze. Dostajesz raport z liczbami, nie zapewnienie, że powinno być dobrze.',
        'home.why.w4.title':       'Gwarancja na piśmie',
        'home.why.w4.desc':        'Na wykonaną regenerację wystawiamy dokument gwarancyjny. Reklamacje rozpatrujemy w warsztacie, bez odsyłania do producenta.',

        // ── Landing: FAQ ──
        'home.faq.title':          'Najczęstsze pytania',
        'home.faq.q1':             'Ile trwa czyszczenie filtra cząstek stałych?',
        'home.faq.a1':             'Standardowo 24–48 godzin od momentu dostarczenia części do warsztatu. Terminy pilne ustalamy telefonicznie.',
        'home.faq.q2':             'Czy każdy filtr da się uratować?',
        'home.faq.a2':             'Nie. Filtr z pękniętym, stopionym lub wypalonym wkładem nie nadaje się do regeneracji — ocenimy to na etapie diagnostyki i poinformujemy przed rozpoczęciem prac.',
        'home.faq.q3':             'Czy muszę zdemontować część samodzielnie?',
        'home.faq.a3':             'Nie musisz. Możesz przywieźć całe auto — demontaż i montaż wykonamy na miejscu. Jeśli część jest już wymontowana, wystarczy ją przywieźć.',
        'home.faq.q4':             'Czy po usłudze trzeba kasować błędy w sterowniku?',
        'home.faq.a4':             'Tak — po montażu resetujemy adaptacje i licznik popiołu, a w razie potrzeby uruchamiamy wymuszoną regenerację. To część usługi, nie dodatkowa pozycja na fakturze.',
        'home.faq.q5':             'Czy obsługujecie warsztaty i floty?',
        'home.faq.a5':             'Tak. Dla warsztatów i firm flotowych prowadzimy obsługę priorytetową, rozliczenie zbiorcze i stałe warunki cenowe. Szczegóły ustalamy indywidualnie.',

        // ── Landing: kontakt ──
        'home.contact.title':      'Umów regenerację',
        'home.contact.sub':        'Zadzwoń po wycenę albo przywieź część do warsztatu.',
        'home.contact.phone':      'Telefon',
        'home.contact.email':      'E-mail',
        'home.contact.address':    'Adres warsztatu',
        'home.contact.hours':      'Godziny otwarcia',
        'home.contact.hoursValue': 'Pon.–Pt. 8:00–17:00 · Sob. 9:00–13:00',
        'home.contact.cta':        'Zadzwoń teraz',
        'home.contact.ctaAlt':     'Napisz e-mail',

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
        'site.description':     'Specialist workshop: diesel particulate filter cleaning and turbocharger regeneration',
        'nav.home':             'Home',
        'nav.services':         'Services',
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
        'footer.tagline':       'Diesel particulate filter and turbocharger regeneration. Measured before and after, every job.',

        'common.readMore':      'Read more',
        'common.backToTop':     'Back to top',
        'common.error':         'Something went wrong. Please try again.',
        'common.lastUpdated':   'Last updated',

        '404.title':            'Page not found',
        '404.message':          'The page does not exist or has been moved.',
        '404.cta':              'Back to home',
        '404.explore':          'Or check out',

        // ── Landing: meta ──
        'home.meta.title':         'Turbocharger and fuel injector regeneration',
        'home.meta.description':   'Specialist workshop: diesel particulate filter (DPF and FAP) cleaning, turbocharger, fuel injector and injection pump regeneration, catalytic converters and SCR systems. Measured before and after, a report with every job, warranty included.',

        // ── Landing: hero ──
        'home.hero.heading':       'Diesel particulate filter cleaning and turbocharger',
        'home.hero.headingAccent': 'regeneration',
        'home.hero.sub':           'We restore particulate filters and turbochargers to factory specification — no cutting out, no replacement part needed. Every job ends with a control measurement and a report.',
        'home.hero.photoAlt':      'A regenerated turbocharger with its exhaust manifold, on a white background',
        'home.hero.filterAlt':     'A cleaned diesel particulate filter with the honeycomb face of the core visible',
        'home.hero.cta':           'Call for a quote',
        'home.hero.ctaAlt':        'See what we do',

        // ── Landing: numbers ──
        'home.stats.aria':         'The workshop in numbers',
        'home.stats.s1.value':     '24–48 h',
        'home.stats.s1.label':     'Typical turnaround',
        'home.stats.s2.value':     '8,000+',
        'home.stats.s2.label':     'Filters and turbochargers serviced',
        'home.stats.s3.value':     '12 months',
        'home.stats.s3.label':     'Warranty on regeneration',
        'home.stats.s4.value':     '100%',
        'home.stats.s4.label':     'Jobs measured before and after',

        // ── Landing: services ──
        'home.services.title':     'What we do',
        'home.services.photoAlt':  'A regenerated high-pressure injection pump',
        'home.services.sub':       'Passenger cars, vans and trucks — diesel and petrol. Parts are taken in at the workshop.',
        'home.services.s1.title':  'Turbocharger regeneration',
        'home.services.s1.desc':   'Full teardown, shaft and bearing inspection, new seals, and dynamic balancing of the core on a high-speed balancing rig.',
        'home.services.s2.title':  'Fuel injector regeneration',
        'home.services.s2.desc':   'Ultrasonic cleaning, nozzle and seal replacement, testing on a calibration bench. After the repair we code the injector into the control unit.',
        'home.services.s3.title':  'Injection pump regeneration',
        'home.services.s3.desc':   'Inline, distributor and high-pressure pumps. Pumping elements replaced, delivery quantity adjusted, pressure tested on a calibration bench.',
        'home.services.s4.title':  'Diesel particulate filter (DPF and FAP) cleaning',
        'home.services.s4.desc':   'Hydrodynamic and ultrasonic cleaning of the filter core — no burning, no cutting out. We remove soot, ash and oil deposits and restore flow through the filter.',
        'home.services.s5.title':  'Catalytic converters and selective catalytic reduction (SCR)',
        'home.services.s5.desc':   'Cleaning of catalytic converters, SCR filters and AdBlue dosing modules. Flow is restored without touching the engine software.',
        'home.services.s6.title':  'Diagnostics and measurement',
        'home.services.s6.desc':   'ECU readout, differential pressure and flow measurement, and an assessment of the core before we take the job on — before you spend anything.',
        'home.services.s7.title':  'Variable geometry and actuators',
        'home.services.s7.desc':   'Repair and calibration of variable geometry, position sensor replacement, and regeneration of vacuum and electronic actuators.',

        // ── Landing: process ──
        'home.process.title':      'How a job works',
        'home.process.sub':        'Four steps, clear terms up front. No surprises on the invoice.',
        'home.process.p1.title':   'Contact and initial quote',
        'home.process.p1.desc':    'Call us or send a photo of the part with its part number. You get the scope of work and a price range before the job is accepted.',
        'home.process.p2.title':   'Diagnostics and measurement',
        'home.process.p2.desc':    'We inspect the core, measure flow and check clearances. If regeneration does not make sense, we say so plainly — and we do not charge for that.',
        'home.process.p3.title':   'Regeneration',
        'home.process.p3.desc':    'Cleaning, or a full teardown with worn components replaced. Wear parts are always replaced with new ones, never refurbished ones.',
        'home.process.p4.title':   'Testing and collection',
        'home.process.p4.desc':    'Control measurement, a report with before and after figures, and fitting on request. The part comes back to you with a warranty document.',

        // ── Landing: why us ──
        'home.why.title':          'Why regenerate instead of replacing',
        'home.why.photoAlt':       'A set of four regenerated fuel injectors',
        'home.why.w1.title':       'A fraction of the price of a new part',
        'home.why.w1.desc':        'Regeneration typically costs far less than a new filter or turbocharger from the manufacturer, and the results stay within factory tolerance.',
        'home.why.w2.title':       'No cutting out, no modification',
        'home.why.w2.desc':        'Removing a diesel particulate filter voids type approval and fails inspection. We clean the filter so the car stays compliant with its emission standard.',
        'home.why.w3.title':       'Measurement, not assurances',
        'home.why.w3.desc':        'Every part is measured before and after. You get a report with numbers, not a promise that it should be fine.',
        'home.why.w4.title':       'Warranty in writing',
        'home.why.w4.desc':        'Every regeneration comes with a warranty document. Claims are handled at the workshop, not passed on to a manufacturer.',

        // ── Landing: FAQ ──
        'home.faq.title':          'Frequently asked questions',
        'home.faq.q1':             'How long does particulate filter cleaning take?',
        'home.faq.a1':             'Typically 24 to 48 hours from the moment the part reaches the workshop. Urgent turnarounds can be arranged by phone.',
        'home.faq.q2':             'Can every filter be saved?',
        'home.faq.a2':             'No. A filter with a cracked, melted or burnt-through core cannot be regenerated. We establish this during diagnostics and tell you before any work starts.',
        'home.faq.q3':             'Do I have to remove the part myself?',
        'home.faq.a3':             'Not at all. You can bring the whole vehicle in and we handle removal and refitting. If the part is already off, simply drop it off.',
        'home.faq.q4':             'Do fault codes need clearing afterwards?',
        'home.faq.a4':             'Yes — after refitting we reset the adaptations and the ash counter, and run a forced regeneration where needed. That is part of the service, not a separate line on the invoice.',
        'home.faq.q5':             'Do you work with workshops and fleets?',
        'home.faq.a5':             'Yes. Workshops and fleet operators get priority handling, consolidated invoicing and fixed pricing. Terms are agreed case by case.',

        // ── Landing: contact ──
        'home.contact.title':      'Book a regeneration',
        'home.contact.sub':        'Call for a quote or bring the part to the workshop.',
        'home.contact.phone':      'Phone',
        'home.contact.email':      'Email',
        'home.contact.address':    'Workshop address',
        'home.contact.hours':      'Opening hours',
        'home.contact.hoursValue': 'Mon-Fri 8:00-17:00 · Sat 9:00-13:00',
        'home.contact.cta':        'Call now',
        'home.contact.ctaAlt':     'Send an email',

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
