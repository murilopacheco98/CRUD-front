import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { api } from "../../../service/api/api";
import RecadoSemId from "../../../types/Recado";
import { RootState } from "../..";
import { AxiosResponse } from "axios";

export interface RecadoApi {
  id: number;
  assunto: string;
  descricao: string;
  arquivado: boolean;
  status: string;
}

export const getAllRecados = createAsyncThunk(
  "recados/getAllRecados",
  async () => {
    const response = await api
      .get('')
      .then((recados: AxiosResponse) => {
        return recados.data;
      })
      .catch((erro: AxiosResponse) => {
        return erro;
      });
    return response;
  }
);

type searchProps = {
  assunto: string,
  status: string,
}
export const getRecadosSearch = createAsyncThunk(
  "recados/getAllRecados",
  async ( dataSearch: searchProps) => {
    const requestParam = (`/?search=${dataSearch.assunto}&status=${dataSearch.status}`)
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
  async (dado: RecadoSemId) => {
    const response = await api
      .post("/", dado)
      .then((recados: AxiosResponse) => recados.data)
      .catch((erro: AxiosResponse) => erro);
    return response;
  }
);

export const updateRecado = createAsyncThunk(
  "recados/updateRecado",
  async (dado: RecadoApi) => {
    const { id } = dado;
    const url = `/${id}`;
    const response = await api
      .put(url, dado)
      .then((recados: AxiosResponse) => recados.data)
      .catch((erro: AxiosResponse) => erro);
    return response;
  }
);

export const deleteRecado = createAsyncThunk(
  "recados/deleteRecado",
  async (dado: RecadoApi) => {
    const { id } = dado;
    const response = await api
      .delete(`/${id}`)
      .then((recados: AxiosResponse) => recados.data)
      .catch((erro: AxiosResponse) => erro);
    return response;
  }
);

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
    builder.addCase((getAllRecados.fulfilled, getRecadosSearch.fulfilled), (state, action) => {
      state.loading = false;
      adapter.setAll(state, action.payload); // get, read + seleciona todos na store
    });
    // builder.addCase(getRecadosSearch.fulfilled, (state, action) => {
    //   state.loading = false;
    //   adapter.removeAll(state)
    //   adapter.setAll(state, action.payload) // get, read + seleciona todos na store
    // });
    builder.addCase(postRecado.fulfilled, (state, action) => {
      state.loading = false;
      adapter.addOne(state, action.payload); // post, create + addOne na store 
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
  },
});

export const { addOne, updateOne, removeOne } = RecadosSlice.actions;
export default RecadosSlice.reducer;
