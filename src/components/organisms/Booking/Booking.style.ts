import { rem, rgba } from 'polished'
import styled from 'styled-components'

import media from 'styles/media'

export const Wrapper = styled.section`
  padding: ${rem(96)} 0;
`

export const HeadingWrapper = styled.div`
  max-width: 70ch;
  margin-bottom: ${rem(40)};
`

export const FlowGrid = styled.div`
  display: grid;
  gap: ${rem(24)};
  grid-template-columns: 1fr;

  ${media.lg.min} {
    grid-template-columns: 2fr 1fr;
    align-items: start;
  }
`

export const Panel = styled.div`
  padding: ${rem(28)};

  background-color: ${({ theme }) => theme.colors.sand50};
  border: 1px solid ${({ theme }) => theme.colors.espresso1F};
  border-radius: ${rem(20)};
`

export const BackLink = styled.button`
  display: inline-flex;
  margin-bottom: ${rem(16)};
  padding: 0;

  background: none;
  border: none;
  cursor: pointer;
  text-decoration: none;
`

export const StepHeading = styled.div`
  margin-bottom: ${rem(20)};
  padding-bottom: ${rem(20)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.espresso1F};
`

/* Step 1 — service picker */
export const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${rem(220)}, 1fr));
  gap: ${rem(16)};
`

export const ServicePhoto = styled.div`
  aspect-ratio: 4 / 3;
  border-radius: ${rem(12)};
  overflow: hidden;
`

export const ServiceCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${rem(12)};
  padding: ${rem(20)};

  background-color: ${({ theme }) => theme.colors.sand};
  border: 1px solid ${({ theme }) => theme.colors.espresso1F};
  border-radius: ${rem(16)};
`

export const ServiceCardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${rem(12)};
`

/* Step 2 — add-ons */
export const SelectedServiceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${rem(12)};
`

export const AddOnsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${rem(16)};
  margin-top: ${rem(20)};
`

export const AddOnRow = styled.label`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${rem(16)};
  cursor: pointer;
`

export const AddOnCheckbox = styled.input`
  margin-top: ${rem(4)};
  width: ${rem(18)};
  height: ${rem(18)};
  accent-color: ${({ theme }) => theme.colors.terracotta};
`

export const AddOnInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${rem(4)};
`

export const AddOnPrice = styled.div`
  flex-shrink: 0;
  white-space: nowrap;
`

export const QuantityStepper = styled.div`
  display: flex;
  align-items: center;
  gap: ${rem(10)};
`

export const QuantityButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${rem(28)};
  height: ${rem(28)};

  background-color: ${({ theme }) => theme.colors.sand};
  border: 1px solid ${({ theme }) => theme.colors.espresso1F};
  border-radius: ${rem(8)};
  cursor: pointer;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`

export const StepActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${rem(24)};
`

/* Step 3 — date & slot picker */
export const CalendarLayout = styled.div`
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
  gap: ${rem(32)};
`

export const CalendarColumn = styled.div`
  flex: 1;
  min-width: ${rem(260)};
`

export const MonthNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${rem(16)};
`

export const MonthNavButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${rem(28)};
  height: ${rem(28)};

  background-color: ${({ theme }) => theme.colors.sand};
  border: 1px solid ${({ theme }) => theme.colors.espresso1F};
  border-radius: 999px;
  cursor: pointer;

  /* The chevron SVGs have a hardcoded white fill (correct on the dark
     nav buttons elsewhere) — override it here since this button sits on
     a light card background. */
  svg * {
    fill: ${({ theme }) => theme.colors.ink800};
    stroke: ${({ theme }) => theme.colors.ink800};
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`

export const WeekdaysRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: ${rem(8)};
`

export const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: ${rem(4)};
`

export const DayCell = styled.button<{ $active?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;

  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.terracotta : 'transparent'};
  border: none;
  border-radius: 50%;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.35;
  }
`

export const DayAvailabilityDot = styled.span`
  position: absolute;
  bottom: ${rem(2)};
  left: 50%;
  transform: translateX(-50%);
  width: ${rem(5)};
  height: ${rem(5)};
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.terracotta};
`

export const SlotsColumn = styled.div`
  flex: 1;
  min-width: ${rem(180)};
  max-height: ${rem(360)};

  display: flex;
  flex-direction: column;
  gap: ${rem(10)};

  overflow-y: auto;
  padding-right: ${rem(4)};
`

export const SlotRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${rem(10)};
`

export const SlotButton = styled.button<{ $active?: boolean }>`
  flex: 1;
  padding: ${rem(10)} ${rem(16)};
  text-align: center;

  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.terracotta : 'transparent'};
  border: 1px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.terracotta : theme.colors.espresso1F};
  border-radius: ${rem(8)};
  cursor: pointer;
`

export const EmptySlotsNotice = styled.div`
  padding: ${rem(16)};
  text-align: center;
`

/* Step 4 — contact form */
export const FormGrid = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${rem(16)};

  ${media.sm.min} {
    grid-template-columns: 1fr 1fr;
  }
`

export const FullWidthField = styled.div`
  ${media.sm.min} {
    grid-column: 1 / -1;
  }
`

/* Sidebar */
export const SidebarCard = styled.div`
  padding: ${rem(24)};

  background-color: ${({ theme }) => theme.colors.sand50};
  border: 1px solid ${({ theme }) => theme.colors.espresso1F};
  border-radius: ${rem(20)};

  ${media.lg.min} {
    position: sticky;
    top: ${rem(96)};
  }
`

export const SidebarTitle = styled.div`
  margin-bottom: ${rem(16)};
  padding-bottom: ${rem(16)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.espresso1F};
`

export const SidebarRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${rem(12)};
  padding: ${rem(12)} 0;

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => rgba(theme.colors.espresso, 0.08)};
  }
`

export const SidebarLabel = styled.div`
  display: flex;
  align-items: center;
  gap: ${rem(8)};
`

export const SidebarTotalRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: ${rem(12)};
`

export const SubmitButtonWrapper = styled.div`
  margin-top: ${rem(20)};
`

export const FormNotice = styled.div`
  padding: ${rem(16)};
  margin-bottom: ${rem(16)};
  text-align: center;
  border-radius: ${rem(12)};
`

/* Success step */
export const SuccessDetails = styled.div`
  margin-top: ${rem(24)};
`
