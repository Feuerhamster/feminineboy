import pug, {compileTemplate} from "pug";
import {ContentService} from "./content";

export class RSSService {

    private static template: compileTemplate

    static compileTemplate() {
        this.template = pug.compileFile("./templates/rss.pug");
    }

    static async generateFeed() {

        let articles = await ContentService.getNewestArticles(10);

        if(!articles) return null;

        return this.template({ publicURL: process.env["PUBLIC_URL"], articles });

    }

}