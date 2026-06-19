/* eslint-disable @next/next/no-img-element */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type NextMatchCardProps = {
  match: {
    id: string;
    matchDateTime: Date;

    team1: {
      name: string;
      flag: string | null;
    };

    team2: {
      name: string;
      flag: string | null;
    };
  } | null;

  guess: {
    score1: number;
    score2: number;
  } | null;
};

export function NextMatchCard({ match, guess }: NextMatchCardProps) {
  if (!match) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Próximo Jogo</CardTitle>
        </CardHeader>

        <CardContent>Nenhuma partida encontrada.</CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Próximo Jogo</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col items-center gap-2">
            {match.team1.flag && (
              <img
                src={`/teams/${match.team1.flag}.png`}
                alt={match.team1.name}
                width={56}
                height={56}
              />
            )}

            <span className="text-center text-sm font-medium">
              {match.team1.name}
            </span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="text-muted-foreground text-sm">VS</span>

            <span className="text-muted-foreground text-xs">
              {new Intl.DateTimeFormat("pt-BR", {
                dateStyle: "short",
                timeStyle: "short",
              }).format(match.matchDateTime)}
            </span>
          </div>

          <div className="flex flex-col items-center gap-2">
            {match.team2.flag && (
              <img
                src={`/teams/${match.team2.flag}.png`}
                alt={match.team2.name}
                width={56}
                height={56}
              />
            )}
            <span className="text-center text-sm font-medium">
              {match.team2.name}
            </span>
          </div>
        </div>

        <div className="border-t pt-4">
          {guess ? (
            <>
              <p className="text-muted-foreground mb-2 text-sm">Seu palpite</p>

              <div className="text-center text-2xl font-bold">
                {guess.score1} x {guess.score2}
              </div>
            </>
          ) : (
            <>
              <p className="text-muted-foreground text-sm">
                Você ainda não realizou seu palpite para esta partida.
              </p>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
