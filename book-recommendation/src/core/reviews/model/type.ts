export interface IReview{
    id:string;
    book_id:string;
    user_id:string;
    rating:number;
    text:string;
    helpfulCount:number;
    created_at:Date;
    updated_at:Date;


}