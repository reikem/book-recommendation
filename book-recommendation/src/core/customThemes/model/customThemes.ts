import { DataTypes, Model } from "sequelize";
import { sequelize } from "@/lib/db"

export interface CustomThemeAttributes {
    id?: string;
    user_id: string;
    name: string;
    colors: Record<string, string>;
    is_active?: boolean;
    created_at?: Date;
}

export class CustomTheme extends Model<CustomThemeAttributes> implements CustomThemeAttributes {
    declare id?: string;
    declare user_id: string;
    declare name: string;
    declare colors: Record<string, string>;
    declare is_active?: boolean;
    declare created_at?: Date;

}

CustomTheme.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        colors: {
            type: DataTypes.JSONB,
            allowNull: false
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },
    {
        sequelize,
        tableName: "custom_themes",
        timestamps: false
    }
)
