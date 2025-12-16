export const runtime = "nodejs";

import Stripe from "stripe";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY missing");
  return new Stripe(key);
}

export async function POST(req: Request) {
  try {
    const stripe = getStripe();

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    if (!siteUrl || !siteUrl.startsWith("http")) {
      throw new Error("Invalid NEXT_PUBLIC_SITE_URL");
    }

    const body = await req.json();
    const { amount, recurring } = body;

    // ======================
    // ONE-TIME DONATION
    // ======================
    if (!recurring) {
      if (!amount || amount <= 0) {
        throw new Error("Invalid donation amount");
      }

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card", "sepa_debit"],
        line_items: [
          {
            price_data: {
              currency: "eur",
              unit_amount: Math.round(amount * 100),
              product_data: {
                name: "Spende an Second Life e.V.",
                description:
                  "Unterstützung für KI-gestützte Umwelt- und Küstenschutzprojekte",
              },
            },
            quantity: 1,
          },
        ],
        success_url: `${siteUrl}/donate/success`,
        cancel_url: `${siteUrl}/donate`,
        metadata: {
          donation_type: "one_time",
        },
      });

      return Response.json({ url: session.url });
    }

    // ======================
    // MONTHLY DONATION
    // ======================
    if (!amount || amount <= 0) {
      throw new Error("Invalid monthly amount");
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card", "sepa_debit"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            unit_amount: Math.round(amount * 100),
            recurring: { interval: "month" },
            product_data: {
              name: "Monatliche Spende an Second Life e.V.",
              description:
                "Regelmäßige Unterstützung für nachhaltige Umweltmissionen",
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/donate/success`,
      cancel_url: `${siteUrl}/donate`,
      metadata: {
        donation_type: "monthly",
      },
    });

    return Response.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe checkout error:", error);

    return new Response(
      JSON.stringify({
        error: error.message,
        type: error.type,
        code: error.code,
      }),
      { status: 500 }
    );
  }
}
