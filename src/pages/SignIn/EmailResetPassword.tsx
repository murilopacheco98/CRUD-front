import React, { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { sendEmailResetPassword } from "../../store/modules/user/UserSlice";
import { TextField } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const EmailResetPassword = () => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState<string>("");
  const [sent, setSent] = useState<boolean>(false);
  const [resent, setResent] = useState<boolean>(false);
  const [open, setOpen] = React.useState(false);

  // const handleClick = () => {

  // };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const SendEmail = () => {
    dispatch(sendEmailResetPassword(email));
    setSent(true);
    setOpen(true);
  };

  const ResendEmail = () => {
    dispatch(sendEmailResetPassword(email));
    setResent(true);
    setOpen(true);
  };

  return (
    <div className="h-[100vh] w-[100vw] text-center flex items-center justify-center bg-blue-200">
      <div className="shadow-4xl w-[100%] sm:w-[450px] text-center items-center justify-center border-black border-solid border-[2px] rounded-lg p-5 bg-white">
        <div className="text-[26px] font-bold mb-[20px] text-zinc-700">
          TROCAR SENHA
        </div>
        <div className="text-[15px] mb-[30px]">
          Para trocar sua senha digite o e-mail da sua conta abaixo.
        </div>
        <form
          onSubmit={(e) => {
            SendEmail();
            e.preventDefault();
          }}
        >
          <div className="mb-[15px]">
            <TextField
              required
              fullWidth
              autoComplete="email"
              type="email"
              label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={sent ? true : false}
            className={
              sent
                ? `text-white w-[100%] py-[5px] font-bold bg-blue-700 rounded-lg`
                : `cursor-pointer hover:bg-blue-600 text-white w-[100%] py-[5px] font-bold bg-blue-700 rounded-lg`
            }
          >
            ENVIAR
          </button>
        </form>
        <button
          onClick={ResendEmail}
          disabled={resent ? true : false}
          className={
            sent
              ? `mt-[15px] underline text-blue-500`
              : `mt-[15px] underline text-blue-500 hover:text-blue-600 cursor-pointer`
          }
        >
          Reenviar e-mail.
        </button>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            E-mail enviado com sucesso.
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};
