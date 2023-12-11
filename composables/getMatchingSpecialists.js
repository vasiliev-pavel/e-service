// specialistUtils.js

/**
 * Фильтрует список специалистов, чтобы найти тех, кто предлагает все услуги из заданного списка.
 *
 * @param {Array} specialists - Массив специалистов для фильтрации.
 * @param {Array} serviceIds - Массив идентификаторов услуг, которые должны предоставлять специалисты.
 * @returns {Array} Отфильтрованный массив специалистов, соответствующих всем указанным услугам.
 */
export function getMatchingSpecialists(specialists, serviceIds) {
  return specialists.filter((specialist) =>
    // Проверяем, соответствует ли каждая услуга из списка serviceIds...
    serviceIds.every((id) =>
      // ...услугам, предоставляемым специалистом в любой из его категорий.
      specialist.categories.some((category) =>
        // Проверяем, есть ли услуга с таким id в данной категории.
        category.services?.some((service) => service.id === id)
      )
    )
  );
}
