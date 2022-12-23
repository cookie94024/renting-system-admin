import { stringify } from "query-string";
import axios from "axios";
import {
  Identifier,
  PaginationPayload,
  FilterPayload,
  SortPayload,
  fetchUtils,
  DataProvider,
} from "ra-core";

export {
  default as tokenAuthProvider,
  fetchJsonWithAuthToken,
} from "./tokenAuthProvider";

export {
  default as jwtTokenAuthProvider,
  fetchJsonWithAuthJWTToken,
} from "./jwtTokenAuthProvider";

const getPaginationQuery = (pagination: PaginationPayload) => {
  return {
    page: pagination.page,
    page_size: pagination.perPage,
  };
};

const getFilterQuery = (filter: FilterPayload) => {
  const { q: search, ...otherSearchParams } = filter;
  return {
    ...otherSearchParams,
    search,
  };
};

export const getOrderingQuery = (sort: SortPayload) => {
  const { field, order } = sort;
  return {
    ordering: `${order === "ASC" ? "" : "-"}${field}`,
  };
};

export default (
  apiUrl: String,
  httpClient: Function = fetchUtils.fetchJson
): DataProvider => {
  const getOneJson = (resource: String, id: Identifier) =>
    httpClient(`${apiUrl}/${resource}/${id}/`).then(
      (response: Response) => response.json
    );

  return {
    getList: async (resource, params) => {
      const query = {
        ...getFilterQuery(params.filter),
        ...getPaginationQuery(params.pagination),
        ...getOrderingQuery(params.sort),
      };
      const url = `${apiUrl}/${resource}/?${stringify(query)}`;

      const { json } = await httpClient(url);

      return {
        data: json,
        total: json.length,
      };
    },

    getOne: async (resource, params) => {
      const data = await getOneJson(resource, params.id);
      return {
        data,
      };
    },

    getMany: (resource, params) => {
      return Promise.all(params.ids.map((id) => getOneJson(resource, id))).then(
        (data) => ({ data })
      );
    },

    getManyReference: async (resource, params) => {
      const query = {
        ...getFilterQuery(params.filter),
        ...getPaginationQuery(params.pagination),
        ...getOrderingQuery(params.sort),
        [params.target]: params.id,
      };
      const url = `${apiUrl}/${resource}/?${stringify(query)}`;

      const { json } = await httpClient(url);
      return {
        data: json,
        total: json.length,
      };
    },

    update: async (resource, params) => {
      const imageFile = params?.meta?.imageFile;
      if (imageFile && imageFile.file) {
        const { file, source } = imageFile;
        const formData = new FormData();
        formData.append("file", file);
        formData.append("remark", "product image");
        const token = localStorage.getItem("token");
        const response = await axios.post(`${apiUrl}/upload/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Token " + token,
          },
        });
        const filePath = response.data.file;

        const { json } = await httpClient(
          `${apiUrl}/${resource}/${params.id}/`,
          {
            method: "PATCH",
            body: JSON.stringify({ ...params.data, [source]: filePath }),
          }
        );
        return { data: json };
      }
      const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}/`, {
        method: "PATCH",
        body: JSON.stringify(params.data),
      });
      return { data: json };
    },

    updateMany: (resource, params) =>
      Promise.all(
        params.ids.map((id) =>
          httpClient(`${apiUrl}/${resource}/${id}/`, {
            method: "PATCH",
            body: JSON.stringify(params.data),
          })
        )
      ).then((responses) => ({ data: responses.map(({ json }) => json.id) })),

    create: async (resource, params) => {
      const imageFile = params?.meta?.imageFile;
      if (imageFile && imageFile.file) {
        const { file, source } = imageFile;
        const formData = new FormData();
        formData.append("file", file);
        formData.append("remark", "product image");
        const token = localStorage.getItem("token");
        const response = await axios.post(`${apiUrl}/upload/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Token " + token,
          },
        });
        const filePath = response.data.file;

        const { json } = await httpClient(`${apiUrl}/${resource}/`, {
          method: "POST",
          body: JSON.stringify({ ...params.data, [source]: filePath }),
        });
        return {
          data: { ...json },
        };
      }
      const { json } = await httpClient(`${apiUrl}/${resource}/`, {
        method: "POST",
        body: JSON.stringify({ ...params.data }),
      });
      return {
        data: { ...json },
      };
    },

    delete: (resource, params) =>
      httpClient(`${apiUrl}/${resource}/${params.id}/`, {
        method: "DELETE",
      }).then(() => ({ data: params.previousData })),

    deleteMany: (resource, params) =>
      Promise.all(
        params.ids.map((id) =>
          httpClient(`${apiUrl}/${resource}/${id}/`, {
            method: "DELETE",
          })
        )
      ).then(() => ({ data: [] })),
  };
};
