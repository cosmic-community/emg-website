import { createBucketClient } from '@cosmicjs/sdk'
import type { BlogPost, CosmicObject } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Helper function for error handling
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Data fetching functions
export async function getHomePage() {
  try {
    const response = await cosmic.objects.findOne({
      type: 'home',
    }).props(['id', 'title', 'slug', 'metadata']).depth(2);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw error;
  }
}

export async function getAboutPage() {
  try {
    const response = await cosmic.objects.findOne({
      type: 'about',
    }).props(['id', 'title', 'slug', 'metadata']).depth(2);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw error;
  }
}

export async function getAboutJason() {
  try {
    const response = await cosmic.objects.findOne({
      type: 'about-jason',
    }).props(['id', 'title', 'slug', 'metadata']).depth(1);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw error;
  }
}

export async function getBlogPage() {
  try {
    const response = await cosmic.objects.findOne({
      type: 'blog',
    }).props(['id', 'title', 'slug', 'metadata']).depth(1);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw error;
  }
}

export async function getFooter() {
  try {
    const response = await cosmic.objects.findOne({
      type: 'footer',
    }).props(['id', 'title', 'slug', 'metadata']).depth(1);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw error;
  }
}

export async function getBlogPosts(limit: number = 10, skip: number = 0) {
  try {
    const response = await cosmic.objects
      .find({ type: 'blog-posts' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(2)
      .limit(limit)
      .skip(skip);
    
    // Sort manually by date with proper typing
    const sortedPosts = response.objects.sort((a: CosmicObject, b: CosmicObject) => {
      const dateA = new Date(a.metadata?.published_at || a.created_at || '').getTime();
      const dateB = new Date(b.metadata?.published_at || b.created_at || '').getTime();
      return dateB - dateA;
    });
    
    return {
      objects: sortedPosts,
      total: response.total,
    };
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return { objects: [], total: 0 };
    }
    throw error;
  }
}

export async function getBlogPost(slug: string) {
  try {
    const response = await cosmic.objects.findOne({
      type: 'blog-posts',
      slug,
    }).props(['id', 'title', 'slug', 'metadata', 'created_at']).depth(2);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw error;
  }
}

export async function getCategories() {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw error;
  }
}

export async function getAuthors() {
  try {
    const response = await cosmic.objects
      .find({ type: 'authors' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw error;
  }
}

export async function getBlogPostsByCategory(categoryId: string, limit: number = 10) {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'blog-posts',
        'metadata.category': categoryId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(2)
      .limit(limit);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw error;
  }
}

export async function submitContactForm(formData: {
  name: string;
  email: string;
  company: string;
  message: string;
}) {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'form-submissions',
      title: formData.name,
      metadata: {
        email: formData.email,
        company: formData.company || '',
        message: formData.message
      }
    });
    
    return response.object;
  } catch (error) {
    console.error('Error submitting form:', error);
    throw new Error('Failed to submit form');
  }
}