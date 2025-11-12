export interface INotification{
    id:string;
    user_id:string;
    type:string;
    title:string;
    message:string;
    link?:string;
    is_read:boolean;
    created_at:Date;
}