import { NavLink } from "react-router-dom"
import "./Cadastro.css"
import { useEffect, useState } from "react";
import { UserLocalAxios } from "../../api/local/userAPI";
import UserRegister from "../../models/user/userRegister";
import Swal from "sweetalert2";
import SearchInput from "../../components/inputs/search/searchInput";
import { FaRegUser } from "react-icons/fa";
import { TbLockPassword } from "react-icons/tb";
import Button from "../../components/button/button";
import { AiOutlineMail } from "react-icons/ai";

export default function Cadastro() {
    const [post, setPost] = useState<UserRegister>();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [repeatPassword, setRepeatPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        background: "#3A3A3A",
        color: "#FFFFFF",
    });

    async function onSubmit() {
        if (password == repeatPassword) {
            try {
                await UserLocalAxios('User/Register', 'POST', null, post).then();
                Toast.fire({
                    icon: "success",
                    title: "Realize o login!",
                    willClose: () => {
                        window.location.href = '/login'
                    }
                  });
    
            } catch(e: any) {
                Toast.fire({
                    title: e.response.data.message,
                    icon: 'error',
                  });
            }
        } else {
            Toast.fire({
                title: "As senhas não são iguais",
                icon: 'error',
              });
        }
    }    

    useEffect(() => {
        let user: UserRegister = {
            username: username,
            password: password,
            email: email,
        }
        setPost(user)
    }, [username, password, email])  


    return (
        <div>
            <div className="logo-login">
                <NavLink to={`/`} className="logo">
                    <span className='fique'> Fique </span> <span className={`conectado-undefined`}> Conectado</span>
                </NavLink>
            </div>
    
            <div className="login-area">
                <div className="cadastro-welcome">
                    <h1>Cadastro</h1>
                </div>
    
                <div className="login-inputs">
                    <div className="input-login">
                        <SearchInput 
                            id=""
                            placeholder="Digite seu nome de usuário..."
                            setValue={setUsername}
                            value={username}
                            icon={<FaRegUser size={23} color="#6E6E6E"/>}
                        />
                    </div>

                    <div className="input-login">
                        <SearchInput 
                            id=""
                            placeholder="Digite seu e-mail..."
                            setValue={setEmail}
                            value={email}
                            icon={<AiOutlineMail size={23} color="#6E6E6E"/>}
                        />
                    </div>
    
                    <div className="input-login">
                        <SearchInput 
                            id=""
                            placeholder="Digite sua senha..."
                            setValue={setPassword}
                            value={password}
                            type="password"
                            icon={<TbLockPassword size={23} color="#6E6E6E" />}
                        />
                    </div>

                    <div className="input-login">
                        <SearchInput 
                            id=""
                            placeholder="Repita sua senha..."
                            setValue={setRepeatPassword}
                            value={repeatPassword}
                            type="password"
                            icon={<TbLockPassword size={23} color="#6E6E6E" />}
                        />
                    </div>
                </div>
    
                <div className="login-btn-container">
                    <div className="login-btn">
                        <Button
                            backgroundColor="yellow"
                            border="none"
                            fontSize="medium"
                            id="btn-login"
                            text="Cadastrar"
                            textColor="black"
                            onClick={onSubmit}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}