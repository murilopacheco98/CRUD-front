import React, { useState } from "react";
import * as Yup from "yup";
import { useAppDispatch } from "../../store/hooks";
import { resetPassword } from "../../store/modules/user/UserSlice";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Form, FormikProvider, useFormik } from "formik";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ResetPassword = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [sent, setSent] = useState<boolean>(false);
  // const [resent, setResent] = useState<boolean>(false);
  const [open, setOpen] = React.useState(false);

  interface Values {
    password: string;
    confirmPassword: string;
  }

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const url = window.location.href.split("/");
  const ResetPassword = async (values: Values) => {
    setSent(true);
    setLoading(true);
    setError(false);
    const { password } = values;
    const usuario = await dispatch(
      resetPassword({ newPassword: password, resetPasswordToken: url[4] })
    );
    if (usuario.payload == "Senha alterada com sucesso.") {
      setLoading(false);
      setSent(false);
      setOpen(true);
      navigate("/");
    } else {
      setSent(false);
      setError(true);
      setLoading(false);
      setResponse(usuario.payload.response.data.message);
    }
  };

  const SignupSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Senha pequena!")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
        "Deve conter no mínimo 6 caracteres, uma letra maiúscula, uma minúscula, um número e um caracter especial."
      ),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "A confirmação de senha não está igual."
    ),
    // acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required'),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values, actions) => {
      setTimeout(() => {
        ResetPassword(values);
        actions.setSubmitting(false);
      }, 1000);
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <div className="h-[100vh] w-[100vw] text-center flex items-center justify-center bg-blue-200">
      {loading && (
        <div className="absolute z-10">
          <ClipLoader color={"#bdbecd"} size={60} />
        </div>
      )}
      <div className="shadow-4xl w-[100%] sm:w-[450px] text-center items-center justify-center border-black border-solid border-[2px] rounded-lg p-5 bg-white">
        <div className="text-[26px] font-bold mb-[20px] text-zinc-700">
          NOVA SENHA
        </div>
        <div className="text-[15px] mb-[30px]">
          Digite sua senha nova nos campos abaixo.
        </div>
        {error && (
          <div className="text-[16px] mb-[15px] mt-[-10px] text-red-500">
            {response}
          </div>
        )}
        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit}>
            <div className="mb-[15px]">
              <TextField
                required
                fullWidth
                autoComplete="current-password"
                type={showPassword ? "text" : "password"}
                label="Password"
                {...getFieldProps("password")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        className="w-[50px] h-[50px]"
                        onClick={() => setShowPassword((prev) => !prev)}
                      />
                      {showPassword ? (
                        <VisibilityIcon className="w-[40px] h-[40px] ml-[-25px]" />
                      ) : (
                        <VisibilityOffIcon className="w-[40px] h-[40px] ml-[-25px]" />
                      )}
                    </InputAdornment>
                  ),
                }}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
              />
            </div>
            <div className="mb-[15px]">
              <TextField
                required
                fullWidth
                label="Confirm password"
                {...getFieldProps("confirmPassword")}
                type="password"
                error={Boolean(
                  touched.confirmPassword && errors.confirmPassword
                )}
                helperText={touched.confirmPassword && errors.confirmPassword}
              />
            </div>
            <div className="border-solid bg-blue-700 border-[2px] rounded-lg w-[100%] hover:bg-blue-600">
              <Button
                disabled={sent ? true : false}
                className="w-[100%]"
                type="submit"
              >
                <h1 className="text-[18px] text-white">TROCAR SENHA</h1>
              </Button>
            </div>
          </Form>
        </FormikProvider>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Senha alterada com sucesso.
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};
