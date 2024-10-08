import ButtonDefault from "../../components/Button/ButtonDefault";
import InputDefault from "../../components/Input/inputDefault";
import Logo from "../../components/Logo/logo";
import colors from "../../utils/colors";
import { useEffect, useState } from "react";
import { UserLocalAxios } from "../../api/local/userAPI";
import UserRegister from "../../models/user/userRegister";
import { redirect } from "react-router-dom";
import Swal from "sweetalert2";

function Register() {
    const [post, setPost] = useState<UserRegister>();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean | undefined>(false)
    
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        background: colors.GreyComponent,
        color: colors.GreyFont,
      });

    async function onSubmit() {
        try {
            setIsLoading(true)
            await UserLocalAxios('User/Register', 'POST', null, post).then();
            Toast.fire({
                icon: "success",
                title: "Realize o login!",
                willOpen: () => {
                    setIsLoading(false)
                },
                willClose: () => {
                    window.location.href = '/login'
                }
              });

        } catch(e: any) {
            Toast.fire({
                title: e.message,
                icon: 'error',
                willOpen: () => {
                    setIsLoading(false)
                },
              });
        }
    }    

    useEffect(() => {
        let user: UserRegister = {
            username: username,
            password: password,
            email: email,
            phone: phone
        }
        setPost(user)
    }, [username, password, email, phone])  

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
                    <div style={{ display: "flex", flexDirection: "column" ,justifyContent: "left", marginTop: 20}}>
                        <h1 style={{ fontSize: 40, fontWeight: 'normal', textAlign: "left", margin: 0}}> Cadastro </h1>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
                        <InputDefault type="text" width={355} height={"45px"} placeholder="Nome de usuário" icon={true} typeIcon="user" value={username} setValue={setUsername}/>
                        <div>
                            <InputDefault type="password" width={355} height={"45px"} placeholder="Senha" icon={true} typeIcon="password" value={password} setValue={setPassword}/>
                            <p style={{ color: colors.GreyFont, fontSize: 13, width: 355, marginBottom: 0 }}> * A senha deve conter no mínimo 8 caracteres, contendo números, letras e caracteres especiais</p>
                        </div>
                        <InputDefault type="text" width={355} height={"45px"} placeholder="Email" icon={true} typeIcon="email" value={email} setValue={setEmail}/>
                        <InputDefault type="number" width={355} height={"45px"} placeholder="Telefone" icon={true} typeIcon="phone" value={phone} setValue={setPhone}/>
                    </div>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 10
                    }}>
                        <ButtonDefault 
                        width={370} height={'60px'} bgColor={colors.Yellow} 
                        text="Cadastrar" fontSize="16px" border={null} icon={false}
                        onClick={() => onSubmit()} loading={isLoading}
                        />
                    </div>


                    

            </div>
        </div>
    )
}

export default Register;

