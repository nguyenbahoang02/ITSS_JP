import { Table, Button, message, Popconfirm } from 'antd';
import { useGetAllRequestQuery, useUpdateRequestMutation } from 'app/api/requestService';

function UpdateRequest() {
    const [update] = useUpdateRequestMutation();
    const { data: requests, isError, isLoading } = useGetAllRequestQuery();
    const updateRequest = (values, approved) => {
        update({
            data: {
                ...values,
                approved,
            },
            id: values.id,
        })
            .then((res) => {
                console.log(res);
                message.success('Successfully');
            })
            .catch((err) => console.log(err));
    };
    if (isError) {
        return <h1>Something went wrong!</h1>;
    } else if (isLoading) {
        return <h1>Loading ... </h1>;
    }

    const columns = [
        {
            title: 'Order',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: 'Word',
            dataIndex: 'word',
            key: 'word',
        },
        {
            title: 'Furigana',
            dataIndex: 'furigana',
            key: 'furigana',
        },
        {
            title: 'Meaning',
            dataIndex: 'meaning',
            key: 'meaning',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Example',
            dataIndex: 'example',
            key: 'example',
        },
        {
            title: 'ExampleMeaning',
            dataIndex: 'exampleMeaning',
            key: 'exampleMeaning',
        },
        {
            title: 'Actions',
            dataIndex: '',
            key: 'x',
            render: (_, record) => (
                <div className="table-actions">
                    <Button type="primary" onClick={() => updateRequest(record, 1)}>
                        Approved
                    </Button>
                    <Button type="primary" onClick={() => updateRequest(record, 2)} danger>
                        Denied
                    </Button>
                </div>
            ),
        },
    ];

    const tableData = requests.map((current, index) => {
        return { ...current, key: current.id, index: index + 1 };
    });
    return (
        <div className="update-request">
            <Table pagination={{ pageSize: 10 }} columns={columns} dataSource={tableData} size="large" />
        </div>
    );
}

export default UpdateRequest;
