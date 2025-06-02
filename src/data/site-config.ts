export type Image = {
    src: string;
    alt?: string;
    caption?: string;
};

export type Link = {
    text: string;
    href: string;
};

export type Hero = {
    title?: string;
    text?: string;
    image?: Image;
    actions?: Link[];
};

export type Subscribe = {
    title?: string;
    text?: string;
    formUrl: string;
};

export type SiteConfig = {
    logo?: Image;
    title: string;
    subtitle?: string;
    description: string;
    image?: Image;
    headerNavLinks?: Link[];
    footerNavLinks?: Link[];
    socialLinks?: Link[];
    hero?: Hero;
    subscribe?: Subscribe;
    postsPerPage?: number;
    projectsPerPage?: number;
};

const siteConfig: SiteConfig = {
    title: 'Ivy\'s portfolio',
    subtitle: 'Portfolio & Blog',
    description: 'Ivy\'s projects and writings',
    image: {
        src: '/preview.png',
        alt: 'Ivy\'s portfolio and blog website screenshot'
    },
    headerNavLinks: [
        {
            text: 'Home',
            href: '/'
        },
        {
            text: 'Projects',
            href: '/projects'
        },
        {
            text: 'Blog',
            href: '/blog'
        },
        {
            text: 'Resume',
            href: '/resume.pdf'
        }
    ],
    footerNavLinks: [
    ],
    socialLinks: [
        {
            text: 'RSS',
            href: '/rss.xml'
        },
        {
            text: 'GitHub',
            href: 'https://github.com/ivylee'
        },
        {
            text: 'LinkedIn',
            href: 'https://linkedin.com/in/ivyxli'
        }
    ],
    postsPerPage: 10,
    projectsPerPage: 10 
};

export default siteConfig;
