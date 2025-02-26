export default async function handler(req, res) {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_GEO_LOCATION_API_KEY);

    if (!response.ok) {
      throw new Error(`Failed to fetch data, status: ${response.status}`);
    }

    const data = await response.json();

    const {
      geoplugin_city,
      geoplugin_region,
      geoplugin_countryName,
      geoplugin_latitude,
      geoplugin_longitude,
    } = data;

    res.status(200).json({
      city: geoplugin_city,
      region: geoplugin_region,
      country: geoplugin_countryName,
      latitude: geoplugin_latitude,
      longitude: geoplugin_longitude,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
