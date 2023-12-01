import './CreateRequest.scss';
import { Button, Form, Input, message } from 'antd';
import { useCreateRequestMutation } from 'app/api/requestService';

function CreateRequest() {
    const [form] = Form.useForm();
    const [createRequest] = useCreateRequestMutation();
    const submit = (values) => {
        createRequest({
            data: {
                word: {
                    word: values.word,
                    furigana: values.furigana,
                },
                meaning: {
                    meaning: values.meaning,
                    description: values.description,
                },

                example: {
                    example: values.example,
                    meaning: values.exampleMeaning,
                },
            },
            headers: { accessToken: JSON.parse(localStorage.getItem('user')).token },
        })
            .then((res) => {
                message.success('Successfully');
            })
            .catch((err) => console.log(err));
    };
    return (
        <div className="create-request">
            <Form
                form={form}
                name="validateOnly"
                layout="vertical"
                autoComplete="off"
                onFinish={(values) => submit(values)}
                className="create-word"
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
                <Form.Item
                    name="example"
                    label="Example"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="exampleMeaning"
                    label="Example Meaning"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default CreateRequest;
