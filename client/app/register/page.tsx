"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";

function Page() {
  const router = useRouter();
  const { user, setUser } = useStore();
  const {toast} = useToast();
  useEffect(() => {
    if(!user){
        setUser(
            localStorage.getItem("user")
            ? JSON.parse(localStorage.getItem("user") as string)
            : null
        );
    }
  }, []);

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterInfo({
      ...registerInfo,
      [name]: value,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5000/auth/register";
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
    }
  };

  if(user) return null;
  else return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-gray-800">
            Register Your Account
          </CardTitle>
          <CardDescription className="text-center text-gray-600">
            Task Management Dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={submitForm}>
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700">
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
                className="bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">
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
                className="bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">
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
                className="bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cpassword" className="text-gray-700">
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
                className="bg-white"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out"
            >
              Register
            </Button>
          </form>
          <div className="pt-4">
            <p className="text-center text-gray-600">
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
