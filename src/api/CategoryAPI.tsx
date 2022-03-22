import {CategoryModel} from "../models/CategoryModel";
import HttpCommon from "./HttpCommon";
import {CriteriaModel} from "../models/CriteriaModel";
import {ResultObject} from "../models/ResultObject";
import {List} from "antd";

function save (data: CategoryModel) : Promise<ResultObject<CategoryModel>> {
    return HttpCommon.post("/category", {
        id: data.id,
        name: data.name,
        desc: data.desc,
        createBy: data.createBy,
        createDate: data.createDate,
        updateBy: data.updateBy,
        updateDate: data.updateDate
    })
};

const update = (id: number, data: CategoryModel) => {
    return HttpCommon.post(`/category/${id}`, {
        id: data.id,
        name: data.name,
        desc: data.desc,
        createBy: data.createBy,
        createDate: data.createDate,
        updateBy: data.updateBy,
        updateDate: data.updateDate
    })
};

const deleteCategory = (id: number) => {
    return HttpCommon.delete(`/category/${id}`);
};

function findById(id: number): Promise<ResultObject<CategoryModel>> {
    return HttpCommon.get(`/category/${id}`);
}

function findByCriteria(criteria: CriteriaModel): Promise<ResultObject<Array<CategoryModel>>> {
    return HttpCommon.post("/category/findByCriteria", {
        criteria: criteria.criteria,
        orderBy: criteria.orderBy,
        page: criteria.page,
        perPage: criteria.perPage
    })
}

function findAll(): Promise<ResultObject<Array<CategoryModel>>> {
    return HttpCommon.get(`/category/findAll`);
}

const count = () => {
    return HttpCommon.get("/category/count");
}

export const categoryAPI = {
    save,
    update,
    deleteCategory,
    findById,
    findByCriteria,
    count,
    findAll
}