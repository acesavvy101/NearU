
export function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        });
      },
      (error) => reject(error),
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0
      }
    );
  });
}

export function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const rad = (degrees) => degrees * Math.PI / 180;

  const dLat = rad(lat2 - lat1);
  const dLon = rad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(lat1)) *
    Math.cos(rad(lat2)) *
    Math.sin(dLon / 2) ** 2;

  return 2 * R * Math.asin(Math.sqrt(Math.min(1, a)));
}

export function findNearbyUsers(location, users, radius = 100) {
  return users.filter((user) => {
    if (
      !Number.isFinite(user.latitude) ||
      !Number.isFinite(user.longitude)
    ) {
      return false;
    }

    const distance = calculateDistance(
      location.latitude,
      location.longitude,
      user.latitude,
      user.longitude
    );

    return distance <= radius;
  });
}
