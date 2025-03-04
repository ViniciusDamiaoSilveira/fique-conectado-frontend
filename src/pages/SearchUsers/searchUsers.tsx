import { useEffect, useState } from "react"
import Header from "../../components/header/header"
import SearchInput from "../../components/inputs/search/searchInput"
import "./searchUsers.css"
import { CiSearch } from "react-icons/ci"
import Footer from "../../components/footer/footer"
import { UserLocalAxios } from "../../api/local/userAPI"
import User from "../../components/user/user"

interface userProps {
    id: string,
    username: string,
    profilePic: string | null
}

export default function SearchUsers() {
    const [search, setSearch] = useState<string>("")
    const [listUsers, setListUsers] = useState<userProps[]>([])

    async function searchUser() {
        if (search != "") {
            let response = await UserLocalAxios(`User/search/${search}`, "GET", "")
            setListUsers(response?.data)
        } else {
            setListUsers([])
        }
    }

    useEffect(() => {
        searchUser()
    }, [search])

    return (
        <div className="search-user-container">
            <Header />

            <div className="search-user-body">
                <h1> Pesquisar usuários </h1>

                <div className="input-user">
                    <SearchInput
                        id="search-user"
                        placeholder="Pesquisar..."
                        setValue={setSearch}
                        value={search}
                        icon={<CiSearch size={23} color={'#6E6E6E'}/>
                    }
                    />
                </div>

                <div className="users-find">
                    {listUsers.length > 0 ? (
                        <>
                            {listUsers.map((value: userProps) => 
                                <User 
                                    id={value.id}
                                    username={value.username}
                                    profilePic={value.profilePic}   
                                />
                            )}
                        </>
                    ) : (
                        <div>
                            Digite algum usuário
                        </div>
                    )}
                </div>
            </div>
            
            <div className="footer-search">
                <Footer />
            </div>
        </div>
    )
}