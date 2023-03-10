import {
  Edit,
  ReferenceInput,
  SaveButton,
  SelectInput,
  SimpleForm,
  ToolbarProps,
  Toolbar,
} from "react-admin";

const CustomToolbar = (props: ToolbarProps) => (
  <Toolbar {...props}>
    <SaveButton />
  </Toolbar>
);

const ItemEdit = () => {
  return (
    <Edit>
      <SimpleForm toolbar={<CustomToolbar />}>
        <SelectInput
          label="庫存狀態"
          source="item_status"
          defaultValue="2"
          choices={[
            {
              id: "0",
              name: "上架",
            },
            {
              id: "1",
              name: "已出租",
            },
            {
              id: "2",
              name: "未出租",
            },
            {
              id: "3",
              name: "下架",
            },
          ]}
        />
        <ReferenceInput label="對應產品" source="product" reference="product" />
      </SimpleForm>
    </Edit>
  );
};

export default ItemEdit;
