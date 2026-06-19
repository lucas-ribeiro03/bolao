"use client";

import Link from "next/link";

import { useState, useTransition } from "react";

import { Eye, EyeOff, LoaderCircle } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerSchema, type RegisterSchema } from "@/schemas/register-schema";

import { registerAction } from "@/actions/register-action";

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
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  async function onSubmit(values: RegisterSchema) {
    const formData = new FormData();

    formData.append("username", values.username);
    formData.append("email", values.email);
    formData.append("password", values.password);

    startTransition(async () => {
      const result = await registerAction(formData);

      if (result.success === false) {
        toast(result.message);
      }

      router.push("/login");
    });
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Criar conta</CardTitle>

        <CardDescription>Cadastre-se para participar do bolão</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Usuário</Label>

            <Input
              id="username"
              placeholder="Digite seu usuário"
              {...register("username")}
            />

            {errors.username && (
              <p className="text-sm text-destructive">
                {errors.username.message}
              </p>
            )}
          </div>

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
            disabled={!isValid || isSubmitting || isPending}
          >
            {isSubmitting || isPending ? (
              <>
                <LoaderCircle className="animate-spin" />
                Enviando...
              </>
            ) : (
              "Cadastrar"
            )}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="justify-center">
        <p className="text-muted-foreground text-sm">
          Já possui uma conta?{" "}
          <Link
            href="/login"
            className="text-primary font-medium hover:underline"
          >
            Entrar
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
