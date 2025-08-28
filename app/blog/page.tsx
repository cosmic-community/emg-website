import { getBlogPage, getBlogPosts, getCategories } from '@/lib/cosmic'
import type { BlogPage, BlogPost, Category } from '@/types'
import { Metadata } from 'next'
import BlogPostCard from '@/components/BlogPostCard'
import CategoryFilter from '@/components/CategoryFilter'

export async function generateMetadata(): Promise<Metadata> {
  const blogPage = await getBlogPage() as BlogPage | null

  if (!blogPage?.metadata?.seo) {
    return {
      title: 'Blog | Emory Market Gardens',
      description: 'Explore our blog for mushroom growing tips, recipes, educational content, and farm updates from Emory Market Gardens.',
    }
  }

  const seo = blogPage.metadata.seo

  return {
    title: seo.title || 'Blog | Emory Market Gardens',
    description: seo.description || 'Explore our blog for mushroom growing tips, recipes, educational content, and farm updates from Emory Market Gardens.',
    openGraph: {
      title: seo.og_title || seo.title || 'Blog | Emory Market Gardens',
      description: seo.og_description || seo.description || 'Explore our blog for mushroom growing tips, recipes, educational content, and farm updates from Emory Market Gardens.',
      images: seo.og_image ? [
        {
          url: `${seo.og_image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`,
          width: 1200,
          height: 630,
          alt: seo.og_title || seo.title || 'Blog | Emory Market Gardens',
        }
      ] : [],
    },
  }
}

export default async function BlogPageComponent() {
  const blogPage = await getBlogPage() as BlogPage | null
  const { objects: posts } = await getBlogPosts(12)
  const categories = await getCategories() as Category[]

  return (
    <div className="section-padding">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            {blogPage?.title || 'Our Blog'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover mushroom growing tips, delicious recipes, educational content, and updates from our East Texas farm.
          </p>
        </div>

        {/* Category Filter */}
        {categories && categories.length > 0 && (
          <CategoryFilter categories={categories} />
        )}

        {/* Blog Posts Grid */}
        {posts && posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: BlogPost) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">No blog posts found</h2>
            <p className="text-gray-500">Check back soon for new content!</p>
          </div>
        )}
      </div>
    </div>
  )
}