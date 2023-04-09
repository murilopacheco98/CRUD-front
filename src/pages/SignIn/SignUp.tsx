import React from "react";
import * as Yup from "yup";
import { useState } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import { useNavigate } from "react-router-dom";
import { TextField, IconButton, InputAdornment, Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { postUserRegister } from "../../store/modules/user/UserSlice";
import { useAppDispatch } from "../../store/hooks";
import { ClipLoader } from "react-spinners";

interface Values {
  Name: string;
  email: string;
  password: string;
  // confirmPassword: string;
}

export const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const register = async (values: Values) => {
    setLoading(true);
    setError(false);
    const { email, password, Name } = values;
    const usuario = await dispatch(
      postUserRegister({
        email: email,
        password: password,
        name: Name,
      })
    );
    if (usuario.payload) {
      setError(true);
      setLoading(false);
      setResponse(usuario.payload.response.data.message);
    } else {
      setLoading(false);
      setResponse("Usuário cadastrado com sucesso");
      navigate("/signup/success", {
        state: {
          email: email,
        },
      });
    }
  };

  const SignupSchema = Yup.object().shape({
    Name: Yup.string().min(3, "Nome pequeno.").max(50, "Nome muito grande."),
    email: Yup.string().email(
      "O E-mail deve ser um endereço de e-mail válido."
    ),
    // .required("Email is required.")
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
      Name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values, actions) => {
      setTimeout(() => {
        register(values);
        actions.setSubmitting(false);
      }, 1000);
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <div className="h-[100vh] w-[100vw] text-center flex items-center justify-center bg-blue-200">
      {loading && (
        <div className="absolute z-10">
          <ClipLoader color={"#010227"} size={80} />
        </div>
      )}
      <div className="shadow-4xl w-[400px] text-center items-center justify-center border-black border-solid border-[2px] rounded-lg p-5 bg-white">
        <div className="text-[30px] mb-[20px]">Cadastro</div>
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
                autoComplete="name"
                label="Name"
                {...getFieldProps("Name")}
                error={Boolean(touched.Name && errors.Name)}
                helperText={touched.Name && errors.Name}
              />
            </div>
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
                className="w-[100%]"
                type="submit"
                // onClick={(e) => handleSubmit()}
              >
                <h1 className="text-[18px] text-white">Cadastrar</h1>
              </Button>
            </div>
          </Form>
        </FormikProvider>
        <div className="mt-[10px] text-gray-800">
          Já possui uma conta? &nbsp;&nbsp;
          <a href="/" className="underline text-blue-500 text-[16px]">
            ENTRAR
          </a>
        </div>
      </div>
    </div>
  );
};
