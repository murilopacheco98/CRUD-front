import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { api } from "../../../service/api/api";
import RecadoSemId from "../../../types/Recado";
import { RootState } from "../..";
import { AxiosResponse } from "axios";
import { UserApi } from "../user/UserSlice";

export interface RecadoApi {
  id: number;
  assunto: string;
  descricao: string;
  arquivado: boolean;
  qtdRecados: number;
  status: string;
  createdAt: any;
  updatedAt: any;
  user: UserApi;
}

interface pageableProps {
  userId: number;
  page: number;
  size: number;
}

export const getAllRecadosPageableArchive = createAsyncThunk(
  "recados/getAllRecadosPageArchive",
  async (props: pageableProps) => {
    const { userId, page, size } = props;
    const response = await api
      .get(`/recados/pageable/archive/${userId}?page=${page}&size=${size}`)
      .then((recados: AxiosResponse) => {
        return recados.data.content;
      })
      .catch((erro: AxiosResponse) => {
        return erro;
      });
    return response;
  }
);

export const getAllRecadosPageableUnarchive = createAsyncThunk(
  "recados/getAllRecadosPageUnarchive",
  async (props: pageableProps) => {
    const { userId, page, size } = props;
    const response = await api
      .get(`/recados/pageable/unarchive/${userId}?page=${page}&size=${size}`)
      .then((recados: AxiosResponse) => {
        return recados.data.content;
      })
      .catch((erro: AxiosResponse) => {
        return erro;
      });
    return response;
  }
);

export interface searchProps {
  id: number;
  search: string;
  status: string;
}

export const getRecadosSearch = createAsyncThunk(
  "recados/getAllRecadosSearch",
  async (dataSearch: searchProps) => {
    const requestParam = `/recados/${dataSearch.id}?search=${dataSearch.search}&status=${dataSearch.status}`;
    const response = await api
      .get(requestParam)
      .then((recados: AxiosResponse) => {
        return recados.data;
      })
      .catch((erro: AxiosResponse) => {
        return erro;
      });
    return response;
  }
);

export const postRecado = createAsyncThunk(
  "recados/postRecado",
  async (props: RecadoSemId) => {
    const response = await api
      .post(`/recados/create`, props)
      .then((recados: AxiosResponse) => recados.data)
      .catch((erro: AxiosResponse) => erro);
    return response;
  }
);

export const updateRecado = createAsyncThunk(
  "recados/updateRecado",
  async (dado: RecadoApi) => {
    const { id, user } = dado;
    const url = `/recados/${user.id}/${id}`;
    const response = await api
      .post(url, dado)
      .then((recados: AxiosResponse) => recados.data)
      .catch((erro: AxiosResponse) => erro);
    return response;
  }
);

export const deleteRecado = createAsyncThunk(
  "recados/deleteRecado",
  async (dado: RecadoApi) => {
    const { id, user } = dado;
    const response = await api
      .delete(`/recados/${user.id}/${id}`)
      .then((recados: AxiosResponse) => recados.data)
      .catch((erro: AxiosResponse) => erro);
    return response;
  }
);

export const logoutRecado = createAsyncThunk("recado/logout", async () => {
  const response = console.log("Logout recado success.");
  return response;
});

const adapter = createEntityAdapter<RecadoApi>({
  selectId: (item) => item.id,
});

export const { selectAll, selectById, selectEntities, selectIds } =
  adapter.getSelectors((state: RootState) => state.recados);

const RecadosSlice = createSlice({
  name: "recados",
  initialState: adapter.getInitialState({ loading: false }),
  reducers: {
    addOne: adapter.addOne, // post - create
    updateOne: adapter.updateOne, // put - update
    removeOne: adapter.removeOne, // delete - delete
  },
  extraReducers(builder) {
    builder.addCase(getAllRecadosPageableArchive.fulfilled, (state, action) => {
      state.loading = false;
      adapter.setAll(state, action.payload); // get, read + seleciona todos na store
    });
    builder.addCase(
      getAllRecadosPageableUnarchive.fulfilled,
      (state, action) => {
        state.loading = false;
        adapter.setAll(state, action.payload); // get, read + seleciona todos na store
      }
    );
    builder.addCase(getRecadosSearch.fulfilled, (state, action) => {
      state.loading = false;
      adapter.setAll(state, action.payload); // get, read + seleciona todos na store
    });
    builder.addCase(postRecado.fulfilled, (state, action) => {
      state.loading = false;
      if (state.ids.length < 10) {
        adapter.addOne(state, action.payload);
      } // post, create + addOne na store
    });
    builder.addCase(updateRecado.fulfilled, (state, action) => {
      state.loading = false;
      adapter.updateOne(state, {
        id: action.meta.arg.id,
        changes: action.meta.arg,
      }); // put, update + update na store
    });
    builder.addCase(deleteRecado.fulfilled, (state, action) => {
      state.loading = false;
      adapter.removeOne(state, action.meta.arg.id); // delete, delete + delete na store
    });
    builder.addCase(logoutRecado.fulfilled, (state) => {
      state.loading = false;
      adapter.removeAll(state);
    });
  },
});

export const { addOne, updateOne, removeOne } = RecadosSlice.actions;
export default RecadosSlice.reducer;
