// components/admin/edit-match-dialog.tsx

"use client";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { updateMatchAction } from "@/actions/update-match-action";

import {
  updateMatchSchema,
  type UpdateMatchSchema,
} from "@/schemas/update-match-schema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

type EditMatchDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  match: {
    id: string;
    round: string;
    score1: number | null;
    score2: number | null;
    finished: boolean;

    team1: {
      name: string;
    };

    team2: {
      name: string;
    };
  } | null;
};

export function EditMatchDialog({
  open,
  onOpenChange,
  match,
}: EditMatchDialogProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting },
  } = useForm<UpdateMatchSchema>({
    resolver: zodResolver(updateMatchSchema),
    values: {
      matchId: match?.id ?? "",
      score1: match?.score1 ?? 0,
      score2: match?.score2 ?? 0,
      finished: match?.finished ?? false,
    },
  });

  async function onSubmit(values: UpdateMatchSchema) {
    const result = await updateMatchAction(values);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    onOpenChange(false);

    router.refresh();
  }

  if (!match) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar partida</DialogTitle>

          <DialogDescription>Informe o resultado da partida.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <input type="hidden" {...register("matchId")} />

          <div className="flex items-center justify-between">
            <span>{match.team1.name}</span>

            <div className="flex items-center gap-2">
              <Input
                type="number"
                min={0}
                className="w-20 text-center"
                {...register("score1", {
                  valueAsNumber: true,
                })}
              />

              <span>x</span>

              <Input
                type="number"
                min={0}
                className="w-20 text-center"
                {...register("score2", {
                  valueAsNumber: true,
                })}
              />
            </div>

            <span>{match.team2.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              // eslint-disable-next-line react-hooks/incompatible-library
              checked={watch("finished")}
              onCheckedChange={(checked) => setValue("finished", !!checked)}
            />

            <span>Partida finalizada</span>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
