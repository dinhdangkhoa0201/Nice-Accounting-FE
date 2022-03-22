import React, {useEffect, useState} from "react";
import {Button, Col, DatePicker, Form, Input, Layout, Modal, Row, Space, Typography} from "antd";
import {CategoryModel} from "../../../models/CategoryModel";
import {categoryAPI} from "../../../api/CategoryAPI";
import {useParams} from "react-router-dom";
import moment from "moment";
import {LikeOutlined} from "@ant-design/icons";

const {Title} = Typography;
const {TextArea} = Input;
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

export function CategoryAdd(props: Props) {
    /**
     * START: Variable
     */
    const {id} = useParams();
    const [form] = Form.useForm();
    const [category, setCategory] = useState<CategoryModel>();
    const onFinish = (values: any) => {
        const temp: CategoryModel = {
            id: null,
            name: values.name,
            desc: values.desc,
            createBy: "SYSTEM",
            createDate: new Date(),
            updateBy: "SYSTEM",
            updateDate: new Date()
        }
        categoryAPI.save(temp)
            .then(data => {
                if (data.status === "SUCCESS") {
                    Modal.success({
                        title: "Success",
                        icon: <LikeOutlined/>,
                        okText: "OK",
                        onOk: () => {
                            window.history.back();
                        }
                    });
                }
            })
            .catch(error => {

            })
    }

    const onFinishFailed = (values: any) => {
        const temp: CategoryModel = {
            id: null,
            name: values.name,
            desc: values.desc,
            createBy: "SYSTEM",
            createDate: new Date(),
            updateBy: "SYSTEM",
            updateDate: new Date()
        }
        console.log("onFinishFailed form", values);
        console.log("onFinishFailed object", temp);
    }
    /**
     * END: Variable
     */
    /**
     * START: Function
     */
    useEffect(() => {
        if (props.mode === "EDIT") {
            if (id) {
                categoryAPI.findById(Number(id))
                    .then(data => {
                        const {object} = data;
                        setCategory(object);
                        form.setFieldsValue({
                            id: object.id,
                            name: object.name,
                            createBy: object.createBy,
                            createDate: object.createDate,
                            updateBy: object.updateBy,
                            updateDate: object.updateDate
                        })
                    })
                    .catch(error => {

                    });
            }
        }
    }, [])
    /**
     * END: Function
     */

    return (
        <>
            {
                props.mode === "ADD" ?
                    <Title>Thêm Loại Tài Khoản</Title> :
                    props.mode === "EDIT" ?
                        <Title>Chỉnh Sửa Thông tin Loại Tài Khoản</Title> : null
            }
            <Row>
                <Col span={12} offset={2}>
                    <Form {...layout}
                          form={form}
                          autoComplete="off"
                          onFinishFailed={onFinishFailed}
                          onFinish={onFinish}>
                        <Form.Item label={"Tên"}
                                   name={"name"}
                                   rules={[
                                       {
                                           required: true,
                                           message: "Chưa nhập Tên Loại Tài Khoản",
                                       }
                                   ]}>
                            <Input placeholder={"Tên Loại Tài Khoản"}/>
                        </Form.Item>
                        <Form.Item label={"Mô Tả"}
                                   name={"desc"}>
                            <TextArea rows={5} placeholder={"Mô Tả"}/>
                        </Form.Item>
                        {
                            props.mode === "EDIT" ?
                                <>
                                    <Form.Item label={"Người Khởi Tạo"}
                                               name={"createBy"}>
                                        <Input disabled={true} placeholder={"Người Khởi Tạo"}/>
                                    </Form.Item>
                                    <Form.Item label={"Ngày Khởi Tạo"}
                                               name={"createDate"}>
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