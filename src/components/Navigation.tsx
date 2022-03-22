import React from "react";
import {Menu} from "antd";
import {
    AccountBookOutlined,
    ProfileOutlined
} from "@ant-design/icons";
import {useLocation} from "react-router-dom";
import {Link} from "react-router-dom";

const {SubMenu} = Menu;

export function Navigation() {
    const location = useLocation();
    const {pathname} = location;

    const renderMenu = () => {
        return (
            listMenu.map(e => {
                return (
                    <SubMenu key={e.key} icon={dynamicAntIcon(e.icon)} title={e.name}>
                        {
                            e.children.map(i => {
                                return (
                                    <Menu.Item key={i.key}>
                                        <Link to={i.path}>{i.name}</Link>
                                    </Menu.Item>
                                )
                            })
                        }
                    </SubMenu>
                )
            })
        )
    }

    const dynamicAntIcon = (name: string) => {
        switch (name) {
            case "UnderlineOutlined":
                return <AccountBookOutlined/>
            case "AppstoreOutlined":
                return <ProfileOutlined/>
            default:
                return null;
        }
    }

    return (
        <Menu theme={"dark"} mode={"inline"} selectedKeys={[pathname]}>
            <div className={"logo"}/>
            {
                renderMenu()
            }
        </Menu>
    )
}

const listMenu = [
    {
        key: "sub1",
        name: "Loại Tài Khoản",
        icon: "UnderlineOutlined",
        children: [
            {
                key: "1",
                name: "Danh Sách",
                path: "/category"
            }, {
                key: "2",
                name: "Thêm",
                path: "/category/add"
            }
        ]
    },
    {
        key: "sub2",
        name: "Tài Khoản",
        icon: "UnderlineOutlined",
        children: [
            {
                key: "3",
                name: "Danh Sách",
                path: "/article"
            }, {
                key: "4",
                name: "Thêm",
                path: "/article/add"
            }
        ]
    },
]