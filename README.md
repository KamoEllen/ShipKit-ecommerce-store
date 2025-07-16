## Architecture Diagram
```mermaid
%%{init: {'theme': 'dark', 'themeVariables': { 'primaryColor': '#1a365d', 'secondaryColor': '#92400e', 'tertiaryColor': '#1e40af'}}}%%
flowchart TD
    subgraph AWS["AWS Amplify (Deployment)"]
        A[Next.js App]
    end

    subgraph Frontend["Frontend (React)"]
        B[Product Display]:::brown
        C[Cart Context]:::brown
        D[Image Portal]:::brown
    end

    subgraph Backend["Backend (Next.js API)"]
        E[/api/products\nStripe Integration/]:::blue
        F[/api/checkout\nPayment Session/]:::blue
    end

    subgraph Stripe["Stripe"]
        G[Products/Prices]
        H[Webhooks]
    end

    A -->|Hosts| Frontend
    Frontend -->|Fetches| E
    E -->|Queries| G
    Frontend -->|Creates| F
    F -->|Redirects to| H
    H -->|Confirms| A

    classDef blue fill:#1e40af,stroke:#fff,color:#fff
    classDef brown fill:#92400e,stroke:#fff,color:#fff
    classDef dark fill:#1a365d,stroke:#fff,color:#fff


# ShipKit Store 

**Dev-first digital tools. Fewer tabs. More flow.**

A Next.js e-commerce store selling developer productivity tools including command reference stickers and hackathon planning templates. Built for developers who ship fast.

![video](https://raw.githubusercontent.com/KamoEllen/ShipKit-ecommerce-store/main/demo-1.gif)

👉 [Watch in higher quality on LinkedIn](https://www.linkedin.com/feed/update/urn:li:activity:7349652086994649088)


##  What We Sell

### Command Card Stickers (6-Pack Collection)
Physical stickers with essential command references to stick near your monitor for instant recall:

- **Remote Ops & File Handling** - SSH, SCP, rsync, tar commands
- **System Debug & Monitoring** - Port inspection, logs, services, cron jobs  
- **Git: Rewriting History** - Rebase, cherry-pick, reset, amend
- **Git: Workflow Power Moves** - Advanced Git for debugging and recovery
- **AWS CLI: S3 & Secrets** - S3 operations, secrets management, presigned URLs
- **Algorithms & Time Complexity** - Big-O reference with common operations

### Notion Template (Notion Template)
A systematic Notion template for 24-48 hour hackathons featuring:
- Team role assignments and responsibilities
- MVP scope prioritization framework
- Hour-by-hour execution timeline
- Tech stack selection guides
- Submission checklist
- Post-hackathon review structure

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Custom CSS
- **Payment**: Stripe (Test Mode)
- **State Management**: React Context API
- **Icons**: Font Awesome
- **Deployment**: Ready for AWS deployment

## Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/KamoEllen/shipkit-store
   cd shipkit-store
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
   STRIPE_SECRET_KEY=sk_test_your_secret_key
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. **Configure Stripe Products**
   - Create products in your Stripe dashboard
   - Ensure you have a product named "Notion Template"
   - Create 6 sticker products with appropriate names and prices

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open [http://localhost:3000](http://localhost:3000)**

## Project Structure

```
shipkit-store/
├── app/
│   ├── api/
│   │   ├── products/route.js     # Stripe products API
│   │   └── checkout/route.js     # Stripe checkout session
│   ├── cart/
│   │   └── page.js               # Shopping cart page
│   ├── success/
│   │   └── page.js               # Payment success page
│   ├── globals.css               # Global styles
│   ├── layout.js                 # Root layout
│   └── page.js                   # Homepage
├── components/
│   ├── Cart.jsx                  # Cart icon with item count
│   ├── EmailInput.jsx            # Newsletter signup
│   ├── ImageBanner.jsx           # Hero banner with CTAs
│   ├── Portal.jsx                # Modal portal for image previews
│   └── Products.jsx              # Product grid and details
├── context/
│   └── ProductContext.jsx        # Cart state management
└── .env.local                    # Environment variables
```

## Key Features

- **Progressive Image Loading**: Low-res placeholder → high-res images
- **Modal Image Previews**: Click any product image for full-size view
- **Shopping Cart**: Add/remove items with quantity management
- **Stripe Integration**: Secure payment processing
- **Responsive Design**: Mobile-first approach
- **Product Context**: Global cart state management

## API Routes

### GET /api/products
Fetches all active products from Stripe with their associated prices.

### POST /api/checkout
Creates a Stripe checkout session for cart items.

**Request Body:**
```json
{
  "lineItems": [
    {
      "price": "price_id",
      "quantity": 1
    }
  ]
}
```

## Command Reference (From Stickers)

### Terminal Commands
```bash
# File Operations
grep -r "pattern" /dir          # Recursive search
chmod 755 file.sh               # Set permissions
scp -r user@host:/path local/   # Secure copy
tar -xzvf file.tar.gz          # Extract archive
rsync -avz source/ dest/        # Fast sync

# System Monitoring
lsof -i :8080                   # Find port process
df -h                           # Disk space
journalctl -xe                  # Debug logs
systemctl restart nginx        # Service control
```

### Git Commands
```bash
# History Management
git rebase -i HEAD~3            # Interactive rebase
git cherry-pick <commit>        # Grab one commit
git reset --hard HEAD~1         # Undo last commit
git reflog                      # Recover lost commits

# Workflow
git stash --include-untracked   # Stash everything
git diff --cached               # Staged changes
git commit --amend              # Fix last commit
git push --force-with-lease     # Safer force push
```

### AWS CLI Commands
```bash
# S3 Operations
aws s3 cp --recursive s3://bucket ./
aws s3 presign s3://bucket/file.txt --expires-in 3600

# Infrastructure
aws cloudformation deploy --template-file stack.yml
aws logs tail /group --follow
aws secretsmanager get-secret-value --secret-id db_pass
```

##  Big-O Complexity Reference

| Operation | Array | Hash Table | Linked List |
|-----------|-------|------------|-------------|
| Search    | O(n)  | O(1)       | O(n)        |
| Insert    | O(n)  | O(1)       | O(1)        |
| Delete    | O(n)  | O(1)       | O(1)        |

## Deployment

Ready for deployment on:
- **Vercel** (Recommended for Next.js)
- **AWS** (Amplify)
- **Netlify**

Make sure to:
1. Set environment variables in your deployment platform
2. Configure Stripe webhooks for production
3. Update `NEXT_PUBLIC_BASE_URL` to your production domain

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Acknowledgments

- Built for developers who value speed and efficiency
- Inspired by the need for quick command reference
- Designed to minimize context switching during development

---

**ShipKit** - Tools for Devs Who Ship Fast 
