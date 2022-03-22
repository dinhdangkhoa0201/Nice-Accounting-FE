import React from "react";
import {Layout} from "antd";
import {Navigation} from "./Navigation";
import {Header as HeaderComponent} from "./Header";
import {CategoryScreen} from "../screens/Category/Category.Screen";
import {ArticleScreen} from "../screens/Article/Article.Screen";
import {BrowserRouter as Routers, Routes, Route} from "react-router-dom";
import {Dashboard} from "../screens/ Dashboard/Dashboard";

const {Sider, Header, Content, Footer} = Layout;

export function MainLayout() {
    return (
        <Layout style={{minHeight: "100vh"}}>
            <Sider collapsible>
                <Navigation/>
            </Sider>
            <Layout>
                <Header>
                    <HeaderComponent/>
                </Header>
                <Content style={{padding: "25px", overflow: ""}}>
                    <Routes>
                        <Route path={"/"} element={<Dashboard/>}/>
                        <Route path={"/category/*"} element={<CategoryScreen/>}/>
                        <Route path={"/article/*"} element={<ArticleScreen/>}/>
                    </Routes>
                </Content>
                <Footer/>
            </Layout>
        </Layout>
    )
}