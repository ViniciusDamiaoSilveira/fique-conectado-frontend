import { useEffect, useState } from "react"
import { getEntertainmentGame, getEntertainmentMovie, getEntertainmentTV } from "../../utils/requests/requestEntertainment";
import { useParams } from "react-router-dom";

import { IoStar } from "react-icons/io5";
import { Rating } from "@mui/material";
import { FiPlus } from "react-icons/fi";

import Button from "../../components/button/button";
import Header from "../../components/header/header";

import "./Entertainment.css"
import ModalTemporada from "../../components/modals/modalTemporada";
import TmdbAxios from "../../api/tmdb/movieAPI";
import Comentario from "../../components/comentario/comentario";
import { FaRegHeart, FaRegStar } from "react-icons/fa";
import { UserLocalAxios } from "../../api/local/userAPI";
import { BiSolidDislike } from "react-icons/bi";
import Swal from "sweetalert2";
import ModalRating from "../../components/modals/modalRating";
import { LiaEdit } from "react-icons/lia";
import { FaRegTrashCan } from "react-icons/fa6";
import { jwtDecode } from "jwt-decode";


interface entertainmentProps {
    title: string,
    poster: string,
    background: string
    description: string,
    rating: number,
    genres: any[],
    plataformas?: any[],
    release: string,
    time_to_beat?: string,
    platinum?: string,
    country?: string,
    runtime?: string,
    numberSeason?: any[]
}

interface listProps {
    id: string,
    name: string,
    icon: any,
    isIn: boolean,
}

interface commentProps {
    id: string,
    numRating: number,
    comment: string,
    date: string,
}

interface comentariosProps {
    id: string,
    name: string,
    typeEntertainment: string,
    entertainmentId:string,
    entertainmentName: string,
    numRating: number,
    comment: string,
    views: number,
    userId: string,
}

interface userProps {
    id: string,
    username: string,
    email: string,
    profilePic: string,
}

export default function Entertainment() {
    const { type, id } = useParams();
    const [entertainment,  setEntertainment] = useState<entertainmentProps>()
    const [openTemporada, setOpenTemporada] = useState(false)
    const [listEpisodes, setListEpisodes] = useState()
    const [lists, setLists] = useState<listProps[]>([])
    const [comment, setComment] = useState<commentProps>()
    const [openComment, setOpenComment] = useState<boolean>(false)
    const [listComments, setListComments] = useState<comentariosProps[]>([])
    const [user, setUser] = useState<userProps>()

 
 
    async function getEntertainment() {
        if (type == "jogos") {
            const result = await getEntertainmentGame(id!)
            setEntertainment(result)
        }

        if (type == "filmes") {
            const result = await getEntertainmentMovie(id!)
            setEntertainment(result)
        }

        if (type == "series") {
            const result = await getEntertainmentTV(id!)
            setEntertainment(result)
        }
    }

    async function getEpisodes(id: string, season: number) {
        const response = await TmdbAxios(`tv/${id}/season/${season}?language=pt-BR`)
        let result_query = response.data.episodes
        setListEpisodes(result_query)
        setOpenTemporada(true)
    }

    async function getEntertainmentInList() {2
        const token = localStorage.getItem("Token");
        const decode = jwtDecode<userProps>(token!)

        let listUser: listProps[] = [];

        let response = await UserLocalAxios(`List/user/${decode.id}/${type}`, "GET", "")

        let promises = response?.data.map(async (value: listProps) => {  

            let exist = await UserLocalAxios(`ListEntertainment/${value.id}/${id}`, "GET", "")
            
            if (value.name == "Não gostei") {
                let colorIcon = "#8B2626"
                listUser.push({
                    id: value.id,
                    name: "naoGostei", 
                    icon: <BiSolidDislike size={21} color={`${exist?.data ? "#FFFFFF" : colorIcon}`}/>, 
                    isIn: exist?.data})                
            } else if (value.name == "Curtidos") {
                let colorIcon = "#2F64CF"
                listUser.push({
                    id: value.id, 
                    name: value.name, 
                    icon: <FaRegHeart size={21} color={`${exist?.data ? "#FFFFFF" : colorIcon}`}/>, 
                    isIn: exist?.data})
            } else {
                let colorIcon = "#EB8817"
                listUser.push({
                    id: value.id, 
                    name: value.name, 
                    icon: <FaRegStar size={21} color={`${exist?.data ? "#FFFFFF" : colorIcon}`}/>, 
                    isIn: exist?.data})
            }
        })
        
        await Promise.all(promises);

        listUser.sort((a: any, b: any) => {
            if (a.name === 'Favoritos') return -1;
            if (b.name === 'Favoritos') return 1;
            return a.name.localeCompare(b.name);
        });
        
        setLists(listUser)
    }

    async function addOrRemoveList(listId: string, isIn: boolean) {
        let body: {listId: string, entertainmentId: string} = {listId: listId, entertainmentId: id!}

        Swal.fire({
            title: `${isIn ? "Deseja remover o entretenimento da lista?" : "Deseja adicionar o entretenimento na lista?"}`,
            showCancelButton: true,
            confirmButtonText: `${isIn ? "Remover" : "Adicionar"}`,
            cancelButtonText: `Cancelar`,
            background: "#3A3A3A",
            color: "#ffffff",
            confirmButtonColor: `${isIn ? "#8B2626" : "#228B22"}`,
            width: 600
          }).then(async (result) => {
            if (result.isConfirmed) {
                if (isIn) {
                    await UserLocalAxios(`ListEntertainment/${listId}/${id}`, "DELETE", "", body)

                    Swal.fire({
                        title: "Removido com sucesso!",
                        icon: "success",
                        background: "#3A3A3A",
                        color: "#FFFFFF",
                        confirmButtonColor: "#8B2626"
                    }).then(() => {
                        window.location.reload()
                    });
                }
        
                if (!isIn) {
                    await UserLocalAxios(`ListEntertainment`, "POST", "", body)
                    Swal.fire({
                        title: "Adicionado com sucesso!",
                        icon: "success",
                        background: "#3A3A3A",
                        confirmButtonColor: "#228B22",
                        color: "#FFFFFF",
                    }).then(() => {
                        window.location.reload()
                    });
                }
              
            }
          });
    }

    async function getEntertainmentCommment() {
        const token = localStorage.getItem("Token");
        const decode = jwtDecode<userProps>(token!)

        let body: {userId: string, entertainmentId: string} = {userId: decode.id, entertainmentId: id!}
        let response = await UserLocalAxios(`Rating/verify`, "POST", "", body)
        setComment(response?.data)
    }

    async function getEntertainmentRatings() {        
        let response = await UserLocalAxios(`Rating/${type}/${id}`, "GET", "")
        setListComments(response?.data)
    }

    async function removeRating() {
        const token = localStorage.getItem("Token");
        const decode = jwtDecode<userProps>(token!)

        Swal.fire({
            title: "Deseja remover sua crítica sobre o entretenimento?",
            showCancelButton: true,
            confirmButtonText: "Remover",
            cancelButtonText: `Cancelar`,
            background: "#3A3A3A",
            color: "#ffffff",
            confirmButtonColor: "#8B2626",
            width: 600
          }).then(async (result) => {
            if (result.isConfirmed) {
                    await UserLocalAxios(`Rating/${decode.id}/${id}`, "DELETE", "")

                    Swal.fire({
                        title: "Removido com sucesso!",
                        icon: "success",
                        background: "#3A3A3A",
                        color: "#FFFFFF",
                        confirmButtonColor: "#8B2626"
                    }).then(() => {
                        window.location.reload()
                    });
                
                }
            })
    }

    useEffect(() => {
        getEntertainment();
        getEntertainmentInList();
        getEntertainmentCommment();
        getEntertainmentRatings();
        if (localStorage.getItem("Token")) {
            const token = localStorage.getItem("Token");
            const decode = jwtDecode<userProps>(token!)
            setUser(decode)
        }
    }, [])

    useEffect(() => {
        getEntertainment();
    }, [type])

    useEffect(() => {
        getEntertainment();
    }, [id])     
    
    return (
        <div className="entertainment-container">
            <Header />

            <div className="entertainment-background"> 
                <img className="background-img" src={entertainment?.background}/>
            </div>

            
            <div className="lists-user">
                {lists.map((value: listProps) => 
                    <div 
                        className={`list list-${value.name}-${value.isIn ? "in" : "out"}`}
                        onClick={() => addOrRemoveList(value.id, value.isIn)}>
                        {value.icon}
                    </div>
                )}
            </div>
            
            <div className="entertainment-infos">
                <div className="entertainment-poster"> 
                    <img className="poster-img" src={entertainment?.poster}/> 
                </div>

                <div className="entertainment-texts">
                    <div className="entertainment-title">
                        <h1> {entertainment?.title} </h1>
                        <Rating value={entertainment?.rating ? entertainment.rating : 0 } precision={0.5} readOnly size="large"
                                        emptyIcon={<IoStar style={{ opacity: 1, height: 28 }} fontSize="inherit" />}/>
                    </div>

                    <p className="entertainment-description"> {entertainment?.description} </p>
                </div>
            </div>

            <div className="entertainmnent-btns">
                {user && (
                    <div className="btn-critic">
                        {!comment && (
                            <Button
                            id="btn-critic"
                            textColor="white"
                            text="Adicionar Crítica"
                            backgroundColor="transparent"
                            border="white"
                            fontSize="small"
                            icon={<FiPlus />}
                            onClick={() => setOpenComment(true)}
                            />
                        )}
                        {comment && (
                            <div className="btns-edit">
                                <div className="btn-excluir">
                                    <Button
                                    id="btn-critic"
                                    textColor="white"
                                    text=""
                                    backgroundColor="red"
                                    border="none"
                                    fontSize="small"
                                    icon={<FaRegTrashCan />}
                                    onClick={removeRating}
                                    />
                                </div>

                                <div className="btn-edit">
                                    <Button
                                    id="btn-critic"
                                    textColor="black"
                                    text="Editar"
                                    backgroundColor={type!}
                                    border="none"
                                    fontSize="small"
                                    icon={<LiaEdit />}
                                    onClick={() => setOpenComment(true)}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <div className="entertainment-genres">
                    {entertainment?.genres && (
                        <>
                        {entertainment.genres.map((genre: any) => 
                            <div className={`genre-container genre-${type}`}>
                                {genre.name}
                            </div>
                        )}
                        </>
                    )}
                </div>
            </div>

            {type == "jogos" && (
                <div className="entertainment-bar">
                    {entertainment?.plataformas && (
                        <div className="entertainment-plataformas">
                            <h1> Plataformas </h1>
                            <div className="plataformas-img">
                                { entertainment.plataformas.map((platform: any) =>     
                                    <img className="plataforma-icon" src={platform}/>
                                )}
                            </div>
                        </div>
                    )}

                    {entertainment?.time_to_beat && (
                        <div className="entertainment-text-info">
                            <h1> Tempo de jogo </h1>
                            <p> {entertainment?.time_to_beat} </p>
                        </div>
                    )}

                    {entertainment?.platinum && (
                        <div className="entertainment-text-info">
                            <h1> Tempo de Platina </h1>
                            <p> {entertainment?.platinum} </p>
                        </div>
                    )}

                    {entertainment?.release && (
                        <div className="entertainment-text-info">
                            <h1> Ano de Lançamento </h1>
                            <p> {entertainment?.release} </p>
                        </div>
                    )}
                </div>
            )}

            {type == "filmes" && (
                <div className="entertainment-bar">
                    {entertainment?.country && (
                        <div className="entertainment-text-info">
                            <h1> País de origem </h1>
                            <p> {entertainment.country} </p>
                        </div>
                    )}

                    {entertainment?.runtime && (
                        <div className="entertainment-text-info">
                            <h1> Tempo de duração </h1>
                            <p> {entertainment.runtime} </p>
                        </div>
                    )}

                    {entertainment?.release && (
                        <div className="entertainment-text-info">
                            <h1> Data de lançamento </h1>
                            <p> {entertainment.release} </p>
                        </div>
                    )}
                </div>
            )}

            {type == "series" && (
                <div className="entertainment-bar">
                    {entertainment?.country && (
                        <div className="entertainment-text-info">
                            <h1> País de origem </h1>
                            <p> {entertainment.country} </p>
                        </div>
                    )}

                    {entertainment?.release && (
                        <div className="entertainment-text-info">
                            <h1> Data de lançamento </h1>
                            <p> {entertainment.release} </p>
                        </div>
                    )}

                    {entertainment?.numberSeason && (
                        <div className="entertainment-text-info">
                            <h1> Temporadas </h1>
                            
                            <div className="temporada-container">
                                {entertainment.numberSeason.map((temp) => 
                                    <div className="temporada" 
                                        onClick={() => (getEpisodes(id!, temp.id))}>
                                        {temp.name}
                                    </div>
                                )} 
                            </div>
                            
                        </div>
                    )}
                </div>
            )}

        <div className="ratings-entertainment">
            <h1 style={{ marginLeft: 25 }}> Comentários </h1>

            <div className="ratings">
                {
                    listComments.map((value) => 
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
                    )
                }
                
                {listComments.length === 0 && (
                    <p className="text-entertainment-only"> Seja o primeiro a fazer uma crítica sobre esse entretenimento! </p>
                )}
            </div>
            
        </div>
        
            <ModalTemporada 
                open={openTemporada}
                setOpen={setOpenTemporada}
                handleClose={() => setOpenTemporada(false)}
                listEpisodes={listEpisodes ? listEpisodes : []}
            />

            <ModalRating
                open={openComment}
                setOpen={setOpenComment}
                handleClose={() => setOpenComment(false)}
                type={comment ? "editar" : "adicionar"}
                comment={comment ? comment.comment : ""}
                rating={comment ? comment.numRating : 0}
                entertainmentName={entertainment?.title!}
                commentId={comment?.id}
            />
        </div>
    )
}