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
  Grid,
  IconButton,
  Pagination,
  PaginationItem,
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
  getAllRecadosPageableArchive,
  getAllRecadosPageableUnarchive,
  RecadoApi,
  selectAll,
  updateRecado,
} from "../../store/modules/recados/RecadosSlice";
import { SearchBar } from "../SearchBar/SearchBar";
import { PaginationContainer } from "./styles";
import { Link } from "react-router-dom";
import SmartText from "../seeMore/seeMore";

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
}));

export const Tabela = () => {
  const dispatch = useAppDispatch();

  const url = window.location.href.split("/");
  const urlCurrentePage = url[4].split("=");

  const [currentPage, setCurrentPage] = useState<number>(
    Number(urlCurrentePage[1])
  );
  const [modal, setModal] = useState<boolean>(false);
  const [edicao, setEdicao] = useState<boolean>(false);
  const [idRecado, setIdRecado] = useState<number>();
  const [arquivar, setArquivar] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("em-andamento");
  const [assunto, setAssunto] = useState<string>("");
  const [render, setRender] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const user = Object.values(useAppSelector((store) => store.users.entities));
  const recados = Object.values(
    useAppSelector((store) => store.recados.entities)
  );

  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
  };

  window.addEventListener("load", handleWindowResize);
  window.addEventListener("resize", handleWindowResize);
  // window.addEventListener("hashchange", handleWindowResize);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const size = 10;
  let page = 1;
  if (recados[0]) {
    page = arquivar
      ? Math.ceil(recados[0].user.qtdRecadosArquivados / 10)
      : Math.ceil(recados[0].user.qtdRecadosDesarquivados / 10);
  }

  useEffect(() => {
    if (user[0]) {
      if (arquivar) {
        dispatch(
          getAllRecadosPageableArchive({
            userId: user[0].id,
            page: currentPage - 1,
            size,
          })
        );
      } else {
        dispatch(
          getAllRecadosPageableUnarchive({
            userId: user[0].id,
            page: currentPage - 1,
            size,
          })
        );
      }
    }
  }, [currentPage, arquivar, render]);

  const handleChange = () => {
    setArquivar(!arquivar);
  };

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
    setRender(!render);
    dispatch(
      updateRecado({
        id: recado.id,
        status: recado.status,
        assunto: recado.assunto,
        descricao: recado.descricao,
        arquivado: true,
        qtdRecados: recado.qtdRecados,
        createdAt: recado.createdAt,
        updatedAt: recado.updatedAt,
        user: recado.user,
      })
    );
  };

  const desarquivarRecado = (recado: RecadoApi) => {
    setRender(!render);
    dispatch(
      updateRecado({
        id: recado.id,
        status: recado.status,
        assunto: recado.assunto,
        descricao: recado.descricao,
        arquivado: false,
        qtdRecados: recado.qtdRecados,
        createdAt: recado.createdAt,
        updatedAt: recado.updatedAt,
        user: recado.user,
      })
    );
  };

  const listaRecadosRdx = useAppSelector(selectAll);

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <div className="justify-center flex mt-7">
            <SearchBar
              search={true}
              assunto={assunto}
              setAssunto={setAssunto}
              status={status}
              setStatus={setStatus}
              id={user[0] ? user[0].id : 0}
            />
          </div>
          <Container sx={{ mt: 3 }}>
            <div className="w-[100%] h-[45px] justify-around flex mb-4">
              <Button variant="text" onClick={handleChange}>
                <Checkbox
                  checked={arquivar}
                  inputProps={{ "aria-label": "controlled" }}
                />
                <div className="text-[15px]">ARQUIVADOS</div>
              </Button>
              <div className="flex">
                <Button variant="contained" onClick={openModal}>
                  <div className="text-[15px]">ADICIONAR RECADO</div>
                </Button>
              </div>
            </div>
            <TableContainer component={Paper}>
              <Table aria-label="customized table">
                <TableHead className="h-10">
                  <TableRow>
                    <StyledTableCell align="center" className="w-[10%]">
                      DATA
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
                  {listaRecadosRdx?.map((recado: RecadoApi) => (
                    <StyledTableRow key={recado.id}>
                      <>
                        <StyledTableCell className="border-r-2">
                          <div className="text-[14px]">{recado.createdAt}</div>
                        </StyledTableCell>
                        <StyledTableCell align="center" className="border-r-2">
                          {recado.status}
                        </StyledTableCell>
                        <StyledTableCell align="center" className="border-r-2">
                          {recado.assunto}
                        </StyledTableCell>
                        <StyledTableCell
                          sx={{ padding: "10px" }}
                          align="center"
                          className="border-r-2"
                        >
                          <SmartText
                            text={recado.descricao}
                            length={windowWidth != 0 ? windowWidth / 12 : 130}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <Stack
                            direction="row"
                            spacing={0}
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <IconButton onClick={() => deletarRecado(recado)}>
                              <DeleteForeverIcon sx={{ fontSize: 30 }} />
                            </IconButton>
                            <IconButton onClick={() => editarRecado(recado.id)}>
                              <EditIcon sx={{ fontSize: 30 }} />
                            </IconButton>
                            <IconButton
                              onClick={() =>
                                arquivar
                                  ? desarquivarRecado(recado)
                                  : arquivarRecado(recado)
                              }
                            >
                              {arquivar ? (
                                <UnarchiveIcon sx={{ fontSize: 30 }} />
                              ) : (
                                <ArchiveIcon sx={{ fontSize: 30 }} />
                              )}
                            </IconButton>
                          </Stack>
                        </StyledTableCell>
                      </>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {/* eslint-disable react/jsx-props-no-spreading */}
            <PaginationContainer>
              <Pagination
                onChange={handleChangePage}
                page={currentPage}
                count={page}
                size="large"
                variant="outlined"
                renderItem={(item) => (
                  <PaginationItem
                    component={Link}
                    to={`/recados/page=${item.page}`}
                    {...item}
                  />
                )}
              />
            </PaginationContainer>
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
