export interface IRelatedDocument{
    id:string;
    book_id:string;
    title:string;
    description?:string;
    file_path:string;
    file_type?:string;
    file_size?:number;
    uploaded_by:string;
    created_at:Date;


}