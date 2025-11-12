export interface IModerationLog{
    id:string;
    book_id:string;
    moderator_id:string;
    action: "block" | "unblock" | "flag" | "approve" | "delete"
    reason: string;
    metadata?:Record<string,unknown>;
    created_at:Date;


}