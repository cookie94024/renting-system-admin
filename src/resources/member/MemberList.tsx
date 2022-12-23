import {
  Datagrid,
  DateField,
  DeleteButton,
  List,
  NumberField,
  TextField,
} from "react-admin";

const MemberList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="member_name" label="會員名稱" />
      <TextField source="member_sex" label="會員性別" />
      <TextField source="member_addr" label="會員地址" />
      <DateField source="member_birth" label="會員出生" />
      <TextField source="member_phone" label="會員電話" />
      <DeleteButton />
    </Datagrid>
  </List>
);

export default MemberList;
