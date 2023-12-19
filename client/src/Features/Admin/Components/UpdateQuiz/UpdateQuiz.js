import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './UpdateQuiz.scss';
import { useGetQuestionsOfQuizQuery, useDeleteQuestionMutation, useCreateQuestionMutation } from 'app/api/quizService';
import { useParams } from 'react-router-dom';
import { Button, Table, message, Modal, Form, Input, Select } from 'antd';

const CollectionCreateForm = ({ title, open, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
        <Modal
            open={open}
            title={title || 'Create a new question'}
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form.validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                    modifier: 'public',
                }}
            >
                <Form.Item
                    name="question"
                    label="Question"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the question of collection!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="answer1"
                    label="Answer1"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the answer1 of collection!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="answer2"
                    label="Answer2"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the answer2 of collection!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="answer3"
                    label="Answer3"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the answer3 of collection!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="answer4"
                    label="Answer4"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the answer4 of collection!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="correctAnswer"
                    label="Correct Answer"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the correct answer of collection!',
                        },
                    ]}
                >
                    <Select>
                        <Select.Option value={1}>Answer 1</Select.Option>
                        <Select.Option value={2}>Answer 2</Select.Option>
                        <Select.Option value={3}>Answer 3</Select.Option>
                        <Select.Option value={4}>Answer 4</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="score"
                    label="Score"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the score of collection!',
                        },
                    ]}
                >
                    <Input type="number" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

function UpdateQuiz() {
    const [open, setOpen] = useState(false);
    const params = useParams();
    const [deleteQuestion] = useDeleteQuestionMutation();
    const [createQuestion] = useCreateQuestionMutation();
    const { data, isError, isLoading } = useGetQuestionsOfQuizQuery(params.id);

    if (isError) {
        return <h1>Something went wrong!</h1>;
    } else if (isLoading) {
        return <h1>Loading ... </h1>;
    }
    const onCreate = (values) => {
        createQuestion({
            quizId: params.id,
            data: { question: { ...values } },
            headers: { accessToken: JSON.parse(localStorage.getItem('user')).token },
        });
        setOpen(false);
    };

    const handleDeleteQuestion = (id) => {
        deleteQuestion({
            id,
            headers: { accessToken: JSON.parse(localStorage.getItem('user')).token },
        })
            .then((res) => message.success('success!'))
            .catch((err) => {
                message.error('failed!');
            });
    };

    const columns = [
        {
            title: 'Question',
            dataIndex: 'question',
            key: 'question',
        },
        {
            title: 'Score',
            dataIndex: 'score',
            key: 'score',
        },
        {
            title: 'Answer1',
            dataIndex: 'answer1',
            key: 'answer1',
        },
        {
            title: 'Answer2',
            dataIndex: 'answer2',
            key: 'answer2',
        },
        {
            title: 'Answer3',
            dataIndex: 'answer3',
            key: 'answer3',
        },
        {
            title: 'Answer4',
            dataIndex: 'answer4',
            key: 'answer4',
        },
        {
            title: 'Correct Answer',
            dataIndex: 'correctAnswer',
            key: 'correctAnswer',
        },

        {
            title: 'Actions',
            dataIndex: '',
            key: 'x',
            render: (_, record) => (
                <div>
                    <Button type="primary" danger onClick={() => handleDeleteQuestion(record.id)}>
                        Delete
                    </Button>
                </div>
            ),
        },
    ];
    return (
        <div className="update-quiz">
            <Sidebar />
            <div className="content">
                <h1 className="mb-16">Update Quiz</h1>
                <Button
                    className="mb-16"
                    type="primary"
                    onClick={() => {
                        setOpen(true);
                    }}
                >
                    Add question
                </Button>
                <Table
                    size="large"
                    dataSource={data?.map((item) => ({
                        ...item,
                        key: item.id,
                        lessonName: item.Lesson?.name,
                    }))}
                    columns={columns}
                />
            </div>
            <CollectionCreateForm
                open={open}
                onCreate={onCreate}
                onCancel={() => {
                    setOpen(false);
                }}
            />
        </div>
    );
}

export default UpdateQuiz;
