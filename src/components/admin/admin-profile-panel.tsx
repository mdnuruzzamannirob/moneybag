'use client';

import { SettingsPanel } from '@/components/user/settings-panel';

export type AdminProfileSection = 'profile' | 'security';

export function AdminProfilePanel() {
  return <AdminProfileSectionPanel section="profile" />;
}

export function AdminProfileSectionPanel({ section }: { section: AdminProfileSection }) {
  return <SettingsPanel section={section} />;
}
