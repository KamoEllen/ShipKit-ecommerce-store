import Products from "@/components/Products";
import Stripe from "stripe";
import "../../envConfig.js";

const API_KEY = process.env.STRIPE_SECRET_KEY;
const stripe = new Stripe(API_KEY, {
    apiVersion: "2023-10-16",
});

export async function getProducts() {
    try {
        const products = await stripe.products.list({ active: true });
        const prices = await stripe.prices.list({ active: true });

        console.log("Raw products from Stripe:", products.data);
        console.log("Raw prices from Stripe:", prices.data);

        const combinedData = products.data.map((product) => {
            const productPrices = prices.data.filter((price) => {
                return price.product === product.id;
            });

            
            const defaultPrice = productPrices.length > 0 ? productPrices[0].id : null;

            return {
                ...product,
                default_price: defaultPrice,
                prices: productPrices.map((price) => {
                    return {
                        id: price.id,
                        unit_amount: price.unit_amount,
                        currency: price.currency,
                        recurring: price.recurring,
                    };
                }),
            };
        });

        console.log("Combined data:", combinedData);
        return combinedData;
    } catch (err) {
        console.log("Stripe API Error:", err.stack);
        console.log("Error message:", err.message);
        return [];
    }
}

export default async function ProductsPage() {
    const products = await getProducts();

    console.log("Products fetched:", products);

    let planner = null;
    let stickers = [];

    for (let product of products) {
        console.log("Processing product:", product.name);
        
        
        if (product.name === 'Notion Template') {
            planner = product;
            console.log("Found planner:", planner);
            continue;
        }
        stickers.push(product);
    }

    console.log("Final planner:", planner);
    console.log("Final stickers:", stickers);

    return (
        <>
            <section>
                <div className="products-header">
                    <h1>All Products</h1>
                    <p>Everything you need to ship faster</p>
                </div>
                {products.length === 0 ? (
                    <div>
                        <p>No products found. Check your Stripe configuration.</p>
                    </div>
                ) : (
                    <Products planner={planner} stickers={stickers} />
                )}
            </section>
        </>
    );
}