import { Edit, SimpleForm, TextInput } from "react-admin";

export default function ProductTypeEdit() {
  return (
    <Edit>
      <SimpleForm>
        <TextInput label="種類名稱" source="name" />
      </SimpleForm>
    </Edit>
  );
}
