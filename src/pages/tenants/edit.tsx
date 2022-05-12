import { IResourceComponentsProps } from "@pankod/refine-core";

import {
    Edit,
    Form,
    Input,
    ListButton,
    RefreshButton,
    useForm,
} from "@pankod/refine-antd";

import { ITenant } from "interfaces";

export const TenantsEdit: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps, queryResult } = useForm<ITenant>({
        metaData: {
            fields: ["id", "title"],
        },
    });

    return (
        <Edit
            pageHeaderProps={{
                extra: (
                    <>
                        <ListButton />
                        <RefreshButton onClick={() => queryResult?.refetch()} />
                    </>
                ),
            }}
            saveButtonProps={saveButtonProps}
        >
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Edit>
    );
};
