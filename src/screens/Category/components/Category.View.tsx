import React from "react";
import {Button, Col, Form, Input, Row, Space, Typography} from "antd";

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

CategoryView.defaultProps = defaultProps;

export function CategoryView(props: Props) {
    return (
        <>
            <Title>Thông tin Loại Tài Khoản</Title>
            <Row>
                <Col span={12} offset={2}>
                </Col>
            </Row>
        </>
    )
}