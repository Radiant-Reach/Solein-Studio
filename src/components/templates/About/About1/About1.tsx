import React from 'react'

import * as S from './About1.style'

type Stat = {
  value: string
  label: string
}

type About1Props = {
  id?: string
  eyebrow?: string
  title?: React.ReactNode
  paragraphs?: string[]
  listItems?: string[]
  stats?: Stat[]
}

const DEFAULT_PARAGRAPHS = [
  'Nasz zespół tworzą doświadczone specjalistki. Każda z nich dba o to, żeby efekt końcowy przekraczał Twoje oczekiwania. Stawiamy na precyzję, jakość produktów i indywidualne podejście do każdej osoby.',
  'Nie jesteśmy kolejnym salonem z tłumem klientów i pośpiechem. U nas każda wizyta jest traktowana z pełną uwagą, bo wierzymy, że właśnie na tym polega prawdziwy profesjonalizm.',
]

const DEFAULT_LIST_ITEMS = [
  'Doświadczone specjalistki z wieloletnią praktyką.',
  'Indywidualne podejście do każdego klienta.',
  'Wysokiej jakości produkty fryzjerskie i kosmetyczne.',
  'Możliwość wizyty bez zapisu lub rezerwacji online.',
  'Przyjazna atmosfera w sercu Białegostoku',
]

const DEFAULT_STATS: Stat[] = [
  { value: '100%', label: 'Zadowolonych Klientów' },
  { value: '5', label: 'Lat doświadczenia' },
  { value: '23+', label: 'Usług w ofercie' },
  { value: '50+', label: 'Opinii 5★' },
]

export const About1: React.FC<About1Props> = ({
  id,
  eyebrow = 'O nas',
  title = (
    <>
      Poznaj nas <em>bliżej</em>
    </>
  ),
  paragraphs = DEFAULT_PARAGRAPHS,
  listItems = DEFAULT_LIST_ITEMS,
  stats = DEFAULT_STATS,
}) => {
  return (
    <S.Section id={id}>
      <S.Container>
        <S.Left>
          <S.Header>
            <S.Eyebrow>{eyebrow}</S.Eyebrow>
            <S.Title>{title}</S.Title>
          </S.Header>

          {paragraphs.map((text, i) => (
            <S.Paragraph key={i}>{text}</S.Paragraph>
          ))}

          <S.List>
            {listItems.map((item, i) => (
              <S.ListItem key={i}>{item}</S.ListItem>
            ))}
          </S.List>
        </S.Left>

        <S.Right>
          <S.StatsGrid>
            {stats.map(({ value, label }) => (
              <S.StatItem key={label}>
                <S.StatNumber>{value}</S.StatNumber>
                <S.StatLabel>{label}</S.StatLabel>
              </S.StatItem>
            ))}
          </S.StatsGrid>
        </S.Right>
      </S.Container>
    </S.Section>
  )
}
