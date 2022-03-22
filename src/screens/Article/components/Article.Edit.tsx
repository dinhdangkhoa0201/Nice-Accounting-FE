import React, {useEffect, useRef, useState} from "react";
import {Button, Col, DatePicker, Form, Input, Layout, Modal, Row, Select, Space, Typography} from "antd";
import "react-markdown-editor-lite/lib/index.css"
import "jodit/build/jodit.css"
import {ArticleModel} from "../../../models/ArticleModel";
import {articleAPI} from "../../../api/ArticleAPI";
import {CategoryModel} from "../../../models/CategoryModel";
import {categoryAPI} from "../../../api/CategoryAPI";
import {v4 as uuid} from "uuid";
import {DislikeOutlined, LikeOutlined} from "@ant-design/icons";
import {Link, useParams} from "react-router-dom";
import Editor from "react-markdown-editor-lite";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'

const {Title} = Typography;
const {TextArea} = Input;
const {Option} = Select;
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};


interface Props {
    mode: string;
}

const defaultProps = {
    mode: "VIEW",
}

ArticleEdit.props = defaultProps;

export function ArticleEdit(props: Props) {
    /**
     * START: Variable
     */
    const {id} = useParams();
    const [form] = Form.useForm();
    const [category, setCategory] = useState<CategoryModel>();
    const mdEditor = useRef(null);
    const [article, setArticle] = useState<ArticleModel>({
        id: null,
        code: "",
        name: "",
        desc: "",
        content: "",
        category: category,
    });
    const [content, setContent] = useState<string>("");
    const [listCategory, setListCategory] = useState<Array<CategoryModel>>();
    /**
     * END: Variable
     */

    /**
     * START: Function
     */
    useEffect(() => {
        categoryAPI.findAll()
            .then(data => {
                setListCategory(data.object);
                console.log("data", data);
            })
            .catch(error => {
                Modal.error({
                    closable: false,
                    title: error.message,
                    icon: <DislikeOutlined/>,
                    onOk: () => {
                    }
                })
            })
    }, [])

    useEffect(() => {
        if (props.mode === "EDIT") {
            articleAPI.findById(Number(id))
                .then(data => {
                    const {object} = data;
                    form.setFieldsValue({
                        code: object.code,
                        name: object.name,
                        desc: object.desc,
                        content: object.content,
                        category: object.category,
                        createBy: object.createBy,
                        createDate: object.createDate,
                        updateBy: object.updateBy,
                        updateDate: object.updateDate
                    })
                    setContent(object.content);
                    setCategory(object.category);
                })
                .catch(error => {

                })
        }
    }, [])

    const onFinish = (values: any) => {
        const temp: ArticleModel = {
            id: null,
            code: values.code,
            name: values.name,
            desc: values.desc,
            content: content,
            category: category,
            createBy: "SYSTEM",
            createDate: new Date(),
            updateBy: "SYSTEM",
            updateDate: new Date()
        }
        console.log("Article Before Save", temp);
        articleAPI.save(temp)
            .then(data => {
                if (data.status === "SUCCESS") {
                    Modal.success({
                        title: "Success",
                        icon: <LikeOutlined/>,
                        okText: "OK2",
                        onOk: () => {
                            window.history.back();
                        }
                    });
                }
            })
            .catch(error => {
                Modal.error({
                    closable: false,
                    title: error.message,
                    icon: <DislikeOutlined/>,
                    onOk: () => {
                    }
                })
            })
    }

    const onFinishFailed = (values: any) => {
        const temp: ArticleModel = {
            id: null,
            code: values.code,
            name: values.name,
            desc: values.desc,
            content: content,
            category: category,
            createBy: "SYSTEM",
            createDate: new Date(),
            updateBy: "SYSTEM",
            updateDate: new Date()
        }
        console.log("onFinishFailed form", values);
        console.log("onFinishFailed object", temp);
    }

    const onEditorChange = ({html, text}: any) => {
        console.log("onEditChange html", html);
        console.log("onEditChange text", text);
        setContent(text);
    }

    const renderListOption = () => {
        return listCategory?.map(e => {
            return (
                <Option key={uuid()} value={e.id}>{e.name}</Option>
            )
        })
    }

    const onSelect = (value: any) => {
        const temp: CategoryModel = {
            id: Number(value)
        }
        setCategory(temp);
    }

    /**
     * END: Function
     */
    return (
        <>
            {
                props.mode === "ADD" ?
                    <Title>Thêm Tài Khoản</Title> :
                    props.mode === "EDIT" ?
                        <Title>Chỉnh Sửa Thông tin Tài Khoản</Title> : null
            }
            <Row>
                <Col span={20}>
                    <Form {...layout}
                          form={form}
                          autoComplete="off"
                          onFinish={onFinish}>
                        <Form.Item label={"Loại Tài Khoản"}
                                   name={"category"}
                                   rules={[
                                       {
                                           required: true,
                                           message: "Chưa chọn Loại Tài Khoản",
                                       }
                                   ]}>
                            <Select placeholder={"Chọn Loại Tài Khoản"}
                                    defaultValue={category?.name}
                                    onSelect={onSelect}>
                                {
                                    renderListOption()
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item label={"Mã Tài Khoản"}
                                   name={"code"}
                                   rules={[
                                       {
                                           required: true,
                                           message: "Chưa nhập Mã Tài Khoản",
                                       }
                                   ]}>
                            <Input placeholder={"Mã Tài Khoản"}/>
                        </Form.Item>
                        <Form.Item label={"Tên"}
                                   name={"name"}
                                   rules={[
                                       {
                                           required: true,
                                           message: "Chưa nhập Tên Tài Khoản",
                                       }
                                   ]}>
                            <Input placeholder={"Tên Tài Khoản"}/>
                        </Form.Item>
                        <Form.Item label={"Mô Tả"}
                                   name={"desc"}>
                            <TextArea rows={5} placeholder={"Mô Tả"}/>
                        </Form.Item>
                        <Form.Item label={"Nội Dung"}
                                   name={"content"}
                        >
                            <Layout style={{background: "#ffffff"}}>
                                <Editor
                                    ref={mdEditor}
                                    value={content}
                                    style={{ height: '500px' }}
                                    onChange={onEditorChange}
                                    renderHTML={text => <ReactMarkdown children={text} remarkPlugins={[remarkGfm]} />}/>
                            </Layout>
                        </Form.Item>
                        {
                            props.mode === "EDIT" ?
                                <>
                                    <Form.Item label={"Người Khởi Tạo"}
                                               name={"createBy"}>
                                        <Input disabled={true} placeholder={"Người Khởi Tạo"}/>
                                    </Form.Item>
                                    <Form.Item label={"Ngày Khởi Tạo"}
                                               name={"createBy"}>
                                        <Input disabled={true}/>
                                    </Form.Item>
                                    <Form.Item label={"Người Chỉnh Sửa"}
                                               name={"updateBy"}>
                                        <Input disabled={true} placeholder={"Người Chỉnh Sửa"}/>
                                    </Form.Item>
                                    <Form.Item label={"Ngày Chỉnh Sửa"}
                                               name={"updateDate"}>
                                        <Input disabled={true}/>
                                    </Form.Item>
                                </> : null
                        }
                        <Form.Item {...tailLayout}>
                            <Space>
                                <Button type={"primary"} htmlType={"submit"}>Lưu</Button>
                                <Button type={"dashed"}
                                        onClick={() => window.history.back()}>Huỷ</Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </>
    )
}