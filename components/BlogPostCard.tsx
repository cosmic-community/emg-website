import { BlogPost } from '@/types'
import Link from 'next/link'

interface BlogPostCardProps {
  post: BlogPost
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  const publishedDate = post.metadata?.published_at || post.created_at
  const formattedDate = new Date(publishedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
      <Link href={`/blog/${post.slug}`}>
        {/* Featured Image */}
        {post.metadata?.featured_image && (
          <div className="aspect-ratio-16-9 overflow-hidden">
            <img 
              src={`${post.metadata.featured_image.imgix_url}?w=600&h=338&fit=crop&auto=format,compress`}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        
        <div className="p-6">
          {/* Category */}
          {post.metadata?.category && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary text-primary mb-3">
              {post.metadata.category.title}
            </span>
          )}
          
          {/* Title */}
          <h2 className="text-xl font-semibold text-primary mb-3 group-hover:text-primary-dark transition-colors line-clamp-2">
            {post.title}
          </h2>
          
          {/* Excerpt */}
          {post.metadata?.excerpt && (
            <p className="text-gray-600 mb-4 line-clamp-3">
              {post.metadata.excerpt}
            </p>
          )}
          
          {/* Meta */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <time dateTime={publishedDate}>
              {formattedDate}
            </time>
            
            {post.metadata?.author && (
              <div className="flex items-center gap-2">
                {post.metadata.author.metadata?.image && (
                  <img 
                    src={`${post.metadata.author.metadata.image.imgix_url}?w=24&h=24&fit=crop&auto=format,compress`}
                    alt={post.metadata.author.title}
                    width={24}
                    height={24}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                )}
                <span>{post.metadata.author.title}</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </article>
  )
}