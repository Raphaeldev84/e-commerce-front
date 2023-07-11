import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { Autenticacao } from "./Autenticacao";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

export const AdmEmpreendedor = (props) => {
    const autenticacao = Autenticacao();
    const navigate = useNavigate();
    const resposta = autenticacao.token && (autenticacao.tipo === "empreendedor" || autenticacao.tipo === "administrador");

    function presentPage() {
        navigate(-1);
    }

    useEffect(() => {
        if (!resposta) {
            presentPage();
            return null;
        }
    }, [autenticacao.tipo, navigate, presentPage, resposta]);

    if (!autenticacao.token) {
        toast.success("Acesso negado.", { position: "bottom-right", duration: 7000 })
        return <Navigate to="/" />
    };

    return <Outlet {...props} />;
};

