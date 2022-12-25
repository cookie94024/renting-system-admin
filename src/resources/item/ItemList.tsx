import {
  Datagrid,
  DeleteButton,
  EditButton,
  List,
  ReferenceField,
  SelectField,
  TextField,
} from "react-admin";

const ItemList = () => {
  return (
    <List>
      <Datagrid rowClick="show">
        <TextField label="庫存 ID" source="id" />
        <SelectField
          label="庫存狀態"
          source="item_status"
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
              name: "未上架",
            },
            {
              id: "3",
              name: "下架",
            },
          ]}
        />
        <ReferenceField
          link="show"
          label="對應產品"
          source="product"
          reference="product"
        />
        <EditButton />
      </Datagrid>
    </List>
  );
};

export default ItemList;
