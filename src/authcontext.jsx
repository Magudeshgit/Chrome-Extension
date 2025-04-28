import { useEffect, useState, useContext, createContext } from "react";
import { useNavigate } from "react-router";

const AuthContext = createContext(null)

export function AuthProvider({children})
{
    const navigate = useNavigate()

    const [authData, setauthData] = useState({
        authenticated: false,
        user: {
            fullname: "",
            mail: "",
            photoURL: ""
        }
    })
    useEffect(()=>{
        start_auth_procedure()
    }, [])


    function start_auth_procedure() {
        chrome.storage.local.get('user', async (response)=>{
            console.log("B:AH", response)
            if (response.user === undefined)
            {
                console.log("NO AUTH")
                return navigate('/auth')
                // chrome.runtime.sendMessage({target: "BACKGROUND", content: "START_AUTHENTICATION"})
            }
            else
            {
                console.log(response)
                setauthData({
                    authenticated: true,
                    user: response.user
                })
            }
        })
    }
    function clear_user()
    {
        chrome.storage.local.clear()
    }
    return (
        <AuthContext.Provider value={{start_auth_procedure, clear_user, authData, setauthData}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}

export function RequireAuth({children})
{
    const {authData} = useAuth()
    const navigate = useNavigate()
    if (authData.authenticated === false)
    {
        return navigate('/auth')
    }
    else
    {
        return children
    }
}