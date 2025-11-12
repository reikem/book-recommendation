export interface ICustomTheme{
    id: string;
    user_id:string;
    name:string;
    colors:Record   <string, string>;
    is_active:boolean;
    created_at:Date;
}