// utils/geocoding.js

async function getLatLngFromCity(cityName) {
  if (!cityName) return { latitude: null, longitude: null };

  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    cityName
  )}`;

  try {
    // fetch nativo de Node 18+
    const res = await fetch(url, {
      headers: { "User-Agent": "YourAppName/1.0" },
    });
    const data = await res.json();

    if (data.length === 0) return { latitude: null, longitude: null };
    //console.log("Ciudad:", location, "Lat/Lng:", latitude, longitude);

    return {
      latitude: parseFloat(data[0].lat),
      longitude: parseFloat(data[0].lon),
    };
  } catch (err) {
    console.error("Error geocoding city:", err);

    return { latitude: null, longitude: null };
  }
}

module.exports = { getLatLngFromCity };
