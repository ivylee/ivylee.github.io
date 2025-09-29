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
    title: 'Ivy Li\'s Website',
    subtitle: 'Technical leadership for AI and Machine Learning',
    description: 'Ivy helps companies build AI-driven products that customers love.',
    image: {
        src: '/preview.png',
        alt: 'Ivy Li\'s website screenshot'
    },
    headerNavLinks: [
        {
            text: 'Home',
            href: '/'
        },
        // TODO
        // {
        //     text: 'Coaching',
        //     href: '/coaching'
        // },
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
            text: 'LinkedIn',
            href: 'https://linkedin.com/in/ivyxli'
        },
        {
            text: 'GitHub',
            href: 'https://github.com/ivylee'
        },
        {
            text: 'RSS',
            href: '/rss.xml'
        }
    ],
    postsPerPage: 10,
    projectsPerPage: 10 
};

export default siteConfig;
