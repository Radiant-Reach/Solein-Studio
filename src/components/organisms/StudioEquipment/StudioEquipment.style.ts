import { rem, rgba } from 'polished'
import styled from 'styled-components'

import { Divider } from 'components/atoms/Divider'

import media from 'styles/media'

export const Wrapper = styled.section`
  padding: ${rem(96)} 0;
`

export const TopDivider = styled(Divider)`
  margin-bottom: ${rem(64)};
`

export const HeadingWrapper = styled.div`
  margin-bottom: ${rem(40)};
`

export const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${rem(40)};

  ${media.md.min} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.xl.min} {
    grid-template-columns: repeat(3, 1fr);
  }
`

export const CategoryCard = styled.div`
  height: 100%;
  padding: ${rem(32)};

  background-color: ${({ theme }) => theme.colors.sand50};
  border: 1px solid ${({ theme }) => theme.colors.espresso1F};
  border-radius: ${rem(20)};
  box-shadow: 0 ${rem(8)} ${rem(24)}
    ${({ theme }) => rgba(theme.colors.espresso, 0.06)};
`

export const CategoryTitle = styled.div`
  margin-bottom: ${rem(16)};
  letter-spacing: ${rem(1)};
`

export const ItemList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${rem(10)};

  margin: 0;
  padding: 0;
  list-style: none;
`

export const ItemRow = styled.li`
  padding-bottom: ${rem(10)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.espresso1F};

  &:last-child {
    padding-bottom: 0;
    border-bottom: none;
  }
`
