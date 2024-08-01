import ButtonDefault from "../../components/Button/ButtonDefault";
import InputDefault from "../../components/Input/inputDefault";
import Logo from "../../components/Logo/logo";
import colors from "../../utils/colors";
import './login.css'
import UserLogin from "../../models/user/userLogin";
import { useEffect, useState } from "react";
import { UserLocalAxios } from "../../api/local/userAPI";
import { jwtDecode } from "jwt-decode";
import { NavLink } from "react-router-dom";

function Login() {
    const [post, setPost] = useState<UserLogin>()
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    async function onSubmit() {
        try {
            const result = await UserLocalAxios('User/Login', 'POST', null, post).then()
            localStorage.setItem("Token", result?.data.token)
            let token: string = localStorage.getItem("Token")!
            console.log(jwtDecode(token));
            
        } catch {
            console.log('erro');
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
        <div style={{height: '100vh',display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{position: 'absolute', top: 10, left: 10}}>
                <Logo/>
            </div>
            
            <div 
            style={{
                backgroundColor: colors.GreyComponent, width: 500, height: 600, 
                borderRadius: 10, color: colors.White, display: "flex", flexDirection: "column", 
                alignItems: "center", justifyContent: 'space-around'
                }}>
                    <div style={{ display: "flex", flexDirection: "column" ,justifyContent: "center", marginTop: 60, gap: 20, marginBottom: 50}}>
                        <h1 style={{ fontSize: 40, fontWeight: 'normal', textAlign: "center", margin: 0}}> Você voltou!</h1>
                        <p style={{ fontSize: 19, fontWeight: 'normal', margin: 0}}> Sentimos sua falta enquanto você esteve fora </p>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
                        <InputDefault type="text" width={355} height={"45px"} placeholder="Nome de usuário" icon={true} typeIcon="user" value={username} setValue={setUsername}/>
                        <div>
                            <InputDefault type="password" width={355} height={"45px"} placeholder="Senha" icon={true} typeIcon="password" value={password} setValue={setPassword}/>
                            <p style={{fontWeight: 'normal', cursor: "pointer", textAlign: "right"}}> <u> Esqueci a senha </u></p>
                        </div>
                    </div>
                   
                    

                    {/* Fazer componente de botão */}

                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginTop: 25,
                        gap: 10
                    }}>
                        <ButtonDefault 
                        width={370} height={'60px'} bgColor={colors.Yellow} 
                        text="Login" fontSize="16px" border={null} icon={false}
                        onClick={() => onSubmit()}
                        />
                        <p style={{fontWeight: 'normal', textAlign: "center", display: 'flex', justifyContent: 'center', gap: 10}}> 
                            Não tem uma conta?
                            <NavLink to={'/register'} className="click"
                            style={{cursor: 'pointer', transition: '0.5s'}}> <u> Clique aqui </u> </NavLink>
                        </p>
                    </div>


                    

            </div>
        </div>
    )
}

export default Login;

