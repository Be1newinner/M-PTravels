"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input, InputPassword } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { useLogin } from "@/lib/api/auth-api";
import { getCookie } from "@/lib/utils/cookies";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("be1newinner@gmail.com");
  const [password, setPassword] = useState("vijay123");
  const [error, setError] = useState("");
  const { mutate: login, isPending } = useLogin();

  // useEffect(() => {
  //   const token = getCookie("refreshToken")
  //   if (token) {
  //     router.push("/dashboard")
  //   }
  // }, [router])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    login(
      { email, password },
      {
        onSuccess: () => {
          console.log("Login successful");
          router.push("/dashboard");
        },
        onError: (error: any) => {
          setError(
            error.response?.data?.message || "Invalid email or password"
          );
        },
      }
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
          <CardDescription>
            Enter your credentials to access the admin panel
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <InputPassword
                id="password"
                placeholder="••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>

            <button
              onClick={async () => {
                const data = await axios.get(
                  process.env.NEXT_PUBLIC_DOMAIN + "/users/check-cookie",
                  {
                    withCredentials: true,
                  }
                );
                console.log(data);
              }}
            >
              check
            </button>
          </form>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            <p>Demo credentials: be1newinner@gmail.com / vijay123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
