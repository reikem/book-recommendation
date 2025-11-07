export interface IBook{
    id:string;
    title:string;
    author:string;
    genre:string[];
    rating:number;
    description?:string;
    cover:string;
    pages:string;
    year:string;
    language?:string;
    isbn?:string;
    publisher?:string;
    content?:string;
    file_path?:string;
    file_size?:string;
    file_type?:string;
    uploaded_by:string;
    is_blocked:boolean;
    blocked_reason?:string;
    blocked_at?:Date;
    createdAt:Date;
    updatedAt:Date;

}