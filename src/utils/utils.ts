import { solstice, julian } from 'astronomia'
import { DateTime, Zone } from 'luxon'

interface Seasons {
  decemberSolstice: DateTime
  marchEquinox: DateTime
  juneSolstice: DateTime
  septemberEquinox: DateTime
}

interface JDSeasonalCycle {
  decemberSolstice: number
  marchEquinox: number
  juneSolstice: number
  septemberEquinox: number
}

export function getJDSolsticesAndEquinoxes(year: number): JDSeasonalCycle {
  return {
    marchEquinox: solstice.march(year),
    juneSolstice: solstice.june(year),
    septemberEquinox: solstice.september(year),
    decemberSolstice: solstice.december(year)
  }
}

export function getSeasonalCycle(theDate: DateTime): Seasons {
  const offset = theDate.plus({ month: 1 }).month
  const cycle = getJDSolsticesAndEquinoxes(theDate.year)

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

function mapJDSeasonsToDateTime(jDSeasons: JDSeasonalCycle, zone?: Zone): Seasons {
  return Object.fromEntries(
    Object.entries(jDSeasons).map(([season, date]) => [
      season,
      date instanceof DateTime ? date : DateTime.fromJSDate(julian.JDToDate(date), { zone: zone })
    ])
  )
}
