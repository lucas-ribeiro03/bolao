import { getSettings } from "@/services/settings/get-settings";

import { SettingsForm } from "@/components/admin/settings-form";

export default async function SettingsPage() {
  const settings = await getSettings();

  return <SettingsForm currentRound={settings?.currentRound ?? "2"} />;
}
