This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Cloudflare Pages

This app is configured for deployment on Cloudflare Pages with API routes support via Cloudflare Pages Functions.

### Deployment Steps:

1. **Go to Cloudflare Dashboard:**
   - Navigate to [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create application** → **Pages** tab

2. **Connect GitHub Repository:**
   - Click **Connect to Git**
   - Authorize Cloudflare to access your GitHub account
   - Select your `quoteGenerator` repository
   - Click **Begin setup**

3. **Configure Build Settings:**
   - **Framework preset:** `Next.js (Static HTML Export)` or `None`
   - **Build command:** `npm run cf:pages:build`
   - **Build output directory:** `.vercel/output/static`
   - **Node.js version:** `20` (or latest available)
   - **Root directory:** `/` (leave as default)

4. **Environment Variables (Optional):**
   - If you have an Unsplash API key, add it as an environment variable:
     - Name: `UNSPLASH_ACCESS_KEY`
     - Value: Your Unsplash API key

5. **Deploy:**
   - Click **Save and Deploy**
   - Cloudflare will build and deploy your app
   - You'll get a `*.pages.dev` URL for your app

### Note:
- The build process uses `@cloudflare/next-on-pages` to convert Next.js API routes to Cloudflare Pages Functions
- Local Windows builds may have issues with `next-on-pages` CLI - this is fine, Cloudflare will build on their servers
- Future commits to your main branch will automatically trigger new deployments

## Deploy on Vercel

You can also deploy on [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
