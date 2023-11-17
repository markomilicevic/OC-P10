import { getMonth, sortFromMostRecentToOldest } from "./index";

describe("Date helper", () => {
  describe("When getMonth is called", () => {
    describe.each([
      ["2022-01-01", "janvier"],
      ["2022-02-01", "février"],
      ["2022-03-01", "mars"],
      ["2022-04-01", "avril"],
      ["2022-05-01", "mai"],
      ["2022-06-01", "juin"],
      ["2022-07-01", "juillet"],
      ["2022-08-01", "août"],
      ["2022-09-01", "septembre"],
      ["2022-10-01", "octobre"],
      ["2022-11-01", "novembre"],
      ["2022-12-01", "décembre"],
    ])("with %s", (date, expectedMonth) => {
      it(`the function return ${expectedMonth}`, () => {
        const input = new Date(`${date}T00:00:00.000Z`);

        const output = getMonth(input);

        expect(output).toBe(expectedMonth);
      });
    });
  });

  describe("When sortFromMostRecentToOldest is called", () => {
    it("The function don't touch to an empty array", () => {
      const list = [];

      sortFromMostRecentToOldest(list);

      expect(list.length).toBe(0);
    });

    it("the function sort the list inplace by the date field in desc order", () => {
      const list = [
        {
          id: "c",
          date: "1990-01-01T00:00:00.000Z",
        },
        {
          id: "b",
          date: "2000-01-01T00:00:00.000Z",
        },
        {
          id: "d",
          date: "1990-01-01T00:00:00.000Z",
        },
        {
          id: "a",
          date: "2010-01-01T00:00:00.000Z",
        },
      ];

      sortFromMostRecentToOldest(list);

      expect(list.length).toBe(4);
      expect(list[0].id).toBe("a");
      expect(list[1].id).toBe("b");
      expect(list[2].id).toBe("c");
      expect(list[3].id).toBe("d");
    });
  });
});
