import React from 'react';
// import { styled } from '@mui/material/styles';
// import { TableCell, tableCellClasses, Typography, Stack, IconButton } from '@mui/material';
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import EditIcon from "@mui/icons-material/Edit";

// export const table = () => {
//   const StyledTableCell = styled(TableCell)(({ theme }) => ({
//     [`&.${tableCellClasses.head}`]: {
//       backgroundColor: theme.palette.common.black,
//       color: theme.palette.common.white,
//     },
//     [`&.${tableCellClasses.body}`]: {
//       fontSize: 14,
//     },
//   }));
  
// return (
//   <>
//   <StyledTableCell>
//     <Typography variant="h5">
//       <b>{recado.id}</b>
//     </Typography>
//   </StyledTableCell><StyledTableCell align="center">
//       {recado.assunto}
//     </StyledTableCell><StyledTableCell align="center">
//       {recado.descricao}
//     </StyledTableCell><StyledTableCell align="center">
//       <Stack
//         direction="row"
//         spacing={2}
//         sx={{ display: "flex", justifyContent: "center" }}
//       >
//         <IconButton onClick={() => deletarRecado(recado)}>
//           <DeleteForeverIcon sx={{ fontSize: 35 }} />
//         </IconButton>
//         <IconButton onClick={() => editarRecado(recado.id)}>
//           <EditIcon sx={{ fontSize: 35 }} />
//         </IconButton>
//         <IconButton onClick={() => desarquivarRecado(recado)}>
//           <UnarchiveIcon sx={{ fontSize: 35 }} />
//         </IconButton>
//       </Stack>
//     </StyledTableCell>
//     </>
// }