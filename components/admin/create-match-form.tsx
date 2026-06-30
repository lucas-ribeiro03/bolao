"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { createMatchAction } from "@/actions/create-match-action";
import {
  createMatchSchema,
  type CreateMatchSchema,
} from "@/schemas/create-match-schema";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";

import { DateTimePicker } from "@/components/date-time-picker";
import { useRouter } from "next/navigation";

interface Team {
  id: string;
  name: string;
}

interface CreateMatchFormProps {
  teams: Team[];
}

export function CreateMatchForm({ teams }: CreateMatchFormProps) {
  const router = useRouter();
  const {
    handleSubmit,
    setValue,
    watch,
    reset,
    register,
    formState: { errors, isSubmitting },
  } = useForm<CreateMatchSchema>({
    resolver: zodResolver(createMatchSchema),
    defaultValues: {
      team1Id: "",
      team2Id: "",
      round: undefined,
      matchDateTime: undefined,
    },
  });

  async function onSubmit(values: CreateMatchSchema) {
    const formData = new FormData();

    formData.append("team1Id", values.team1Id);
    formData.append("team2Id", values.team2Id);
    formData.append("round", values.round);
    formData.append("matchDateTime", values.matchDateTime.toISOString());

    const response = await createMatchAction(formData);

    if (!response.success) {
      toast.error(response.message);
      return;
    }

    toast.success(response.message);

    router.refresh();
  }

  return (
    <Card className="max-w-3xl">
      <CardHeader>
        <CardTitle>Nova partida</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Seleção 1</Label>

              <Select
                value={watch("team1Id")}
                onValueChange={(value) =>
                  setValue("team1Id", value, {
                    shouldValidate: true,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a seleção" />
                </SelectTrigger>

                <SelectContent>
                  {teams.map((team) => (
                    <SelectItem key={team.id} value={team.id}>
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {errors.team1Id && (
                <p className="text-sm text-destructive">
                  {errors.team1Id.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Seleção 2</Label>

              <Select
                value={watch("team2Id")}
                onValueChange={(value) =>
                  setValue("team2Id", value, {
                    shouldValidate: true,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a seleção" />
                </SelectTrigger>

                <SelectContent>
                  {teams.map((team) => (
                    <SelectItem key={team.id} value={team.id}>
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {errors.team2Id && (
                <p className="text-sm text-destructive">
                  {errors.team2Id.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Rodada</Label>

            <Select
              value={watch("round")}
              onValueChange={(value) =>
                setValue("round", value as CreateMatchSchema["round"], {
                  shouldValidate: true,
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a rodada" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="16_avos">16 Avos</SelectItem>

                <SelectItem value="oitavas">Oitavas</SelectItem>

                <SelectItem value="quartas">Quartas</SelectItem>

                <SelectItem value="semis">Semis</SelectItem>

                <SelectItem value="final">Final</SelectItem>
              </SelectContent>
            </Select>

            {errors.round && (
              <p className="text-sm text-destructive">{errors.round.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Data e hora</Label>

            <DateTimePicker
              value={watch("matchDateTime")}
              onChange={(date: Date) =>
                setValue("matchDateTime", date, {
                  shouldValidate: true,
                })
              }
            />

            {errors.matchDateTime && (
              <p className="text-sm text-destructive">
                {errors.matchDateTime.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Criando..." : "Criar partida"}
          </Button>

          <input type="hidden" {...register("team1Id")} />

          <input type="hidden" {...register("team2Id")} />

          <input type="hidden" {...register("round")} />
        </form>
      </CardContent>
    </Card>
  );
}
