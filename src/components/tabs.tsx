"use client";

import { forwardRef, ReactNode, useState } from "react";

import { createSafeContext } from "@/lib/create-safe-context";
import { cn } from "@/lib/utils";

interface TabsContextType {
  value: string | null;
  onChange: (value: string | null) => void;
}

const [useTabs, TabsProvider] = createSafeContext<TabsContextType>();

export interface TabsProps {
  defaultValue: string | null;
  children: ReactNode;
  className?: string;
  onChange?: (value: string | null) => void;
}

/**
  @example
  <Tabs defaultValue={"스레드"}>
    <TabList>
      <Tab value="스레드">스레드</Tab>
      <Tab value="답글">답글</Tab>
      <Tab value="리포스트">리포스트</Tab>
    </TabList>
    <TabPanel value="스레드">스레드</TabPanel>
    <TabPanel value="답글">답글</TabPanel>
    <TabPanel value="리포스트">리포스트</TabPanel>
  </Tabs>
 */
export function Tabs({ defaultValue, children, className, onChange }: TabsProps) {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (newValue: string | null) => {
    if (value === newValue) {
      return;
    }

    setValue(newValue);
    onChange?.(newValue);
  };

  return (
    <TabsProvider value={{ value, onChange: handleChange }}>
      <div className={className}>{children}</div>
    </TabsProvider>
  );
}

export interface TabListProps {
  children?: ReactNode;
  className?: string;
}

export function TabList({ children, className }: TabListProps) {
  return <div className={cn("flex items-center gap-2.5", className)}>{children}</div>;
}

export interface TabProps {
  value: string;
  children?: ReactNode;
  className?: string;
}

export const Tab = forwardRef<HTMLButtonElement, TabProps>(
  ({ value, children, className }: TabProps, ref) => {
    const { value: currentValue, onChange } = useTabs();

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "text-sm font-medium py-2 px-4 rounded-[10px]",
          currentValue === value ? "bg-foreground border border-foreground text-white" : "border",
          className,
        )}
        onClick={() => onChange(value)}
      >
        {children}
      </button>
    );
  },
);

export interface TabPanelProps {
  value: string;
  children?: ReactNode;
  className?: string;
}

export function TabPanel({ value, children, className }: TabPanelProps) {
  const { value: currentValue } = useTabs();

  if (currentValue !== value) {
    return null;
  }

  return <div className={className}>{children}</div>;
}
