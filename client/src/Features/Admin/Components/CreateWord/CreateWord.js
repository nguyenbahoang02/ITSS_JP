import React from 'react';
import { Button, Form, Input, Space } from 'antd';
import axios from 'axios';
import './CreateWord.scss';

const SubmitButton = ({ form }) => {
    const [submittable, setSubmittable] = React.useState(false);
    // Watch all values
    const values = Form.useWatch([], form);
    React.useEffect(() => {
        form.validateFields({
            validateOnly: true,
        }).then(
            () => {
                setSubmittable(true);
            },
            () => {
                setSubmittable(false);
            },
        );

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [values]);
    return (
        <Button type="primary" htmlType="submit" disabled={!submittable}>
            Submit
        </Button>
    );
};
const CreateWord = () => {
    const [form] = Form.useForm();

    const submit = (values) => {
        console.log(values);
        axios
            .post(
                `${process.env.REACT_APP_BASE_URL}/words`,
                {
                    word: {
                        word: values.word,
                        furigana: values.furigana,
                    },
                    meaning: {
                        meaning: values.meaning,
                        description: values.description,
                    },
                },
                {
                    headers: {
                        accessToken:
                            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkhvYW5nIiwiaWQiOjEsIlJvbGVJZCI6MiwiaWF0IjoxNzAwMzI2MTYyLCJleHAiOjE3MDAzNDA1NjJ9.1hPZNvPtvY1-xJSTmzkpW2iWFSAHJrsqe8LLV7RmCm0',
                    },
                },
            )
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <div className="create-word-background">
            <Form
                form={form}
                name="validateOnly"
                layout="vertical"
                autoComplete="off"
                onFinish={(values) => submit(values)}
                className="create-word"
                size="large"
            >
                <Form.Item
                    name="word"
                    label="Word"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="furigana"
                    label="Furigana"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="meaning"
                    label="Meaning"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Description"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Space>
                        <SubmitButton form={form} />
                        <Button htmlType="reset">Reset</Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    );
};
export default CreateWord;
