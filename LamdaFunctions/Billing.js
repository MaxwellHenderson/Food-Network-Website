import stripePackage from "stripe";

export async function main(event, context) {
    //amount being the price
    //source being the token from the card being charged
  const { amount, source } = JSON.parse(event.body);
  const description = "Charged for food";

  // Load our secret key from the  environment variables
  const stripe = stripePackage(process.env.stripeSecretKey);

  try {
    await stripe.charges.create({
      source,
      amount,
      description,
      currency: "usd"
    });
    console.log("Successfully charged");
  } catch (e) {
    console.log("Unable to charge card: ",e);
  }
}