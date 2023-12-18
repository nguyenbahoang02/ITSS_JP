import { Table, Button, message, Popconfirm } from 'antd';
import { useDeleteLessonMutation, useGetLessonsQuery } from 'app/api/lessonService';
import './ReadLesson.scss';
import { useNavigate } from 'react-router-dom';
import { setTab } from 'Features/Admin/tabSlice';
import { useDispatch } from 'react-redux';
const ReadLesson = () => {
    const [deleteLesson] = useDeleteLessonMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const confirm = (id) => {
        deleteLesson({ id, headers: { accessToken: JSON.parse(localStorage.getItem('user')).token } }).then(
            (response) => {
                if (response.data.error !== undefined) {
                    message.error(response.data.error.message);
                } else message.success('Deleted successfully');
                console.log(response);
            },
        );
    };
    const cancel = (e) => {
        message.error('Cancelled');
    };
    const columns = [
        {
            title: 'Order',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: `Lesson's name`,
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Number of words',
            dataIndex: 'word',
            key: 'word',
        },
        {
            title: 'Actions',
            dataIndex: '',
            key: 'x',
            render: (_, record) => (
                <div className="table-actions">
                    <Button
                        type="primary"
                        onClick={() => {
                            dispatch(setTab('8'));
                            navigate(`/admin/updateLesson/${record.id}`);
                        }}
                    >
                        Update
                    </Button>
                    <Popconfirm
                        title="Delete the lesson"
                        description="Are you sure to delete this lesson?"
                        onConfirm={() => confirm(record.id)}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="primary" danger>
                            Delete
                        </Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    const { data: lessons, isError, isLoading } = useGetLessonsQuery();
    if (isError) {
        return <h1>Something went wrong!</h1>;
    } else if (isLoading) {
        return <h1>Loading ... </h1>;
    }
    const tableData = lessons.map((current, index) => {
        return { ...current, key: current.id, index: index + 1, word: current.Words?.length || 0 };
    });

    return (
        <div className="read-lesson">
            <Table pagination={{ pageSize: 10 }} columns={columns} size="large" dataSource={tableData}></Table>
        </div>
    );
};

export default ReadLesson;
