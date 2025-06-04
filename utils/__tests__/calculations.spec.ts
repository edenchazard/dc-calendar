import { describe, it, expect } from 'vitest';
import {
  getDaytimeIntervalForDateTime,
  getFireGemForDateTime,
  getNewYorkDSTPeriodForYear,
  getNighttimeIntervalForDateTime,
  getStratosForDateTime,
  getSpiritWardForDateTime,
  getSunriseIntervalForDateTime,
  getSunsetIntervalForDateTime,
  getZombieIntervalForDateTime,
  getZombieMonthForDateTime,
} from '../calculations';
import { DateTime } from 'luxon';

describe('Calculations', () => {
  describe('#getNewYorkDSTPeriodForYear', () => {
    it.each([
      [2023, 1678586399, 1699149599],
      [2024, 1710035999, 1730599199],
      [2025, 1741485599, 1762048799],
      [2026, 1772935199, 1793498399],
    ])('calculates beginning and ending for year %i', (year, start, end) => {
      const dst = getNewYorkDSTPeriodForYear(year);
      expect(dst.start?.toSeconds()).to.be.eql(start);
      expect(dst.end?.toSeconds()).to.be.eql(end);
    });
  });

  describe('#getDaytimeIntervalForDateTime', () => {
    it('calculates beginning and ending when in range of current day', () => {
      expect(
        getDaytimeIntervalForDateTime(
          DateTime.fromObject({
            year: 2024,
            month: 1,
            day: 1,
            hour: 8,
          }),
        ).toString(),
      ).to.be.eql(
        '[2024-01-01T06:00:00.000+00:00 – 2024-01-01T17:59:59.000+00:00)',
      );
    });

    it("returns the current day's beginning and ending if before 6am and after midnight", () => {
      expect(
        getDaytimeIntervalForDateTime(
          DateTime.fromObject({
            year: 2024,
            month: 1,
            day: 1,
            hour: 3,
          }),
        ).toString(),
      ).to.be.eql(
        '[2024-01-01T06:00:00.000+00:00 – 2024-01-01T17:59:59.000+00:00)',
      );
    });

    it("returns the next day's beginning and ending if after 6pm and before midnight", () => {
      expect(
        getDaytimeIntervalForDateTime(
          DateTime.fromObject({
            year: 2024,
            month: 1,
            day: 1,
            hour: 18,
          }),
        ).toString(),
      ).to.be.eql(
        '[2024-01-02T06:00:00.000+00:00 – 2024-01-02T17:59:59.000+00:00)',
      );
    });
  });

  describe('#getNighttimeIntervalForDateTime', () => {
    it('calculates beginning and ending after midnight but before 6am', () => {
      expect(
        getNighttimeIntervalForDateTime(
          DateTime.fromObject({
            year: 2024,
            month: 1,
            day: 2,
            hour: 5,
          }),
        ).toString(),
      ).to.be.eql(
        '[2024-01-01T18:00:00.000+00:00 – 2024-01-02T05:59:59.000+00:00)',
      );
    });

    it("returns the current day's beginning and ending if before 6pm", () => {
      expect(
        getNighttimeIntervalForDateTime(
          DateTime.fromObject({
            year: 2024,
            month: 1,
            day: 1,
            hour: 17,
          }),
        ).toString(),
      ).to.be.eql(
        '[2024-01-01T18:00:00.000+00:00 – 2024-01-02T05:59:59.000+00:00)',
      );
    });

    it("returns the current day's beginning and ending if after 6pm but before midnight", () => {
      expect(
        getNighttimeIntervalForDateTime(
          DateTime.fromObject({
            year: 2024,
            month: 1,
            day: 2,
            hour: 23,
          }),
        ).toString(),
      ).to.be.eql(
        '[2024-01-02T18:00:00.000+00:00 – 2024-01-03T05:59:59.000+00:00)',
      );
    });
  });

  describe('#getSunriseIntervalForDateTime', () => {
    it("returns the next day's beginning and ending if after 12pm", () => {
      expect(
        getSunriseIntervalForDateTime(
          DateTime.fromObject({
            year: 2024,
            month: 1,
            day: 1,
            hour: 13,
          }),
        ).toString(),
      ).to.be.eql(
        '[2024-01-02T06:00:00.000+00:00 – 2024-01-02T12:00:00.000+00:00)',
      );
    });

    it("returns the current day's beginning and ending if before 6am", () => {
      expect(
        getSunriseIntervalForDateTime(
          DateTime.fromObject({
            year: 2024,
            month: 1,
            day: 1,
            hour: 5,
          }),
        ).toString(),
      ).to.be.eql(
        '[2024-01-01T06:00:00.000+00:00 – 2024-01-01T12:00:00.000+00:00)',
      );
    });

    it("returns the current day's beginning and ending if after 6am but before 12pm", () => {
      expect(
        getSunriseIntervalForDateTime(
          DateTime.fromObject({
            year: 2024,
            month: 1,
            day: 2,
            hour: 7,
          }),
        ).toString(),
      ).to.be.eql(
        '[2024-01-02T06:00:00.000+00:00 – 2024-01-02T12:00:00.000+00:00)',
      );
    });
  });

  describe('#getSunsetIntervalForDateTime', () => {
    it("returns the current day's beginning and ending if before 12pm ", () => {
      expect(
        getSunsetIntervalForDateTime(
          DateTime.fromObject({
            year: 2024,
            month: 1,
            day: 1,
            hour: 11,
          }),
        ).toString(),
      ).to.be.eql(
        '[2024-01-01T18:00:00.000+00:00 – 2024-01-02T00:00:00.000+00:00)',
      );
    });

    it("returns the current day's beginning and ending if after 6pm and before 12am", () => {
      expect(
        getSunsetIntervalForDateTime(
          DateTime.fromObject({
            year: 2024,
            month: 1,
            day: 1,
            hour: 18,
          }),
        ).toString(),
      ).to.be.eql(
        '[2024-01-01T18:00:00.000+00:00 – 2024-01-02T00:00:00.000+00:00)',
      );
    });
  });

  describe('#getZombieIntervalForDateTime', () => {
    it("returns the current day's beginning and ending if after 12am and before 6am ", () => {
      expect(
        getZombieIntervalForDateTime(
          DateTime.fromObject({
            year: 2024,
            month: 1,
            day: 1,
            hour: 5,
          }),
        ).toString(),
      ).to.be.eql(
        '[2024-01-01T00:00:00.000+00:00 – 2024-01-01T06:00:00.000+00:00)',
      );
    });

    it("returns the next day's beginning and ending if after 6am", () => {
      expect(
        getZombieIntervalForDateTime(
          DateTime.fromObject({
            year: 2024,
            month: 1,
            day: 1,
            hour: 6,
          }),
        ).toString(),
      ).to.be.eql(
        '[2024-01-02T00:00:00.000+00:00 – 2024-01-02T06:00:00.000+00:00)',
      );
    });
  });

  describe('#getFireGemForDateTime', () => {
    it.each([0, 3, 6, 9, 12, 15, 18, 21])(
      'returns blue fire gem for hour %i',
      (hour) => {
        const dt = DateTime.fromObject({
          year: 2024,
          month: 1,
          day: 1,
          hour,
          minute: 23,
        });

        const blue = getFireGemForDateTime(dt);

        expect(blue).to.have.property('colour', 'Blue');
        expect(blue.interval.end?.toString()).to.be.eql(
          dt.endOf('hour').toString(),
        );
      },
    );

    it.each([1, 4, 7, 10, 13, 16, 19, 22])(
      'returns red fire gem for hour %i',
      (hour) => {
        const dt = DateTime.fromObject({
          year: 2024,
          month: 1,
          day: 1,
          hour,
          minute: 23,
        });

        const red = getFireGemForDateTime(dt);

        expect(red).to.have.property('colour', 'Red');
        expect(red.interval.end?.toString()).to.be.eql(
          dt.endOf('hour').toString(),
        );
      },
    );

    it.each([2, 5, 8, 11, 14, 17, 20, 23])(
      'returns green fire gem for hour %i',
      (hour) => {
        const dt = DateTime.fromObject({
          year: 2024,
          month: 1,
          day: 1,
          hour,
          minute: 23,
        });

        const green = getFireGemForDateTime(dt);

        expect(green).to.have.property('colour', 'Green');
        expect(green.interval.end?.toString()).to.be.eql(
          dt.endOf('hour').toString(),
        );
      },
    );
  });

  describe('#getStratosForDateTime', () => {
    it('returns dawn between 3am and 9am', () => {
      const dt = DateTime.fromObject({
        year: 2024,
        month: 1,
        day: 1,
        hour: 3,
        minute: 0,
      });

      const stratos = getStratosForDateTime(dt);

      expect(stratos).to.have.property('colour', 'Dawn');
      expect(stratos.interval.toString()).to.be.eql(
        '[2024-01-01T03:00:00.000+00:00 – 2024-01-01T08:59:59.999+00:00)',
      );
    });

    it('returns day between 9am and 3pm', () => {
      const dt = DateTime.fromObject({
        year: 2024,
        month: 1,
        day: 1,
        hour: 9,
        minute: 0,
      });

      const stratos = getStratosForDateTime(dt);

      expect(stratos).to.have.property('colour', 'Day');
      expect(stratos.interval.toString()).to.be.eql(
        '[2024-01-01T09:00:00.000+00:00 – 2024-01-01T14:59:59.999+00:00)',
      );
    });

    it('returns dusk between 3pm and 9pm', () => {
      const dt = DateTime.fromObject({
        year: 2024,
        month: 1,
        day: 1,
        hour: 15,
        minute: 0,
      });

      const stratos = getStratosForDateTime(dt);

      expect(stratos).to.have.property('colour', 'Dusk');
      expect(stratos.interval.toString()).to.be.eql(
        '[2024-01-01T15:00:00.000+00:00 – 2024-01-01T20:59:59.999+00:00)',
      );
    });

    it('returns night between 9pm and 3am', () => {
      const dt = DateTime.fromObject({
        year: 2024,
        month: 1,
        day: 1,
        hour: 21,
        minute: 0,
      });

      const stratos = getStratosForDateTime(dt);

      expect(stratos).to.have.property('colour', 'Night');
      expect(stratos.interval.toString()).to.be.eql(
        '[2024-01-01T21:00:00.000+00:00 – 2024-01-02T02:59:59.999+00:00)',
      );
    });
  });

  describe('#getSpiritWardForDateTime', () => {
    it('returns day between 6am and 6pm', () => {
      const dt = DateTime.fromObject({
        year: 2024,
        month: 1,
        day: 1,
        hour: 6,
        minute: 0,
      });

      const spiritWard = getSpiritWardForDateTime(dt);

      expect(spiritWard).to.have.property('colour', 'Day');
      expect(spiritWard.interval.toString()).to.be.eql(
        '[2024-01-01T06:00:00.000+00:00 – 2024-01-01T17:59:59.999+00:00)',
      );
    });

    it('returns night 1 between 6pm and 8pm', () => {
      const dt = DateTime.fromObject({
        year: 2024,
        month: 1,
        day: 1,
        hour: 19,
        minute: 0,
      });

      const spiritWard = getSpiritWardForDateTime(dt);

      expect(spiritWard).to.have.property('colour', 'Glowy');
      expect(spiritWard.interval.toString()).to.be.eql(
        '[2024-01-01T18:00:00.000+00:00 – 2024-01-01T19:59:59.999+00:00)',
      );
    });

    it('returns night 1 between 4am and 6am', () => {
      const dt = DateTime.fromObject({
        year: 2024,
        month: 1,
        day: 1,
        hour: 5,
        minute: 0,
      });

      const spiritWard = getSpiritWardForDateTime(dt);

      expect(spiritWard).to.have.property('colour', 'Glowy');
      expect(spiritWard.interval.toString()).to.be.eql(
        '[2024-01-01T04:00:00.000+00:00 – 2024-01-01T05:59:59.999+00:00)',
      );
    });

    it('returns night 2 between 8pm and 10pm', () => {
      const dt = DateTime.fromObject({
        year: 2024,
        month: 1,
        day: 1,
        hour: 20,
        minute: 0,
      });

      const spiritWard = getSpiritWardForDateTime(dt);

      expect(spiritWard).to.have.property('colour', 'Glowier');
      expect(spiritWard.interval.toString()).to.be.eql(
        '[2024-01-01T20:00:00.000+00:00 – 2024-01-01T21:59:59.999+00:00)',
      );
    });

    it('returns night 2 between 2am and 4am', () => {
      const dt = DateTime.fromObject({
        year: 2024,
        month: 1,
        day: 1,
        hour: 2,
        minute: 0,
      });

      const spiritWard = getSpiritWardForDateTime(dt);

      expect(spiritWard).to.have.property('colour', 'Glowier');
      expect(spiritWard.interval.toString()).to.be.eql(
        '[2024-01-01T02:00:00.000+00:00 – 2024-01-01T03:59:59.999+00:00)',
      );
    });

    it('returns night 3 between 10pm and 11pm', () => {
      const dt = DateTime.fromObject({
        year: 2024,
        month: 1,
        day: 1,
        hour: 22,
        minute: 30,
      });

      const spiritWard = getSpiritWardForDateTime(dt);

      expect(spiritWard).to.have.property('colour', 'Glowiest');
      expect(spiritWard.interval.toString()).to.be.eql(
        '[2024-01-01T22:00:00.000+00:00 – 2024-01-01T22:59:59.999+00:00)',
      );
    });

    it('returns night 3 between 1am and 2am', () => {
      const dt = DateTime.fromObject({
        year: 2024,
        month: 1,
        day: 1,
        hour: 1,
        minute: 30,
      });

      const spiritWard = getSpiritWardForDateTime(dt);

      expect(spiritWard).to.have.property('colour', 'Glowiest');
      expect(spiritWard.interval.toString()).to.be.eql(
        '[2024-01-01T01:00:00.000+00:00 – 2024-01-01T01:59:59.999+00:00)',
      );
    });

    it('returns night 4 between 11pm and midnight', () => {
      const dt = DateTime.fromObject({
        year: 2024,
        month: 1,
        day: 1,
        hour: 23,
        minute: 30,
      });

      const spiritWard = getSpiritWardForDateTime(dt);

      expect(spiritWard).to.have.property('colour', 'Glowmostest');
      expect(spiritWard.interval.toString()).to.be.eql(
        '[2024-01-01T23:00:00.000+00:00 – 2024-01-02T00:59:59.999+00:00)',
      );
    });

    it('returns night 4 between midnight and 1am', () => {
      const dt = DateTime.fromObject({
        year: 2024,
        month: 1,
        day: 1,
        hour: 0,
        minute: 30,
      });

      const spiritWard = getSpiritWardForDateTime(dt);

      expect(spiritWard).to.have.property('colour', 'Glowmostest');
      expect(spiritWard.interval.toString()).to.be.eql(
        '[2024-01-01T23:00:00.000+00:00 – 2024-01-02T00:59:59.999+00:00)',
      );
    });
  });

  describe('#getZombieMonthForDateTime', () => {
    it.each(
      [
        [1, 1],
        [2, 3],
        [3, 3],
        [4, 5],
        [5, 5],
        [6, 7],
        [7, 7],
        [8, 8],
        [9, 10],
        [10, 10],
        [11, 12],
      ].map(([m, expected]) => [
        DateTime.fromObject({ month: expected }).monthLong,
        DateTime.fromObject({ month: m }).monthLong,
        m,
        expected,
      ]),
    )('returns %s for %s', (_, _1, month, expected) => {
      const zombie = getZombieMonthForDateTime(
        DateTime.fromObject({
          year: 2024,
          month,
          day: 2,
        }).startOf('day'),
      );

      expect(zombie.daysInMonth).to.be.eql(31);
      expect(zombie.month).to.be.eql(expected);
    });
  });
});
