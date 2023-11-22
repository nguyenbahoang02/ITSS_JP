import Sidebar from 'Features/Admin/Components/Sidebar/Sidebar';
import React from 'react';
import 'Features/Admin/index.scss';
import './UpdateWord.scss';
import { useGetWordQuery, useUpdateWordMutation } from 'app/api/wordService';
import { useParams } from 'react-router-dom';
import { EditOutlined, CloseSquareOutlined } from '@ant-design/icons';
import { Button, Input, Form, Space, message } from 'antd';
import { useState } from 'react';

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

function UpdateWord() {
    const [editMode, setEditMode] = useState(false);
    const [wordEdit, setWordEdit] = useState();
    const [updateWord] = useUpdateWordMutation();
    const [form] = Form.useForm();
    const params = useParams();
    const { data, isError, isLoading } = useGetWordQuery(params.id);
    if (isError) {
        return <h1>Something went wrong!</h1>;
    } else if (isLoading) {
        return <h1>Loading ... </h1>;
    }
    const { word, listMeanings } = data;
    const submit = (value) => {
        var submitForm = {
            word: {
                word: value.word,
                furigana: value.furigana,
            },
            meanings: [],
        };
        for (let key in value) {
            if (value.hasOwnProperty(key) && key !== 'word' && key !== 'furigana') {
                if (key.includes('meaning')) {
                    const tmp = key.split(' ');
                    submitForm.meanings.push({
                        id: tmp[1],
                        meaning: value[key],
                        description: value[`Description ${tmp[1]}`],
                        examples: [],
                    });
                }
                if (key.includes('ExampleMeaning')) {
                    const tmp = key.split(' ');
                    const tmpSubmitForm = submitForm.meanings.map((meaning) => {
                        if (meaning.id === tmp[2]) {
                            let tmpMeaning = meaning;
                            tmpMeaning.examples.push({
                                id: tmp[1],
                                example: value[`Example ${tmp[1]} ${tmp[2]}`],
                                meaning: value[`ExampleMeaning ${tmp[1]} ${tmp[2]}`],
                            });
                            return tmpMeaning;
                        }
                        return meaning;
                    });
                    submitForm.meanings = tmpSubmitForm;
                }
            }
        }
        updateWord({
            id: params.id,
            data: submitForm,
            headers: {
                accessToken: process.env.REACT_APP_ADMIN_TOKEN,
            },
        })
            .then((response) => {
                if (response.data === 'success') {
                    message.success('Updated word successfully');
                    setEditMode(!editMode);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <div className="update-word">
            <div className="home-admin">
                <Sidebar />
                <div className="admin-selected-feature">
                    <div className="edit-button">
                        {editMode && (
                            <div className="edit-button">
                                <Button
                                    icon={<CloseSquareOutlined />}
                                    onClick={() => setEditMode((editMode) => !editMode)}
                                />
                            </div>
                        )}
                        {!editMode && (
                            <Button
                                type="primary"
                                icon={<EditOutlined />}
                                onClick={() => {
                                    setWordEdit({
                                        word: {
                                            word: word.word,
                                            furigana: word.furigana,
                                        },
                                        meanings: listMeanings?.map((meaning) => {
                                            return {
                                                id: meaning.id,
                                                meaning: meaning.meaning,
                                                description: meaning.description,
                                                examples: meaning?.Examples?.map((example) => {
                                                    return {
                                                        id: example.id,
                                                        example: example.example,
                                                        meaning: example.meaning,
                                                    };
                                                }),
                                            };
                                        }),
                                    });
                                    setEditMode((editMode) => !editMode);
                                }}
                            />
                        )}
                    </div>
                    {!editMode && (
                        <div className="edit-div">
                            <div className="word">{word.word}</div>
                            <div className="furigana">{word.furigana}</div>
                            {listMeanings?.map((current, index) => {
                                return (
                                    <div className="meaning-div" key={index}>
                                        <div className="meaning">{current.meaning}</div>
                                        <div className="meaning-description">{current.description}</div>
                                        {current?.Examples.map((curr, index) => {
                                            return (
                                                <div className="example-div" key={index + 1000}>
                                                    <div className="example">{curr.example}</div>
                                                    <div className="example-meaning">{curr.meaning}</div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                    {editMode && (
                        <Form
                            form={form}
                            name="validateOnly"
                            layout="vertical"
                            autoComplete="off"
                            onFinish={(values) => submit(values)}
                            size="large"
                        >
                            <Form.Item
                                name="word"
                                label="Word"
                                initialValue={wordEdit.word.word}
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
                                initialValue={wordEdit.word.furigana}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            {wordEdit?.meanings.map((meaning, index) => {
                                return (
                                    <div key={index + 100}>
                                        <Form.Item
                                            name={`meaning ${meaning.id}`}
                                            label={`Meaning ${index + 1}`}
                                            initialValue={meaning.meaning}
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name={`Description ${meaning.id}`}
                                            label={`Meaning description ${index + 1}`}
                                            initialValue={meaning.description}
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        {meaning?.examples.map((example, index) => {
                                            return (
                                                <div key={index + 10000}>
                                                    <Form.Item
                                                        name={`Example ${example.id} ${meaning.id}`}
                                                        label={`Example ${index + 1}`}
                                                        initialValue={example.example}
                                                        rules={[
                                                            {
                                                                required: true,
                                                            },
                                                        ]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                    <Form.Item
                                                        name={`ExampleMeaning ${example.id} ${meaning.id}`}
                                                        label={`Example meaning ${index + 1}`}
                                                        initialValue={example.meaning}
                                                        rules={[
                                                            {
                                                                required: true,
                                                            },
                                                        ]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </div>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                            <Form.Item>
                                <Space>
                                    <SubmitButton form={form} />
                                    <Button htmlType="reset">Reset</Button>
                                </Space>
                            </Form.Item>
                        </Form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UpdateWord;
