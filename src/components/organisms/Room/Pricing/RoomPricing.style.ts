import { rem, rgba } from 'polished'
import styled from 'styled-components'

export const Wrapper = styled.section`
  padding: ${rem(96)} 0;
  background-color: ${({ theme }) => theme.colors.sand100};
`

export const HeadingWrapper = styled.div`
  margin-bottom: ${rem(48)};
  text-align: center;
`

export const Card = styled.div`
  max-width: ${rem(560)};
  margin: 0 auto;
  padding: ${rem(40)};

  background-color: ${({ theme }) => theme.colors.sand50};
  border: 1px solid ${({ theme }) => theme.colors.espresso1F};
  border-radius: ${rem(24)};
  box-shadow: 0 ${rem(8)} ${rem(24)}
    ${({ theme }) => rgba(theme.colors.espresso, 0.06)};
`

export const RowsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${rem(20)};
  margin-bottom: ${rem(32)};
`

export const Row = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: ${rem(16)};
  padding-bottom: ${rem(16)};

  border-bottom: 1px solid ${({ theme }) => theme.colors.espresso1F};

  &:last-child {
    padding-bottom: 0;
    border-bottom: none;
  }
`

export const Ctas = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${rem(14)};
`
