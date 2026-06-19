"use client";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  updateCurrentRoundSchema,
  type UpdateCurrentRoundSchema,
} from "@/schemas/update-current-round";

import { updateCurrentRoundAction } from "@/actions/update-current-round-action";

import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SettingsFormProps = {
  currentRound: string;
};

export function SettingsForm({ currentRound }: SettingsFormProps) {
  const router = useRouter();

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting },
  } = useForm<UpdateCurrentRoundSchema>({
    resolver: zodResolver(updateCurrentRoundSchema),
    defaultValues: {
      currentRound,
    },
  });

  async function onSubmit(values: UpdateCurrentRoundSchema) {
    const formData = new FormData();

    formData.append("currentRound", values.currentRound.toString());

    const result = await updateCurrentRoundAction(formData);

    if (!result.success) {
      return;
    }

    router.refresh();
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm font-medium">Rodada atual</p>

            <Select
              // eslint-disable-next-line react-hooks/incompatible-library
              value={watch("currentRound").toString()}
              onValueChange={(value) =>
                setValue("currentRound", value, {
                  shouldValidate: true,
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                {Array.from({ length: 12 }, (_, index) => (
                  <SelectItem key={index + 1} value={(index + 1).toString()}>
                    Rodada {index + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            Salvar
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
