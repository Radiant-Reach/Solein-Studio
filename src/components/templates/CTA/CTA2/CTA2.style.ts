import { rem } from 'polished'
import styled, { css } from 'styled-components'

export const Section = styled.section<{ $bgImage?: string }>`
  padding: ${rem(60)} ${rem(30)};

  ${({ $bgImage }) =>
    $bgImage &&
    css`
      background-image: url('${$bgImage}');
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    `}
`

export const Container = styled.div`
  max-width: ${rem(760)};
  margin: 0 auto;
  text-align: center;
`

export const Title = styled.h4`
  font-size: clamp(${rem(32)}, 4vw, ${rem(54)});
  font-weight: 900;
  color: ${({ theme }) => theme.colors.black};
  line-height: 1.2;
  margin-bottom: ${rem(15)};
`

export const Description = styled.p`
  font-size: ${rem(16)};
  color: ${({ theme }) => theme.colors.black};
  line-height: 1.7;
  margin-bottom: ${rem(20)};
`
