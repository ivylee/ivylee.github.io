import type {
    Blog,
    BlogPosting,
    BreadcrumbList,
    CollectionPage,
    Graph,
    ListItem,
    Person,
    ProfilePage,
    SoftwareApplication,
    Thing,
    WebPage,
    WebSite
} from 'schema-dts';
import siteConfig, { type Image } from '../data/site-config';

type PageKind = 'webpage' | 'profile' | 'collection' | 'blog' | 'blogPost' | 'project';

export type SeoSchemaProps = {
    canonicalUrl: string;
    title: string;
    description?: string;
    image?: Image;
    kind?: PageKind;
    publishedDate?: Date | string;
    updatedDate?: Date | string;
    tags?: string[];
    breadcrumbs?: { name: string; url: string }[];
    projectUrl?: string;
};

const siteUrl = trimTrailingSlash(import.meta.env.SITE || 'https://ivylee.github.io');
const personId = `${siteUrl}/#person`;
const websiteId = `${siteUrl}/#website`;
const blogId = `${siteUrl}/blog/#blog`;

const person: Person = {
    '@type': 'Person',
    '@id': personId,
    name: 'Ivy Li',
    url: siteUrl,
    image: absoluteUrl('/profile.png'),
    description: siteConfig.description,
    sameAs: siteConfig.socialLinks?.filter((link) => link.text !== 'RSS').map((link) => absoluteUrl(link.href)),
    jobTitle: 'AI and Machine Learning technical leader',
    alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'Columbia University'
    },
    memberOf: {
        '@type': 'Organization',
        name: 'Y Combinator'
    },
    knowsAbout: [
        'Artificial Intelligence',
        'Machine Learning',
        'AI-driven products',
        'Technical leadership',
        'OpenCV',
        'Search and recommendation',
        'Image recognition',
        'Optimization'
    ]
};

export function buildSeoGraph({
    canonicalUrl,
    title,
    description = siteConfig.description,
    image = siteConfig.image,
    kind = 'webpage',
    publishedDate,
    updatedDate,
    tags,
    breadcrumbs,
    projectUrl
}: SeoSchemaProps): Graph {
    const pageUrl = trimTrailingSlash(canonicalUrl);
    const pageId = `${pageUrl}/#webpage`;
    const imageUrl = image?.src ? absoluteUrl(image.src) : undefined;
    const graph: Thing[] = [buildWebsite(), person];

    if (kind === 'blog') {
        graph.push(buildBlog(description));
    }

    const page = buildPage({
        pageId,
        pageUrl,
        title,
        description,
        imageUrl,
        kind,
        breadcrumbs
    });

    graph.push(page);

    if (kind === 'blogPost') {
        graph.push(buildBlogPosting({ pageUrl, title, description, imageUrl, publishedDate, updatedDate, tags }));
    }

    if (kind === 'project') {
        graph.push(buildProject({ pageUrl, title, description, imageUrl, publishedDate, tags, projectUrl }));
    }

    if (breadcrumbs && breadcrumbs.length > 1) {
        graph.push(buildBreadcrumbs(pageUrl, breadcrumbs));
    }

    return {
        '@context': 'https://schema.org',
        '@graph': graph
    };
}

export function absoluteUrl(path: string) {
    return new URL(path, `${siteUrl}/`).toString();
}

function buildWebsite(): WebSite {
    return {
        '@type': 'WebSite',
        '@id': websiteId,
        url: siteUrl,
        name: siteConfig.title,
        description: siteConfig.description,
        image: siteConfig.image?.src ? absoluteUrl(siteConfig.image.src) : undefined,
        publisher: { '@id': personId },
        author: { '@id': personId },
        inLanguage: 'en'
    };
}

function buildBlog(description: string): Blog {
    return {
        '@type': 'Blog',
        '@id': blogId,
        url: absoluteUrl('/blog/'),
        name: `Blog | ${siteConfig.title}`,
        description,
        publisher: { '@id': personId },
        author: { '@id': personId },
        inLanguage: 'en'
    };
}

function buildPage({
    pageId,
    pageUrl,
    title,
    description,
    imageUrl,
    kind,
    breadcrumbs
}: {
    pageId: string;
    pageUrl: string;
    title: string;
    description: string;
    imageUrl?: string;
    kind: PageKind;
    breadcrumbs?: { name: string; url: string }[];
}): WebPage | ProfilePage | CollectionPage {
    const base = {
        '@id': pageId,
        url: pageUrl,
        name: title,
        description,
        isPartOf: { '@id': websiteId },
        primaryImageOfPage: imageUrl ? { '@type': 'ImageObject' as const, url: imageUrl } : undefined,
        breadcrumb: breadcrumbs && breadcrumbs.length > 1 ? { '@id': `${pageUrl}/#breadcrumb` } : undefined,
        inLanguage: 'en'
    };

    if (kind === 'profile') {
        return {
            ...base,
            '@type': 'ProfilePage',
            mainEntity: { '@id': personId }
        };
    }

    if (kind === 'collection' || kind === 'blog') {
        return {
            ...base,
            '@type': 'CollectionPage',
            mainEntity: kind === 'blog' ? { '@id': blogId } : undefined
        };
    }

    return {
        ...base,
        '@type': 'WebPage'
    };
}

function buildBlogPosting({
    pageUrl,
    title,
    description,
    imageUrl,
    publishedDate,
    updatedDate,
    tags
}: {
    pageUrl: string;
    title: string;
    description: string;
    imageUrl?: string;
    publishedDate?: Date | string;
    updatedDate?: Date | string;
    tags?: string[];
}): BlogPosting {
    return {
        '@type': 'BlogPosting',
        '@id': `${pageUrl}/#blogposting`,
        url: pageUrl,
        headline: title,
        description,
        image: imageUrl,
        datePublished: formatDate(publishedDate),
        dateModified: formatDate(updatedDate ?? publishedDate),
        keywords: tags,
        isPartOf: { '@id': blogId },
        mainEntityOfPage: { '@id': `${pageUrl}/#webpage` },
        author: { '@id': personId },
        publisher: { '@id': personId },
        inLanguage: 'en'
    };
}

function buildProject({
    pageUrl,
    title,
    description,
    imageUrl,
    publishedDate,
    tags,
    projectUrl
}: {
    pageUrl: string;
    title: string;
    description: string;
    imageUrl?: string;
    publishedDate?: Date | string;
    tags?: string[];
    projectUrl?: string;
}): SoftwareApplication {
    return {
        '@type': 'SoftwareApplication',
        '@id': `${pageUrl}/#project`,
        url: projectUrl ?? pageUrl,
        name: title,
        description,
        image: imageUrl,
        datePublished: formatDate(publishedDate),
        keywords: tags,
        creator: { '@id': personId },
        author: { '@id': personId },
        mainEntityOfPage: { '@id': `${pageUrl}/#webpage` }
    };
}

function buildBreadcrumbs(pageUrl: string, breadcrumbs: { name: string; url: string }[]): BreadcrumbList {
    return {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}/#breadcrumb`,
        itemListElement: breadcrumbs.map((breadcrumb, index): ListItem => {
            return {
                '@type': 'ListItem',
                position: index + 1,
                name: breadcrumb.name,
                item: absoluteUrl(breadcrumb.url)
            };
        })
    };
}

function formatDate(date?: Date | string) {
    if (!date) {
        return undefined;
    }

    return date instanceof Date ? date.toISOString() : new Date(date).toISOString();
}

function trimTrailingSlash(url: string) {
    return url.replace(/\/$/, '');
}
