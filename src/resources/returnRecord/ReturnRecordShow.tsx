import axios from "axios";
import {
  BooleanField,
  Datagrid,
  DateField,
  FunctionField,
  ReferenceField,
  Show,
  SimpleShowLayout,
  TextField,
  useShowContext,
} from "react-admin";
import { useQuery } from "react-query";
import { API_BASE } from "../../constants";

const Penalty = () => {
  const { record } = useShowContext();

  const { data, isLoading } = useQuery(["penalty", record.id], async () => {
    const response = await axios.post(
      API_BASE + "/api/returnRecord/get_total_penalty/",
      {
        id: record.id,
      },
      {
        headers: {
          Authorization: "Token " + localStorage.getItem("token"),
        },
      }
    );

    return response.data;
  });

  if (isLoading) return null;

  console.log(data as "string" | []);

  const isString = typeof data === "string";
  const penalties =
    typeof data === "object" ? data?.map((object: any) => object.penalty) : [];

  return (
    <FunctionField
      label="歸還訂單"
      render={() => (
        <div>
          罰款: {isString && data}
          {penalties && penalties.join(", ")}
          {/* {data.penalty ? data.penalty.map((number: string) => number) : data} */}
        </div>
      )}
    />
  );
};

const ReturnRecordShow = () => {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="id" label="紀錄 ID" />
        <DateField source="return_datetime" label="歸還時間" />
        <BooleanField source="is_due" />
        <ReferenceField
          link="show"
          source="order"
          reference="order"
          label="訂單 ID"
        />
        <Penalty />
      </SimpleShowLayout>
    </Show>
  );
};

export default ReturnRecordShow;
