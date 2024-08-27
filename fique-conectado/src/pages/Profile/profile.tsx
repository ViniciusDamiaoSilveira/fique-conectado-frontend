import { MdOutlineEdit } from "react-icons/md";
import Header from "../../components/Header/header";
import colors from "../../utils/colors";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import UserProfile from "../../models/user/userProfile";
import Post from "../../components/Post/post";
import UserList from "../../components/UserList/userList";
import { UserLocalAxios } from "../../api/local/userAPI";
import ListUser from "../../models/list/ListUser";
import RatingGet from "../../models/rating/ratingGet";

function Profile() {

    const [userProfile, setUserProfile] = useState<UserProfile>();
    const [listUser, setListUser] = useState<ListUser[]>();
    const [posts, setPosts] = useState<RatingGet[]>()
    const comment = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
    
    function getUser() {
        const user = jwtDecode<any>(localStorage.getItem('Token')!)
        setUserProfile(user)
        getLists(user, localStorage.getItem('Token')!)
        getPost(user.id, localStorage.getItem('Token')!)
    }

    async function getLists(userProfile: UserProfile, token: string) {
        const response = await UserLocalAxios(`/List/user/${userProfile?.id}`, 'GET', token);
        setListUser(response?.data)
    }

    async function getPost(userId: string, token: string) {
        const response = await UserLocalAxios(`/Rating/${userId}`, 'GET', token)
        setPosts(response?.data)
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <div>
            <Header />

            <div style={{
                height: 250,
                display: 'flex',
                alignItems: 'center'

            }}>
                <div style={{ width: '100%', height: 250 , backgroundColor: colors.GreyComponent}}></div>
                <div style={{ position: 'absolute', width: 150, height: 150, backgroundColor: colors.Yellow, borderRadius: 300, marginTop: 250, left: 20 }}></div>
            </div>

            <p style={{ position: 'absolute', height: 25, display: 'flex', alignItems: 'center', gap: 10, left: 190, fontSize: 35, color: colors.White, marginTop: 25 }}> {userProfile?.username} <MdOutlineEdit size={30} /> </p>

            <div style={{ display: 'flex', gap: 40, marginLeft: 25, }}>
                <div style={{ width: '90%' }}>
                    <h1 style={{ marginTop: 130, fontSize: 30, color: colors.White}}> Críticas </h1>
                    { posts?.map(post => 
                        <Post username={userProfile?.username!} rating={post.numRating} comment={post.comment} entertainment={post.entertainmentId}/>
                    )}
                </div>
                <div style={{ width: '40%', display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start', marginRight: '5%'}}>
                    <h1 style={{ marginTop: 130, fontSize: 30, color: colors.White}}> Suas listas </h1>

                    { listUser?.map(movie => 
                        <UserList key={movie.id} title={movie.name} icon={movie.name} type={movie.typeList}/>
                    )}

                    <p style={{ width: '100%', textAlign: 'center', color: colors.Yellow, fontSize: 18 }}> <u> Ver todas </u> </p>
                </div>
                
            </div>
        </div>
    )
}

export default Profile;