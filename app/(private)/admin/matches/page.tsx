import { MatchesTable } from "@/components/admin/matches-table";
import { getMatches } from "@/services/match/get-matches";

type AdminMatchesPageProps = {
  searchParams: Promise<{
    round?: string;
  }>;
};

export default async function AdminMatchesPage({
  searchParams,
}: AdminMatchesPageProps) {
  const { round } = await searchParams;

  const matches = await getMatches({
    round,
  });

  return <MatchesTable matches={matches} />;
}
