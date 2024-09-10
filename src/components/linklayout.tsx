"use client";
import { useEffect, useState } from "react";

import { Card } from "./ui/card";

export function LayoutAComponent() {
  return (
    <div className="flex flex-row gap-2 pt-6">
      <Card variant="default" className="flex h-[160px] w-[120px] justify-center rounded-lg pt-6">
        <div className="h-[50px] w-[50px] rounded-md bg-slate-600">사진</div>
      </Card>
      <Card variant="default" className="flex h-[160px] w-[120px] justify-center rounded-lg pt-6">
        <div className="h-[50px] w-[50px] rounded-md bg-slate-600">사진</div>
      </Card>
      <Card variant="default" className="flex h-[160px] w-[120px] justify-center rounded-lg pt-6">
        <div className="h-[50px] w-[50px] rounded-md bg-slate-600">사진</div>
      </Card>
      <Card variant="default" className="flex h-[160px] w-[120px] justify-center rounded-lg pt-6">
        <div className="h-[50px] w-[50px] rounded-md bg-slate-600">사진</div>
      </Card>
    </div>
  );
}

export function LayoutBComponent() {
  return (
    <div className="m-auto grid grid-cols-2 gap-2">
      <Card variant="default" className="relative h-[130px] w-[245px] rounded-xl pl-5 pt-5">
        <div className="flex flex-row">
          <div className="h-[60px] w-[60px] rounded-lg bg-slate-600">사진</div>
          <div className="translate-x-[55px] translate-y-[15px] font-extrabold">Title</div>
        </div>
        <div className="absolute bottom-1.5">Url 주소 --------</div>
      </Card>
      <Card variant="default" className="relative h-[130px] w-[245px] rounded-xl pl-5 pt-5">
        <div className="flex flex-row">
          <div className="h-[60px] w-[60px] rounded-lg bg-slate-600">사진</div>
          <div className="translate-x-[55px] translate-y-[15px] font-extrabold">Title</div>
        </div>
        <div className="absolute bottom-1.5">Url 주소 --------</div>
      </Card>
      <Card variant="default" className="relative h-[130px] w-[245px] rounded-xl pl-5 pt-5">
        <div className="flex flex-row">
          <div className="h-[60px] w-[60px] rounded-lg bg-slate-600">사진</div>
          <div className="translate-x-[55px] translate-y-[15px] font-extrabold">Title</div>
        </div>
        <div className="absolute bottom-1.5">Url 주소 --------</div>
      </Card>
      <Card variant="default" className="relative h-[130px] w-[245px] rounded-xl pl-5 pt-5">
        <div className="flex flex-row">
          <div className="h-[60px] w-[60px] rounded-lg bg-slate-600">사진</div>
          <div className="translate-x-[55px] translate-y-[15px] font-extrabold">Title</div>
        </div>
        <div className="absolute bottom-1.5">Url 주소 --------</div>
      </Card>
    </div>
  );
}

export function LayoutCComponent() {
  return (
    <div className="flex flex-col gap-4">
      <div className="h-[85px] w-[500px] rounded-xl border border-zinc-500"></div>
      <div className="h-[85px] w-[500px] rounded-xl border border-zinc-500"></div>
      <div className="h-[85px] w-[500px] rounded-xl border border-zinc-500"></div>
      <div className="h-[85px] w-[500px] rounded-xl border border-zinc-500"></div>
    </div>
  );
}

export function LayoutDComponent() {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="h-[80px] w-[80px] rounded-lg bg-slate-500"></div>
      <div className="h-[80px] w-[80px] rounded-lg bg-slate-500"></div>
      <div className="h-[80px] w-[80px] rounded-lg bg-slate-500"></div>
      <div className="h-[80px] w-[80px] rounded-lg bg-slate-500"></div>
      <div className="h-[80px] w-[80px] rounded-lg bg-slate-500"></div>
      <div className="h-[80px] w-[80px] rounded-lg bg-slate-500"></div>
      <div className="h-[80px] w-[80px] rounded-lg bg-slate-500"></div>
      <div className="h-[80px] w-[80px] rounded-lg bg-slate-500"></div>
    </div>
  );
}

export function LinkLayout() {
  const [layout, setLayout] = useState<number | null>(null);

  useEffect(() => {
    const fetchLayout = async () => {
      try {
        const domain = "test"; // 여기에 실제 사용자의 도메인을 넣어주세요.
        const response = await fetch(`/api/button-config?domain=${domain}`);
        const data = await response.json();
        setLayout(data.layout);
      } catch (error) {
        console.error("Error fetching layout:", error);
      }
    };

    fetchLayout();
  }, []);

  const renderLayoutComponent = () => {
    if (layout === 1) {
      return <LayoutAComponent />;
    }
    if (layout === 2) {
      return <LayoutBComponent />;
    }
    if (layout === 3) {
      return <LayoutCComponent />;
    }
    if (layout === 4) {
      return <LayoutDComponent />;
    }
    return <div>레이아웃을 선택해 주세요</div>;
  };

  return <>{renderLayoutComponent()}</>;
}
