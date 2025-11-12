export interface IReadingProgress{
    id:string;
    user_id:string;
    book_id:string;
    current_page:number;
    last_read_at:Date;
    started_at:Date;
    finished_at?:Date;
    total_reading_time:number; // in minutes
    

}