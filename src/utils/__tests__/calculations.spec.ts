import { describe, it, expect } from 'vitest';
import {
  getFireGemForDateTime,
  getMoonglowIntervalForDateTime,
  getNewYorkDSTPeriodForYear,
  getSunbeamIntervalForDateTime,
  getSunriseIntervalForDateTime,
  getSunsetIntervalForDateTime,
  getZombieIntervalForDateTime,
} from '../calculations';
import { DateTime } from 'luxon';

describe('Calculations', () => {
  describe('#getNewYorkDSTPeriodForYear', () => {
    it('calculates beginning and ending for years 2023 to 2026', () => {
      const p2023 = getNewYorkDSTPeriodForYear(2023);
      expect(p2023.start?.toSeconds()).to.be.eql(1678586399);
      expect(p2023.end?.toSeconds()).to.be.eql(1699149599);

      const p2024 = getNewYorkDSTPeriodForYear(2024);
      expect(p2024.start?.toSeconds()).to.be.eql(1710035999);
      expect(p2024.end?.toSeconds()).to.be.eql(1730599199);

      const p2025 = getNewYorkDSTPeriodForYear(2025);
      expect(p2025.start?.toSeconds()).to.be.eql(1741485599);
      expect(p2025.end?.toSeconds()).to.be.eql(1762048799);

      const p2026 = getNewYorkDSTPeriodForYear(2026);
      expect(p2026.start?.toSeconds()).to.be.eql(1772935199);
      expect(p2026.end?.toSeconds()).to.be.eql(1793498399);
    });
  });

  describe('#getSunbeamIntervalForDateTime', () => {
    it('calculates beginning and ending when in range of current day', () => {
      expect(
        getSunbeamIntervalForDateTime(
          DateTime.fromObject({
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
        getSunbeamIntervalForDateTime(
          DateTime.fromObject({
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
        getSunbeamIntervalForDateTime(
          DateTime.fromObject({
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

  describe('#getMoonglowIntervalForDateTime', () => {
    it('calculates beginning and ending after midnight but before 6am', () => {
      expect(
        getMoonglowIntervalForDateTime(
          DateTime.fromObject({
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
        getMoonglowIntervalForDateTime(
          DateTime.fromObject({
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
        getMoonglowIntervalForDateTime(
          DateTime.fromObject({
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
    it('returns blue fire gem for hours 0, 3, 6, 9, 12, 15, 18, 21', () => {
      [0, 3, 6, 9, 12, 15, 18, 21].forEach((hour) => {
        const dt = DateTime.fromObject({
          month: 1,
          day: 1,
          hour,
          minute: 23,
        });

        const green = getFireGemForDateTime(dt);

        expect(green).to.have.property('colour', 'Blue');
        expect(green.interval.end?.toString()).to.be.eql(
          dt.endOf('hour').toString(),
        );
      });
    });

    it('returns red fire gem for hours 1, 4, 7, 10, 13, 16, 19, 22', () => {
      [1, 4, 7, 10, 13, 16, 19, 22].forEach((hour) => {
        const dt = DateTime.fromObject({
          month: 1,
          day: 1,
          hour,
          minute: 23,
        });

        const green = getFireGemForDateTime(dt);

        expect(green).to.have.property('colour', 'Red');
        expect(green.interval.end?.toString()).to.be.eql(
          dt.endOf('hour').toString(),
        );
      });
    });

    it('returns green fire gem for hours 2, 5, 8, 11, 14, 17, 20, 23', () => {
      [2, 5, 8, 11, 14, 17, 20, 23].forEach((hour) => {
        const dt = DateTime.fromObject({
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
      });
    });
  });
});
