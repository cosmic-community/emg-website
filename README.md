# Emory Market Gardens Website

![Emory Market Gardens Website](https://imgix.cosmicjs.com/e5775ff0-a2b9-11ef-8deb-db65bd2584e1-Image-2.png?w=1200&h=300&fit=crop&auto=format,compress)

A comprehensive Next.js website for Emory Market Gardens, featuring a dynamic blog system, homepage showcase, detailed about pages, and contact functionality. Built with TypeScript, Tailwind CSS, and integrated with Cosmic for content management.

## ✨ Features

- **Dynamic Blog System** - Full-featured blog with categories, tags, author profiles, and rich content
- **Homepage Showcase** - Product carousels, farmers markets, farm values, and Jason's story
- **About Pages** - Comprehensive farm story, facilities, and founder background
- **Contact Form** - Integrated contact form with Cosmic storage
- **SEO Optimized** - Complete meta tags, Open Graph, and structured data
- **Responsive Design** - Mobile-first design optimized for all devices
- **Type-Safe** - Full TypeScript implementation with strict typing

## <!-- CLONE_PROJECT_BUTTON -->

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> No content model prompt provided - app built from existing content structure

### Code Generation Prompt

> Build a Next.js website that uses my existing objects in this bucket

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠 Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Cosmic** - Headless CMS integration
- **Bun** - Fast package manager and runtime

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account and bucket

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your Cosmic credentials:
   ```
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

4. Run the development server:
   ```bash
   bun dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📚 Cosmic SDK Examples

### Fetching Blog Posts
```typescript
import { cosmic } from '@/lib/cosmic'

// Get all blog posts with categories and authors
const posts = await cosmic.objects
  .find({ type: 'blog-posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
  .then(res => res.objects)

// Get posts by category
const categoryPosts = await cosmic.objects
  .find({ 
    type: 'blog-posts',
    'metadata.category': categoryId 
  })
  .depth(1)
```

### Contact Form Submission
```typescript
// Submit contact form
await cosmic.objects.insertOne({
  type: 'form-submissions',
  title: formData.name,
  metadata: {
    email: formData.email,
    company: formData.company,
    message: formData.message
  }
})
```

## 🌐 Cosmic CMS Integration

This website integrates with your existing Cosmic bucket structure:

- **Blog Posts** (`blog-posts`) - Dynamic blog with categories, tags, and authors
- **Categories** (`categories`) - Blog post categorization
- **Authors** (`authors`) - Author profiles and information
- **Home Page** (`home`) - Homepage content blocks and featured content
- **About** (`about`) - Farm story and detailed information
- **About Jason** (`about-jason`) - Founder background and metrics
- **Footer** (`footer`) - Site footer content and navigation
- **Form Submissions** (`form-submissions`) - Contact form data storage

## 🚀 Deployment Options

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on every push

### Netlify
1. Connect your repository to Netlify
2. Set build command: `bun run build`
3. Set output directory: `.next`
4. Add environment variables

### Other Platforms
This Next.js application can be deployed on any platform that supports Node.js applications.

Remember to set your environment variables in your hosting platform's dashboard for production deployment.