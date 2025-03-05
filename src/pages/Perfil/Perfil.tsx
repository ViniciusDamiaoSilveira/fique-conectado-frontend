import Header from "../../components/header/header"
import "./Perfil.css"
import picProfile from "../../images/userPic.png"
import { useParams } from "react-router-dom"
import { UserLocalAxios } from "../../api/local/userAPI";
import { useEffect, useState } from "react";
import { LOCAL_IMG } from "../../utils/constants";
import Comentario from "../../components/comentario/comentario";
import { FaRegHeart, FaRegStar } from "react-icons/fa";
import { BiSolidDislike } from "react-icons/bi";
import Swal from "sweetalert2";
import axios from "axios";

interface userProps {
    id: string,
    username: string,
    profilePic: string,
}

interface comentariosProps {
    id: string,
    name: string,
    typeEntertainment: string,
    entertainmentId: string,
    entertainmentName: string,
    numRating: number,
    comment: string,
    views: number,
    userId: string,
}

export default function Perfil() {

    const { userId } = useParams();
    const [user, setUser] = useState<userProps>()
    const [ratings, setRatings] = useState<comentariosProps[]>([])
    const [avaliados, setAvaliados] = useState<number>(0)
    const [favoritos, setFavoritos] = useState<number>(0)
    const [curtidos, setCurtidos] = useState<number>(0)
    const [nao, setNao] = useState<number>(0)

    
    
    async function getUser() {
        let response = await UserLocalAxios(`User/${userId}`, "GET", "")
        setUser(response?.data)
    }

    async function getRatings() {
        let response = await UserLocalAxios(`Rating/${userId}`, "GET", "")
        setRatings(response?.data)
    }

    async function getStatics(listName: string) {
        let response = await UserLocalAxios(`ListEntertainment/getCountList/${listName}/${userId}`, "GET", "")
        if (listName == "Favoritos") setFavoritos(response?.data)
        if (listName == "Curtidos") setCurtidos(response?.data)
        if (listName == "Não gostei") setNao(response?.data)

    }

    async function changeFoto() {
        const { value: file } = await Swal.fire({
            title: "Escolha uma nova imagem de perfil",
            input: "file",
            background: "#3A3A3A",
            color: "#FFFFFF",
            inputAttributes: {
              "accept": "image/*",
              "aria-label": "Upload your profile picture"
            },
            confirmButtonColor: "#228B22",
          });
          if (file) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("userId", userId!);

            try {
                await axios.post("https://localhost:7299/api/user/UploadProfilePic", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });

                Swal.fire({
                    title: "Adicionada com sucesso!",
                    icon: "success",
                    background: "#3A3A3A",
                    color: "#FFFFFF",
                    confirmButtonColor: "#228B22"
                    }).then(() => {
                        window.location.reload()
                    });
            } catch {
                Swal.fire({
                    title: "Ocorreu um erro ao adicionar a imagem",
                    icon: "error",
                    background: "#3A3A3A",
                    color: "#FFFFFF",
                    confirmButtonColor: "#8B2626"
                    })
            }

            const reader = new FileReader();
            reader.onload = (e: any) => {
              Swal.fire({
                title: "Your uploaded picture",
                imageUrl: e.target.result,
                imageAlt: "The uploaded picture"
              });
            };
            reader.readAsDataURL(file);
          }
    }

    useEffect(() => {
        getUser()
        getRatings()
        getStatics("Favoritos")
        getStatics("Curtidos")
        getStatics("Não gostei")
    }, [])

    return (
        <div>
            <Header />

            <div className="perfil-infos">
                <div className={`perfil-img ${user?.id == userId ? "perfil-pessoal" : ""}`}
                    onClick={() => {
                        if (user?.id == userId) {
                            changeFoto()
                        }
                    }}
                >
                    <img src={user?.profilePic ? `${LOCAL_IMG}${user.profilePic}` : picProfile} alt="" />
                </div>

                <div className="perfil-texts">
                    <div className="perfil-username"><h1> {user?.username} </h1></div>

                    <div className="perfil-info">
                        <div className="perfil-stats">
                            <p>Avaliados</p>
                            <p>{ratings.length} Entretenimentos</p>
                        </div>

                        <div className="perfil-stats">
                            <p>Favoritos</p>
                            <p>{favoritos} Entretenimentos</p>
                        </div>

                        <div className="perfil-stats">
                            <p>Curtidos</p>
                            <p>{curtidos} Entretenimentos</p>
                        </div>

                        <div className="perfil-stats">
                            <p>Não Gostei</p>
                            <p>{nao} Entretenimentos</p>
                        </div>
                    </div>

                </div>
            </div>

            <div className="perfil-body">

                <div className="perfil-criticas">
                    <h1 className="criticas-text"> Críticas </h1>

                    {ratings.length > 0 ? (
                        <>
                            {ratings.map((value: comentariosProps) => 
                                <Comentario
                                    id={value.id}
                                    userId={value.userId}
                                    entertainmentId={value.entertainmentId}
                                    typeEntertainment={value.typeEntertainment}
                                    entertainment={value.entertainmentName}
                                    comentario={value.comment}
                                    rating={value.numRating}
                                    views={value.views}
                                    size="grande"
                                />
                            )}
                        </>
                    ) : (
                        <div>
                            Esse usuário não possui críticas ainda
                        </div>
                    )}
                </div>

                <div className="lists-perfil">
                    <div className="list-user">
                        <div className="icon-list icon-favorito">
                            <FaRegStar size={22} color="#EB8817" />
                        </div>

                        <h1> Favoritos </h1>
                    </div>

                    <div className="list-user">
                        <div className="icon-list icon-curtido">
                            <FaRegHeart size={22} color="#2F64CF" />
                        </div>

                        <h1> Favoritos </h1>
                    </div>

                    <div className="list-user">
                        <div className="icon-list icon-nao">
                            <BiSolidDislike size={22} color="#8B2626" />
                        </div>

                        <h1> Favoritos </h1>
                    </div>
                </div>
            </div>
        </div>
    )
}