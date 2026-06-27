import { graphql, useStaticQuery } from 'gatsby'

// Used by <NotificationBar> itself and by Navigation/Layout (to size their
// own offset for the fixed bar) — read synchronously at render time via
// useStaticQuery so there's no post-hydration flash where the layout
// hasn't yet accounted for the bar.
export const useNotificationBar = () => {
  const cmsData = useStaticQuery<Queries.NotificationBarQuery>(graphql`
    query NotificationBar {
      wp {
        ustawieniaGlobalne {
          kontakt {
            notificationText
            notificationLink {
              title
              url
            }
          }
        }
      }
    }
  `)

  const kontakt = cmsData.wp?.ustawieniaGlobalne?.kontakt
  const text = kontakt?.notificationText

  return {
    text,
    link: kontakt?.notificationLink,
    isVisible: !!text,
  }
}
