export async function POST(req) {
  const body = await req.json();
  const { places } = body;

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const fieldMask = "places.displayName,places.photos";
  const results = [];

  for (const placeName of places) {
    const textSearchRes = await fetch(
      "https://places.googleapis.com/v1/places:searchText",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": fieldMask,
        },
        body: JSON.stringify({ textQuery: placeName }),
      }
    );

    const searchData = await textSearchRes.json();
    const place = searchData.places?.[0];

    if (place?.photos?.length > 0) {
      const photoUrls = place.photos
        .slice(0, 3)
        .map(
          (photo) =>
            `https://places.googleapis.com/v1/${photo.name}/media?maxWidthPx=1200&key=${apiKey}`
        );

      results.push({
        title: placeName,
        photoUrls,
      });
    }
  }

  return Response.json({ photos: results });
}
