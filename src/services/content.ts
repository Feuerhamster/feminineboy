import {Directus} from '@directus/sdk';
import {Article, ArticleTag} from "../types/article";
import marked from "marked";
import {format} from "timeago.js";
import {ContentResponse, ContentMeta} from "../types/contentResponse";

export class ContentService {

    private static directus: Directus<any> = null;
    private static articleCollection = "feminineboy_articles";
    private static tagsCollection = "feminineboy_tags";
    private static limit: number = 5;

    /**
     * Init the directus SDK class inside the content service
     */
    public static init(): void {

        this.directus = new Directus(process.env["DIRECTUS_ADDR"]);

        if(process.env["DIRECTUS_TOKEN"] && process.env["DIRECTUS_TOKEN"] !== "false") {
            this.directus.auth.static(process.env["DIRECTUS_TOKEN"]);
        }

    }

    /*
    * Utility functions
    * */

    /**
     * Convert the Id of a directus asset to a URL
     * @param id
     * @private
     */
    private static convertAssetURL(id: string): string {
        return new URL("/assets/" + id, process.env["DIRECTUS_ADDR"]).href;
    }

    /**
     * Convert a text to a string that is URL frendly with only letters, numbers and hyphen
     * @param text
     * @private
     */
    private static slugify(text: string): string {
        return text.replace(/'/g, "").match(/[a-z0-9]+/gi).join("-");
    }

    /**
     * Get the total page count based on the total item count
     * @param itemCount
     */
    public static getTotalPages(itemCount: number): number {
        return Math.ceil(itemCount / this.limit);
    }

    /*
    * Articles
    * */

    /**
     * Method to fetch articles from directus
     * @param query
     */
    public static async getArticles(query: any): Promise<ContentResponse> {
        let res = null;

        try {
            res = await this.directus.items(this.articleCollection).readMany({
                fields: ["*", "user_created.first_name,user_created.avatar", "tags.tag.name", "tags.tag.color"],
                meta: "*",
                limit: this.limit,
                ...query
            });
        } catch (e) {
            return null;
        }

        let articles: Article[] = <Article[]> res.data;
        let meta: ContentMeta = <ContentMeta>res.meta;

        // transform
        for (let article of articles) {
            article.user_created.avatar = this.convertAssetURL(article.user_created.avatar);
            article.slug = this.slugify(article.title).toLowerCase() + "-" + article.id;
            article.timeago = format(article.date_updated ? article.date_updated : article.date_created);
        }

        return {articles, meta};
    }

    /**
     * Method to fetch articles from directus sort by newest
     * @param limit
     */
    public static async getNewestArticles(limit: number = 3): Promise<Article[]> {

        let content: ContentResponse = await this.getArticles({
            sort: "-date_created,-date_updated",
            limit
        });

        if(!content) {
            return null;
        }

        return content.articles;

    }

    /**
     * Method to fetch articles from directus sort by #newbies tag
     */
    public static async getArticlesForNewbies(): Promise<Article[]> {

        let content: ContentResponse = await this.getArticles({
            sort: "-date_created,-date_updated",
            filter: { tags: { tag: { name: { _eq: "newbie" } } } },
            limit: 3
        });

        if(!content) {
            return null;
        }

        return content.articles;

    }

    /**
     * Fetch a single article from directus by id
     * @param id
     */
    public static async getArticle(id: string|number) {

        let res = null;

        try {
            res = await this.directus.items(this.articleCollection).readOne(id, {
                fields: ["*", "user_created.first_name,user_created.avatar", "tags.tag.*"]
            });
        } catch (e) {
            return null;
        }

        let article: Article = <Article> res;

        // transform
        article.user_created.avatar = this.convertAssetURL(article.user_created.avatar);
        article.timeago = format(article.date_updated ? article.date_updated : article.date_created);

        article.parsed_content = marked(article.content);

        return article;

    }

    /*
    * Article Tags
    * */

    /**
     * Method to fetch tags from directus
     * @param filter
     */
    public static async getTags(filter: object): Promise<ArticleTag[]> {

        let res = null;

        try {
            res = await this.directus.items(this.tagsCollection).readMany({
                ...filter,
                fields: ["*"]
            });
        } catch (e) {
            return null;
        }

        return <ArticleTag[]>res.data;

    }

    /**
     * Method to fetch random limited count of tags from directus
     * @param count
     */
    public static async getRecommendedTags(count: number): Promise<ArticleTag[]> {

        let tags: ArticleTag[] = await this.getTags({});

        if(!tags) {
            return null;
        }

        let shuffled: ArticleTag[] = tags.sort(() => 0.5 - Math.random());

        return shuffled.slice(0, count);

    }

}