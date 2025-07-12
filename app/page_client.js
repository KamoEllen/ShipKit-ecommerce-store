'use client'
import ImageBanner from "@/components/ImageBanner";
import Products from "@/components/Products";
import { useEffect, useState } from "react";


export default function Home(props) {
  const [products, setProducts] = useState([])

  let planner = null
  let stickers = []


  for (let product of products) {
    if (product.name === 'Hackathon Sprint Planner') {
      planner = product
      continue
    }
    stickers.push(product)
  }

  useEffect(() => {
    async function fetchProducts() {
      try {
        const baseURL = process.env.NEXT_PUBLIC_BASE_URL
        const response = await fetch(baseURL + '/api/products')
        const productsData = await response.json()
        setProducts(productsData)
      } catch (err) {
        console.log(err.message)
      }
    }

    fetchProducts()
  }, [])


  return (
    < >
      <ImageBanner />
      <section>
        <Products planner={planner} stickers={stickers} />
      </section>
    </>
  );
}
