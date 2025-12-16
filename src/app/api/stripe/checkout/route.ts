import Stripe from "stripe";

// One-time donation product
const ONE_TIME_PRODUCT_ID = "prod_Tc9TqExZaN6ErS";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;

  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is missing at runtime");
  }

  return new Stripe(key);
}

export async function POST(req: Request) {
  try {
    const stripe = getStripe(); // ✅ lazy, runtime-only

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    if (!siteUrl || !siteUrl.startsWith("http")) {
      throw new Error(
        `Invalid NEXT_PUBLIC_SITE_URL: "${siteUrl}"`
      );
    }

    const body = await req.json();
    const { amount, recurring, priceId } = body;

    // ======================
    // ONE-TIME DONATION
    // ======================
    if (!recurring) {
      if (!amount || typeof amount !== "number" || amount <= 0) {
        throw new Error("Invalid donation amount");
      }

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card", "sepa_debit"],
        line_items: [
          {
            price_data: {
              currency: "eur",
              product: ONE_TIME_PRODUCT_ID,
              unit_amount: Math.round(amount * 100),
            },
            quantity: 1,
          },
        ],
        success_url: `${siteUrl}/donate/success`,
        cancel_url: `${siteUrl}/donate`,
        metadata: {
          donation_type: "one_time",
          organization: "Second Life e.V.",
        },
      });

      return Response.json({ url: session.url });
    }

    // ======================
    // MONTHLY DONATION
    // ======================
    if (!priceId || typeof priceId !== "string") {
      throw new Error("Missing or invalid priceId");
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card", "sepa_debit"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/donate/success`,
      cancel_url: `${siteUrl}/donate`,
      metadata: {
        donation_type: "monthly",
        organization: "Second Life e.V.",
      },
    });

    return Response.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe checkout error:", error);

    return new Response(
      JSON.stringify({
        error: error.message || "Stripe checkout failed",
      }),
      { status: 500 }
    );
  }
}
