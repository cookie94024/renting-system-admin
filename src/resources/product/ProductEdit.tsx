import { useState } from "react";
import {
  Edit,
  SimpleForm,
  AutocompleteArrayInput,
  ImageInput,
  ReferenceArrayInput,
  TextInput,
  useEditContext,
  SelectInput,
} from "react-admin";
import { useWatch } from "react-hook-form";
import { MEDIA_BASE } from "../../constants";
import { RichTextInput } from "ra-input-rich-text";

const ProductImageField = ({ imagePreview }: { imagePreview: string }) => {
  const imageUrl = useWatch({ name: "product_image" });
  const fullImageUrl = `${MEDIA_BASE}${imageUrl}`;
  if (!imageUrl && !imagePreview) return null;

  return <img style={{ width: "100%" }} src={imagePreview || fullImageUrl} />;
};

export default function ProductEdit() {
  const [imagePreview, serImagePreview] = useState<string>("");
  const [imageFile, setImageFile] = useState<File>();

  return (
    <Edit
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
        <TextInput label="產品名稱" source="product_name" />
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
        <ProductImageField imagePreview={imagePreview} />
        <TextInput label="產品價格" source="product_price" fullWidth />
        <TextInput source="product_fine" fullWidth />
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
    </Edit>
  );
}
