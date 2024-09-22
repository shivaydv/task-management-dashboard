"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDashboardStore } from "@/store/dashboardStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function Page() {

  const router = useRouter();
  const { toast } = useToast();
  const { user, setUser } = useDashboardStore();
  const [loading, setLoading] = useState(false);
  const [loginInfo, setLoginInfo] = useState({email: "",password: "",});

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setLoginInfo({...loginInfo,[name]: value,});
  };

  const submitForm = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {

      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });

      const result = await res.json();
      const { success, message, jwtToken, email, name } = result;

      if (success) {
        toast({
          title: "Login Successful",
          variant: "default",
          className: "bg-green-400 text-black",
          duration: 2000,
        });

        await localStorage.setItem("user",JSON.stringify({name: name,email: email,token: jwtToken,}));
        setUser(localStorage.getItem("user")? JSON.parse(localStorage.getItem("user") as string): null);
        router.push("/");

      } else {
        toast({
          title: "Error",
          description: message,
          variant: "default",
          className: "bg-red-400 text-black",
          duration: 2000,
        });
      }
    } catch (error: any) {
      const { message } = error;
      toast({
        title: "Error",
        description: message,
        variant: "default",
        className: "bg-red-400 text-black",
        duration: 2000,
      });
      console.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setUser(localStorage.getItem("user")? JSON.parse(localStorage.getItem("user") as string): null);
  }, []);

  // Redirecting the user to the dashboard if they are already logged in
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <div className="flex items-center justify-center min-h-screen px-6 bg-muted">


      <Card className="w-full max-w-md shadow-lg">


        <CardHeader className="space-y-1">

          <CardTitle className="text-2xl font-bold text-center ">
            Login Your Account
          </CardTitle>
          <CardDescription className="text-center ">
            Task Management Dashboard
          </CardDescription>
        </CardHeader>

        <CardContent>
        <div className="text-center">
          <p>Demo User email = test@gmail.com</p>
          <p>Demo User password  = 123456</p>
        </div>
          <form className="space-y-4" onSubmit={submitForm}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                name="email"
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                name="password"
                autoComplete="on"
                onChange={handleChange}
                required
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out"
            >
              Sign In
            </Button>
          </form>

          <div className="pt-4">
            <p className="text-center">
              Don't have an account?{" "}
              <Link href="/register" className="text-blue-600 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}

export default Page;
