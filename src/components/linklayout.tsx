"use client";
import { useEffect, useState } from "react";

import { ENV } from "@/constants/env";
import { getSnsUrl } from "@/lib/utils";
import { Link, LinkType } from "@/types/link";

import { Card } from "./ui/card";

async function getLinks(domain: string): Promise<Link[]> {
  const res = await fetch(`${ENV.apiUrl}/api/links?domain=${domain}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("링크를 불러오는데 실패했어요");
  }

  return res.json();
}

export function LayoutAComponent({ links }: { links: Link[] }) {
  return (
    <div className="gap-2 pt-6">
      {links.map((link) => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center rounded-lg pt-6"
        >
          <Card
            variant="default"
            className="flex h-20 w-80 flex-row items-center justify-normal gap-8 overflow-hidden text-ellipsis whitespace-nowrap rounded-xl pl-4"
          >
            <img src={link.image} alt={link.title} className="h-12 w-12 rounded-md" />
            <p className="mt-2 overflow-hidden text-ellipsis whitespace-nowrap text-center">
              {getDisplayTitle(link.title, link.url, link.type)}
            </p>
          </Card>
        </a>
      ))}
    </div>
  );
}

export function LayoutBComponent({ links }: { links: Link[] }) {
  return (
    <div className="grid grid-cols-2 gap-2 pt-6">
      {links.map((link) => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center rounded-lg pt-6"
        >
          <Card
            variant="default"
            className="flex h-24 w-52 flex-row items-center justify-normal gap-6 break-all rounded-xl pl-4 pr-4"
          >
            <img src={link.image} alt={link.title} className="h-12 w-12 rounded-md" />
            <p className="mt-2 overflow-hidden text-ellipsis whitespace-nowrap text-center">
              {getDisplayTitle(link.title, link.url, link.type)}
            </p>
          </Card>
        </a>
      ))}
    </div>
  );
}

export function LayoutCComponent({ links }: { links: Link[] }) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {links.map((link) => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center rounded-lg pt-6"
        >
          <Card variant="default" className="rounded-xl border-none">
            <img src={link.image} alt={link.title} className="h-12 w-12 rounded-md" />
          </Card>
        </a>
      ))}
    </div>
  );
}

export function LayoutDComponent({ links }: { links: Link[] }) {
  return (
    <div className="gap-2 pt-6">
      {links.map((link) => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center rounded-lg pt-6"
        >
          <div className="flex h-20 w-80 flex-row items-center justify-normal gap-8 rounded-xl bg-none pl-4">
            <img src={link.image} alt={link.title} className="h-12 w-12 rounded-md" />
            <p className="mt-2 overflow-hidden text-ellipsis whitespace-nowrap text-center">
              {getDisplayTitle(link.title, link.url, link.type)}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}

// Helper function to determine display title
function getDisplayTitle(title: string | undefined, url: string, type: LinkType): string {
  // 1. title이 존재하고 비어있지 않으면 title을 사용
  if (title && title.trim() !== "") {
    return title;
  }

  // 2.a 커스텀 링크면 전체 URL을 사용
  if (type === "custom") {
    return url;
  }

  // 2.b SNS 링크에서 사용자 이름만 추출하여 사용
  const username = url.replace(getSnsUrl(type), "");

  return username.trim() !== "" ? username : type;
}

export function LinkLayout() {
  const [layout, setLayout] = useState<number | null>(null);
  const [links, setLinks] = useState<Link[]>([]); // 링크 데이터를 저장할 상태

  useEffect(() => {
    const fetchLayoutAndLinks = async () => {
      try {
        const domain = "test"; // 여기에 실제 사용자의 도메인을 넣어주세요.

        //레이아웃 정보 가져오기
        const response = await fetch(`/api/button-config?domain=${domain}`);
        const data = await response.json();
        setLayout(data.layout);

        //링크 정보 가져오기
        const fetchedLinks = await getLinks(domain);
        setLinks(fetchedLinks); // links 상태에 저장
      } catch (error) {
        console.error("Error fetching layout:", error);
      }
    };

    fetchLayoutAndLinks();
  }, []);

  const renderLayoutComponent = () => {
    if (layout === 1) {
      return <LayoutAComponent links={links} />;
    }
    if (layout === 2) {
      return <LayoutBComponent links={links} />;
    }
    if (layout === 3) {
      return <LayoutCComponent links={links} />;
    }
    if (layout === 4) {
      return <LayoutDComponent links={links} />;
    }
    return <div>레이아웃을 선택해 주세요</div>;
  };

  return <>{renderLayoutComponent()}</>;
}
