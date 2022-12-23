import {
  Datagrid,
  DeleteButton,
  EditButton,
  List,
  ReferenceArrayField,
  Show,
  SimpleShowLayout,
  TextField,
} from "react-admin";

const ProductShow = () => {
  return (
    <Show>
      <SimpleShowLayout spacing={3}>
        <TextField source="product_name" label="產品名稱" />
        <ReferenceArrayField
          source="product_type"
          reference="productType"
          label="產品種類"
        />
        <TextField source="product_price" label="產品價格" />
        <TextField source="product_fine" />
      </SimpleShowLayout>
    </Show>
  );
};

export default ProductShow;
