import { solstice, julian } from 'astronomia'

export function getDCTime() {
  return new Intl.DateTimeFormat('en-us', {
    timeStyle: 'long',
    dateStyle: 'long',
    hour12: false,
    timeZone: 'America/New_York'
  })
}

export function getSolsticesAndEquinoxes(year: number) {
  return {
    marchEquinox: julian.JDToDate(solstice.march(year)),
    juneSolstice: julian.JDToDate(solstice.june(year)),
    septemberEquinox: julian.JDToDate(solstice.september(year)),
    decemberSolstice: julian.JDToDate(solstice.december(year))
  }
}
