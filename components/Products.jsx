'use client'

import { useState } from "react"
import Portal from "./Portal"
import { useProducts } from "@/context/ProductContext"

export default function Products({ planner, stickers }) {
  const [portalImage, setPortalImage] = useState(null)
  const { handleIncrementProduct } = useProducts()

  console.log("Products component received:", { planner, stickers });

  if (!stickers.length && !planner) {
    return (
      <div>
        <p>No products available at the moment.</p>
      </div>
    );
  }

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
      {planner && (
        <div className="section-container">
          <div className="section-header">
            <h2>Notion Template (Notion)</h2>
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
                Notion Template (Notion Template)
              </p>
              <h3>
                <span>R$</span>
                {planner.prices && planner.prices.length > 0 
                  ? (planner.prices[0].unit_amount / 100).toFixed(2)
                  : '13.99'
                }
              </h3>
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
      )}

      {/* Command Sticker Cards */}
      {stickers.length > 0 && (
        <div className="section-container">
          <div className="section-header">
            <h2>Command Card Stickers (6-Pack)</h2>
            <p>Fast recall and not slow search. Stick these near your monitor.</p>
          </div>

          <div className="sticker-container">
            {stickers.map((sticker, index) => {
             
              const stickerMapping = {
                'Remote Ops & File Handling Command Card': {
                  imageNumber: '1',
                  name: 'Remote Ops & File Handling',
                  description: 'Essential SSH, SCP, rsync, and archive commands for moving files fast.'
                },
                'System Debug & Monitoring Command Card': {
                  imageNumber: '2',
                  name: 'System Debug & Monitoring',
                  description: 'Inspect ports, logs, services, and crons at a glance. Great for prod issues.'
                },
                'Git: Rewriting History Command Card': {
                  imageNumber: '3',
                  name: 'Git: Rewriting History',
                  description: 'Amend, rebase, cherry-pick and reset with confidence. No guesswork.'
                },
                'Git: Workflow Power Moves Command Card': {
                  imageNumber: '4',
                  name: 'Git: Workflow Power Moves',
                  description: 'Advanced Git moves for debugging, diffing, and recovering mistakes.'
                },
                'Algorithms & Time Complexity Reference Card': {
                  imageNumber: '5',
                  name: 'Algorithms & Time Complexity',
                  description: 'Essential algorithms reference including common sorting, searching, and data structure operations with their time and space complexity breakdowns.'
                },
                'AWS CLI: S3 & Secrets Command Card': {
                  imageNumber: '6',
                  name: 'AWS CLI: S3 & Secrets',
                  description: 'S3 sync, signed links, and secrets retrieval without AWS Console bloat.'
                }
              };

              
              const displayInfo = stickerMapping[sticker.name] || {
                imageNumber: (index + 1).toString(),
                name: sticker.name,
                description: sticker.description || 'Command reference sticker'
              };

              return (
                <div key={sticker.id} className="sticker-card">
                  <button onClick={() => setPortalImage(displayInfo.imageNumber)} className="img-button">
                    <img src={`low_res/${displayInfo.imageNumber}.png`} alt={`${displayInfo.imageNumber}-preview`} />
                  </button>
                  <div className="sticker-info">
                    <p className="text-medium">{displayInfo.name}</p>
                    <p>{displayInfo.description}</p>
                    <h4>
                      <span>R$</span>
                      {sticker.prices && sticker.prices.length > 0 
                        ? (sticker.prices[0].unit_amount / 100).toFixed(2)
                        : '4.99'
                      }
                    </h4>
                    <button onClick={() =>
                      handleIncrementProduct(sticker.default_price, 1, sticker)
                    }>
                      Add to cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  )
}