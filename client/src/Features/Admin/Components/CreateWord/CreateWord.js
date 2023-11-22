import React from 'react';
import { Button, Form, Input, Space, message } from 'antd';
import './CreateWord.scss';
import { useCreateWordMutation } from 'app/api/wordService';

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
    const [createWord] = useCreateWordMutation();
    const [form] = Form.useForm();

    const submit = (values) => {
        createWord({
            data: {
                word: {
                    word: values.word,
                    furigana: values.furigana,
                },
                meaning: {
                    meaning: values.meaning,
                    description: values.description,
                },
            },
            headers: {
                accessToken: process.env.REACT_APP_ADMIN_TOKEN,
            },
        })
            .then(function (response) {
                if (response.data.error !== undefined) {
                    message.error(response.data.error.message);
                } else if (response.data.errors !== undefined) {
                    message.error(response.data.errors[0].message);
                } else message.success('Created word successfully');
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
