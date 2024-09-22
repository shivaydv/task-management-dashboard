"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useDashboardStore } from "@/store/dashboardStore";
import {Card,CardContent,CardDescription,CardHeader,CardTitle,} from "@/components/ui/card";



function Page() {

  const router = useRouter();
  const { user, setUser } = useDashboardStore();
  const {toast} = useToast();
  const [loading, setLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({name: "",email: "",password: "",cpassword: "",});


  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setRegisterInfo({...registerInfo,[name]: value,});
  };

  useEffect(() => {
    if(!user){
      setUser(localStorage.getItem("user")? JSON.parse(localStorage.getItem("user") as string): null);
    }
  }, []);

  // Redirect to home if user is already logged in
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);





  const submitForm = async (e:any) => {
    e.preventDefault();

    if (registerInfo.password !== registerInfo.cpassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "default",
        className: "bg-red-400 text-black",
        duration: 2000,
      });
      return;
    }

    try {
    setLoading(true);
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerInfo),
      });
      const result = await res.json();
      const { success, message } = result;
      if (success) {

        toast({
          title: "Account Created",
          variant: "default",
          className: "bg-green-400 text-black",
          duration: 2000,
        })
        router.push("/login");
      } else {
        toast({
          title: "Error",
          description: message,
          variant: "default",
          className: "bg-red-400 text-black",
          duration: 2000,
        })

      }
    } catch (error: any) {
      const { message } = error;
      toast({
        title: "Error",
        description: message,
        variant: "default",
        className: "bg-red-400 text-black",
        duration: 2000,
      })
      console.error(message);
    } finally {
      setLoading(false);
    }
  };

  if(user) return null;
  else return (
    <div className="flex items-center px-5 justify-center min-h-screen bg-muted ">
      <Card className="w-full max-w-md shadow-lg  ">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center ">
            Register Your Account
          </CardTitle>
          <CardDescription className="text-center ">
            Task Management Dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={submitForm}>
            <div className="space-y-2">
              <Label htmlFor="name" >
                Name
              </Label>
              <Input
                id="name"
                type="name"
                placeholder="Enter your Name"
                name="name"
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                name="email"
                onChange={handleChange}
                required
                autoComplete="off"

              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" >
                Password
              </Label>
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
            <div className="space-y-2">
              <Label htmlFor="cpassword" >
                Confirm Password
              </Label>
              <Input
                id="cpassword"
                type="password"
                placeholder="Confirm your password"
                name="cpassword"
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
              Register
            </Button>
          </form>
          <div className="pt-4">
            <p className="text-center ">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Page;
