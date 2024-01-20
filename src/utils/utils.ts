import { solstice, julian } from 'astronomia'
import { DateTime } from 'luxon'

export function getDCTime() {
  return new Intl.DateTimeFormat('en-us', {
    timeStyle: 'long',
    dateStyle: 'long',
    hour12: false,
    timeZone: 'America/New_York'
  })
}

export function getSolsticesAndEquinoxes(year: number) {
  return mapJDSeasonsToDateTime({
    marchEquinox: solstice.march(year),
    juneSolstice: solstice.june(year),
    septemberEquinox: solstice.september(year),
    decemberSolstice: solstice.december(year)
  })
}

export function getSeasonalCycle(theDate: DateTime) {
  const offset = theDate.plus({ month: 1 }).month
  console.log(offset)
  const cycle = getSolsticesAndEquinoxes(theDate.year)

  if (offset <= 3) {
    cycle.decemberSolstice = solstice.december(theDate.year - 1)
  } else if (offset <= 6) {
    cycle.marchEquinox = solstice.march(theDate.year - 1)
  } else if (offset <= 9) {
    cycle.juneSolstice = solstice.june(theDate.year - 1)
  } else if (offset <= 12) {
    cycle.septemberEquinox = solstice.september(theDate.year - 1)
  }

  return mapJDSeasonsToDateTime(cycle)
}

function mapJDSeasonsToDateTime(jDSeasons) {
  return Object.fromEntries(
    Object.entries(jDSeasons).map(([season, date]) => [
      season,
      date instanceof DateTime ? date : DateTime.fromJSDate(julian.JDToDate(date))
    ])
  )
}
