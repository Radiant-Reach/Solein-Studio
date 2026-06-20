import slugify from 'utils/slugify'

export type EventCategory = 'zewnetrzne' | 'solein'

export type EventRecord = {
  id: string
  title: string
  date: string
  time: string
  type: EventCategory
  location: string
  description: string
  longDescription: string
}

// Placeholder events — swap for real dates/titles/details when available.
// `id` doubles as the URL slug for /wydarzenia/[slug].
export const EVENTS: EventRecord[] = [
  {
    id: slugify('Warsztaty florystyczne 2026-06-05'),
    title: 'Warsztaty florystyczne',
    date: '2026-06-05',
    time: '17:00–19:30',
    type: 'zewnetrzne',
    location: 'Soleil Studio, Wrocław',
    description: 'Warsztaty układania bukietów dla początkujących.',
    longDescription:
      'Dwuipółgodzinne warsztaty florystyczne prowadzone przez lokalną florystkę. Każdy uczestnik samodzielnie skomponuje i zabierze do domu własny bukiet sezonowych kwiatów. Wszystkie materiały zapewnia organizator — wystarczy przyjść i się dobrze bawić.',
  },
  {
    id: slugify('Sesja portretowa 2026-06-12'),
    title: 'Sesja portretowa — dzień otwarty',
    date: '2026-06-12',
    time: '11:00–17:00',
    type: 'solein',
    location: 'Soleil Studio, Wrocław',
    description: 'Bezpłatne konsultacje przed sesjami portretowymi.',
    longDescription:
      'Dzień otwarty dla osób planujących sesję portretową w Soleil Studio. Spotkasz się z naszym zespołem, zobaczysz sale Wschód i Zachód w naturalnym świetle oraz dowiesz się, jak wygląda przygotowanie do sesji. Wejście bezpłatne, nie wymaga rezerwacji.',
  },
  {
    id: slugify('Wieczor planszowek 2026-06-20'),
    title: 'Wieczór planszówek',
    date: '2026-06-20',
    time: '18:00–22:00',
    type: 'solein',
    location: 'Soleil Studio, Wrocław',
    description: 'Wspólny wieczór gier planszowych w gronie znajomych Soleil.',
    longDescription:
      'Kameralny wieczór gier planszowych organizowany przez zespół Soleil Studio. Do dyspozycji szeroki wybór gier dla różnej liczby graczy, kawa i herbata na miejscu. Wstęp wolny, liczba miejsc ograniczona.',
  },
  {
    id: slugify('Targi rekodziela 2026-06-27'),
    title: 'Targi rękodzieła',
    date: '2026-06-27',
    time: '12:00–19:00',
    type: 'zewnetrzne',
    location: 'Soleil Studio, Wrocław',
    description: 'Lokalni twórcy prezentują swoje rękodzieło.',
    longDescription:
      'Jednodniowe targi rękodzieła organizowane przez grupę lokalnych twórczyń i twórców we wnętrzach Soleil Studio. Ceramika, biżuteria, ilustracje i wyroby z naturalnych materiałów — każdy znajdzie coś dla siebie. Wstęp wolny.',
  },
  {
    id: slugify('Warsztaty ceramiczne 2026-07-04'),
    title: 'Warsztaty ceramiczne',
    date: '2026-07-04',
    time: '16:00–19:00',
    type: 'zewnetrzne',
    location: 'Soleil Studio, Wrocław',
    description: 'Warsztaty lepienia z gliny dla początkujących.',
    longDescription:
      'Warsztaty ceramiczne prowadzone przez zaproszoną pracownię garncarską. Uczestnicy uczą się podstaw formowania gliny i wykonują własne naczynie, które po wypaleniu odbierają w późniejszym terminie. Liczba miejsc ograniczona, wymagana wcześniejsza rezerwacja u organizatora.',
  },
  {
    id: slugify('Plener fotograficzny 2026-07-18'),
    title: 'Plener fotograficzny',
    date: '2026-07-18',
    time: '09:00–13:00',
    type: 'solein',
    location: 'Soleil Studio, Wrocław',
    description: 'Wspólna sesja plenerowa w okolicy studia.',
    longDescription:
      'Poranny plener fotograficzny organizowany przez Soleil Studio dla osób zaczynających swoją przygodę z fotografią. Spotykamy się w studiu, a następnie wyruszamy na krótką sesję w okolicy. Mile widziany własny aparat, ale nie jest to wymagane.',
  },
  {
    id: slugify('Wystawa artystow 2026-08-01'),
    title: 'Wystawa lokalnych artystów',
    date: '2026-08-01',
    time: '17:00–21:00',
    type: 'zewnetrzne',
    location: 'Soleil Studio, Wrocław',
    description: 'Wernisaż wystawy prac lokalnych artystów.',
    longDescription:
      'Wernisaż wystawy łączącej prace kilku wrocławskich artystek i artystów. Na miejscu możliwość rozmowy z autorami oraz zakupu części prezentowanych prac. Wydarzenie organizowane niezależnie, Soleil Studio udostępnia jedynie przestrzeń.',
  },
]
