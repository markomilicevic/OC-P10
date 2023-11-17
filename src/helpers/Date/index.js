const MONTHS = {
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

/**
 * Get the formatted month display
 * @param {Date} date Input date
 * @returns {String} Month in french language
 */
export const getMonth = (date) => MONTHS[date.getMonth()];

/**
 * Sort the list inplace based on the `date` field in desc order
 * @param {Array} list List of items
 */
export const sortFromMostRecentToOldest = (list) =>
  list.sort((a, b) => {
    const aTimestamp = new Date(a.date).getTime();
    const bTimestamp = new Date(b.date).getTime();
    if (aTimestamp < bTimestamp) {
      return 1;
    }
    if (aTimestamp > bTimestamp) {
      return -1;
    }
    return 0;
  });
