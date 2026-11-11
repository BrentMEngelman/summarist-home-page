import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "dummy_key", {
  apiVersion: "2025-01-27.acacia" as any,
});

export async function POST(req: Request) {
  try {
    const { planType } = await req.json();

    // Define price IDs or amounts based on monthly vs annual plan
    const unitAmount = planType === "yearly" ? 9999 : 999; // $99.99/yr or $9.99/mo
    const interval = planType === "yearly" ? "year" : "month";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Summarist ${planType === "yearly" ? "Annual" : "Monthly"} Subscription`,
            },
            unit_amount: unitAmount,
            recurring: {
              interval: interval,
            },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      subscription_data:
        planType === "yearly" ? { trial_period_days: 7 } : undefined,
      success_url: `${req.headers.get("origin")}/for-you?success=true`,
      cancel_url: `${req.headers.get("origin")}/choose-plan?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
