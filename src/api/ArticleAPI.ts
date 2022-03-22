import {ArticleModel} from "../models/ArticleModel";
import HttpCommon from "./HttpCommon";
import {CriteriaModel} from "../models/CriteriaModel";
import {ResultObject} from "../models/ResultObject";

function save(data: ArticleModel): Promise<ResultObject<ArticleModel>> {
    return HttpCommon.post("/article", {
        id: data.id,
        code: data.code,
        name: data.name,
        desc: data.desc,
        content: data.content,
        category: data.category,
        createBy: data.createBy,
        createDate: data.createDate,
        updateBy: data.updateBy,
        updateDate: data.updateDate
    })
};

const update = (id: number, data: ArticleModel) => {
    return HttpCommon.put(`/article/${id}`, {
        id: data.id,
        code: data.code,
        name: data.name,
        desc: data.desc,
        content: data.content,
        createBy: data.createBy,
        createDate: data.createDate,
        updateBy: data.updateBy,
        updateDate: data.updateDate
    })
};

const deleteArticle = (id: number) => {
    return HttpCommon.delete(`/article/${id}`);
};

function findById (id: number) : Promise<ResultObject<ArticleModel>> {
    return HttpCommon.get(`/article/${id}`);
};

function findByCriteria (criteria: CriteriaModel) : Promise<ResultObject<Array<ArticleModel>>> {
    return HttpCommon.post("/article/findByCriteria", {
        criteria: criteria.criteria,
        orderBy: criteria.orderBy,
        page: criteria.page,
        perPage: criteria.perPage
    })
};

const count = () => {
    return HttpCommon.get("/article/count");
};

const findByCategoryId = (categoryId: number) => {
    return HttpCommon.get(`/article/category/${categoryId}`);
};

export const articleAPI = {
    save,
    update,
    deleteArticle,
    findById,
    findByCriteria,
    count,
    findByCategoryId
}