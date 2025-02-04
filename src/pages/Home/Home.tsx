import Header from "../../components/header/header";
import Navigator from "../../components/navigator/navigator";
import Showcase from "../../components/showcase/showcase";
import VitrineComentario from "../../components/vitrine/comentario/vitrineComentario";
import VitrineEntretenimentos from "../../components/vitrine/entretenimentos/vitrineEntretenimentos";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jogosNacionais } from "../../utils/jogosNacionais";
import { lista_comentarios } from "../../utils/comentariosMock";
import { 
    GetLancamentosNacionaisFilmes, 
    GetLancamentosNacionaisSeries, 
    getMelhoresJogos, 
    GetMelhoresNacionaisFilmes, 
    GetMelhoresNacionaisSeries, 
    getPopularesJogos, 
    GetPopularesNacionaisFilmes, 
    GetPopularesNacionaisSeries
} from "../../utils/requests/requestsHome";

import './Home.css'
import Footer from "../../components/footer/footer";

export default function Home() {
    const [lancamentos, setLancamentos] = useState<any[]>([])
    const [popular, setPopular] = useState<any[]>([])
    const [best, setBest] = useState<any[]>([])
    const { type } = useParams();

    async function getMovies() {
        const lancamentos = await GetLancamentosNacionaisFilmes();
        setLancamentos(lancamentos);

        const populares = await GetPopularesNacionaisFilmes();
        setPopular(populares);

        const melhores = await GetMelhoresNacionaisFilmes();
        setBest(melhores);
    }
    
    async function getSeries() {
        
        const lancamentos = await GetLancamentosNacionaisSeries();
        setLancamentos(lancamentos);

        const populares = await GetPopularesNacionaisSeries();
        setPopular(populares)

        const melhores = await GetMelhoresNacionaisSeries();
        setBest(melhores)
    }

    async function getJogos() {
        setLancamentos(jogosNacionais)

        const populares = await getPopularesJogos();
        setPopular(populares)

        const melhores = await getMelhoresJogos();
        setBest(melhores)
    }
    
    useEffect(() => {
        if (type == 'filmes') {
            getMovies();
        }

        if (type == 'series') {
            getSeries();
        }

        if (type == 'jogos') {
            getJogos();
        }   
    }, [])
    
    useEffect(() => {
        if (type == 'filmes') {
            getMovies();
        }

        if (type == 'series') {
            getSeries();
        }

        if (type == 'jogos') {
            getJogos();
        }           
    }, [type])

    return (
        <div>
            <Header />
            <div className="first-row-home">
                <div className="navigator-home">
                    <Navigator />
                    <Showcase />
                </div>

                <div className="feed-home">
                    <div className="vitrine-home">
                        <VitrineComentario
                            title="Comentários da semana"
                            subtitle="Seguindo"
                            items={lista_comentarios}
                            />
                    </div>

                    <div className="vitrine-home">
                        <VitrineEntretenimentos
                            title={type == 'jogos' ? "Seleção de nacionais" : "Lançamentos nacionais"}
                            subtitle=""
                            items={lancamentos}
                            />
                    </div>

                    <div className="vitrine-home">
                        <VitrineEntretenimentos
                            title={type == 'jogos' ? "Populares" :  "Populares nacionais"}
                            subtitle="Todos os populares"
                            items={popular}
                            />
                    </div>

                    <div className="vitrine-home">
                        <VitrineEntretenimentos
                            title="Melhor avaliados"
                            subtitle="Todos os melhores avaliados"
                            items={best}
                            />
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    ) 
}