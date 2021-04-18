export interface Article {
    id: number;
    status: string;
    user_created: UserCreated;
    date_created: string;
    date_updated: string
    timeago: string;
    title: string;
    tags: ArticleTagRelation[]
    content: string;
    parsed_content: string | null;
    category: string;
    description: string;
    slug: string | null
}

export interface UserCreated {
    first_name: string;
    avatar: string;
}

export interface ArticleTagRelation {
    tag: ArticleTag
}

export interface ArticleTag {
    id: number;
    name: string;
    description: string;
}