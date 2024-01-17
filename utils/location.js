// Функция для расчета расстояния между двумя точками (используется формула гаверсинуса)
export function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // радиус Земли в км
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Функция для получения текущего местоположения пользователя
export function getUserLocation() {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      // Опции для увеличения точности
      const options = {
        enableHighAccuracy: true, // Запрашивает наивысшую доступную точность
        maximumAge: 0, // Определяет максимальный возраст принимаемых кэшированных позиций (0 = только свежие данные)
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Геолокация получена:", position);
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Ошибка геолокации:", error);
          reject(error);
        },
        options
      );
    } else {
      console.error("Браузер не поддерживает геолокацию.");
      reject(new Error("Браузер не поддерживает геолокацию."));
    }
  });
}
