import axios from "axios";
import {
  Button,
  DateField,
  FunctionField,
  ReferenceArrayField,
  ReferenceField,
  SelectField,
  Show,
  SimpleShowLayout,
  TextField,
} from "react-admin";
import { API_BASE } from "../../constants";

export default function OrderShow() {
  const handleReturn = (orderId: string) => {
    axios.post(API_BASE + "/api/returnRecord/", {
      order: orderId,
      Authorization: "Token " + localStorage.getItem("token"),
    });
  };
  return (
    <Show>
      <SimpleShowLayout spacing={3}>
        <TextField source="id" label="訂單編號" />
        <DateField source="order_datetime" label="下訂時間" />
        <DateField source="rent_datetime" label="歸還時間" />
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
        <FunctionField
          label="歸還訂單"
          render={(record: any) => {
            return (
              <Button
                label="點此歸還此訂單"
                onClick={(e) => handleReturn(record.id)}
              />
            );
          }}
        />
      </SimpleShowLayout>
    </Show>
  );
}
