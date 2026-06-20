import { useMemo } from 'react'

import { PHOTO_FRAME_TONES } from 'components/atoms/PhotoFrame'

import { StudioIntroProps } from 'components/organisms/StudioIntro'

import { pickFromSeed } from 'utils/pickFromSeed'
import slugify from 'utils/slugify'

export const useFormatQueryData = () => {
  return useMemo(() => {
    const PARAGRAPH_TEXTS = [
      'Wysokie sufity i przemyślane akcenty dekoracyjne pozwalają poczuć komfort i swobodę pracy.',
      'Studio Soleil powstało z myślą o sesjach zdjęciowych, gdzie każdy detal, wysoki sufit i naturalne światło tworzą idealne tło do twórczej pracy.',
      'To także miejsce na kameralne spotkania, warsztaty i projekty kreatywne, w którym komfort i estetyka idą w parze. Naszą misją jest dawanie przestrzeni, w której pomysły nabierają formy, a wnętrze staje się częścią historii każdego projektu.',
      'Studio Soleil inspiruje, pozwala odkrywać nowe perspektywy i rozwijać kreatywność w naturalny sposób.',
    ]

    const PARAGRAPHS = PARAGRAPH_TEXTS.map((text) => ({
      id: slugify(text.slice(0, 40)),
      text,
    }))

    const PHOTO_IDS = [
      slugify('Studio wysokie sufity'),
      slugify('Studio francuskie drzwi'),
      slugify('Studio minimalistyczne wnetrze'),
    ]

    const HERO_PHOTOS = PHOTO_IDS.map((id) => ({
      id,
      tone: pickFromSeed(id, PHOTO_FRAME_TONES),
    }))

    const FEATURES = [
      {
        id: slugify('Gdzie jestesmy'),
        eyebrow: 'Gdzie jesteśmy',
        heading: 'W samym sercu <span class="styled" >Wrocławia</span>',
        body: 'Studio znajduje się zaledwie kilka minut od Galerii Dominikańskiej, Dworca PKP i Bastionu Sakwowego. Doskonała komunikacja miejska - liczne tramwaje i autobusy - oraz możliwość wygodnego parkowania tuż przy studiu sprawiają, że dotarcie do nas jest szybkie i wygodne.',
        tone: pickFromSeed(slugify('Gdzie jestesmy'), PHOTO_FRAME_TONES),
      },
      {
        id: slugify('O Soleil'),
        eyebrow: 'O Soleil',
        heading: 'Wnętrze, które inspiruje',
        body: 'Studio w zabytkowej kamienicy o powierzchni prawie 100m², z wysokimi sufitami i francuskimi drzwiami, które wypełniają wnętrze naturalnym światłem. Przestrzeń została zaprojektowana z myślą o komforcie pracy twórczej - oferuje jasne, spójne wnętrza, zaplecze do przygotowań oraz kameralną atmosferę sprzyjającą skupieniu. Studio Soleil to idealne miejsce do sesji zdjęciowych, projektów kreatywnych, warsztatów oraz spokojnych spotkań w estetycznym otoczeniu.',
        tone: pickFromSeed(slugify('O Soleil'), PHOTO_FRAME_TONES),
      },
    ] satisfies StudioIntroProps['features']

    const STUDIO_INTRO_DATA = {
      eyebrow: 'Lokalizacja',
      heading: 'Poznaj Studio <span class="styled">Soleil</span>',
      lead: 'W zabytkowej kamienicy we Wrocławiu znajduje się niemal 100 m² przestrzeni, w której każdy detal – od francuskich drzwi po minimalistyczne ściany – daje przestrzeń do tworzenia.',
      paragraphs: PARAGRAPHS,
      heroPhotos: HERO_PHOTOS,
      features: FEATURES,
      ctaText: 'Chcesz zobaczyć Studio Soleil na żywo?',
      ctaLabel: 'Zarezerwuj termin',
      ctaTo: '/rezerwacja',
    } satisfies StudioIntroProps

    return { STUDIO_INTRO_DATA }
  }, [])
}
