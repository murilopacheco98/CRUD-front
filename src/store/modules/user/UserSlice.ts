import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { api } from "../../../service/api/api";
import { RootState } from "../..";
import { AxiosResponse } from "axios";
import { SignInDto, SignUpDto } from "../../../types/Users";

export interface UserApi {
  id: number;
  email: string;
  password: string;
  name: string;
  qtdRecadosArquivados: number;
  qtdRecadosDesarquivados: number;
  createdAt: string;
  updateAt: string | null;
  authToken: string;
}

export const getAllUsers = createAsyncThunk("users/getAll", async () => {
  const response = await api
    .get("/user/getall")
    .then((users: AxiosResponse) => {
      return users.data;
    })
    .catch((erro: AxiosResponse) => {
      return erro;
    });
  return response;
});

export const postUserLogin = createAsyncThunk(
  "user/userLogin",
  async (dado: SignInDto) => {
    const response = await api
      .post("/user/login", dado)
      .then((users: AxiosResponse) => users.data)
      .catch((erro: AxiosResponse) => erro);
    return response;
  }
);

export const postUserRegister = createAsyncThunk(
  "user/userRegister",
  async (dado: SignUpDto) => {
    const response = await api
      .post("/user/register", dado)
      .then((users: AxiosResponse) => users.data)
      .catch((erro: AxiosResponse) => erro);
    return response;
  }
);

export const updateUser = createAsyncThunk(
  "users/updateRecado",
  async (dado: UserApi) => {
    const { id } = dado;
    const url = `/user/${id}`;
    const response = await api
      .put(url, dado)
      .then((users: AxiosResponse) => users.data)
      .catch((erro: AxiosResponse) => erro);
    return response;
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (dado: UserApi) => {
    const { id } = dado;
    const response = await api
      .delete(`/user/${id}`)
      .then((users: AxiosResponse) => users.data)
      .catch((erro: AxiosResponse) => erro);
    return response;
  }
);

export const logout = createAsyncThunk("user/logout", async () => {
  const response = console.log("Logout success.");
  return response;
});

const adapter = createEntityAdapter<UserApi>({
  selectId: (item) => item.id,
});

export const { selectAll, selectById, selectEntities, selectIds } =
  adapter.getSelectors((state: RootState) => state.users);

const UsersSlice = createSlice({
  name: "users",
  initialState: adapter.getInitialState({ loading: true }),
  reducers: {
    addOne: adapter.addOne, // post - create
    updateOne: adapter.updateOne, // put - update
    removeOne: adapter.removeOne, // delete - delete
  },
  extraReducers(builder) {
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.loading = false;
      adapter.setAll(state, action.payload); // get, read + seleciona todos na store
    });
    builder.addCase(postUserRegister.fulfilled, (state) => {
      state.loading = false;
      // adapter.addOne(state, action.payload); // post, create + addOne na store
    });
    builder.addCase(postUserLogin.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.id) {
        if (state.ids.length == 0) {
          adapter.addOne(state, action.payload); // post, create + addOne na store
        } else {
          adapter.removeAll(state);
          adapter.addOne(state, action.payload);
        }
      }
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      adapter.updateOne(state, {
        id: action.meta.arg.id,
        changes: action.meta.arg,
      }); // put, update + update na store
    });
    builder.addCase(deleteUser.fulfilled, (state) => {
      state.loading = false;
      // adapter.removeOne(state, action.meta.arg.id); // delete, delete + delete na store
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.loading = false;
      adapter.removeAll(state);
    });
  },
});

export const { addOne, updateOne, removeOne } = UsersSlice.actions;
export default UsersSlice.reducer;
