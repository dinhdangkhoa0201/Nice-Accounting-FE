import React from "react";
import {Col, Row} from "antd";
import {Route, Routes} from "react-router-dom";
import {CategoryList} from "./components/Category.List";
import {CategoryView} from "./components/Category.View";
import {CategoryAdd} from "./components/Category.Add";

export function CategoryScreen() {
    return (
        <Row>
            <Col span={24}>
                <Routes>
                    <Route path={"/"} element={<CategoryList/>}/>
                    <Route path={"/view/:id"} element={<CategoryView/>}/>
                    <Route path={"/edit/:id"} element={<CategoryAdd mode={"EDIT"}/>}/>
                    <Route path={"/add"} element={<CategoryAdd mode={"ADD"}/>}/>
                </Routes>
            </Col>
        </Row>
    )
}