// specialistUtils.js

/**
 * Фильтрует список специалистов, чтобы найти тех, кто предлагает все услуги из заданного списка.
 *
 * @param {Object} specialists - Массив специалистов для фильтрации.
 * @param {Array} serviceIds - Массив идентификаторов услуг, которые должны предоставлять специалисты.
 * @returns {Array} Отфильтрованный массив специалистов, соответствующих всем указанным услугам.
 */
export function getMatchingSpecialists(specialists, serviceIds) {
  return Object.values(specialists).filter(
    (specialist) =>
      // Проверяем, что serviceIds существует и является массивом
      Array.isArray(specialist.serviceIds) &&
      // Затем проверяем, что каждый id из serviceIds содержится в serviceIds специалиста
      serviceIds.every((id) => specialist.serviceIds.includes(id))
  );
}
