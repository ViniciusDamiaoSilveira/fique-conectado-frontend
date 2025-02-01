export default interface Movie {
    id: string,
    title: string,
    overview: string,
    poster_path: string,
    backdrop_path: string,
    release_date: string,
    vote_average: number,
    genres: [{ id: string, name: string }]
    runtime: number,
}