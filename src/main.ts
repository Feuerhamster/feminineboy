// Import modules
import express, {Application} from "express";
import dotenv from "dotenv";
import {ContentService} from "./services/content";
import marked from "marked";

import defaultRoute from "./routes/index";
import {PageService} from "./services/pages";
import {RSSService} from "./services/rss";

dotenv.config();

const port = process.env.PORT || 7390;
const app: Application = express();

// Markdown renderer for external links and images
let renderer = new marked.Renderer();

// Add target blank for external links
renderer.link = function(href, title, text) {
    let link =  marked.Renderer.prototype.link.apply(this, arguments);

    if(!href.startsWith("/") && !href.startsWith("#")) {
        return link.replace("<a","<a target='_blank' rel='noopener'");
    }

    return link;
};
// Add directus dynamic image scaling params
renderer.image = function (href, title, text) {
    let url = new URL(href);
    // An article on the page has a max width of 850px
    url.searchParams.append("width", "850");
    url.searchParams.append("quality", "90");
    return marked.Renderer.prototype.image.call(this, url.href, title, text);
}

marked.setOptions({ renderer: renderer });

PageService.loadContentFiles();
ContentService.init();
RSSService.compileTemplate();

// Configure template engine
app.set("view engine", "pug");
app.set("views", "./views");

// Add config to express app so the template engine can access it
app.locals.ackee = {
    tracker: process.env["ACKEE_TRACKER"],
    server: process.env["ACKEE_SERVER"],
    domain: process.env["ACKEE_DOMAIN_ID"],
    detailed: process.env["ACKEE_DETAILED"] === "true"
}

app.use(express.urlencoded({ extended: true }));

// Configure routes
app.use(express.static("./public"));
app.use("/", defaultRoute);

app.listen(port, () => {
    console.log("Application successful started:", `http://localhost:${port}/`);
});