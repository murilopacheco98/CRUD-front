import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import ArchiveIcon from "@mui/icons-material/Archive";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import ModalRecado from "../modal/Modal";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  deleteRecado,
  getRecadosAssuntoSearch,
  RecadoApi,
  selectAll,
  updateRecado,
} from "../../store/modules/recados/RecadosSlice";
import { SearchBar } from "../SearchBar/SearchBar";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const TabelaSearch = () => {
  const url = window.location.href.split("/");
  const assuntoPage = url[3].split("=")[1];
  const statusPage = url[4];
  const dispatch = useAppDispatch();

  const [modal, setModal] = useState<boolean>(false);
  const [edicao, setEdicao] = useState<boolean>(false);
  const [idRecado, setIdRecado] = useState<number>();
  const [arquivar, setArquivar] = useState<boolean>(false);
  const [status, setStatus] = useState<string>(statusPage);
  const [render, setRender] = useState<boolean>(false);
  const [assunto, setAssunto] = useState<string>(assuntoPage);

  const handleFunction = () => {
    setRender(!render);
  };

  useEffect(() => undefined, [arquivar]);

  useEffect(() => {
    dispatch(getRecadosAssuntoSearch({ assunto, status }));
  }, [render]);

  const openModal = () => {
    setModal(true);
    setEdicao(false);
  };

  const closeModal = () => {
    setModal(false);
    setEdicao(false);
  };

  const deletarRecado = (Recado: RecadoApi) => {
    dispatch(deleteRecado(Recado));
  };

  const editarRecado = (id: number) => {
    setIdRecado(id);
    openModal();
    setEdicao(true);
  };

  const arquivarRecado = (recado: RecadoApi) => {
    dispatch(
      updateRecado({
        id: recado.id,
        status: recado.status,
        assunto: recado.assunto,
        descricao: recado.descricao,
        arquivado: true,
        createdAt: recado.createdAt,
        updatedAt: recado.updatedAt,
      })
    );
  };

  const desarquivarRecado = (recado: RecadoApi) => {
    dispatch(
      updateRecado({
        id: recado.id,
        status: recado.status,
        assunto: recado.assunto,
        descricao: recado.descricao,
        arquivado: false,
        createdAt: recado.createdAt,
        updatedAt: recado.updatedAt,
      })
    );
  };

  const listaRecadosRdx = useAppSelector(selectAll);
  const user = Object.values(useAppSelector((store) => store.users.entities));

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          {/* <Container sx={{ mt: 3 }}> */}
          <div className="justify-center flex mt-7">
            <SearchBar
              search={true}
              assunto={assunto}
              setAssunto={setAssunto}
              status={status}
              setStatus={setStatus}
              handleFunction={handleFunction}
            />
          </div>
          {/* </Container> */}
          <Container sx={{ mt: 3 }}>
            <div className="justify-around flex">
              <FormControlLabel
                control={<Checkbox />}
                onClick={() => setArquivar(!arquivar)}
                label="ARQUIVADOS"
              />
              <Button variant="contained" sx={{ mb: 2 }} onClick={openModal}>
                ADICIONAR RECADO
              </Button>
            </div>
            <TableContainer component={Paper}>
              <Table aria-label="customized table">
                <TableHead className="h-10">
                  <TableRow>
                    <StyledTableCell align="center" className="w-[5%]">
                      ID
                    </StyledTableCell>
                    <StyledTableCell align="center" className="w-[10%]">
                      STATUS
                    </StyledTableCell>
                    <StyledTableCell align="center" className="w-[25%]">
                      ASSUNTO
                    </StyledTableCell>
                    <StyledTableCell align="center" className="w-[45%]">
                      DESCRIÇÃO
                    </StyledTableCell>
                    <StyledTableCell align="center" className="w-[15%]">
                      AÇÕES
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listaRecadosRdx.map((recado: RecadoApi) => (
                    <StyledTableRow key={recado.id}>
                      {arquivar
                        ? (() => {
                            if (recado.arquivado === true) {
                              return (
                                <>
                                  <StyledTableCell>
                                    <Typography variant="h5">
                                      <b>{recado.id}</b>
                                    </Typography>
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {recado.status}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {recado.assunto}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {recado.descricao}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    <Stack
                                      direction="row"
                                      spacing={0}
                                      sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                      }}
                                    >
                                      <IconButton
                                        onClick={() => deletarRecado(recado)}
                                      >
                                        <DeleteForeverIcon
                                          sx={{ fontSize: 35 }}
                                        />
                                      </IconButton>
                                      <IconButton
                                        onClick={() => editarRecado(recado.id)}
                                      >
                                        <EditIcon sx={{ fontSize: 35 }} />
                                      </IconButton>
                                      <IconButton
                                        onClick={() =>
                                          desarquivarRecado(recado)
                                        }
                                      >
                                        <UnarchiveIcon sx={{ fontSize: 35 }} />
                                      </IconButton>
                                    </Stack>
                                  </StyledTableCell>
                                </>
                              );
                            }
                          })()
                        : (() => {
                            if (recado.arquivado === false) {
                              return (
                                <>
                                  <StyledTableCell className="border-r-2">
                                    <Typography variant="h5">
                                      <b>{recado.id}</b>
                                    </Typography>
                                  </StyledTableCell>
                                  <StyledTableCell
                                    align="center"
                                    className="border-r-2"
                                  >
                                    {recado.status}
                                  </StyledTableCell>
                                  <StyledTableCell
                                    align="center"
                                    className="border-r-2"
                                  >
                                    {recado.assunto}
                                  </StyledTableCell>
                                  <StyledTableCell
                                    align="center"
                                    className="border-r-2"
                                  >
                                    {recado.descricao}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    <Stack
                                      direction="row"
                                      spacing={0}
                                      sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                      }}
                                    >
                                      <IconButton
                                        onClick={() => deletarRecado(recado)}
                                      >
                                        <DeleteForeverIcon
                                          sx={{ fontSize: 30 }}
                                        />
                                      </IconButton>
                                      <IconButton
                                        onClick={() => editarRecado(recado.id)}
                                      >
                                        <EditIcon sx={{ fontSize: 30 }} />
                                      </IconButton>
                                      <IconButton
                                        onClick={() => arquivarRecado(recado)}
                                      >
                                        <ArchiveIcon sx={{ fontSize: 30 }} />
                                      </IconButton>
                                    </Stack>
                                  </StyledTableCell>
                                </>
                              );
                            }
                          })()}
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </Grid>
      </Grid>
      <ModalRecado
        isOpen={modal}
        actionCancel={closeModal}
        idEdition={idRecado}
        edition={edicao}
        user={user[0]}
      ></ModalRecado>
    </>
  );
};
