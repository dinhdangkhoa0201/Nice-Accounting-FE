import React, {useEffect, useState} from "react";
import {Button, Layout, Row, Space, Table, Typography} from "antd";
import {CategoryModel} from "../../../models/CategoryModel";
import {CriteriaModel} from "../../../models/CriteriaModel";
import {categoryAPI} from "../../../api/CategoryAPI";
import {v4 as uuid} from "uuid";
import {EditOutlined, FolderViewOutlined} from "@ant-design/icons";

const {Title} = Typography;

export function CategoryList() {
    /**
     * START: Final variable
     */
    const [isLoading, setIsLoading] = useState(true);
    const [listCategory, setListCategory] = useState(Array<CategoryModel>());
    const [total, setTotal] = useState(0);
    const [criteria, setCriteria] = useState<CriteriaModel>({
        criteria: {},
        orderBy: [],
        page: 1,
        perPage: 10
    });
    const columns = [
        {
            dataIndex: "index",
            key: uuid(),
            title: "STT",
            render: (text: any, record: any, index: any) => ((criteria.page - 1) * 10) + index + 1,
        },
        {
            dataIndex: "name",
            key: uuid(),
            title: "Tên",
            width: 900
        },
        {
            dataIndex: "createBy",
            key: uuid(),
            title: "Người Khởi Tạo",
            width: 200
        },
        {
            dataIndex: "createDate",
            key: uuid(),
            title: "Ngày Khởi Tạo ",
            render: (text: any) => text.slice(0, 19).replace(/-/g, "/").replace("T", " "),
            width: 200
        },
        {
            dataIndex: "updateBy",
            key: uuid(),
            title: "Người Cập Nhật",
            width: 200
        },
        {
            dataIndex: "updateDate",
            key: uuid(),
            title: "Ngày Cập Nhật",
            render: (text: any) => text.slice(0, 19).replace(/-/g, "/").replace("T", " "),
            width: 200
        },
        {
            dataIndex: "action",
            key: uuid(),
            title: "",
            render: (action: any, record: CategoryModel) => {
                return (
                    <Space>
                        <Button key={uuid()} type={"primary"}
                                href={`/category/view/${record.id}`}
                                icon={<FolderViewOutlined/>}>Xem</Button>
                        <Button key={uuid()} type={"dashed"}
                                href={`/category/edit/${record.id}`}
                                icon={<EditOutlined/>}>Chỉnh Sửa</Button>
                    </Space>
                )
            }
        }
    ]
    /**
     * END: Final variable
     */

    /**
     * START: Function
     */
    useEffect(() => {
        setIsLoading(true);
        categoryAPI.findByCriteria(criteria)
            .then(data => {
                setListCategory(data.object);
                setTotal(data.total);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [criteria])

    const onChangePage = (page: number, perPage: number) => {
        if (page && perPage) {
            setCriteria({
                ...criteria,
                page,
                perPage
            })
        }
    }
    /**
     * END: Function
     */

    return (
        <>
            <Title>Danh Sách Loại Tài Khoản</Title>
            <Row>
                <Table className={"your-table"}
                       rowKey={"id"}
                       key={"index"}
                       loading={isLoading}
                       columns={columns}
                       dataSource={listCategory}
                       pagination={{
                           current: criteria.page,
                           pageSize: criteria.perPage,
                           total: total,
                           onChange: (page, perPage) => {
                               onChangePage(page, perPage);
                           },
                       }}/>
            </Row>
        </>
    )
}