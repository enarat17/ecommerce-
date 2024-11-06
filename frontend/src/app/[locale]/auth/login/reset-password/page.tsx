"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();
  const sendNewPassword = async () => {
    try {
      const response = await axios.post(
        "https://acc-united.onrender.com/api/v1/users/resetPassword/:token",
        {
          password,
          confirmPassword,
        }
      );
      if (response.data.data === "success") {
        router.push("/auth/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center ">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Reset your password</h1>
            <p className="text-balance text-muted-foreground">
              Enter the new password you want for you account
            </p>
          </div>
          <form onSubmit={sendNewPassword} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="type your new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="confirm your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
