import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"


import { useAppDispatch } from "@/hooks"

import { loginUser } from "@/Features/auth/authThunks"
import { useSelector } from "react-redux"
import type { AuthState } from "@/Features/auth/authTypes"
import { Link, useNavigate } from "react-router-dom"


export function LoginForm({
  className,
  ...props  
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useAppDispatch()
  const navigate =useNavigate()

  const { user,loading } = useSelector((state:{auth:AuthState}) => state.auth)

  function handleLoginSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    dispatch(loginUser({ email, password }))
  }

  useEffect(()=>{
    if(user){
      if(user.role === 'seniorCordinator'){
        navigate("/admin")
      }else if(user.role === 'student'){
        navigate("/student")
      }
    }
  },[user,navigate])



  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLoginSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" name="password" onChange={(e) => setPassword(e.target.value)} type="password" required />
              </Field>
              <Field>
                <Button type="submit" disabled={loading}> 
                  {loading ? "Logging in..." : "Login"}
                </Button>
                <Button variant="outline" type="button">
                  Login with Google
                </Button>
                <FieldDescription className="text-center">
                  
                  Don&apos;t have an account?<Link to="/signup">Sign up</Link> 
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
