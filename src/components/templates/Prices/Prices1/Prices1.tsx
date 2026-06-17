import React from 'react'

import * as S from './Prices1.style'

type PriceRow = {
  service: string
  duration: string
  cost: string
}

type PriceGroup = {
  title: React.ReactNode
  rows: PriceRow[]
}

type Prices1Props = {
  id?: string
  eyebrow?: string
  title?: React.ReactNode
  columnLabels?: [string, string, string]
  groups?: PriceGroup[]
}

const DEFAULT_GROUPS: PriceGroup[] = [
  {
    title: 'Strzyżenie',
    rows: [
      { service: 'Strzyżenie grzywki', duration: '15 min', cost: '30 zł' },
      { service: 'Strzyżenie maszynką', duration: '30 min', cost: '40 zł' },
      { service: 'Strzyżenie męskie – włosy krótkie', duration: '30 min', cost: '50 zł' },
      { service: 'Strzyżenie męskie – włosy długie', duration: '30 min', cost: '60 zł' },
      { service: 'Strzyżenie damskie – włosy krótkie', duration: '30 min', cost: '80 zł' },
      { service: 'Strzyżenie damskie – włosy półdługie', duration: '40 min', cost: '100 zł' },
      { service: 'Strzyżenie damskie – włosy długie', duration: '1 godz', cost: '120 zł' },
    ],
  },
  {
    title: 'Stylizacja włosów',
    rows: [
      { service: 'Modelowanie włosów', duration: '1 godz', cost: 'od 70 zł' },
      { service: 'Loki', duration: '1 godz', cost: '100 zł' },
    ],
  },
]

export const Prices1: React.FC<Prices1Props> = ({
  id = 'prices',
  eyebrow = 'Cennik',
  title = (
    <>
      Nasze <em>Ceny</em>
    </>
  ),
  columnLabels = ['Usługa', 'Czas wykonania', 'Koszt'],
  groups = DEFAULT_GROUPS,
}) => {
  return (
    <S.Section id={id}>
      <S.Container>
        <S.Header>
          <S.Eyebrow>{eyebrow}</S.Eyebrow>
          <S.Title>{title}</S.Title>
        </S.Header>

        {groups.map((group, i) => (
          <S.Group key={i}>
            <S.GroupTitle>{group.title}</S.GroupTitle>
            <S.Table>
              <thead>
                <tr>
                  {columnLabels.map(label => (
                    <th key={label}>{label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {group.rows.map(({ service, duration, cost }) => (
                  <tr key={service}>
                    <td>{service}</td>
                    <td>{duration}</td>
                    <td>{cost}</td>
                  </tr>
                ))}
              </tbody>
            </S.Table>
          </S.Group>
        ))}
      </S.Container>
    </S.Section>
  )
}
