import { listTeams } from "@/services/team/list-teams";

import { CreateMatchForm } from "@/components/admin/create-match-form";

export default async function NewMatchPage() {
  const teams = await listTeams();

  return (
    <div className="container mx-auto py-6">
      <CreateMatchForm teams={teams} />
    </div>
  );
}
