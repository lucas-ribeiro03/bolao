// app/(private)/page.tsx

import { auth } from "@/lib/auth";

import { PageHeader } from "@/components/layout/page-header";
import { RankingTable } from "@/components/home/ranking-table";
import { NextMatchCard } from "@/components/home/next-match-card";

import { getUsers } from "@/services/user/get-users";
import { getGuesses } from "@/services/guess/get-guesses";
import { getMatches } from "@/services/match/get-matches";
import { getNextMatch } from "@/services/match/get-next-match";
import { getGuessByUserAndMatch } from "@/services/guess/get-guess-by-user-and-match";

import { calculateRanking } from "@/lib/calculate-ranking";

export default async function HomePage() {
  const session = await auth();

  if (!session || !session.user?.id) {
    return null;
  }
  const [users, guesses, matches, nextMatch] = await Promise.all([
    getUsers(),
    getGuesses(),
    getMatches(),
    getNextMatch(),
  ]);

  const ranking = calculateRanking({
    users,
    guesses,
    matches,
  });

  const userId = session.user.id;

  const guess = nextMatch
    ? await getGuessByUserAndMatch(userId, nextMatch.id)
    : null;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Home"
        description="Acompanhe a classificação e o próximo jogo."
      />

      <RankingTable ranking={ranking} />

      <NextMatchCard match={nextMatch} guess={guess} />
    </div>
  );
}
