import {Article} from "./article";

export interface ContentMeta {
    total_count: number,
    filter_count: number
}

export interface ContentResponse {
    articles: Article[],
    meta: ContentMeta
}