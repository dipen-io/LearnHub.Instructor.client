import ScreenLayer from '@/features/screenLayer/Layer'
import ScreenLayer1 from '@/features/screenLayer/Layer1'
import { createFileRoute, useRouter} from '@tanstack/react-router'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/store/authStore'
import Loader from '@/components/Loader'
import { useState } from 'react'
import { LoginUser } from '@/services/userServce'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useRef } from 'react'
import Loader2 from '@/components/Loader2'

export const Route = createFileRoute('/login')({
    component: RouteComponent,
})

interface UserDate {
    email: string,
    password: string,
    Roles? :  string | null,
}

function RouteComponent() {
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [password, setPassword] = useState("")
    const {isAuthLoading,login, isLoggedIn} = useAuthStore()
    const router = useRouter();
    const loginRef = useRef<HTMLDivElement>(null)


 const loginMutation = useMutation({
    mutationFn: (userData: UserDate) => LoginUser(userData),
    onSuccess: (response) => {
      login(response.data, response.accessToken)
      toast.success(response.message);
      router.navigate({ to: '/' })
    },
    onError: (error: any) => {
        console.log("ERROR", error?.response?.data?.error);
        if (error?.response?.data?.error.statusCode === 404) {
            setEmailError(error?.response?.data?.error.message)
        }
        if (error?.response?.data?.error.statusCode === 401) {
            setPasswordError(error?.response?.data?.error.message)
        }
    }
  })

    if (isAuthLoading || isLoggedIn) {
        return <Loader />
    }

    const userDate: UserDate = {
        email: email,
        password: password,
    }

    const handleLogin = () => loginMutation.mutate(userDate)

    const scrollToLoginPage = () => {
        loginRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
      <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory">

            {/* LAYER SCREEN */}
            {/* <ScreenLayer onScollToLogin={scrollToLoginPage} /> */}
            <ScreenLayer onScrollToLogin={scrollToLoginPage} />
            <ScreenLayer1 />

          <div className="relative snap-start  h-screen text-lime-500 pt-4 text-7xl justify-center items-center" ref={loginRef}>
            <div className='rounded border px-3 shadow-md font-bold mt-10 py-4'>
                <h1 className="text-center"> LOGIN NOW </h1>
            </div>
        <div className="w-full max-w-sm mx-auto mt-10">
          {/* Use grid and gap on the parent for spacing */}
          <div className="grid w-full items-center gap-4">

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email" className='px-1 text-black font-bold text-xl'>Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={email}
                placeholder="Enter Your Email"
                className="py-6 font-semibold"
                onChange={(e) => {
                    setEmail(e.target.value)
                    setEmailError("")
                    setPasswordError("")
                }}
              />
            </div>
                {loginMutation.error &&
                    <div className='text-xl'>
                    { emailError}
                    </div>
                }

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password" className='px-1 text-black font-bold text-xl'>Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                placeholder="Enter Your Password"
                className="py-6 font-semibold"
                onChange={(e) => {
                    setPassword(e.target.value)
                    setPasswordError("")
                    setEmailError("")
                }}
              />
                {loginMutation.error &&
                    <div className='text-xl'>
                    { passwordError}
                    </div>
                }
            </div>
          </div>
              <Button className='w-full py-6' onClick={handleLogin}>{loginMutation.isPending ? "                    Logging In.." : "Log In"} <div className='ml-5 w-2 py-3'>
               {loginMutation.isPending && <Loader2 />}
             </div></Button>
          </div>
        </div>
      </div>
    )
}
