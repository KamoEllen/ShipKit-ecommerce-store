'use client'

import { useState } from "react"
import Portal from "./Portal"
import { useProducts } from "@/context/ProductContext"

export default function Products({ planner, stickers }) {
  const [portalImage, setPortalImage] = useState(null)
  const { handleIncrementProduct } = useProducts()

  if (!stickers.length || !planner) return null

  return (
    <>
      {portalImage && (
        <Portal handleClosePortal={() => setPortalImage(null)}>
          <div className="portal-content">
            <img
              className="img-display"
              src={`med_res/${portalImage}.png`}
              alt={`${portalImage}-high-res`}
            />
          </div>
        </Portal>
      )}

      {/* Notion Planner */}
      <div className="section-container">
        <div className="section-header">
          <h2>Hackathon Sprint Planner (Notion)</h2>
          <p>Build faster, solo or in teams. Minimal context switching.</p>
        </div>

        <div className="planner-container">
          <div>
            <button onClick={() => setPortalImage('planner')} className="img-button">
              <img src="low_res/planner.png" alt="planner-preview" />
            </button>
          </div>
          <div className="planner-info">
            <p className="text-large planner-header">
             Hacathon Sprint Sprint Planner (Notion Template)
            </p>
            <h3><span>$</span>14.99</h3>
            <p>
              A Notion template built for hackathons, solo builds, or team sprints.
              Track progress, unblock teammates, and stay outcome-focused — all inside a structured,
              editable workspace. Minimal filler. Max output.
            </p>
            <ul>
              <li><strong>Editable & Sharable:</strong> Clone to your workspace and go.</li>
              <li><strong>Designed for engineers:</strong> Task buckets, blockers, retro prompts.</li>
              <li><strong>Zero friction:</strong> No setup. No plugins. Just shipping.</li>
            </ul>
            <div className="purchase-btns">
              <button onClick={() =>
                handleIncrementProduct(planner.default_price, 1, planner)
              }>
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Command Sticker Cards */}
      <div className="section-container">
        <div className="section-header">
          <h2>Command Card Stickers (6-Pack)</h2>
          <p>Fast recall and not slow search. Stick these near your monitor.</p>
        </div>

        <div className="sticker-container">
          {[
            {
              name: "Remote Ops & File Handling",
              img: "1",
              price: 4.99,
              description: "Essential SSH, SCP, rsync, and archive commands for moving files fast."
            },
            {
              name: "System Debug & Monitoring",
              img: "2",
              price: 4.99,
              description: "Inspect ports, logs, services, and crons at a glance. Great for prod issues."
            },
            {
              name: "Git: Rewriting History",
              img: "3",
              price: 4.99,
              description: "Amend, rebase, cherry-pick and reset with confidence. No guesswork."
            },
            {
              name: "Git: Workflow Power Moves",
              img: "4",
              price: 4.99,
              description: "Advanced Git moves for debugging, diffing, and recovering mistakes."
            },
            {
              name: "AWS CLI: S3 & Secrets",
              img: "6",
              price: 4.99,
              description: "S3 sync, signed links, and secrets retrieval without AWS Console bloat."
            },
            {
              name: "Algorithms & Time Complexity",
              img: "5",
              price: 4.99,
              description: "Essential algorithms reference including common sorting, searching, and data structure operations with their time and space complexity breakdowns. "
            }
          ].map((sticker, index) => (
            <div key={index} className="sticker-card">
              <button onClick={() => setPortalImage(sticker.img)} className="img-button">
                <img src={`low_res/${sticker.img}.png`} alt={`${sticker.img}-preview`} />
              </button>
              <div className="sticker-info">
                <p className="text-medium">{sticker.name}</p>
                <p>{sticker.description}</p>
                <h4><span>$</span>{sticker.price.toFixed(2)}</h4>
                <button onClick={() =>
                  handleIncrementProduct(stickers[index].default_price, 1, stickers[index])
                }>
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
