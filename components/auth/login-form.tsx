"use client";

import { useState } from "react";

import { Eye, EyeOff, LoaderCircle } from "lucide-react";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, type LoginSchema } from "@/schemas/auth-schema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { toast } from "sonner";
import { loginAction } from "@/actions/login-action";

export function LoginForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  async function onSubmit(values: LoginSchema) {
    const formData = new FormData();

    formData.append("email", values.email);
    formData.append("password", values.password);
    const result = await loginAction(formData);
    console.log(result);

    if (result.success === false) {
      return toast("Usuário ou senha incorretos.");
    }

    router.push("/");
    router.refresh();
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Entrar</CardTitle>

        <CardDescription>Faça login para acessar o bolão</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>

            <Input
              id="email"
              type="email"
              placeholder="Digite seu e-mail"
              {...register("email")}
            />

            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>

            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Digite sua senha"
                {...register("password")}
              />

              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0"
                onClick={() => setShowPassword((previous) => !previous)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </Button>
            </div>

            {errors.password && (
              <p className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <LoaderCircle className="animate-spin" />
                Enviando...
              </>
            ) : (
              "Entrar"
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-muted-foreground text-sm">
          Não possui uma conta?{" "}
          <Link
            href="/register"
            className="text-primary font-medium hover:underline"
          >
            Cadastre-se
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
