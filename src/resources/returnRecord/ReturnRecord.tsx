import {
  BooleanField,
  Datagrid,
  DateField,
  DeleteButton,
  EditButton,
  List,
  ReferenceArrayField,
  ReferenceField,
  TextField,
} from "react-admin";

const ReturnRecordList = () => {
  return (
    <List>
      <Datagrid rowClick="show">
        <TextField source="id" label="紀錄 ID" />
        <DateField source="return_datetime" label="歸還時間" />
        <BooleanField source="is_due" />
        <ReferenceField
          link="show"
          source="order"
          reference="order"
          label="訂單 ID"
        />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};

export default ReturnRecordList;
