import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { resendConfirmEmail } from "../../store/modules/user/UserSlice";

export const SignUpSucess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState<string>("");
  const [sent, setSent] = useState<boolean>(false);

  useEffect(() => {
    if (state) {
      setEmail(state.email);
    } else {
      navigate("/");
    }
  }, []);

  const ResendEmail = () => {
    dispatch(resendConfirmEmail({ email: email }));
    setSent(true);
  };

  return (
    <div className="h-[100vh] w-[100vw] text-center flex items-center justify-center bg-blue-200">
      <div className="shadow-4xl w-[100%] sm:w-[450px] text-center items-center justify-center border-black border-solid border-[2px] rounded-lg p-5 bg-white">
        <div className="text-[26px] font-bold mb-[20px] text-green-400">
          CADASTRADO COM SUCESSO
        </div>
        <div className="text-[15px] mb-[30px]">
          Um e-mail foi enviado para {email} para confirmação (Opcional). Para
          fazer o login em sua conta clique no botão abaixo.
        </div>
        <a href="/" className="w-[100%] text-white text-[18px]">
          <p className="w-[100%] py-[5px] font-bold bg-blue-700 rounded-lg">
            ENTRAR
          </p>
        </a>
        <button
          onClick={ResendEmail}
          disabled={sent ? true : false}
          className="mt-[15px] underline text-blue-500"
        >
          Reenviar e-mail.
        </button>
      </div>
    </div>
  );
};
