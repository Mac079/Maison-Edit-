/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Article, Category } from '../data/articles';
import { EditItem } from '../data/theEdit';

export const SITE_ORIGIN = 'https://maison-edit-opal.vercel.app';

export interface SchemaGraphResult {
  '@context': string;
  '@graph': object[];
}

/**
 * Common publisher schema shared across all pages
 */
export const getPublisherOrganizationSchema = () => ({
  '@type': 'NewsMediaOrganization',
  '@id': `${SITE_ORIGIN}/#organization`,
  'name': 'Maison Edit Publishing Group',
  'url': `${SITE_ORIGIN}/`,
  'logo': {
    '@type': 'ImageObject',
    'url': `${SITE_ORIGIN}/images/paris-atelier-couture-gown-cover.webp`,
    'caption': 'Maison Edit Masthead',
    'width': 1200,
    'height': 630,
  },
  'publishingPrinciples': `${SITE_ORIGIN}/editorial-standards/`,
  'ethicsPolicy': `${SITE_ORIGIN}/editorial-standards/`,
  'correctionsPolicy': `${SITE_ORIGIN}/editorial-standards/`,
  'foundingDate': '2020-04-18',
  'founders': [
    {
      '@type': 'Person',
      'name': 'Hélène de Montmirail',
    },
  ],
  'sameAs': [
    'https://x.com/maisonedit',
    'https://www.tiktok.com/@maisonedit',
    'https://www.youtube.com/@maisonedit',
    'https://www.facebook.com/maisonedit',
    'https://www.instagram.com/maisonedit',
    'https://www.pinterest.com/maisonedit',
  ],
  'contactPoint': {
    '@type': 'ContactPoint',
    'contactType': 'Editorial Inquiries',
    'email': 'atelier@maisonedit.com',
    'availableLanguage': ['English', 'French', 'Italian'],
  },
});

/**
 * Common WebSite schema with potentialAction SearchAction
 */
export const getWebSiteSchema = () => ({
  '@type': 'WebSite',
  '@id': `${SITE_ORIGIN}/#website`,
  'url': `${SITE_ORIGIN}/`,
  'name': 'Maison Edit',
  'description': 'Luxury fashion journalism and archival haute couture narratives.',
  'inLanguage': 'en-US',
  'publisher': {
    '@id': `${SITE_ORIGIN}/#organization`,
  },
  'potentialAction': {
    '@type': 'SearchAction',
    'target': {
      '@type': 'EntryPoint',
      'urlTemplate': `${SITE_ORIGIN}/archive/?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
});

/**
 * Common Periodical schema
 */
export const getPeriodicalSchema = () => ({
  '@type': 'Periodical',
  '@id': `${SITE_ORIGIN}/#periodical`,
  'name': 'Maison Edit',
  'url': `${SITE_ORIGIN}/`,
  'description': 'An independent luxury fashion journal covering heritage houses, craftsmanship, runway culture, and enduring style stories.',
  'genre': 'Luxury Fashion & Haute Couture',
  'issn': '2940-1428',
  'inLanguage': 'en-US',
  'publisher': {
    '@id': `${SITE_ORIGIN}/#organization`,
  },
  'knowsAbout': [
    'Haute Couture',
    'Luxury Fashion Houses',
    'Italian Tailoring',
    'Artisan Craftsmanship',
    'Runway Trend Analysis',
    'Horology and High Jewelry',
    'Editorial Fashion Storytelling',
    'Quiet Luxury',
    'Spalla Camicia Shoulder',
    'Saddle Stitch Leathercraft',
    'Vintage Couture Authentication',
    'Textile Conservation',
    'Sustainable Biomaterials and Mycelium',
    'Paris Fashion Week',
    'Red Carpet Couture Dressing',
  ],
});

/**
 * Site Navigation Element schema
 */
export const getNavigationSchema = () => ({
  '@type': 'SiteNavigationElement',
  '@id': `${SITE_ORIGIN}/#site-navigation`,
  'name': 'Maison Edit Main Menu',
  'hasPart': [
    {
      '@type': 'WebPage',
      'name': 'Luxury Houses',
      'url': `${SITE_ORIGIN}/category/luxury-fashion-houses/`,
    },
    {
      '@type': 'WebPage',
      'name': 'Runway',
      'url': `${SITE_ORIGIN}/category/fashion-runway/`,
    },
    {
      '@type': 'WebPage',
      'name': 'Craftsmanship',
      'url': `${SITE_ORIGIN}/category/luxury-craftsmanship/`,
    },
    {
      '@type': 'WebPage',
      'name': 'Objects',
      'url': `${SITE_ORIGIN}/category/luxury-objects/`,
    },
    {
      '@type': 'WebPage',
      'name': 'Culture',
      'url': `${SITE_ORIGIN}/category/fashion-culture/`,
    },
    {
      '@type': 'WebPage',
      'name': 'Archive Index',
      'url': `${SITE_ORIGIN}/archive/`,
    },
  ],
});

/**
 * Generate Product schema for The Edit items
 */
export const getProductSchema = (item: EditItem) => {
  const numericPrice = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 2500;
  const imageAbsolute = item.image.startsWith('http') ? item.image : `${SITE_ORIGIN}${item.image}`;

  return {
    '@type': 'Product',
    '@id': `${SITE_ORIGIN}/#product-${item.id}`,
    'name': item.name,
    'image': [imageAbsolute],
    'description': item.editorNote,
    'brand': {
      '@type': 'Brand',
      'name': item.brand,
    },
    'category': item.category,
    'material': item.materials,
    'offers': {
      '@type': 'Offer',
      'price': numericPrice,
      'priceCurrency': 'USD',
      'priceValidUntil': '2027-12-31',
      'availability': 'https://schema.org/InStock',
      'itemCondition': 'https://schema.org/NewCondition',
      'url': `${SITE_ORIGIN}/#edit`,
      'seller': {
        '@id': `${SITE_ORIGIN}/#organization`,
      },
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'reviewCount': '24',
      'bestRating': '5',
      'worstRating': '1',
    },
  };
};

/**
 * Generate comprehensive Homepage Schema.org graph
 */
export const generateHomePageSchema = (
  articles: Article[],
  editItems: EditItem[]
): SchemaGraphResult => {
  const featuredArticlesList = {
    '@type': 'ItemList',
    '@id': `${SITE_ORIGIN}/#featured-stories`,
    'name': 'Featured Editorial Stories and Essays',
    'description': 'Current issue lead essays covering haute couture ateliers, Italian tailoring, craftsmanship, and fashion history.',
    'numberOfItems': articles.length,
    'itemListElement': articles.map((art, index) => {
      const artImage = art.image.startsWith('http') ? art.image : `${SITE_ORIGIN}${art.image}`;
      return {
        '@type': 'ListItem',
        'position': index + 1,
        'url': `${SITE_ORIGIN}/journal/${art.slug}/`,
        'name': art.title,
        'description': art.subtitle,
        'image': artImage,
      };
    }),
  };

  const curatedInvestmentList = {
    '@type': 'ItemList',
    '@id': `${SITE_ORIGIN}/#the-edit-curated-investments`,
    'name': 'The Edit: Exceptional Wardrobe and Horology Investments',
    'description': 'Curated heirloom acquisitions selected by Maison Edit editors for longevity and craftsmanship.',
    'numberOfItems': editItems.length,
    'itemListElement': editItems.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'item': getProductSchema(item),
    })),
  };

  const homeCollectionPage = {
    '@type': 'CollectionPage',
    '@id': `${SITE_ORIGIN}/#webpage`,
    'url': `${SITE_ORIGIN}/`,
    'name': 'Maison Edit | Luxury Fashion Journal & Haute Couture Archive',
    'description': 'An independent luxury fashion journal covering heritage houses, Italian tailoring, runway culture, craftsmanship, and enduring style stories.',
    'inLanguage': 'en-US',
    'isPartOf': {
      '@id': `${SITE_ORIGIN}/#website`,
    },
    'about': {
      '@id': `${SITE_ORIGIN}/#periodical`,
    },
    'mainEntity': {
      '@id': `${SITE_ORIGIN}/#featured-stories`,
    },
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      getPublisherOrganizationSchema(),
      getWebSiteSchema(),
      getPeriodicalSchema(),
      getNavigationSchema(),
      homeCollectionPage,
      featuredArticlesList,
      curatedInvestmentList,
    ],
  };
};

/**
 * Generate rich NewsArticle and BreadcrumbList schema for an Article page
 */
export const generateArticleSchema = (article: Article): SchemaGraphResult => {
  const canonicalUrl = `${SITE_ORIGIN}/journal/${article.slug}/`;
  const articleImage = article.image.startsWith('http') ? article.image : `${SITE_ORIGIN}${article.image}`;
  const keywordsStr = (article.seoKeywords || article.tags).join(', ');

  // Extract lead paragraphs for articleBody preview
  const bodySnippet = article.sections
    .flatMap((s) => s.body)
    .slice(0, 3)
    .join(' ');

  const newsArticleSchema = {
    '@type': 'NewsArticle',
    '@id': `${canonicalUrl}#article`,
    'isPartOf': {
      '@id': `${SITE_ORIGIN}/#website`,
    },
    'headline': article.title,
    'alternativeHeadline': article.subtitle,
    'description': article.seoDescription || article.subtitle,
    'inLanguage': 'en-US',
    'mainEntityOfPage': canonicalUrl,
    'image': [
      articleImage,
      `${SITE_ORIGIN}/images/paris-atelier-couture-gown-cover.webp`,
    ],
    'datePublished': article.datePublished || '2026-10-12T08:00:00Z',
    'dateModified': article.dateModified || '2026-10-14T19:45:00Z',
    'author': {
      '@type': 'Person',
      'name': article.author,
      'jobTitle': article.authorRole,
      'worksFor': {
        '@id': `${SITE_ORIGIN}/#organization`,
      },
    },
    'publisher': {
      '@id': `${SITE_ORIGIN}/#organization`,
    },
    'articleSection': article.categoryName,
    'keywords': keywordsStr,
    'wordCount': article.wordCount || 1200,
    'articleBody': bodySnippet,
    'isAccessibleForFree': 'True',
    'speakable': {
      '@type': 'SpeakableSpecification',
      'cssSelector': ['h1', 'article p:first-of-type'],
    },
    'about': article.tags.map((tag) => ({
      '@type': 'Thing',
      'name': tag,
    })),
  };

  const breadcrumbSchema = {
    '@type': 'BreadcrumbList',
    '@id': `${canonicalUrl}#breadcrumb`,
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': `${SITE_ORIGIN}/`,
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': article.categoryName,
        'item': `${SITE_ORIGIN}/category/${article.categorySlug}/`,
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': article.title,
        'item': canonicalUrl,
      },
    ],
  };

  const webpageSchema = {
    '@type': 'ItemPage',
    '@id': `${canonicalUrl}#webpage`,
    'url': canonicalUrl,
    'name': article.seoTitle || `${article.title} | Maison Edit`,
    'description': article.seoDescription || article.subtitle,
    'inLanguage': 'en-US',
    'isPartOf': {
      '@id': `${SITE_ORIGIN}/#website`,
    },
    'mainEntity': {
      '@id': `${canonicalUrl}#article`,
    },
    'breadcrumb': {
      '@id': `${canonicalUrl}#breadcrumb`,
    },
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      getPublisherOrganizationSchema(),
      getWebSiteSchema(),
      webpageSchema,
      newsArticleSchema,
      breadcrumbSchema,
    ],
  };
};

/**
 * Generate CollectionPage and ItemList schema for a Category page
 */
export const generateCategorySchema = (
  category: Category,
  categoryArticles: Article[]
): SchemaGraphResult => {
  const canonicalUrl = `${SITE_ORIGIN}/category/${category.slug}/`;

  const breadcrumbSchema = {
    '@type': 'BreadcrumbList',
    '@id': `${canonicalUrl}#breadcrumb`,
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': `${SITE_ORIGIN}/`,
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': category.name,
        'item': canonicalUrl,
      },
    ],
  };

  const categoryItemList = {
    '@type': 'ItemList',
    '@id': `${canonicalUrl}#itemlist`,
    'name': `${category.name} Stories & Essays`,
    'description': category.description,
    'numberOfItems': categoryArticles.length,
    'itemListElement': categoryArticles.map((art, index) => {
      const artImage = art.image.startsWith('http') ? art.image : `${SITE_ORIGIN}${art.image}`;
      return {
        '@type': 'ListItem',
        'position': index + 1,
        'url': `${SITE_ORIGIN}/journal/${art.slug}/`,
        'name': art.title,
        'description': art.subtitle,
        'image': artImage,
      };
    }),
  };

  const collectionPageSchema = {
    '@type': 'CollectionPage',
    '@id': `${canonicalUrl}#webpage`,
    'url': canonicalUrl,
    'name': category.seoTitle || `${category.name} | Maison Edit`,
    'description': category.seoDescription || category.description,
    'inLanguage': 'en-US',
    'isPartOf': {
      '@id': `${SITE_ORIGIN}/#website`,
    },
    'breadcrumb': {
      '@id': `${canonicalUrl}#breadcrumb`,
    },
    'mainEntity': {
      '@id': `${canonicalUrl}#itemlist`,
    },
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      getPublisherOrganizationSchema(),
      getWebSiteSchema(),
      collectionPageSchema,
      categoryItemList,
      breadcrumbSchema,
    ],
  };
};

/**
 * Generate CollectionPage and SearchResults schema for Archive page
 */
export const generateArchiveSchema = (allArticles: Article[]): SchemaGraphResult => {
  const canonicalUrl = `${SITE_ORIGIN}/archive/`;

  const breadcrumbSchema = {
    '@type': 'BreadcrumbList',
    '@id': `${canonicalUrl}#breadcrumb`,
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': `${SITE_ORIGIN}/`,
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Archive Index',
        'item': canonicalUrl,
      },
    ],
  };

  const archiveItemList = {
    '@type': 'ItemList',
    '@id': `${canonicalUrl}#itemlist`,
    'name': 'Maison Edit Complete Historical Archive',
    'description': 'Full chronological catalogue of all published luxury fashion essays, investigations, and artisan profiles.',
    'numberOfItems': allArticles.length,
    'itemListElement': allArticles.map((art, index) => {
      const artImage = art.image.startsWith('http') ? art.image : `${SITE_ORIGIN}${art.image}`;
      return {
        '@type': 'ListItem',
        'position': index + 1,
        'url': `${SITE_ORIGIN}/journal/${art.slug}/`,
        'name': art.title,
        'description': art.subtitle,
        'image': artImage,
      };
    }),
  };

  const archivePageSchema = {
    '@type': 'CollectionPage',
    '@id': `${canonicalUrl}#webpage`,
    'url': canonicalUrl,
    'name': 'The Article Archive | Maison Edit Luxury Fashion Index',
    'description': 'Search and explore the complete Maison Edit archive of luxury fashion essays, Italian tailoring analyses, and haute couture investigations.',
    'inLanguage': 'en-US',
    'isPartOf': {
      '@id': `${SITE_ORIGIN}/#website`,
    },
    'breadcrumb': {
      '@id': `${canonicalUrl}#breadcrumb`,
    },
    'mainEntity': {
      '@id': `${canonicalUrl}#itemlist`,
    },
    'potentialAction': {
      '@type': 'SearchAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': `${SITE_ORIGIN}/archive/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      getPublisherOrganizationSchema(),
      getWebSiteSchema(),
      archivePageSchema,
      archiveItemList,
      breadcrumbSchema,
    ],
  };
};

/**
 * Generate ErrorPage schema for 404 or unrecognized routes
 */
export const generateNotFoundSchema = (path: string): SchemaGraphResult => {
  const canonicalUrl = `${SITE_ORIGIN}${path.startsWith('/') ? path : `/${path}`}`;

  const breadcrumbSchema = {
    '@type': 'BreadcrumbList',
    '@id': `${canonicalUrl}#breadcrumb`,
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': `${SITE_ORIGIN}/`,
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Page Not Found',
        'item': canonicalUrl,
      },
    ],
  };

  const notFoundPageSchema = {
    '@type': 'WebPage',
    '@id': `${canonicalUrl}#webpage`,
    'url': canonicalUrl,
    'name': 'Page Not Found | Maison Edit',
    'description': 'The requested story or page could not be located in this edition of Maison Edit.',
    'inLanguage': 'en-US',
    'isPartOf': {
      '@id': `${SITE_ORIGIN}/#website`,
    },
    'breadcrumb': {
      '@id': `${canonicalUrl}#breadcrumb`,
    },
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      getPublisherOrganizationSchema(),
      getWebSiteSchema(),
      notFoundPageSchema,
      breadcrumbSchema,
    ],
  };
};

/**
 * Master dispatcher: returns the exact Schema.org graph object for any given pathname
 */
export const getSchemaForRoute = (
  pathname: string,
  allArticles: Article[],
  allCategories: Category[],
  editItems: EditItem[]
): { schema: SchemaGraphResult; pageType: string; entityCount: number } => {
  const cleanPath = pathname.replace(/\/+$/, '') || '/';

  if (cleanPath === '' || cleanPath === '/') {
    const schema = generateHomePageSchema(allArticles, editItems);
    return {
      schema,
      pageType: 'Homepage (Journal Cover)',
      entityCount: schema['@graph'].length,
    };
  }

  if (cleanPath.startsWith('/journal/')) {
    const slug = cleanPath.replace('/journal/', '');
    const article = allArticles.find((a) => a.slug === slug);
    if (article) {
      const schema = generateArticleSchema(article);
      return {
        schema,
        pageType: `Article: "${article.title}"`,
        entityCount: schema['@graph'].length,
      };
    }
  }

  if (cleanPath.startsWith('/category/')) {
    const slug = cleanPath.replace('/category/', '');
    const category = allCategories.find((c) => c.slug === slug);
    if (category) {
      const categoryArticles = allArticles.filter((a) => a.categorySlug === slug);
      const schema = generateCategorySchema(category, categoryArticles);
      return {
        schema,
        pageType: `Category: "${category.name}"`,
        entityCount: schema['@graph'].length,
      };
    }
  }

  if (cleanPath === '/archive') {
    const schema = generateArchiveSchema(allArticles);
    return {
      schema,
      pageType: 'Archive & Search Index',
      entityCount: schema['@graph'].length,
    };
  }

  const schema = generateNotFoundSchema(cleanPath);
  return {
    schema,
    pageType: '404 Not Found Page',
    entityCount: schema['@graph'].length,
  };
};
