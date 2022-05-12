export interface ICategory {
    id: string;
    title: string;
    created_at: string;
}

export interface IPost {
    id: string;
    title: string;
    content: string;
    category: ICategory;
    category_id: string;
}

export interface ITenant {
    id: string;
    title: string;
    created_at: string;
}
