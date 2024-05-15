import { type CollectionEntry } from 'astro:content';
import { slugify } from './common-utils';

export function sortItemsByDateDesc(itemA: CollectionEntry<'blog' | 'projects'>, itemB: CollectionEntry<'blog' | 'projects'>) {
    return new Date(itemB.data.publishDate).getTime() - new Date(itemA.data.publishDate).getTime();
}

export function getAllTags(posts: CollectionEntry<'blog'>[], projects: CollectionEntry<'projects'>[]) {
    const postTags: string[] = [...new Set(posts.flatMap((post) => post.data.tags || []).filter(Boolean))];
    const projectTags: string[] = [...new Set(projects.flatMap((project) => project.data.tags || []).filter(Boolean))];
    const tags: string[] = postTags.concat(projectTags);
    return tags
        .map((tag) => {
            return {
                name: tag,
                slug: slugify(tag)
            };
        })
        .filter((obj, pos, arr) => {
            return arr.map((mapObj) => mapObj.slug).indexOf(obj.slug) === pos;
        });
}

export function getPostsByTag(posts: CollectionEntry<'blog'>[], projects: CollectionEntry<'projects'>[], tagSlug: string) {
    const filteredPosts: CollectionEntry<'blog'>[] = posts.filter((post) => (post.data.tags || []).map((tag) => slugify(tag)).includes(tagSlug));
    const filteredProjects: CollectionEntry<'projects'>[] = projects.filter((project) => (project.data.tags || []).map((tag) => slugify(tag)).includes(tagSlug));
    return filteredPosts.concat(filteredProjects);
}
