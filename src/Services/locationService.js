export async function getPlaceName(
  lat,
  lng
) {

  const res = await fetch(

    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`

  );

  const data = await res.json();

  return {
    fullAddress:
      data.display_name,

    road:
      data.address?.road ||

      data.address?.neighbourhood ||

      "Unknown Street",

    city:
      data.address?.city ||

      data.address?.town ||

      data.address?.state ||

      "Unknown City",
  };
}