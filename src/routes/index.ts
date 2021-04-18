import {Request, Response, Router} from "express";
import qs from "qs";
import {ContentService} from "../services/content";
import {PageService} from "../services/pages";
import {ContentResponse} from "../types/contentResponse";
import {RSSService} from "../services/rss";

const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {

    let newArticles = await ContentService.getNewestArticles();
    let newbieArticles = await ContentService.getArticlesForNewbies();
    let tags = await ContentService.getRecommendedTags(4);

    if(!newArticles || !newbieArticles) {
        return res.render("error", {err: 503});
    }

    res.render("home", { newArticles, newbieArticles, tags });

});

router.get("/articles", async (req: Request, res: Response) => {

    let query: any = {};
    let page: number = 1;

    if(req.query.search) {
        query.search = req.query.search;
    }

    if(req.query.tag) {
        query.filter = { tags: { tag: { name: { _eq: req.query.tag } } } }
    }

    if(req.query.page && /\d+/.test(<string>req.query.page)) {
        query.page = req.query.page;
        page = parseInt(<string>req.query.page);
    }

    let {articles, meta}: ContentResponse = await ContentService.getArticles(query);

    if(!articles) {
        return res.render("error", {err: 503});
    }

    let totalPages = ContentService.getTotalPages(meta.filter_count);

    res.render("articles", { articles, meta, page, totalPages, query: req.query });

});

router.get("/tags", async (req: Request, res: Response) => {

    let tags = await ContentService.getTags({});

    if(!tags) {
        return res.render("error", {err: 503});
    }

    res.render("tags", { tags });

});

router.post("/articles", (req: Request, res: Response) => {

    // Article search has to be POST to preserve other query params
    if(req.body.search) {
        req.query.search = req.body.search;
    }

    if(req.body.page) {
        req.query.page = req.body.page;
    }

    res.redirect(`/articles?${qs.stringify(req.query)}`)

});

router.get("/articles/:slug", async (req: Request, res: Response) => {

    let slug = req.params.slug.match(/\d+$/);

    if(!slug) {
        return res.render("error", {err: 401});
    }

    let article = await ContentService.getArticle(slug[0]);

    if(!article) {
        return res.render("error", {err: 404});
    }

    res.render("article", { article });

});

router.get("/feed.rss", async (req: Request, res: Response) => {

    let rss = await RSSService.generateFeed();

    if(!rss) {
        res.status(500).end();
        return;
    }

    res.contentType("application/rss+xml")
    res.send(rss);

})

router.get("/apply", PageService.renderPage("apply", "Join the team"));
router.get("/about", PageService.renderPage("about", "About"));
router.get("/privacy", PageService.renderPage("privacy", "Privacy policy"));

// Error handling
router.use((err, req, res, next) => {

    if(process.env["NODE_ENV"] && process.env["NODE_ENV"] === "production") {
        res.render("error", {err: 500});
        return;
    }

    next(err);

});

router.get("*", (req: Request, res: Response) => {
    return res.render("error", {err: 404});
})

export default router;