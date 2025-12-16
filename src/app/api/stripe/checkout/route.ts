import Stripe from "stripe";

// ======================
// Stripe init
// ======================
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// ======================
// CONFIG — your real IDs
// ======================
const ONE_TIME_PRODUCT_ID = "prod_Tc9TqExZaN6ErS"; // ✅ one-time donation product

// ======================
// POST handler
// ======================
export async function POST(req: Request) {
  try {
    console.log("👉 Stripe checkout called");

    // ----------------------
    // ENV validation
    // ----------------------
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is missing");
    }

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    // ----------------------
    // Parse body
    // ----------------------
    const body = await req.json();
    console.log("📦 Request body:", body);

    const { amount, recurring, priceId } = body;

    // ======================
    // ONE-TIME DONATION
    // ======================
    if (!recurring) {
      if (!amount || typeof amount !== "number" || amount <= 0) {
        throw new Error("Invalid one-time donation amount");
      }

      console.log("💶 One-time donation:", amount);

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card", "sepa_debit"],
        line_items: [
          {
            price_data: {
              currency: "eur",
              product: ONE_TIME_PRODUCT_ID, // ✅ correct product
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
      throw new Error("Missing or invalid priceId for monthly donation");
    }

    console.log("🔁 Monthly donation, priceId:", priceId);

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card", "sepa_debit"],
      line_items: [
        {
          price: priceId, // ✅ MUST be price_xxx
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
    console.error("❌ Stripe Checkout Error");
    console.error(error?.message);
    console.error(error);

    return new Response(
      JSON.stringify({
        error: error?.message || "Stripe checkout failed",
      }),
      { status: 500 }
    );
  }
}
