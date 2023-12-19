import React from 'react';
import { Button, Form, Select, message } from 'antd';
import { useGetLessonsQuery } from 'app/api/lessonService';
import { useCreateQuizMutation } from 'app/api/quizService';

function CreateQuiz() {
    const [create] = useCreateQuizMutation();
    const onFinish = ({ LessonName: lessonId }) => {
        create({
            lessonId,
            headers: { accessToken: JSON.parse(localStorage.getItem('user')).token },
        })
            .then((res) => message.success('success!'))
            .catch((err) => {
                message.error('failed!');
            });
    };

    const { data: lessons, isError, isLoading } = useGetLessonsQuery();
    if (isError) {
        return <h1>Something went wrong!</h1>;
    } else if (isLoading) {
        return <h1>Loading ... </h1>;
    }

    return (
        <Form
            name="basic"
            style={{
                maxWidth: 600,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item
                label="Lesson'name"
                name="LessonName"
                rules={[
                    {
                        required: true,
                        message: "Please input your Lesson'name!",
                    },
                ]}
                style={{
                    width: 300,
                }}
            >
                <Select>
                    {lessons?.map((lesson) => (
                        <Select.Option key={lesson.id} value={lesson.id}>
                            {lesson.name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Create
                </Button>
            </Form.Item>
        </Form>
    );
}

export default CreateQuiz;
