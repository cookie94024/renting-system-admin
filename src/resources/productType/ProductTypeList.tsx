import {
  Datagrid,
  EditButton,
  List,
  ReferenceArrayField,
  TextField,
} from "react-admin";

const ProductTypeList = () => {
  return (
    <List>
      <Datagrid rowClick="show">
        <TextField source="name" label="種類名稱" />
        <EditButton />
      </Datagrid>
    </List>
  );
};

export default ProductTypeList;
