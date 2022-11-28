import React, { useEffect } from "react";
import * as Yup from "yup";
import { useState } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import { useNavigate } from "react-router-dom";
import { TextField, IconButton, InputAdornment, Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RotateRight from "@mui/icons-material/RotateRight";
import { postUserLogin } from "../../store/modules/user/UserSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

interface Values {
  email: string;
  password: string;
}

export const SignIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();

  const user = Object.values(useAppSelector((store) => store.users.entities));

  useEffect(() => {
    if (user[0]?.authToken) {
      navigate("/recados/page=1");
    }
  }, []);

  const login = async (values: Values) => {
    const { email, password } = values;
    const usuarioLogado = await dispatch(
      postUserLogin({
        email: email,
        password: password,
      })
    );
    if (usuarioLogado.payload.id) {
      navigate("/recados/page=1");
    } else {
      setTimeout(
        () => alert(usuarioLogado.payload.response.data.message),
        2000
      );
      // setTimeout(() => alert("Usuário ou senha inválidos."), 3000);
    }
  };

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Email must be a valid email address."),
    password: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values, actions) => {
      setTimeout(() => {
        // alert(JSON.stringify(values, null, 2));
        login(values);
        actions.setSubmitting(false);
      }, 1000);
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <div className="h-[100vh] w-[100vw] text-center flex items-center justify-center bg-blue-800">
      <FormikProvider value={formik}>
        <div className="w-[400px] text-center items-center justify-center border-black border-solid border-[2px] rounded-lg p-5 bg-white">
          <div className="text-[30px] mb-[20px]">Login</div>
          <Form onSubmit={handleSubmit}>
            <div className="mb-[15px]">
              <TextField
                required
                fullWidth
                autoComplete="email"
                type="email"
                label="Email address"
                {...getFieldProps("email")}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />
            </div>
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
                    <div>
                      <IconButton
                        edge="end"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="w-[50px] h-[50px]"
                      >
                        {showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </div>
                  ),
                }}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
              />
            </div>
            <div className="border-solid border-[2px] rounded-lg w-[120px] ml-[120px] hover:bg-slate-200">
              <Button className="w-[120px]" type="submit">
                {isSubmitting ? <RotateRight /> : ""}
                <h1 className="text-[18px]">Sign In</h1>
              </Button>
            </div>
            <div className="mt-[8px]">
              <h4>Não possui uma Conta?</h4>
              <a href="/signup" className="underline text-[16px]">
                Criar Conta.
              </a>
            </div>
          </Form>
        </div>
      </FormikProvider>
    </div>
  );
};
