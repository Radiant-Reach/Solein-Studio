import React from 'react'

import { Container } from 'components/atoms/Container'
import { BodyMedium, H400, Text } from 'components/atoms/Typography'

import { SectionHeading } from 'components/molecules/SectionHeading'

import {
  CategoriesGrid,
  CategoryCard,
  CategoryTitle,
  HeadingWrapper,
  ItemList,
  ItemRow,
  TopDivider,
  Wrapper,
} from './StudioEquipment.style'

export type EquipmentItem = {
  id: string
  text: string
}

export type EquipmentCategory = {
  id: string
  title: string
  items: EquipmentItem[]
}

export type StudioEquipmentProps = {
  eyebrow: string
  heading: string
  lead: string
  categories: EquipmentCategory[]
}

export const StudioEquipment: React.FC<StudioEquipmentProps> = ({
  eyebrow,
  heading,
  lead,
  categories,
}) => (
  <Wrapper>
    <Container $variant="normal">
      <TopDivider />

      <HeadingWrapper>
        <SectionHeading eyebrow={eyebrow} lead={lead}>
          {heading}
        </SectionHeading>
      </HeadingWrapper>

      <CategoriesGrid>
        {categories.map((category) => (
          <CategoryCard key={category.id}>
            <CategoryTitle>
              <Text
                as="h3"
                $base={H400}
                $transform="uppercase"
                $color="ink800"
                dangerouslySetInnerHTML={{ __html: category.title }}
              />
            </CategoryTitle>

            <ItemList>
              {category.items.map((item) => (
                <ItemRow key={item.id}>
                  <Text
                    as="span"
                    $base={BodyMedium}
                    $color="ink600"
                    dangerouslySetInnerHTML={{ __html: item.text }}
                  />
                </ItemRow>
              ))}
            </ItemList>
          </CategoryCard>
        ))}
      </CategoriesGrid>
    </Container>
  </Wrapper>
)
