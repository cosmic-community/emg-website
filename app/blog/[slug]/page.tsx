// app/blog/[slug]/page.tsx
import { getBlogPost } from '@/lib/cosmic'
import { BlogPost } from '@/types'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug) as BlogPost | null

  if (!post) {
    return {
      title: 'Post Not Found | Emory Market Gardens',
      description: 'The requested blog post could not be found.',
    }
  }

  const seo = post.metadata?.seo

  return {
    title: seo?.title || `${post.title} | Emory Market Gardens Blog`,
    description: seo?.description || post.metadata?.excerpt || post.title,
    openGraph: {
      title: seo?.og_title || seo?.title || post.title,
      description: seo?.og_description || seo?.description || post.metadata?.excerpt || post.title,
      images: seo?.og_image || post.metadata?.featured_image ? [
        {
          url: `${(seo?.og_image || post.metadata?.featured_image)?.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ] : [],
      type: 'article',
      publishedTime: post.metadata?.published_at || post.created_at,
    },
    twitter: {
      card: 'summary_large_image',
      title: seo?.og_title || seo?.title || post.title,
      description: seo?.og_description || seo?.description || post.metadata?.excerpt || post.title,
      images: seo?.og_image || post.metadata?.featured_image ? 
        [`${(seo?.og_image || post.metadata?.featured_image)?.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`] : [],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getBlogPost(slug) as BlogPost | null

  if (!post) {
    notFound()
  }

  const publishedDate = post.metadata?.published_at || post.created_at
  const formattedDate = new Date(publishedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <article className="section-padding">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-12 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
              {post.title}
            </h1>
            
            {post.metadata?.excerpt && (
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                {post.metadata.excerpt}
              </p>
            )}

            <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-500 mb-8">
              <time dateTime={publishedDate}>
                {formattedDate}
              </time>
              
              {post.metadata?.author && (
                <>
                  <span>•</span>
                  <div className="flex items-center gap-2">
                    {post.metadata.author.metadata?.image && (
                      <img 
                        src={`${post.metadata.author.metadata.image.imgix_url}?w=32&h=32&fit=crop&auto=format,compress`}
                        alt={post.metadata.author.title}
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    )}
                    <span>By {post.metadata.author.title}</span>
                  </div>
                </>
              )}
              
              {post.metadata?.category && (
                <>
                  <span>•</span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary text-primary">
                    {post.metadata.category.title}
                  </span>
                </>
              )}
            </div>
          </header>

          {/* Featured Image */}
          {post.metadata?.featured_image && (
            <div className="aspect-ratio-16-9 rounded-lg overflow-hidden mb-12">
              <img 
                src={`${post.metadata.featured_image.imgix_url}?w=1200&h=675&fit=crop&auto=format,compress`}
                alt={post.title}
                width={1200}
                height={675}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content */}
          {post.metadata?.body && (
            <div className="prose-custom max-w-none mb-12">
              <div dangerouslySetInnerHTML={{ __html: post.metadata.body }} />
            </div>
          )}

          {/* Tags */}
          {post.metadata?.tags && post.metadata.tags.length > 0 && (
            <div className="border-t pt-8">
              <h3 className="text-lg font-semibold text-primary mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.metadata.tags.map((tag) => (
                  <span 
                    key={tag.id}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                  >
                    {tag.title}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}