import { NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request: Request) {
  try {
    const { cart }: any = await request.json();

    const calculateOrderAmount = (cart: any) => {
      const totalAmount = cart.reduce(
        (acc: any, product: any) => acc + product.price,
        0
      );
      return totalAmount * 100;
    };

    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(cart),
      currency: "sek",
      payment_method: "pm_card_mastercard",
      description: "Someone bought something",
      // automatic_payment_methods: {
      //   enabled: true,
      // },
    });

    console.log("Cart", cart);

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      totalAmount: calculateOrderAmount(cart),
    });
  } catch (error) {
    console.error("Error processing payment:", error);
    return console.log("BLA");
  }
}
