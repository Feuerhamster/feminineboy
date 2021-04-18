import fs from "fs";
import path from "path";
import marked from "marked";
import {Request, Response} from "express";

export class PageService {

    private static content: Map<string, string> = new Map<string, string>();

    private static contentDirectory: string = "./content"

    /**
     * Read the markdown files from /content
     */
    public static loadContentFiles(): void {

        let contentFiles = fs.readdirSync(this.contentDirectory);

        for (let filePath of contentFiles) {

            // Read file
            let md = fs.readFileSync(path.join(this.contentDirectory, filePath)).toString();
            let name = path.basename(filePath, path.extname(filePath));

            // Parse markdown
            let content = marked(md);

            this.content.set(name, content);

        }

    }

    /**
     * The actual middleware function that renders the page markdown content
     * @param req
     * @param res
     * @param name
     * @param title
     */
    static renderPageMiddleware(req: Request, res: Response, name: string, title: string): void {

        if(!this.content.has(name)) {
            res.render("error", {err: 404});
        }

        let content =  this.content.get(name);

        res.render("page", { title, content })

    }

    /**
     * A wrapper function to provide an express.js middleware for rendering page content
     * @param name
     * @param title
     */
    static renderPage(name, title) {
        return (req, res) => this.renderPageMiddleware(req, res, name, title);
    }

}