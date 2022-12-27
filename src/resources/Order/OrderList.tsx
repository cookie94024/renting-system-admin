import axios from "axios";
import {
  Datagrid,
  DateField,
  List,
  ReferenceArrayField,
  ReferenceField,
  SearchInput,
  SelectField,
  TextField,
} from "react-admin";

const orderFilter = [
  <SearchInput source="q" placeholder="搜尋訂單 ID" alwaysOn />,
];

export const OrderList = () => {
  return (
    <List filters={orderFilter}>
      <Datagrid rowClick="show">
        <TextField source="id" label="訂單編號" />
        <DateField source="order_datetime" label="下訂時間" />
        <DateField source="rent_datetime" label="租借時間" />
        <SelectField
          source="order_status"
          label="訂單狀態"
          choices={[
            {
              id: "0",
              name: "配送中",
            },
            {
              id: "1",
              name: "尚未配送",
            },
            {
              id: "2",
              name: "已送達",
            },
            {
              id: "3",
              name: "訂單未成立",
            },
          ]}
        />
        <ReferenceField
          link="show"
          label="會員"
          source="member"
          reference="member"
        />
        <ReferenceArrayField label="下單商品" source="item" reference="item" />
      </Datagrid>
    </List>
  );
};
