// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip?: number;
}

// SEO metadata interface
export interface SEOMetadata {
  title?: string;
  description?: string;
  og_title?: string;
  og_description?: string;
  og_image?: {
    url: string;
    imgix_url: string;
  };
}

// Home page interface
export interface HomePage extends CosmicObject {
  type: 'home';
  metadata: {
    seo?: SEOMetadata;
    gallery?: Array<{
      url: string;
      imgix_url: string;
    }>;
    gallery_mobile?: Array<{
      url: string;
      imgix_url: string;
    }>;
    products_carousel?: ProductCategory[];
    about_emg_title?: string;
    about_emg_image?: {
      url: string;
      imgix_url: string;
    };
    about_emg_content?: string;
    farmers_markets?: FarmersMarket[];
    what_we_are_all_about?: Array<{
      title?: string;
      icon?: {
        url: string;
        imgix_url: string;
      };
      description?: string;
    }>;
    about_jason?: AboutJason;
    latest_posts?: BlogPost[];
  };
}

// About page interface
export interface AboutPage extends CosmicObject {
  type: 'about';
  metadata: {
    seo?: SEOMetadata;
    image_1?: {
      url: string;
      imgix_url: string;
    };
    image_2?: {
      url: string;
      imgix_url: string;
    };
    intro?: string;
    facilities_image_1?: {
      url: string;
      imgix_url: string;
    };
    facilities_image_2?: {
      url: string;
      imgix_url: string;
    };
    facilities_text?: string;
    our_products?: ProductCategory[];
    support_for_growers_text?: string;
    support_message_1?: Array<{
      icon?: {
        url: string;
        imgix_url: string;
      };
      title?: string;
      description?: string;
    }>;
    outro?: string;
    quote?: string;
  };
}

// About Jason interface
export interface AboutJason extends CosmicObject {
  type: 'about-jason';
  metadata: {
    image?: {
      url: string;
      imgix_url: string;
    };
    section?: string;
    quote?: string;
    metric?: string;
    metric_type?: string;
  };
}

// Footer interface
export interface Footer extends CosmicObject {
  type: 'footer';
  metadata: {
    description?: string;
    social_links?: Array<{
      social_link?: string;
    }>;
    page_links?: NavigationMenu;
    opening_times?: string;
    our_address?: string;
  };
}

// Navigation menu interface
export interface NavigationMenu extends CosmicObject {
  type: 'navigation-menus';
  metadata: {
    items?: Array<{
      title?: string;
      link?: string;
      open_in_new_tab?: boolean;
    }>;
    extras?: any[];
  };
}

// Blog interfaces
export interface BlogPage extends CosmicObject {
  type: 'blog';
  metadata: {
    seo?: SEOMetadata;
  };
}

export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    seo_details?: {
      meta_title?: string;
      meta_description?: string;
    };
  };
}

export interface Author extends CosmicObject {
  type: 'authors';
  metadata: {
    image?: {
      url: string;
      imgix_url: string;
    };
  };
}

export interface BlogPost extends CosmicObject {
  type: 'blog-posts';
  metadata: {
    seo?: SEOMetadata;
    excerpt?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    category?: Category;
    tags?: Tag[];
    published_at?: string;
    body?: string;
    author?: Author;
  };
}

export interface Tag extends CosmicObject {
  type: 'tags';
  metadata: null | Record<string, any>;
}

// Product categories interface
export interface ProductCategory extends CosmicObject {
  type: 'product-categories';
  metadata: {
    seo?: SEOMetadata;
    image?: {
      url: string;
      imgix_url: string;
    };
    subcategories?: string[] | null;
    produce_type?: string;
    description?: string;
  };
}

// Farmers market interface
export interface FarmersMarket extends CosmicObject {
  type: 'markets';
  metadata: {
    background_image?: {
      url: string;
      imgix_url: string;
    };
    location?: string;
    address?: string;
  };
}

// Form submission interface
export interface FormSubmission extends CosmicObject {
  type: 'form-submissions';
  metadata: {
    email?: string;
    company?: string | null;
    message?: string;
  };
}

// Box items interface
export interface BoxItem extends CosmicObject {
  type: 'box-items';
  metadata: {
    image?: {
      url: string;
      imgix_url: string;
    };
    produce_type?: {
      id: string;
      slug: string;
      title: string;
      type: 'produces';
      metadata: {
        image?: {
          url: string;
          imgix_url: string;
        };
        description?: string | null;
      };
    };
  };
}

// Contact form data interface
export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  message: string;
}