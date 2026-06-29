// RR Dashboard (Radiant Reach's own booking platform, replacing GoHighLevel)
// IDs for Soleil Studio's sub-account. Unlike GHL, a single staff account
// covers both rooms (RR Dashboard's availability is a real platform feature,
// not something this site has to compute itself), and "Całe Studio" is
// expressed as a service that occupies *both* room resources -- RR Dashboard
// itself now enforces that booking it blocks (and is blocked by) either room
// booked individually, so this site no longer needs the cross-calendar
// busy-range logic the old GHL integration required (see git history of
// utils/ghlAvailability.ts for what that used to involve).
export const RR_LOCATION_ID = 'rydXVdZYg57ILr7NqNjf'

export type RrRoomId = 'zachod' | 'wschod' | 'studio'

export const RR_CALENDARS: Record<
  RrRoomId,
  {
    calendarId: string
    serviceId: string
    assignedUserId: string
    label: string
    price: number
  }
> = {
  zachod: {
    calendarId: 'zDBA7J9ZfwXVeOIoQG3O',
    serviceId: 'JMN3mLWrH2WMQiDWBSaU',
    assignedUserId: 'dfH4xvlivO7J0uWjvp1l',
    label: 'Wynajem Sala Zachód',
    price: 140,
  },
  wschod: {
    calendarId: 'bFnturg7PzVQchO1Xxdu',
    serviceId: 'rxggY31nlaGpGNTN7kNv',
    assignedUserId: 'dfH4xvlivO7J0uWjvp1l',
    label: 'Wynajem Sala Wschód',
    price: 140,
  },
  studio: {
    calendarId: 'GuVw1VtijhJ0aMF6hnoF',
    serviceId: 'e7DCB7p4SnDOYnHE9WoR',
    assignedUserId: 'dfH4xvlivO7J0uWjvp1l',
    label: 'Wynajem Całe Studio',
    price: 240,
  },
}

export const SLOT_DURATION_MINUTES = 60

// "Dodatkowe informacje o rezerwacji" -- a single textarea field (`message`)
// matching this site's own "Dodatkowa wiadomość" booking-form field. Set up
// once in RR Dashboard's Settings -> Calendars -> Forms for this location;
// id is stable unless that form is deleted and recreated there.
export const RR_MESSAGE_FORM_ID = 'FaRxr7Jnl96GV4rViXHq'
