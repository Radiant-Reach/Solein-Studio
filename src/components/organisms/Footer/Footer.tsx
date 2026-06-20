import React from 'react'

import { Icon } from 'components/atoms/Icon'
import { BodySmall, Text } from 'components/atoms/Typography'

import PinIcon from 'assets/images/icons/icon-pin.png'
import FacebookIcon from 'assets/images/icons/social/facebook.png'
import InstagramIcon from 'assets/images/icons/social/instagram.png'

import {
  BRAND_BLURB,
  CONTACT,
  EVENT_LINKS,
  LOCATION_LINK,
  LOGO_FULL_CREAM_SRC,
  NAV_LINKS,
  SOCIAL_LINKS,
} from './Footer.constants'
import {
  AddressText,
  Blurb,
  BottomBar,
  BrandLogo,
  Column,
  ColumnTitle,
  Columns,
  FooterLink,
  InnerWrapper,
  LocationLinkContent,
  LocationPinIcon,
  SocialLink,
  SocialRow,
  Wrapper,
} from './Footer.style'

const LOGO_HEIGHT = 120
const LOGO_ASPECT_RATIO = 1693 / 2172
const LOGO_WIDTH = Math.round(LOGO_HEIGHT * LOGO_ASPECT_RATIO)

const SOCIAL_ICONS: Record<string, string> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
}

const ColumnHeading: React.FC<{ title: string }> = ({ title }) => (
  <ColumnTitle>
    <Text
      as="span"
      $base={BodySmall}
      $transform="uppercase"
      $color="creamA8"
      dangerouslySetInnerHTML={{ __html: title }}
    />
  </ColumnTitle>
)

export const Footer: React.FC = () => {
  const phoneHref = `tel:${CONTACT.phone.replace(/\s/g, '')}`

  return (
    <Wrapper>
      <InnerWrapper $variant="wide">
        <Columns>
          <Column>
            <BrandLogo
              src={LOGO_FULL_CREAM_SRC}
              alt="Soleil Studio"
              width={LOGO_WIDTH}
              height={LOGO_HEIGHT}
              objectFit="contain"
            />

            <Blurb>
              <Text
                $base={BodySmall}
                $color="creamA8"
                dangerouslySetInnerHTML={{ __html: BRAND_BLURB }}
              />
            </Blurb>

            <FooterLink to={LOCATION_LINK.path} $emphasis>
              <LocationLinkContent>
                <LocationPinIcon src={PinIcon} size={20} />
                <span
                  dangerouslySetInnerHTML={{ __html: LOCATION_LINK.name }}
                />
              </LocationLinkContent>
            </FooterLink>
          </Column>

          <Column>
            <ColumnHeading title="Nawigacja" />
            {NAV_LINKS.map((link) => (
              <FooterLink
                key={link.id}
                to={link.path}
                dangerouslySetInnerHTML={{ __html: link.name }}
              />
            ))}
          </Column>

          <Column>
            <ColumnHeading title="Możliwości wydarzeń" />
            {EVENT_LINKS.map((link) => (
              <FooterLink
                key={link.id}
                to={link.path}
                dangerouslySetInnerHTML={{ __html: link.name }}
              />
            ))}
          </Column>

          <Column>
            <ColumnHeading title="Kontakt" />
            <FooterLink
              to={`mailto:${CONTACT.email}`}
              dangerouslySetInnerHTML={{ __html: CONTACT.email }}
            />
            <FooterLink
              to={phoneHref}
              dangerouslySetInnerHTML={{ __html: CONTACT.phone }}
            />
            <AddressText>
              {CONTACT.addressLines.map((line) => (
                <div key={line} dangerouslySetInnerHTML={{ __html: line }} />
              ))}
            </AddressText>

            <SocialRow>
              {SOCIAL_LINKS.map((social) => (
                <SocialLink
                  key={social.id}
                  to={social.to}
                  aria-label={social.name}
                >
                  <Icon src={SOCIAL_ICONS[social.id]} size={36} />
                </SocialLink>
              ))}
            </SocialRow>
          </Column>
        </Columns>

        <BottomBar>
          <Text
            as="span"
            $base={BodySmall}
            $color="inherit"
            dangerouslySetInnerHTML={{
              __html: `© ${new Date().getFullYear()} Soleil Studio. Wszystkie prawa zastrzeżone.`,
            }}
          />
          <Text as="span" $base={BodySmall} $color="inherit">
            Polityka prywatności · Regulamin
          </Text>
        </BottomBar>
      </InnerWrapper>
    </Wrapper>
  )
}
