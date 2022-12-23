import { Create, SimpleForm, TextInput } from "react-admin";

export default function ProductTypeCreate() {
  return (
    <Create>
      <SimpleForm>
        <TextInput label="種類名稱" source="name" />
      </SimpleForm>
    </Create>
  );
}
