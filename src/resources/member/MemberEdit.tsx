import {
  DateInput,
  DeleteButton,
  Edit,
  SimpleForm,
  TextInput,
} from "react-admin";

const MemberEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" />
      <TextInput source="member_name" label="會員名稱" />
      <TextInput source="member_sex" label="會員性別" />
      <TextInput source="member_addr" label="會員地址" />
      <DateInput source="member_birth" label="會員出生" />
      <TextInput source="member_phone" label="會員電話" />
    </SimpleForm>
  </Edit>
);

export default MemberEdit;
