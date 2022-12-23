import { RichTextInput } from "ra-input-rich-text";
import { useState } from "react";
import {
  AutocompleteArrayInput,
  Create,
  ImageInput,
  ReferenceArrayInput,
  SelectInput,
  SimpleForm,
  TextInput,
  number,
  required,
} from "react-admin";

const ProductCreate = () => {
  const [imagePreview, serImagePreview] = useState<string>("");
  const [imageFile, setImageFile] = useState<File>();

  return (
    <Create
      mutationOptions={{
        meta: {
          imageFile: {
            file: imageFile,
            source: "product_image",
          },
        },
      }}
    >
      <SimpleForm>
        <TextInput
          label="產品名稱"
          source="product_name"
          validate={required()}
        />
        <ReferenceArrayInput source="product_type" reference="productType">
          <AutocompleteArrayInput label="產品種類" />
        </ReferenceArrayInput>
        <ImageInput
          label="產品圖片"
          onChange={(file) => {
            setImageFile(file);
            const objectURL = URL.createObjectURL(file);
            serImagePreview(objectURL);
          }}
          placeholder="點此上傳圖片"
          source="product_image"
        />
        {imagePreview && <img style={{ width: "100%" }} src={imagePreview} />}
        <TextInput
          label="產品價格"
          source="product_price"
          fullWidth
          validate={[required(), number()]}
        />
        <TextInput
          source="product_fine"
          fullWidth
          validate={(required(), number())}
        />
        <SelectInput
          label="產品尺寸"
          defaultValue="S"
          source="product_size"
          choices={[
            { id: "S", name: "Small" },
            { id: "M", name: "Medium" },
            { id: "L", name: "Large" },
            { id: "XL", name: "Extra Large" },
          ]}
        />
        <RichTextInput source="product_description" label="產品敘述" />
      </SimpleForm>
    </Create>
  );
};

export default ProductCreate;
