'use client'

import { useState, useRef, useEffect } from "react"
import Link from "next/link"

export default function ImageBanner() {
    const [isLoaded, setIsLoaded] = useState(false)
    const imgRef = useRef()

    useEffect(() => {
        if (imgRef.current.complete) {
            setIsLoaded(true)
        }
    }, [])

    return (
        <div className="banner-images">
            <img className="low-res-img" src="low_res/banner.jpg" alt="banner-low-res" />
            <img ref={imgRef} className="high-res-img" src="med_res/banner.jpg" alt="banner-high-res" style={{ opacity: isLoaded ? 1 : 0 }} onLoad={() => {
                setIsLoaded(true)
            }} />
            <div className="cta-btns-container">
                <div>
                    <div>
                        <h3>Welcome to</h3>
                        <h1>The ShipKit Store</h1>
                    </div>
                    <div>
                        <Link href="/products">
                            <button>Shop stickers</button>
                        </Link>
                        <Link href="/products">
                            <button>Shop planner</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}