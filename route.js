function haversine(a, b) {
  const R = 6371; // Earth radius in km
  const toRad = deg => deg * Math.PI / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h = Math.sin(dLat / 2) ** 2 + Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return 2 * R * Math.asin(Math.sqrt(h));
}

function optimizeRoute(locations) {
  if (!locations || locations.length === 0) return [];
  const remaining = locations.slice(1);
  const route = [locations[0]];
  let current = locations[0];
  while (remaining.length) {
    let nearestIndex = 0;
    let nearestDist = haversine(current, remaining[0]);
    for (let i = 1; i < remaining.length; i++) {
      const d = haversine(current, remaining[i]);
      if (d < nearestDist) {
        nearestDist = d;
        nearestIndex = i;
      }
    }
    current = remaining.splice(nearestIndex, 1)[0];
    route.push(current);
  }
  return route;
}

if (typeof window !== 'undefined') {
  window.optimizeRoute = optimizeRoute;
}

if (typeof module !== 'undefined') {
  module.exports = { optimizeRoute };
}
