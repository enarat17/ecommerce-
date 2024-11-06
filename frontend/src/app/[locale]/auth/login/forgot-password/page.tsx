"use client";
import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const sendEmail = async () => {
    try {
      const response = await axios.post(
        "https://acc-united.onrender.com/api/v1/users/forgotPassword",
        {
          email,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center ">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Forgot Your Password</h1>
            <p className="text-balance text-muted-foreground">
              Enter the email you signed up with below
            </p>
          </div>
          <form onSubmit={sendEmail} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit">Send Email</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
