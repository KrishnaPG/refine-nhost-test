import { IResourceComponentsProps } from "@pankod/refine-core";

import {
    List,
    Table,
    useTable,
    Space,
    EditButton,
    DeleteButton,
    DateField,
    getDefaultSortOrder,
} from "@pankod/refine-antd";

import { ITenant } from "interfaces";

export const TenantsList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps, sorter } = useTable<ITenant>({
        initialSorter: [
            {
                field: "id",
                order: "asc",
            },
        ],
        metaData: {
            fields: ["id", "title", "created_at"],
        },
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column dataIndex="title" title="Title" />
                <Table.Column
                    dataIndex="created_at"
                    title="Created At"
                    render={(value) => <DateField value={value} format="LLL" />}
                    defaultSortOrder={getDefaultSortOrder("created_at", sorter)}
                    sorter
                />
                <Table.Column<ITenant>
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record) => (
                        <Space>
                            <EditButton
                                size="small"
                                hideText
                                recordItemId={record.id}
                            />
                            <DeleteButton
                                size="small"
                                hideText
                                recordItemId={record.id}
                            />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};
