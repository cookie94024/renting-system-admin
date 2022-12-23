import { Show, SimpleShowLayout, TextField } from "react-admin";

const ProductTypeShow = () => {
  return (
    <Show>
      <SimpleShowLayout spacing={3}>
        <TextField source="name" label="種類名稱" />
      </SimpleShowLayout>
    </Show>
  );
};

export default ProductTypeShow;
