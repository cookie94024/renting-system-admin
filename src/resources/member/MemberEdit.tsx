import {
  DateInput,
  DeleteButton,
  Edit,
  SelectInput,
  SimpleForm,
  TextField,
  TextInput,
  useSaveContext,
} from "react-admin";

const MemberEdit = () => {
  const transform = (data: any) => ({
    member_name: data.member_name,
    member_addr: data.member_addr,
    member_birth: data.member_birth,
    member_phone: data.member_phone,
  });
  return (
    <Edit mutationMode="pessimistic" transform={transform}>
      <SimpleForm>
        <TextInput source="member_name" label="會員名稱" disabled />
        <SelectInput
          choices={[
            {
              id: "0",
              name: "女性",
            },
            {
              id: "1",
              name: "男性",
            },
            {
              id: "2",
              name: "不選擇",
            },
          ]}
          source="member_sex"
          label="會員性別"
        />
        <TextInput source="member_addr" label="會員地址" />
        <DateInput source="member_birth" label="會員出生" />
        <TextInput source="member_phone" label="會員電話" />
      </SimpleForm>
    </Edit>
  );
};

export default MemberEdit;
