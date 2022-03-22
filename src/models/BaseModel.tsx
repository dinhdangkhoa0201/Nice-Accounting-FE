export interface BaseModel {
    id: number | null;
    createBy?: string | null;
    createDate?: Date | null;
    updateBy?: string | null;
    updateDate?: Date | null;
}