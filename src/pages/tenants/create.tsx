import { IResourceComponentsProps } from "@pankod/refine-core";

import { Create, Form, Input, useForm } from "@pankod/refine-antd";

import { ITenant } from "interfaces";

export const TenantsCreate: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps } = useForm<ITenant>();

    return (
        <Create saveButtonProps={saveButtonProps}>
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
        </Create>
    );
};
