import * as React from "react";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import {
  UserApi,
  logout,
  resendConfirmEmail,
  updateOne,
} from "../../store/modules/user/UserSlice";
import { logoutRecado } from "../../store/modules/recados/RecadosSlice";
import { useEffect, useState } from "react";
import { Alert, Snackbar } from "@mui/material";

interface NavbarProps {
  user: UserApi | undefined;
}

export const Navbar = ({ user }: NavbarProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [enable, setEnable] = useState<boolean>(true);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (user) {
      setEnable(user.enable);
      if (user.enable == null) {
        setEnable(false);
      }
    }
  }, []);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const logoutUser = async () => {
    await dispatch(logoutRecado());
    await dispatch(logout());
    navigate("/");
  };

  const SendEmail = async () => {
    if (user) {
      const response = await dispatch(
        resendConfirmEmail({ email: user.email })
      );
      if (response.payload == "E-mail confirmado com sucesso.") {
        setOpen(true);
        dispatch(
          updateOne({
            id: user.id,
            changes: { enable: true },
          })
        );
        setEnable(true);
      }
    }
  };

  const closeAlert = () => {
    if (user) {
      dispatch(
        updateOne({
          id: user.id,
          changes: { enable: true },
        })
      );
      setEnable(true);
    }
  };

  return (
    <>
      <div className="w-[100%] bg-blue-500 h-[125px] flex justify-center items-center">
        <div className="w-[70%] ml-[15%] h-[100px] flex flex-col justify-center items-center">
          <div>
            <Link to={`/recados/page=1`} className="flex items-center">
              <TextSnippetIcon sx={{ fontSize: 40, color: "white" }} />
              <div className="text-[36px] font-bold text-white">API - CRUD</div>
            </Link>
          </div>
          <div className="text-white text[18px]">Gerenciamento de recados</div>
        </div>
        <div className="w-[15%]">
          <div
            onClick={logoutUser}
            className="rounded-full border-[1.5px] mb-[10px] w-[85px] 
          text-center text-white bg-blue-700 font-bold px-[15px] 
          py-[4px] cursor-pointer hover:bg-blue-600"
          >
            SAIR
          </div>
        </div>
      </div>
      {enable == false && (
        <div className="w-[100%] flex items-center justify-center px-[5%] bg-zinc-700  text-white">
          <div className="ml-[15%] flex w-[75%]">
            E-mail não confirmado, caso queria confirmar&nbsp;&nbsp;
            <div
              onClick={SendEmail}
              className="cursor-pointer underline text-blue-300"
            >
              clique aqui.
            </div>
          </div>
          <div
            onClick={closeAlert}
            className="w-[10%] text-[30px] cursor-pointer flex justify-end"
          >
            X
          </div>
        </div>
      )}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          E-mail enviado para o seu endereço de email.
        </Alert>
      </Snackbar>
    </>
  );
};
