import type { Locale } from '@/lib/locales'
import { defaultLocale } from '@/lib/locales'

// ─── Flat UI strings ─────────────────────────────────────────────
// All translatable UI text lives here as flat key-value pairs.
// Convention:  {page}.{section}.{field}

const ui = {
    pl: {
        'site.name':            'RAF Turbo DPF',
        'site.description':     'Warsztat: regeneracja turbosprężarek, wtryskiwaczy i pomp wtryskowych, czyszczenie DPF',
        'nav.home':             'Strona główna',
        'nav.services':         'Usługi',
        'nav.dpf':              'Filtry DPF',
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
        'footer.tagline':       'Regeneracja turbosprężarek, wtryskiwaczy i pomp wtryskowych. Czyszczenie filtrów DPF. Pomiar przed i po każdej naprawie.',

        'common.readMore':      'Czytaj więcej',
        'common.backToTop':     'Wróć na górę',
        'common.error':         'Coś poszło nie tak. Spróbuj ponownie.',
        'common.lastUpdated':   'Ostatnia aktualizacja',

        '404.title':            'Nie znaleziono strony',
        '404.message':          'Strona nie istnieje lub została przeniesiona.',
        '404.cta':              'Wróć na stronę główną',
        '404.explore':          'Albo sprawdź',

        // ── Landing: meta ──
        'home.meta.title':         'Regeneracja turbosprężarek, wtryskiwaczy i pomp wtryskowych',
        'home.meta.description':   'Regenerujemy turbosprężarki, wtryskiwacze diesla i benzynowe oraz pompy wtryskowe. Czyścimy filtry DPF. Samochody osobowe, dostawcze i ciężarowe oraz maszyny budowlane i rolnicze.',

        // ── Landing: hero ──
        'home.hero.heading':       'Regeneracja turbosprężarek, wtryskiwaczy i pomp.',
        'home.hero.headingAccent': 'Czyszczenie DPF',
        'home.hero.sub':           'Turbosprężarki, wtryskiwacze diesla i benzynowe, pompy wtryskowe — do samochodów osobowych, dostawczych i ciężarowych oraz maszyn budowlanych i rolniczych. Naprawiamy zamiast wymieniać: pomiar przed i po, gwarancja, zwykle 24–48 godzin.',
        'home.hero.photoAlt':      'Zbliżenie turbosprężarki z widocznym kołem kompresora, zamontowanej w komorze silnika',
        'home.hero.filterAlt':     'Wyczyszczony filtr cząstek stałych z widocznym plastrem miodu wkładu',
        'home.hero.cta':           'Zadzwoń po wycenę',
        'home.hero.ctaAlt':        'Zobacz, co robimy',

        // ── Landing: liczby ──
        'home.stats.aria':         'Warsztat w liczbach',
        'home.stats.s1.value':     '24–48 h',
        'home.stats.s1.label':     'Typowy czas realizacji',
        'home.stats.s2.value':     '8 000+',
        'home.stats.s2.label':     'Naprawionych części',
        'home.stats.s3.value':     '12 mies.',
        'home.stats.s3.label':     'Gwarancji na naprawę',

        // ── Landing: usługi ──
        'home.services.title':     'Co robimy',
        'home.services.photoAlt':  'Pompa wtryskowa wysokiego ciśnienia po regeneracji',
        'home.services.sub':       'Samochody osobowe, dostawcze i ciężarowe, maszyny budowlane i rolnicze — diesel i benzyna.',
        'home.services.s1.title':  'Czyszczenie DPF i FAP',
        'home.services.s1.desc':   'Wypłukujemy sadzę, popiół i olej z wkładu — na mokro i ultradźwiękami. Bez wypalania i bez wycinania filtra.',
        'home.services.s2.title':  'Regeneracja turbosprężarek',
        'home.services.s2.desc':   'Wszystkie typy — od osobowych po ciężarowe i maszynowe. Rozbiór, wał i łożyska, nowe uszczelnienia, wyważanie rdzenia, geometria zmienna i aktuatory.',
        'home.services.s3.title':  'Regeneracja wtryskiwaczy',
        'home.services.s3.desc':   'Diesel i benzyna: Common Rail, pompowtryskiwacze, wtrysk bezpośredni. Czyszczenie, nowy rozpylacz, ustawienie dawki i test na stole probierczym.',
        'home.services.s4.title':  'Regeneracja pomp wtryskowych',
        'home.services.s4.desc':   'Pompy rzędowe, rotacyjne i wysokiego ciśnienia. Rozbiór, wymiana zużytych elementów, ustawienie dawki i próba na stole.',
        'home.services.s5.title':  'Diagnostyka i pomiary',
        'home.services.s5.desc':   'Odczyt sterownika, pomiar ciśnienia i przepływu. Oceniamy stan części, zanim przyjmiemy zlecenie — i zanim poniesiesz jakiekolwiek koszty.',
        'home.services.s6.title':  'Demontaż i montaż',
        'home.services.s6.desc':   'Przyjeżdżasz samochodem, my demontujemy część, naprawiamy ją i montujemy z powrotem. Części zdemontowane z maszyn również przyjmujemy.',

        // ── Landing: proces ──
        'home.dpf.title':          'Czyszczenie filtrów cząstek stałych DPF i FAP',
        'home.dpf.sub':            'Zapchany filtr wypłukujemy z sadzy, popiołu i oleju, zamiast wycinać go albo kupować nowy. Przepływ mierzymy przed czyszczeniem i po nim, a wynik dostajesz na wydruku.',
        'home.dpf.doTitle':        'Co robimy',
        'home.dpf.d1':             'Pomiar przepływu i oporu przed czyszczeniem i po nim',
        'home.dpf.d2':             'Mycie na mokro i ultradźwiękami',
        'home.dpf.d3':             'Wypłukanie sadzy, popiołu i oleju z wkładu',
        'home.dpf.d4':             'Wydruk z wynikami i gwarancja na piśmie',
        'home.dpf.symTitle':       'Kiedy przywieźć filtr',
        'home.dpf.y1':             'Świeci kontrolka filtra DPF albo silnika',
        'home.dpf.y2':             'Samochód wchodzi w tryb awaryjny i traci moc',
        'home.dpf.y3':             'Wypalanie filtra się nie kończy albo jest przerywane',
        'home.dpf.y4':             'Rośnie zużycie paliwa, a poziom oleju stale się podnosi',
        'home.dpf.y5':             'Błędy ciśnienia różnicowego lub zapchania filtra',
        'home.dpf.note':           'Filtry DPF i FAP do samochodów osobowych, dostawczych i ciężarowych oraz maszyn. Nie wiesz, czy winny jest filtr? Sprawdzamy, czy problemem jest wkład, czujnik czy coś innego. Jeśli czyszczenie nie ma sensu, mówimy to wprost.',
        'home.dpf.cta':            'Zadzwoń po wycenę czyszczenia',

        'home.injectors.title':    'Regeneracja wtryskiwaczy i pomp wtryskowych',
        'home.injectors.sub':      'Wtryskiwacze diesla i benzynowe oraz pompy wtryskowe. Każdy element sprawdzamy osobno na stole probierczym — dawkę, przelew i szczelność. Zużyte części wymieniamy na nowe i ustawiamy dawkę od nowa. Na koniec otrzymujesz wydruk z wynikami.',
        'home.injectors.doTitle':  'Co robimy',
        'home.injectors.d1':       'Próba na stole probierczym — przed naprawą i po niej',
        'home.injectors.d2':       'Rozbiór, mycie ultradźwiękowe i pomiar zużycia',
        'home.injectors.d3':       'Nowe rozpylacze, elementy tłoczące, uszczelnienia i podkładki',
        'home.injectors.d4':       'Ustawienie dawki i nowe kody korekty do sterownika',
        'home.injectors.symTitle': 'Kiedy przywieźć wtryskiwacze albo pompę',
        'home.injectors.y1':       'Utrudniony rozruch silnika, zwłaszcza na zimno',
        'home.injectors.y2':       'Nierówna praca na wolnych obrotach',
        'home.injectors.y3':       'Dym z układu wydechowego i większe zużycie paliwa',
        'home.injectors.y4':       'Stuki, szarpanie i spadek mocy',
        'home.injectors.y5':       'Świeci kontrolka silnika, błędy od przelewu lub ciśnienia paliwa',
        'home.injectors.note':     'Bosch, Delphi, Denso, Siemens (VDO), Continental. Common Rail, pompowtryskiwacze, wtrysk bezpośredni benzyny, pompy rzędowe i rotacyjne. Nie wiesz, który element jest uszkodzony? Sprawdzamy cały komplet i informujemy, co da się naprawić, a co wymaga wymiany.',
        'home.injectors.cta':      'Zadzwoń i opisz objawy',

        'home.process.title':      'Jak to wygląda',
        'home.process.sub':        'Od kontaktu do odebrania części.',
        'home.process.p1.title':   'Dzwonisz albo przyjeżdżasz',
        'home.process.p1.desc':    'Zadzwoń i opisz problem albo przyjedź do naszego warsztatu w godzinach otwarcia.',
        'home.process.p2.title':   'Sprawdzamy część i podajemy cenę',
        'home.process.p2.desc':    'Mierzymy przepływ, luzy i stan wkładu, a potem podajemy cenę. Jeśli naprawa nie ma sensu, poinformujemy o tym wprost i nie pobierzemy opłaty za sprawdzenie.',
        'home.process.p3.title':   'Naprawiamy',
        'home.process.p3.desc':    'Czyszczenie albo pełny rozbiór z wymianą zużytych części. Uszczelki, łożyska i rozpylacze zawsze nowe, nigdy z odzysku.',
        'home.process.p4.title':   'Odbierasz część',
        'home.process.p4.desc':    'Pomiar kontrolny, wydruk z wynikami przed i po, montaż na życzenie. Część wraca do Ciebie z gwarancją na piśmie.',

        // ── Landing: dlaczego my ──
        'home.why.title':          'Dlaczego naprawa, a nie nowa część',
        'home.why.photoAlt':       'Komplet czterech wtryskiwaczy paliwa po regeneracji',
        'home.why.w1.title':       'Kosztuje ułamek nowej części',
        'home.why.w1.desc':        'Naprawa wychodzi znacznie taniej niż nowy filtr, turbina, pompa czy komplet wtryskiwaczy. A część po naprawie pracuje tak, jak powinna.',
        'home.why.w2.title':       'Bez wycinania i przeróbek',
        'home.why.w2.desc':        'Wycięty DPF to utrata homologacji i niezaliczony przegląd. Czyścimy filtr tak, aby pojazd pozostał zgodny z normą emisji spalin.',
        'home.why.w3.title':       'Pomiar zamiast obietnic',
        'home.why.w3.desc':        'Każdą część mierzymy przed naprawą i po niej. Otrzymujesz wydruk z wynikami, a nie zapewnienie, że powinno być dobrze.',
        'home.why.w4.title':       'Gwarancja na piśmie',
        'home.why.w4.desc':        'Na każdą naprawę wystawiamy dokument gwarancyjny. Reklamacje rozpatrujemy w warsztacie — nie odsyłamy Cię do producenta.',

        // ── Landing: FAQ ──
        'home.faq.title':          'Częste pytania',
        'home.faq.q1':             'Ile trwa naprawa?',
        'home.faq.a1':             'Zwykle 24–48 godzin od dnia, w którym część do nas trafi. Jeśli zostawiasz cały samochód, dochodzi jeszcze demontaż i montaż. Pilne zlecenia ustalamy telefonicznie.',
        'home.faq.q2':             'Czy każdy filtr da się uratować?',
        'home.faq.a2':             'Nie. Pęknięty, stopiony albo wypalony wkład nadaje się już tylko na wymianę. Widzimy to przy sprawdzeniu i mówimy, zanim zaczniemy pracę.',
        'home.faq.q3':             'Czy muszę samodzielnie zdemontować część?',
        'home.faq.a3':             'Nie. Możesz przyjechać całym samochodem — zdemontujemy i zamontujemy część na miejscu. Jeśli część jest już zdemontowana, przywieź ją do warsztatu.',
        'home.faq.q4':             'Po czym poznać, że wtryskiwacze lub pompa są uszkodzone?',
        'home.faq.a4':             'Silnik trudno uruchamia się na zimno, pracuje nierówno na wolnych obrotach, dymi lub zużywa więcej paliwa. Pewność daje dopiero próba na stole probierczym — sprawdzamy cały komplet i wskazujemy, który element wymaga naprawy.',
        'home.faq.q5':             'Czy po naprawie trzeba kasować błędy?',
        'home.faq.a5':             'Tak, wykonujemy to my. Po montażu kasujemy adaptacje i licznik popiołu, a w razie potrzeby wymuszamy regenerację. Jest to wliczone w cenę usługi.',
        'home.faq.q6':             'Czy trzeba się wcześniej umawiać?',
        'home.faq.a6':             'Nie. Możesz zgłosić się w godzinach otwarcia. Telefon przed przyjazdem pozwala nam od razu powiedzieć, czy warto zabrać część ze sobą.',
        'home.faq.q7':             'Czy obsługujecie warsztaty i firmy z flotą pojazdów?',
        'home.faq.a7':             'Tak. Warsztaty i firmy z flotą obsługujemy w pierwszej kolejności, z jedną fakturą zbiorczą i stałymi cenami. Warunki ustalamy indywidualnie.',
        'home.faq.q8':             'Czy naprawiacie części z maszyn budowlanych i rolniczych?',
        'home.faq.a8':             'Tak. Turbosprężarki, wtryskiwacze i pompy wtryskowe z ciągników, koparek, ładowarek czy wózków widłowych regenerujemy tak samo jak te z samochodów. Maszyna nie musi przyjeżdżać — wystarczy przywieźć zdemontowaną część.',

        // ── Landing: kontakt ──
        'home.contact.title':      'Zadzwoń albo przyjedź',
        'home.contact.sub':        'Zadzwoń po wycenę albo odwiedź warsztat — z częścią lub całym samochodem.',
        'home.contact.phone':      'Telefon',
        'home.contact.email':      'E-mail',
        'home.contact.address':    'Adres warsztatu',
        'home.contact.hours':      'Godziny otwarcia',
        'home.contact.hoursValue': 'Pon.–Pt. 8:00–17:00 · Sob.–Niedz. nieczynne',
        'home.contact.cta':        'Zadzwoń teraz',
        'home.contact.ctaAlt':     'Napisz e-mail',

        // ── Privacy policy ──
        'privacy.title':        'Polityka prywatności',
        'privacy.description':  'Polityka prywatności serwisu RAF Turbo DPF',
        'privacy.intro':        'Niniejsza Polityka Prywatności opisuje, w jaki sposób RAF-Turbo-DPF Rafał Markiewicz (dalej „my", „nas" lub „nasz") gromadzi, wykorzystuje i chroni informacje dotyczące użytkowników naszej strony internetowej.',
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
        'privacy.contact.text':        'W sprawach dotyczących ochrony danych osobowych prosimy o kontakt pod adresem e-mail:',
        'privacy.changes.heading':     'Zmiany w polityce',
        'privacy.changes.text':        'Zastrzegamy sobie prawo do aktualizacji niniejszej Polityki Prywatności. Wszelkie zmiany zostaną opublikowane na tej stronie wraz z datą ostatniej aktualizacji.',

        // ── Terms of service ──
        'terms.title':          'Regulamin',
        'terms.description':    'Regulamin korzystania z serwisu RAF Turbo DPF',
        'terms.intro':          'Niniejszy Regulamin określa zasady korzystania z serwisu internetowego prowadzonego przez RAF-Turbo-DPF Rafał Markiewicz. Korzystanie z serwisu oznacza akceptację poniższych warunków.',
        'terms.definitions.heading':   'Definicje',
        'terms.definitions.text':      'Serwis — strona internetowa dostępna pod adresem domeny, na której opublikowany jest niniejszy Regulamin. Operator — RAF-Turbo-DPF Rafał Markiewicz, podmiot odpowiedzialny za prowadzenie Serwisu (dane rejestrowe poniżej). Użytkownik — każda osoba korzystająca z Serwisu.',
        'terms.rules.heading':         'Zasady korzystania',
        'terms.rules.text':            'Użytkownik zobowiązuje się do korzystania z Serwisu zgodnie z obowiązującym prawem i dobrymi obyczajami. Zabrania się podejmowania działań mogących zakłócić prawidłowe funkcjonowanie Serwisu, w tym prób nieautoryzowanego dostępu do systemów informatycznych.',
        'terms.ip.heading':            'Własność intelektualna',
        'terms.ip.text':               'Wszelkie treści dostępne w Serwisie, w tym teksty, grafiki, logotypy, ikony i oprogramowanie, stanowią własność Operatora lub są wykorzystywane na podstawie stosownych licencji. Kopiowanie, rozpowszechnianie lub modyfikowanie tych treści bez zgody Operatora jest zabronione.',
        'terms.liability.heading':     'Odpowiedzialność',
        'terms.liability.text':        'Operator dokłada wszelkich starań, aby informacje zamieszczone w Serwisie były aktualne i prawidłowe, jednak nie ponosi odpowiedzialności za ewentualne błędy lub nieścisłości. Serwis udostępniany jest w stanie „takim, jaki jest" (as is), bez gwarancji jakiegokolwiek rodzaju.',
        'terms.changes.heading':       'Zmiany regulaminu',
        'terms.changes.text':          'Operator zastrzega sobie prawo do zmiany niniejszego Regulaminu. Zmiany wchodzą w życie z chwilą ich opublikowania w Serwisie. Dalsze korzystanie z Serwisu po wprowadzeniu zmian oznacza ich akceptację.',
        'terms.contact.heading':       'Kontakt',
        'terms.contact.text':          'W sprawach związanych z Regulaminem prosimy o kontakt pod adresem e-mail:',
        'legal.company.heading': 'Dane firmy',
    },
    en: {
        'site.name':            'RAF Turbo DPF',
        'site.description':     'Workshop: turbocharger, injector and injection pump rebuilds, DPF cleaning',
        'nav.home':             'Home',
        'nav.services':         'Services',
        'nav.dpf':              'DPF filters',
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
        'footer.tagline':       'Turbocharger, injector and injection pump rebuilds. DPF filter cleaning. Measured before and after, every job.',

        'common.readMore':      'Read more',
        'common.backToTop':     'Back to top',
        'common.error':         'Something went wrong. Please try again.',
        'common.lastUpdated':   'Last updated',

        '404.title':            'Page not found',
        '404.message':          'The page does not exist or has been moved.',
        '404.cta':              'Back to home',
        '404.explore':          'Or check out',

        // ── Landing: meta ──
        'home.meta.title':         'Turbocharger, injector and injection pump rebuilds',
        'home.meta.description':   'We rebuild turbochargers, diesel and petrol injectors and injection pumps, and clean DPF filters. Cars, vans, trucks, construction and farm machinery.',

        // ── Landing: hero ──
        'home.hero.heading':       'Turbocharger, injector and pump rebuilds.',
        'home.hero.headingAccent': 'DPF cleaning',
        'home.hero.sub':           'Turbochargers, diesel and petrol injectors, injection pumps — for cars, vans and trucks as well as construction and farm machinery. We repair rather than replace: measured before and after, with a warranty, usually within 24 to 48 hours.',
        'home.hero.photoAlt':      'Close-up of a turbocharger with its compressor wheel visible, mounted in an engine bay',
        'home.hero.filterAlt':     'A cleaned diesel particulate filter with the honeycomb face of the core visible',
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

        // ── Landing: services ──
        'home.services.title':     'What we do',
        'home.services.photoAlt':  'A regenerated high-pressure injection pump',
        'home.services.sub':       'Cars, vans and trucks, construction and farm machinery — diesel and petrol.',
        'home.services.s1.title':  'DPF and FAP cleaning',
        'home.services.s1.desc':   'We wash the soot, ash and oil out of the core — wet cleaning and ultrasound. No burning, no cutting the filter out.',
        'home.services.s2.title':  'Turbocharger regeneration',
        'home.services.s2.desc':   'Every type, from small car turbos to truck and machinery units. Teardown, shaft and bearings, new seals, core balancing, variable geometry and actuators.',
        'home.services.s3.title':  'Injector regeneration',
        'home.services.s3.desc':   'Diesel and petrol: Common Rail, unit injectors, direct injection. Cleaning, a new nozzle, fuel delivery set up again and a test on the rig.',
        'home.services.s4.title':  'Injection pump regeneration',
        'home.services.s4.desc':   'Inline, rotary and high-pressure pumps. Teardown, worn parts replaced, delivery set up again and a bench test.',
        'home.services.s5.title':  'Diagnostics and measurement',
        'home.services.s5.desc':   'ECU readout, pressure and flow measurement. We assess the part before taking the job on — and before you spend anything.',
        'home.services.s6.title':  'Removal and refitting',
        'home.services.s6.desc':   'Bring the car in — we remove the part, repair it and refit it. Parts already removed from machinery are accepted too.',

        // ── Landing: process ──
        'home.dpf.title':          'DPF and FAP particulate filter cleaning',
        'home.dpf.sub':            'We flush soot, ash and oil out of a clogged filter instead of cutting it out or selling you a new one. Flow is measured before and after cleaning, and you get the result on a printout.',
        'home.dpf.doTitle':        'What we do',
        'home.dpf.d1':             'Flow and resistance measured before and after cleaning',
        'home.dpf.d2':             'Wet washing and ultrasonic cleaning',
        'home.dpf.d3':             'Soot, ash and oil flushed out of the core',
        'home.dpf.d4':             'Printout of the results and a written warranty',
        'home.dpf.symTitle':       'When to bring the filter in',
        'home.dpf.y1':             'The DPF or engine warning light is on',
        'home.dpf.y2':             'The car goes into limp mode and loses power',
        'home.dpf.y3':             'Regeneration never finishes or keeps being interrupted',
        'home.dpf.y4':             'Fuel use is rising and the oil level keeps climbing',
        'home.dpf.y5':             'Differential pressure or clogged-filter fault codes',
        'home.dpf.note':           'DPF and FAP filters for cars, vans, trucks and machinery. Not sure the filter is at fault? We check whether it is the core, a sensor or something else. If cleaning would not help, we tell you plainly.',
        'home.dpf.cta':            'Call us for a cleaning quote',

        'home.injectors.title':    'Injector and injection pump regeneration',
        'home.injectors.sub':      'Diesel and petrol injectors as well as injection pumps. Every part is tested separately on the rig — fuel delivery, back-leakage and sealing. Worn parts are replaced with new ones and delivery is set up again. You get a printout of the results.',
        'home.injectors.doTitle':  'What we do',
        'home.injectors.d1':       'Bench test — before the repair and after it',
        'home.injectors.d2':       'Teardown, ultrasonic cleaning and wear measurement',
        'home.injectors.d3':       'New nozzles, pumping elements, seals and washers',
        'home.injectors.d4':       'Delivery set up and new correction codes for the ECU',
        'home.injectors.symTitle': 'When to bring injectors or a pump in',
        'home.injectors.y1':       'The engine struggles to start, especially cold',
        'home.injectors.y2':       'Uneven running at idle',
        'home.injectors.y3':       'Smoke from the exhaust and higher fuel use',
        'home.injectors.y4':       'Knocking, hesitation, loss of power',
        'home.injectors.y5':       'Engine light on, back-leakage or fuel pressure fault codes',
        'home.injectors.note':     'Bosch, Delphi, Denso, Siemens (VDO), Continental. Common Rail, unit injectors, petrol direct injection, inline and rotary pumps. Not sure what is failing? We test the whole set and tell you what can be repaired and what needs replacing.',
        'home.injectors.cta':      'Call us and describe the symptoms',

        'home.process.title':      'How it works',
        'home.process.sub':        'From the first call to picking the part up.',
        'home.process.p1.title':   'You call or drive over',
        'home.process.p1.desc':    'Call us and describe what the car is doing, or visit the workshop during opening hours.',
        'home.process.p2.title':   'We check it and quote',
        'home.process.p2.desc':    'We measure flow, clearances and the state of the core, then tell you what it will cost. If a repair makes no sense, we say so plainly — and we do not charge for the check.',
        'home.process.p3.title':   'We repair it',
        'home.process.p3.desc':    'Cleaning, or a full teardown with worn parts replaced. Seals, bearings and nozzles are always new, never salvaged.',
        'home.process.p4.title':   'You collect it',
        'home.process.p4.desc':    'Control measurement, a printout with before and after figures, and refitting if you want it. The part comes back with a written warranty.',

        // ── Landing: why us ──
        'home.why.title':          'Why repair instead of buying new',
        'home.why.photoAlt':       'A set of four regenerated fuel injectors',
        'home.why.w1.title':       'A fraction of the price of a new part',
        'home.why.w1.desc':        'A repair costs far less than a new filter, turbo, pump or set of injectors. And the part works as it should afterwards.',
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
        'home.faq.a3':             'No. You can bring the whole car in and we will remove and refit the part here. If the part is already removed, bring it to the workshop.',
        'home.faq.q4':             'How do I know the injectors or the pump are failing?',
        'home.faq.a4':             'The engine is hard to start when cold, runs unevenly at idle, smokes or uses more fuel. Only a bench test settles it — we test the whole set and tell you which part needs work.',
        'home.faq.q5':             'Do fault codes need clearing afterwards?',
        'home.faq.a5':             'Yes, and we do it. After refitting we reset the adaptations and the ash counter, and force a regeneration if needed. It is included in the price.',
        'home.faq.q6':             'Do I need an appointment?',
        'home.faq.a6':             'No. You can visit during opening hours. Calling ahead only helps in that we can tell you straight away whether to bring the part with you.',
        'home.faq.q7':             'Do you work with workshops and fleets?',
        'home.faq.a7':             'Yes. Workshops and fleet operators get served first, with one consolidated invoice and fixed pricing. Terms are agreed here at the workshop.',
        'home.faq.q8':             'Do you repair parts off construction and farm machinery?',
        'home.faq.a8':             'Yes. Turbochargers, injectors and injection pumps off tractors, excavators, loaders or forklifts are handled exactly like those off cars. The machine does not have to come in — just bring the part in already removed.',

        // ── Landing: contact ──
        'home.contact.title':      'Call us or drive over',
        'home.contact.sub':        'Call for a quote or visit the workshop — with the part or with the whole car.',
        'home.contact.phone':      'Phone',
        'home.contact.email':      'Email',
        'home.contact.address':    'Workshop address',
        'home.contact.hours':      'Opening hours',
        'home.contact.hoursValue': 'Mon-Fri 8:00-17:00 · Sat-Sun closed',
        'home.contact.cta':        'Call now',
        'home.contact.ctaAlt':     'Send an email',

        // ── Privacy policy ──
        'privacy.title':        'Privacy Policy',
        'privacy.description':  'Privacy policy for the RAF Turbo DPF website',
        'privacy.intro':        'This Privacy Policy describes how RAF-Turbo-DPF Rafał Markiewicz ("we", "us", or "our") collects, uses, and protects information about users of our website.',
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
        'privacy.contact.text':        'For data protection inquiries, please contact us at:',
        'privacy.changes.heading':     'Policy changes',
        'privacy.changes.text':        'We reserve the right to update this Privacy Policy. Any changes will be published on this page along with the date of the last update.',

        // ── Terms of service ──
        'terms.title':          'Terms of Service',
        'terms.description':    'Terms of service for the RAF Turbo DPF website',
        'terms.intro':          'These Terms of Service govern the use of the website operated by RAF-Turbo-DPF Rafał Markiewicz. By using the website, you agree to the following terms.',
        'terms.definitions.heading':   'Definitions',
        'terms.definitions.text':      'Service — the website available at the domain where these Terms are published. Operator — RAF-Turbo-DPF Rafał Markiewicz, the entity responsible for operating the Service (registered details below). User — any person using the Service.',
        'terms.rules.heading':         'Rules of use',
        'terms.rules.text':            'The User agrees to use the Service in accordance with applicable law and good practices. Any actions that may disrupt the proper functioning of the Service are prohibited, including attempts at unauthorized access to IT systems.',
        'terms.ip.heading':            'Intellectual property',
        'terms.ip.text':               'All content available on the Service, including texts, graphics, logos, icons, and software, is the property of the Operator or is used under appropriate licenses. Copying, distributing, or modifying this content without the Operator\'s consent is prohibited.',
        'terms.liability.heading':     'Liability',
        'terms.liability.text':        'The Operator makes every effort to ensure that the information published on the Service is up-to-date and accurate, but assumes no responsibility for any errors or inaccuracies. The Service is provided "as is", without warranties of any kind.',
        'terms.changes.heading':       'Changes to terms',
        'terms.changes.text':          'The Operator reserves the right to amend these Terms. Changes take effect upon publication on the Service. Continued use of the Service after changes constitutes acceptance thereof.',
        'terms.contact.heading':       'Contact',
        'terms.contact.text':          'For inquiries related to these Terms, please contact us at:',
        'legal.company.heading': 'Company details',
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
