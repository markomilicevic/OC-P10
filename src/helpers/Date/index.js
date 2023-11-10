export const MONTHS = {
  0: "janvier",
  1: "février",
  2: "mars",
  3: "avril",
  4: "mai",
  5: "juin",
  6: "juillet",
  7: "août",
  8: "septembre",
  9: "octobre",
  10: "novembre",
  11: "décembre",
};

export const getMonth = (date) => MONTHS[date.getMonth()];

/**
 * Sort the list inplace based on the `date` field in asc order
 * @param {Array} list List of items with a `date` string field
 */
export const sortListByDate = (list) =>
  list.sort((a, b) => {
    const aTimestamp = new Date(a.date).getTime();
    const bTimestamp = new Date(b.date).getTime();
    if (aTimestamp > bTimestamp) {
      return 1;
    }
    if (aTimestamp < bTimestamp) {
      return -1;
    }
    return 0;
  });
