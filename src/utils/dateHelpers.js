/**
 * Formatiert ein Datum zu einem lesbaren String
 * @param {Date} date - Das zu formatierende Datum
 * @returns {string} Formatierter Datumstring
 */
export const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('de-DE', options);
};

/**
 * Berechnet das nächste Gießdatum basierend auf einem Intervall
 * @param {Date} lastWatered - Letztes Gießdatum
 * @param {number} intervalDays - Intervall in Tagen
 * @returns {Date} Nächstes Gießdatum
 */
export const calculateNextWatering = (lastWatered, intervalDays) => {
  const nextDate = new Date(lastWatered);
  nextDate.setDate(nextDate.getDate() + intervalDays);
  return nextDate;
};
