import slugify from 'utils/slugify'

export type RoomOverviewCardData = {
  id: string
  tagLabel: string
  tagColor: string
  eyebrow: string
  title: string
  description: string
  ctaTo: string
}

export const ROOM_OVERVIEW_CARDS: RoomOverviewCardData[] = [
  {
    id: slugify('Sala Wschod overview'),
    tagLabel: 'Poranne światło',
    tagColor: '#FCF9D9',
    eyebrow: 'Do 30 osób',
    title: 'Sala Wschód',
    description:
      'Wschodnie okna, jasne drewno i zieleń — idealna na warsztaty, sesje zdjęciowe i poranne spotkania.',
    ctaTo: '/nasze-sale/sala-wschod',
  },
  {
    id: slugify('Sala Zachod overview'),
    tagLabel: 'Zachód słońca',
    tagColor: '#FE5900',
    eyebrow: 'Do 24 osób',
    title: 'Sala Zachód',
    description:
      'Ciepłe, zachodzące światło i przytulny klimat — stworzona do kolacji i wieczornych eventów.',
    ctaTo: '/nasze-sale/sala-zachod',
  },
]
