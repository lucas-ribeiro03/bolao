/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  roundGuessesSchema,
  type RoundGuessesSchema,
} from "@/schemas/round-guesses-schema";

import { createRoundGuessesAction } from "@/actions/create-round-guess-action";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type GuessFormProps = {
  matches: {
    id: string;
    team1: {
      name: string;
      flag: string;
    };
    team2: {
      name: string;
      flag: string;
    };
  }[];
};

export function GuessForm({ matches }: GuessFormProps) {
  const router = useRouter();

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const {
    handleSubmit,
    register,
    watch,
    formState: { isSubmitting, errors, isValid },
  } = useForm<RoundGuessesSchema>({
    resolver: zodResolver(roundGuessesSchema),
    defaultValues: {
      guesses: matches.map((match) => ({
        matchId: match.id,
        score1: 0,
        score2: 0,
      })),
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const guesses = watch("guesses");

  async function onSubmit(values: RoundGuessesSchema) {
    console.log("Fui enviado");
    const result = await createRoundGuessesAction(values.guesses);
    console.log(result);

    if (!result.success) {
      return;
    }

    router.refresh();
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Palpites da rodada</CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            id="guess-form"
          >
            {matches.map((match, index) => (
              <div key={match.id} className="grid grid-cols-3 w-full">
                <div className="flex items-center gap-2">
                  <img
                    src={`/teams/${match.team1.flag}.png`}
                    alt={match.team1.name}
                    className="h-8 w-12"
                  />

                  <span>{match.team1.name}</span>
                </div>

                <div className="flex items-center gap-2 justify-center">
                  <input
                    type="hidden"
                    {...register(`guesses.${index}.matchId`)}
                  />

                  <Input
                    type="number"
                    min={0}
                    className="w-18 text-center pl-5"
                    {...register(`guesses.${index}.score1`, {
                      valueAsNumber: true,
                    })}
                  />

                  <span>x</span>

                  <Input
                    type="number"
                    min={0}
                    className="w-18 text-center pl-5"
                    {...register(`guesses.${index}.score2`, {
                      valueAsNumber: true,
                    })}
                  />
                </div>

                <div className="flex items-center gap-2 justify-end">
                  <span>{match.team2.name}</span>

                  <img
                    src={`/teams/${match.team2.flag}.png`}
                    alt={match.team2.name}
                    className="h-8 w-12"
                  />
                </div>
              </div>
            ))}

            {errors.guesses && (
              <p className="text-sm text-destructive">
                Preencha todos os palpites.
              </p>
            )}

            <Button
              type="button"
              disabled={isSubmitting}
              className="w-full cursor-pointer"
              onClick={() => setIsConfirmOpen(true)}
            >
              Enviar palpites
            </Button>
          </form>
        </CardContent>
      </Card>

      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent className="max-w-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar envio dos palpites?</AlertDialogTitle>

            <AlertDialogDescription>
              Após o envio os palpites não poderão ser alterados.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="max-h-96 space-y-2 overflow-y-auto">
            {matches.map((match, index) => (
              <div
                key={match.id}
                className="flex items-center justify-between rounded-md border p-2 text-sm"
              >
                <span>
                  {match.team1.name} x {match.team2.name}
                </span>

                <span className="font-semibold">
                  {guesses?.[index]?.score1 ?? 0} x{" "}
                  {guesses?.[index]?.score2 ?? 0}
                </span>
              </div>
            ))}
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>Voltar</AlertDialogCancel>

            <AlertDialogAction asChild>
              <Button
                type="submit"
                form="guess-form"
                disabled={isSubmitting || !isValid}
              >
                Confirmar envio
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
