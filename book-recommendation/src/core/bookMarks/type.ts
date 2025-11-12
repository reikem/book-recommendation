export interface IBookMark{
    id: string;
    user_id:string;
    book_id:string;
    page_number:string;
    notes?:string;
    created_at:Date;
}