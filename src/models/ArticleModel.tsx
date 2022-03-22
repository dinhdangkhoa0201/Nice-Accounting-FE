import {BaseModel} from "./BaseModel";
import {CategoryModel} from "./CategoryModel";

export interface ArticleModel extends BaseModel {
    code: string;
    name: string;
    desc: string;
    content: string;
    category: CategoryModel | undefined;
}