import {
  BooleanField,
  Datagrid,
  DateField,
  List,
  ListBase,
  ListContextProvider,
  ReferenceField,
  TextField,
  useList,
} from "react-admin";
import MuiTextField from "@mui/material/TextField";
import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { API_BASE } from "../../constants";
import { debounce, toNumber } from "lodash";

const ReturnRecordList = () => {
  const [userId, setUserId] = useState(0);

  const { data: filteredList, isLoading } = useQuery(
    ["returnRecord search", userId],
    async () => {
      const response = await axios.post(
        API_BASE + "/api/returnRecord/list_duerecord_by_member_id/",
        {
          member: userId,
        },
        {
          headers: {
            Authorization: "Token " + localStorage.getItem("token"),
          },
        }
      );

      return response.data;
    },
    {
      enabled: Boolean(userId),
    }
  );

  const debounceSetUserId = useMemo(
    () =>
      debounce((userId: number) => {
        setUserId(userId);
      }),
    []
  );

  const listContent = useList({ data: filteredList, isLoading });

  console.log(filteredList, Boolean(userId));

  return (
    <>
      <div style={{ width: "100%", marginBottom: 20, marginTop: 20 }}>
        <MuiTextField
          size="small"
          type="number"
          placeholder="會員 ID"
          value={userId === 0 ? "" : userId}
          onChange={(e) => {
            if (!Number.isNaN(toNumber(e.target.value)))
              debounceSetUserId(toNumber(e.target.value));
          }}
        />
      </div>
      {Boolean(userId) ? (
        <ListContextProvider value={listContent}>
          {filteredList?.length !== 0 ? (
            <Datagrid isLoading={isLoading} rowClick="show">
              <TextField source="id" label="紀錄 ID" />
              <DateField source="return_datetime" label="歸還時間" />
              <BooleanField source="is_due" />
              <ReferenceField
                link="show"
                source="order"
                reference="order"
                label="訂單 ID"
              />
            </Datagrid>
          ) : (
            "No result found"
          )}
        </ListContextProvider>
      ) : (
        <ListBase>
          <Datagrid rowClick="show">
            <TextField source="id" label="紀錄 ID" />
            <DateField source="return_datetime" label="歸還時間" />
            <BooleanField source="is_due" />
            <ReferenceField
              link="show"
              source="order"
              reference="order"
              label="訂單 ID"
            />
          </Datagrid>
        </ListBase>
      )}
    </>
  );
};

export default ReturnRecordList;
