import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/authcontext"
import { useNavigate } from "react-router"
import { RoundSpinner } from "./ui/spinner"
import { useState } from "react"

export default function Create_mgaccount({className,...props})
 {
  const {authData, setauthData} = useAuth()
  const [loading, setLoading] = useState(false)
  const [accountMode, setaccountMode] = useState({
    status: false,
    email: ""
  })

  const navigate = useNavigate()
  chrome.runtime.onMessage.addListener((message)=>{
    if (message.target == 'POPUP' && message.content == "AUTH_SUCCESS")
    {
      setLoading(false)
      setauthData({
        authenticated: true,
        user: message.user.user
      })
      
      return navigate('/')
    }
    if (message.target == 'POPUP' && message.content == "AUTH_FAILED")
    {
      setLoading(false)
      // Toast Noti If Needed
    }
  })

  // if (authData.authenticated) navigate('/');

  function Initialize_Google_Auth()
  {
    setLoading(true)
    chrome.runtime.sendMessage(
      {
        target: "BACKGROUND",
        content: "START_AUTHENTICATION"
      }
      )
  }
  return (
    
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className='flex items-center gap-2 mx-auto'>
      <img src="bwlogo.svg" alt="logo" className='w-11 drop-shadow-lg' />
      <div>
      <p className='font-bold text-2xl'>BrowseWind</p>
      <p className='font-medium tracking-wide'>Revive Your Browser</p>
      </div>
    </div>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create Account</CardTitle>
          <CardDescription>
            Join us by Creating an account
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="fname">Full Name</Label>
                  <Input id="fname" type="text" placeholder="John Doe" required />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email.value} placeholder="m@example.com" required />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full cursor-pointer">
                  Create an Account
                </Button>
              </div>
              <div>
              <div className="flex flex-col gap-4">
                 <div
                className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with Google
                </span>
              </div>
                <Button variant="outline" className="w-full cursor-pointer" onClick={Initialize_Google_Auth}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor" />
                  </svg>
                  Sign up with Google
                  {loading?<RoundSpinner/>:<></>}
                </Button>
              </div>
              </div>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <a className="underline underline-offset-4" onClick={()=>navigate("/auth")}>
                  Sign in
                </a>
              </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
