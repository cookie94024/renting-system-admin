import {
  ChipField,
  Datagrid,
  DeleteButton,
  EditButton,
  List,
  ReferenceArrayField,
  SingleFieldList,
  TextField,
} from "react-admin";

const ProductList = () => {
  return (
    <List>
      <Datagrid rowClick="show">
        <TextField source="product_name" label="產品名稱" />
        <ReferenceArrayField
          source="product_type"
          reference="productType"
          label="產品種類"
        >
          <SingleFieldList linkType="show">
            <ChipField source="name" />
          </SingleFieldList>
        </ReferenceArrayField>
        <TextField source="product_price" label="產品價格" />
        <TextField source="product_fine" />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};

export default ProductList;
