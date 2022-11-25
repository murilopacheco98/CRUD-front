import React from "react";
import * as Yup from "yup";
import { useState } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import { useNavigate } from "react-router-dom";
import { TextField, IconButton, InputAdornment, Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RotateRight from "@mui/icons-material/RotateRight";
import { postUserRegister } from "../../store/modules/user/UserSlice";
import { useAppDispatch } from "../../store/hooks";
import { alignProperty } from "@mui/material/styles/cssUtils";

interface Values {
  Name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();

  const register = async (values: Values) => {
    const { email, password, Name } = values;
    const usuario = await dispatch(
      postUserRegister({
        email: email,
        password: password,
        name: Name,
      })
    );
    if (usuario.payload) {
      setTimeout(() => alert("Este usuário já está cadastrado."), 3000);
    } else {
      setTimeout(() => alert("Conta criada com sucesso."), 3000);
      navigate("/");
    }
  };

  const SignupSchema = Yup.object().shape({
    Name: Yup.string().min(5, "Too Short!").max(50, "Too Long!"),
    email: Yup.string().email("Email must be a valid email address."),
    // .required("Email is required.")
    password: Yup.string()
      .min(8, "Too Short!")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must contain 8 characters, one uppercase, one lowercase, one number and one special case character."
      ),
    // .required("Password is required.")
    confirmPassword: Yup.string()
      // .required("Confirm password is required.")
      .oneOf([Yup.ref("password"), null], "Confirm Password does not match."),
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
        alert(JSON.stringify(values, null, 2));
        register(values);
        actions.setSubmitting(false);
      }, 1000);
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <div className="h-[100vh] w-[100vw] text-center flex items-center justify-center bg-blue-800">
      <FormikProvider value={formik}>
        <div className="w-[400px] text-center items-center justify-center border-black border-solid border-[2px] rounded-lg p-5 bg-white">
          <div className="text-[30px] mb-[20px]">Cadastro</div>
          {/* noValidate */}
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
                        onClick={() => setShowPassword((prev) => !prev)}
                      />
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
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
            <div className="border-solid border-[2px] rounded-lg w-[120px] ml-[120px] hover:bg-slate-200">
              <Button
                className="w-[120px]"
                type="submit"
                // onClick={(e) => handleSubmit()}
              >
                {isSubmitting ? <RotateRight /> : ""}
                <h1 className="text-[18px]">Sign Up</h1>
              </Button>
            </div>
          </Form>
        </div>
      </FormikProvider>
      {/* </Formik> */}
    </div>
  );
};
