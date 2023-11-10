export const MONTHS = {
  1: "janvier",
  2: "février",
  3: "mars",
  4: "avril",
  5: "mai",
  6: "juin",
  7: "juillet",
  8: "août",
  9: "septembre",
  10: "octobre",
  11: "novembre",
  12: "décembre",
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
