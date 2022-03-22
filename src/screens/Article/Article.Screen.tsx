import React from "react";
import {Col, Layout, Row} from "antd";
import {ArticleEdit} from "./components/Article.Edit";
import {Route, Routes} from "react-router-dom";
import {ArticleList} from "./components/Article.List";

export function ArticleScreen() {
    return (
        <Row>
            <Col span={24}>
                <Routes>
                    <Route path={"/"} element={<ArticleList/>}/>
                    <Route path={"/view/:id"} element={<ArticleEdit mode={"VIEW"}/>}/>
                    <Route path={"/edit/:id"} element={<ArticleEdit mode={"EDIT"}/>}/>
                    <Route path={"/add"} element={<ArticleEdit mode={"ADD"}/>}/>
                </Routes>
            </Col>
        </Row>
    )
}