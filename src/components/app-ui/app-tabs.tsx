'use client';
import type { ReactNode } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
export type AppTabItem = {
  content: ReactNode;
  disabled?: boolean;
  label: ReactNode;
  value: string;
};
export function AppTabs({
  defaultValue,
  items,
}: {
  defaultValue?: string;
  items: readonly AppTabItem[];
}) {
  return (
    <Tabs defaultValue={defaultValue ?? items[0]?.value}>
      <TabsList
        className="grid !h-10 w-full rounded-md bg-muted p-1"
        style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
      >
        {items.map((item) => (
          <TabsTrigger
            className="!h-8 min-w-0 rounded-sm px-3 text-sm leading-none data-active:!bg-primary/10 data-active:text-primary data-active:shadow-xs"
            disabled={item.disabled}
            key={item.value}
            value={item.value}
          >
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {items.map((item) => (
        <TabsContent className="pt-4" key={item.value} value={item.value}>
          {item.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
