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
  getRecadosSearch,
  RecadoApi,
  selectAll,
  updateRecado,
} from "../../store/modules/recados/RecadosSlice";
import { SearchBar } from "../SearchBar/SearchBar";
import SmartText from "../seeMore/seeMore";
import { PaginationContainer } from "../tabelaCompleta/styles";
import { Link } from "react-router-dom";

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

interface TabelaSearchProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TabelaSearch = (props: TabelaSearchProps) => {
  const { setLoading } = props;
  const url = window.location.href.split("/");
  const assuntoPage = url[3].split("=")[1];
  const statusPage = url[4];
  const urlCurrentePage = url[4].split("=");
  const dispatch = useAppDispatch();

  const [currentPage, setCurrentPage] = useState<number>(
    Number(urlCurrentePage[1])
  );

  const [page, setPage] = useState<number>(1);
  const [modal, setModal] = useState<boolean>(false);
  const [edicao, setEdicao] = useState<boolean>(false);
  const [idRecado, setIdRecado] = useState<number>();
  const [status, setStatus] = useState<string>(statusPage);
  const [render, setRender] = useState<boolean>(false);
  const [assunto, setAssunto] = useState<string>(assuntoPage);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [nadaEncontrado, setNadaEncontrado] = useState<boolean>(false);
  // const [error, setError] = useState<boolean>(false);
  // const [response, setResponse] = useState<string>("");

  const user = Object.values(useAppSelector((store) => store.users.entities));

  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
  };
  window.addEventListener("load", handleWindowResize);
  window.addEventListener("resize", handleWindowResize);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const handleFunction = () => {
    setRender(!render);
  };

  useEffect(() => {
    const recados = async () => {
      // setError(false);
      setNadaEncontrado(false);
      setLoading(true);
      const getRecados = await dispatch(
        getRecadosSearch({
          id: user[0] ? user[0].id : 0,
          search: assunto == "" ? "todos" : assunto,
          status: status,
          page: page - 1,
          size: 10,
        })
      );
      if (getRecados.payload.totalElements > 0) {
        setLoading(false);
        setPage(Math.ceil(getRecados.payload.totalElements / 10));
      } else if (getRecados.payload.totalElements == 0) {
        setLoading(false);
        setNadaEncontrado(true);
      } else {
        setLoading(false);
        // setError(true);
        // setResponse(getRecados.payload.response.data.message);
      }
    };
    recados();
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
        userId: user[0] ? user[0]?.id : 0,
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
        userId: user[0] ? user[0]?.id : 0,
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
              handleFunction={handleFunction}
              setRender={setRender}
              render={render}
              id={user[0] ? user[0].id : 0}
            />
          </div>
          <Container sx={{ mt: 3 }}>
            <div className="justify-around flex">
              <Button variant="contained" sx={{ mb: 2 }} onClick={openModal}>
                ADICIONAR RECADO
              </Button>
            </div>
            {nadaEncontrado && (
              <div className="flex ml-[5%] w-[90%] justify-start mt-[20px] text-[24px]">
                Nenhum recado foi encontrado.
              </div>
            )}
            {!nadaEncontrado && (
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
                    {listaRecadosRdx?.map((recado: RecadoApi) => (
                      <StyledTableRow key={recado.id}>
                        <>
                          <StyledTableCell className="border-r-2">
                            <div className="text-[14px]">
                              {recado.createdAt}
                            </div>
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
                              <IconButton
                                sx={{ padding: "0px", marginRight: "5px" }}
                                onClick={() => deletarRecado(recado)}
                              >
                                <DeleteForeverIcon sx={{ fontSize: 30 }} />
                              </IconButton>
                              <IconButton
                                sx={{ padding: "0px", marginRight: "5px" }}
                                onClick={() => editarRecado(recado.id)}
                              >
                                <EditIcon sx={{ fontSize: 30 }} />
                              </IconButton>
                              <IconButton
                                sx={{ padding: "0px", marginRight: "0px" }}
                                onClick={() =>
                                  recado.arquivado
                                    ? desarquivarRecado(recado)
                                    : arquivarRecado(recado)
                                }
                              >
                                {recado.arquivado ? (
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
            )}
            {/* eslint-disable react/jsx-props-no-spreading */}
            {!nadaEncontrado && (
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
                      to={`//search=${assunto}/${status}/page=${item.page}`}
                      {...item}
                    />
                  )}
                />
              </PaginationContainer>
            )}
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
