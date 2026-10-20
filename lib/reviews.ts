/* Google reviews via the Places API (New). Server-only; cached for 24 hours.
   The reviews section stays hidden until the listing meets the thresholds below. */

export const REVIEWS_MIN_COUNT = 5;
export const REVIEWS_MIN_RATING = 4.5;

export type GoogleReview = {
  author: string; authorUrl?: string; photo?: string; rating: number; text: string; when: string;
};
export type GoogleReviews = { rating: number; count: number; mapsUrl?: string; reviews: GoogleReview[] };

type PlacesResponse = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: {
    rating?: number;
    text?: { text?: string };
    originalText?: { text?: string };
    relativePublishTimeDescription?: string;
    authorAttribution?: { displayName?: string; uri?: string; photoUri?: string };
  }[];
};

export async function getGoogleReviews(): Promise<GoogleReviews | null> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!key || !placeId) return null;
  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`, {
      headers: {
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask": "rating,userRatingCount,googleMapsUri,reviews",
      },
      next: { revalidate: 86400 },
    });
    if (!res.ok) {
      console.error("[reviews] Places API error", res.status);
      return null;
    }
    const d = (await res.json()) as PlacesResponse;
    return {
      rating: d.rating ?? 0,
      count: d.userRatingCount ?? 0,
      mapsUrl: d.googleMapsUri,
      reviews: (d.reviews ?? [])
        .map((r) => ({
          author: r.authorAttribution?.displayName ?? "Google user",
          authorUrl: r.authorAttribution?.uri,
          photo: r.authorAttribution?.photoUri,
          rating: r.rating ?? 0,
          text: r.text?.text ?? r.originalText?.text ?? "",
          when: r.relativePublishTimeDescription ?? "",
        }))
        .filter((r) => r.text && r.rating >= 4),
    };
  } catch (e) {
    console.error("[reviews] fetch failed", e);
    return null;
  }
}

export const reviewsQualify = (g: GoogleReviews | null): g is GoogleReviews =>
  !!g && g.count >= REVIEWS_MIN_COUNT && g.rating >= REVIEWS_MIN_RATING && g.reviews.length > 0;

/** Public "leave a review" link (from Google Business Profile → Ask for reviews). */
export const googleReviewUrl = process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL || "https://g.page/r/CRX6GqczFZPrEAI/review";
