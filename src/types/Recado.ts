import { UserApi } from "../store/modules/user/UserSlice";

interface RecadoSemId {
  assunto: string;
  descricao: string;
  arquivado: boolean;
  status: string;
  user: UserApi;
}

export default RecadoSemId;
