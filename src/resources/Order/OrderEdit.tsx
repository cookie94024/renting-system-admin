import {
  DateInput,
  Edit,
  ReferenceArrayInput,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
} from "react-admin";

export const OrderEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" label="訂單編號" />
      <DateInput source="order_datetime" label="下訂時間" />
      <DateInput source="rent_datetime" label="租借時間" />
      <SelectInput
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
      <ReferenceInput label="會員" source="member" reference="member" />
      <ReferenceArrayInput label="下單商品" source="item" reference="item" />
    </SimpleForm>
  </Edit>
);

export default OrderEdit;
