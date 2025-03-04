import { NavLink } from "react-router-dom"
import "./Login.css"
import { useEffect, useState } from "react"
import UserLogin from "../../models/user/userLogin"
import Swal from "sweetalert2"
import { UserLocalAxios } from "../../api/local/userAPI"
import SearchInput from "../../components/inputs/search/searchInput"
import { FaRegUser, FaUser } from "react-icons/fa"
import { TbLockPassword } from "react-icons/tb"
import Button from "../../components/button/button"

export default function Login() {
    const [post, setPost] = useState<UserLogin>()
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean | undefined>(false)

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
        try {
            setIsLoading(true)
            const result = await UserLocalAxios('User/Login', 'POST', null, post).then()
            localStorage.setItem("Token", result?.data.token)

            Toast.fire({
                icon: "success",
                title: "Bem-vindo!",
                willOpen: () => {
                    setIsLoading(false)
                },
                willClose: () => {
                    window.location.href = '/'
                }
              });
            
        } catch {
            Toast.fire({
                title: "Login incorreto",
                icon: 'error',
                willOpen: () => {
                    setIsLoading(false)
                },
              });
        }
    }

    useEffect(() => {
        let user: UserLogin = {
            username: username,
            password: password,
        }
        setPost(user)
    }, [username, password])  

    return (
        <div className="login-container">
            <div className="logo-login">
                <NavLink to={`/`} className="logo">
                    <span className='fique'> Fique </span> <span className={`conectado-undefined`}> Conectado</span>
                </NavLink>
            </div>

            <div className="login-area">
                <div className="login-welcome">
                    <h1>Você voltou!</h1>
                    <p>Sentimos sua falta enquanto você esteve fora</p>
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
                            placeholder="Digite sua senha..."
                            setValue={setPassword}
                            value={password}
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
                            text="Entrar"
                            textColor="black"
                            onClick={onSubmit}
                        />
                    </div>
                </div>

                <div className="cadastro-redirect">
                    <p> Não tem uma conta? </p>
                    <span > <NavLink to={"/cadastro"} className="cadastro-link"> Clique aqui! </NavLink>  </span>
                </div>
            </div>

        </div>
    )
}