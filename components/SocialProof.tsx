import { getGoogleReviews, reviewsQualify } from "@/lib/reviews";
import { testimonials } from "@/lib/site";
import SocialProofView from "./SocialProofView";

/** Server component: Google reviews when the listing qualifies, otherwise client testimonials, otherwise nothing. */
export default async function SocialProof() {
  const g = await getGoogleReviews();
  if (reviewsQualify(g)) return <SocialProofView google={g} testimonials={[]} />;
  if (testimonials.length) return <SocialProofView google={null} testimonials={testimonials} />;
  return null;
}
