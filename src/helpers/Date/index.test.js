import { sortListByDate } from './index'

describe("Date helper", () => {
  describe("When getMonth is called", () => {
    it("the function return janvier for 2022-01-01 as date", () => {
      // to implement
    });
    it("the function return juillet for 2022-07-08 as date", () => {
      // to implement
    });
  });

  describe("When sortListByDate is called", () => {
    it("the function sort the list inplace by the date field in asc order", () => {
      const list = [
        {
          id: "c",
          date: "2000-01-01T00:00:00.000Z",
        },
        {
          id: "a",
          date: "1990-01-01T00:00:00.000Z",
        },
        {
          id: "b",
          date: "1990-01-01T00:00:00.000Z",
        },
        {
          id: "d",
          date: "2010-01-01T00:00:00.000Z",
        },
      ];

      sortListByDate(list);

      expect(list.length).toBe(4);
      expect(list[0].id).toBe("a");
      expect(list[1].id).toBe("b");
      expect(list[2].id).toBe("c");
      expect(list[3].id).toBe("d");
    });
  });
});
