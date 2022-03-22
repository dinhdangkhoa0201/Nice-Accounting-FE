import React, {useEffect, useState} from "react";
import {v4 as uuid} from "uuid";
import {CategoryModel} from "../../../models/CategoryModel";
import {Button, Modal, Row, Space, Table, Typography} from "antd";
import {DislikeOutlined, EditOutlined, FolderViewOutlined} from "@ant-design/icons";
import {CriteriaModel} from "../../../models/CriteriaModel";
import {ArticleModel} from "../../../models/ArticleModel";
import {articleAPI} from "../../../api/ArticleAPI";

const {Title} = Typography;

export function ArticleList() {
    /**
     * START: Final variable
     */
    const [isLoading, setIsLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [listArticle, setListArticle] = useState(Array<ArticleModel>());
    const [article, setArticle] = useState<ArticleModel>();
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
            title: "Tên Tài Khoản",
            width: 600
        },
        {
            dataIndex: "category",
            key: uuid(),
            title: "Tên Loại Tài Khoản",
            width: 600,
            render: (text: any, record: ArticleModel) => record.category?.name
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
            render: (action: any, record: ArticleModel) => {
                return (
                    <Space>
                        <Button key={uuid()} type={"primary"}
                                onClick={() => onSelectArticle(record)}
                                icon={<FolderViewOutlined/>}>Xem</Button>
                        <Button key={uuid()} type={"dashed"}
                                href={`/article/edit/${record.id}`}
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
        articleAPI.findByCriteria(criteria)
            .then(data => {
                setListArticle(data.object);

            })
            .catch(error => {
                Modal.error({
                    title: error.message,
                    icon: <DislikeOutlined/>,
                    onOk: () => {
                    }
                })
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

    const onSelectArticle = (article: ArticleModel) => {
        setVisible(true);
        setArticle(article);
    }

    /**
     * END: Function
     */
    return (
        <>
            <Title>Danh Sách Loại Tài Khoản</Title>
            <Row>
                <Table className={"your-table"}
                       rowKey={"id"} key={"index"}
                       loading={isLoading}
                       columns={columns}
                       dataSource={listArticle}
                       pagination={{
                           current: criteria.page,
                           pageSize: criteria.perPage,
                           total: total,
                           onChange: (page, perPage) => {
                               onChangePage(page, perPage);
                           },
                       }}/>
            </Row>
            <Modal
                title="View"
                centered
                visible={visible}
                onOk={() => setVisible(false)}
                width={1500}
            >
                <span style={{display: "inline-block"}}
                      dangerouslySetInnerHTML={{__html: article?.content ? article.content : ""}}/>
            </Modal>
        </>
    )
}