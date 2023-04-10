import {
  Button,
  Container,
  Dialog,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  postRecado,
  selectById,
  updateRecado,
} from "../../store/modules/recados/RecadosSlice";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { UserApi } from "../../store/modules/user/UserSlice";

interface ModalRecadoProps {
  isOpen: boolean;
  actionCancel: () => void;
  idEdition?: number;
  edition: boolean;
  user: UserApi | undefined;
}

const ModalRecado: React.FC<ModalRecadoProps> = (props) => {
  const { isOpen, actionCancel, idEdition, edition, user } = props;
  const dispatch = useAppDispatch();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [assunto, setAssunto] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [idEdicao, setIdEdicao] = useState<number>(0);
  const [status, setStatus] = React.useState<string>("em-andamento");
  const [arquivar, setArquivar] = useState<boolean>(false);

  const salvarRecado = () => {
    if (user) {
      dispatch(
        postRecado({
          assunto,
          descricao,
          arquivado: false,
          status,
          userId: user.id,
        })
      );
      closeModal();
    }
  };

  const editarRecado = () => {
    if (recadoEncontrado) {
      dispatch(
        updateRecado({
          id: recadoEncontrado.id,
          status: status,
          assunto: assunto,
          descricao: descricao,
          arquivado: arquivar,
          qtdRecados: recadoEncontrado.qtdRecados,
          createdAt: recadoEncontrado.createdAt,
          updatedAt: recadoEncontrado.updatedAt,
          user: recadoEncontrado.user,
        })
      );
    }
    closeModal();
  };

  const closeModal = () => {
    actionCancel();
    setAssunto("");
    setDescricao("");
    setStatus("em-andamento");
    setOpenModal(false);
  };

  useEffect(() => {
    setOpenModal(isOpen);
    if (edition && idEdition) {
      setIdEdicao(idEdition);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const recadoEncontrado = useAppSelector((item) => selectById(item, idEdicao));

  useEffect(() => {
    if (edition && recadoEncontrado) {
      setAssunto(recadoEncontrado.assunto);
      setDescricao(recadoEncontrado.descricao);
      setStatus(recadoEncontrado.status);
      setArquivar(recadoEncontrado.arquivado);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idEdicao]);

  return (
    <Dialog open={openModal}>
      <DialogTitle className="flex justify-center">
        {edition ? "Editar Recado" : "Novo Recado"}
      </DialogTitle>
      <Container>
        <Typography variant="subtitle1">Titulo</Typography>
        <TextField
          fullWidth
          value={assunto}
          onChange={(e) => setAssunto(e.target.value)}
        />
        <Typography variant="subtitle1">Descrição</Typography>
        <TextField
          fullWidth
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <Typography variant="subtitle1">Status</Typography>
        <Select
          labelId="demo-select-small"
          id="demo-select-small"
          value={status}
          onChange={(e: any) => setStatus(e.target.value)}
          fullWidth
        >
          <MenuItem value={"em-andamento"}>Em andamento</MenuItem>
          <MenuItem value={"cancelado"}>Cancelado</MenuItem>
          <MenuItem value={"concluido"}>Concluído</MenuItem>
        </Select>
        <Container sx={{ mt: 2, mb: 3 }}>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              onClick={() => (edition ? editarRecado() : salvarRecado())}
            >
              {edition ? "Editar Recado" : "Salvar"}
            </Button>
            <Button variant="outlined" onClick={closeModal}>
              Cancelar
            </Button>
          </Stack>
        </Container>
      </Container>
    </Dialog>
  );
};

export default ModalRecado;
