import { useEffect, useState, useContext, createContext } from "react";
import { useNavigate, replace } from "react-router";


const AuthContext = createContext(null)
const AUTHLOGIN = "http://127.0.0.1:7000/api/oauth_checklogin/"
const AUTHCREATE = "http://127.0.0.1:7000/api/oauthcreateuser/"
const APPPASSWORD = "23a89c82f44bb2bb657d2074da6dcffc57c824bb"

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
            if (response.user === undefined)
            {
                return navigate('/auth')
            }
            else
            {
                const apiresponse = fetch(AUTHLOGIN, {
                    method: "post",
                    body : JSON.stringify(
                        {"app_key": `a0PUJ0PtiQb1rkuSZgybSHg1zt81elqJ`,
                        "session_id": "rmcwr0nuin1dewumn2l9438fkw5s7xlg"}
                    ),
                    headers: {
                        "Authorization": `Token ${APPPASSWORD}`,
                        "Content-Type": 'application/json'
                    }
                })
                apiresponse.then(e=>{
                    if (e.ok)
                    {
                        e.json().then(f=>{
                        setauthData({
                            authenticated: true,
                            user: {
                                fullname: f.first_name,
                                mail: f.email,
                                photoURL: f.oauth_credentials.photoURL
                            }
                        })
                        })
                    }
                    else
                    {
                        return navigate('/auth')
                    }
                }).catch(e=>console.log("error"))

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
    if (authData.authenticated === false)
    {
        replace('/auth')
    }
    else
    {
        return children
    }
}   