import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface CheckoutRequest {
  productId: string;
  email: string;
  orderId: string;
}

const paymentLinkMap: Record<string, string> = {
  ebook: "https://buy.stripe.com/test_fZu7sMeW04kpfSr1kt5ZC00",
  paperback: "https://buy.stripe.com/test_6oU14o4hm6sx9u3bZ75ZC01",
  hardcover: "https://buy.stripe.com/test_aFa14oeW018d0Xx2ox5ZC02",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { productId, email, orderId }: CheckoutRequest = await req.json();

    const paymentLink = paymentLinkMap[productId];
    if (!paymentLink) {
      throw new Error("Product not found");
    }

    return new Response(
      JSON.stringify({
        url: paymentLink,
        orderId: orderId,
        email: email,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
