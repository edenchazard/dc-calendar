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

export function getMidseasonalCycle(theDate: DateTime): Seasons {
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

export function determineSeason(date: DateTime) {
  const previousYear = mapJDSeasonsToDateTime(getJDSolsticesAndEquinoxes(date.year - 1))
  const currentYear = mapJDSeasonsToDateTime(getJDSolsticesAndEquinoxes(date.year))
  const nextYear = mapJDSeasonsToDateTime(getJDSolsticesAndEquinoxes(date.year + 1))
  const now = date.toSeconds()

  const b = (s) => {
    console.log(
      s,
      date.toISO(),
      now >= currentYear.decemberSolstice.toSeconds() && now <= nextYear.marchEquinox.toSeconds(),
      now >= previousYear.decemberSolstice.toSeconds() &&
        now <= currentYear.marchEquinox.toSeconds()
    )
  }
  if (
    now >= currentYear.septemberEquinox.toSeconds() &&
    now <= currentYear.decemberSolstice.toSeconds()
  ) {
    //console.log('2', date.toISO())
    return {
      name: 'autumn',
      begin: currentYear.septemberEquinox,
      end: currentYear.decemberSolstice
    }
  } else if (
    now >= currentYear.juneSolstice.toSeconds() &&
    now <= currentYear.septemberEquinox.toSeconds()
  ) {
    // console.log('3', date.toISO())
    return {
      name: 'summer',
      begin: currentYear.juneSolstice,
      end: currentYear.septemberEquinox
    }
  } else if (
    now >= currentYear.marchEquinox.toSeconds() &&
    now <= currentYear.juneSolstice.toSeconds()
  ) {
    //console.log('4', date.toISO())
    return {
      name: 'spring',
      begin: currentYear.marchEquinox,
      end: currentYear.juneSolstice
    }
  } else if (
    now >= previousYear.decemberSolstice.toSeconds() &&
    now <= currentYear.marchEquinox.toSeconds()
  ) {
    b('11111')
    //console.log('1', date.toISO())
    return {
      name: 'winter',
      begin: previousYear.decemberSolstice,
      end: currentYear.marchEquinox
    }
  } else if (
    now >= currentYear.decemberSolstice.toSeconds() &&
    now <= nextYear.marchEquinox.toSeconds()
  ) {
    b('22222')
    return {
      name: 'winter',
      begin: currentYear.decemberSolstice,
      end: nextYear.marchEquinox
    }
  }
}

export function jdToDateTime(jD: number) {
  return DateTime.fromJSDate(julian.JDToDate(jD))
}

export function mapJDSeasonsToDateTime(jDSeasons: JDSeasonalCycle, zone?: Zone): Seasons {
  return Object.fromEntries(
    Object.entries(jDSeasons).map(([season, date]) => [
      season,
      date instanceof DateTime ? date : jdToDateTime(date)
    ])
  )
}
