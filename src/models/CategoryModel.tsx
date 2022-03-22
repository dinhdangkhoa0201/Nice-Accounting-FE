import {BaseModel} from "./BaseModel";

export interface CategoryModel extends BaseModel {
    name?: string | null;
    desc?: string | null;
}