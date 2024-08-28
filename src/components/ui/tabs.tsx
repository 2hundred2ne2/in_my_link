"use client";

import { forwardRef, ReactNode, useState } from "react";

import { createSafeContext } from "@/lib/create-safe-context";
import { cn } from "@/lib/utils";

interface TabsContextType {
  value: string | null;
  label?: string;
  onChange: (value: string | null) => void;
}

const [useTabs, TabsProvider] = createSafeContext<TabsContextType>();

export interface TabsProps {
  defaultValue: string | null;
  label?: string;
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
  const { label } = useTabs();
  return (
    <div
      role="tablist"
      aria-label={label ?? "tab-list"}
      className={cn("flex items-center gap-2.5 overflow-x-auto", className)}
    >
      {children}
    </div>
  );
}

export interface TabProps {
  value: string;
  children?: ReactNode;
  className?: string;
}

export const Tab = forwardRef<HTMLButtonElement, TabProps>(
  ({ value, children, className }: TabProps, ref) => {
    const { value: currentValue, onChange } = useTabs();
    const isSelected = currentValue === value;

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={isSelected}
        aria-controls={`tabpanel-${value}`}
        tabIndex={isSelected ? 0 : -1}
        className={cn(
          "flex-shrink-0 rounded-[10px] px-4 py-2 text-sm font-medium transition-transform duration-100 active:scale-[0.96]",
          currentValue === value ? "border border-foreground bg-foreground text-white" : "border",
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

  return (
    <div
      role="tabpanel"
      aria-labelledby={`tab-${value}`}
      tabIndex={0}
      className={cn(currentValue !== value && "sr-only", className)}
    >
      {children}
    </div>
  );
}
