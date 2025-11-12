export interface Iquote{
    id:string;
    book_id:string
    user_id:string;
    quote_text:string;
    character:string;
    page_number?:string;
    notes?:string;
    created_at:Date;


}