"use client";
import { Jua, Orbit } from "next/font/google";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { ENV } from "@/constants/env";
import { useUser } from "@/context/user-context";

const JuaFont = Jua({ subsets: ["latin"], weight: ["400"] });
const OrbitFont = Orbit({ subsets: ["latin"], weight: ["400"] });

export function FontConfigEditor() {
  const [fontType, setFontType] = useState("폰트 A");
  const [fontSize, setFontSize] = useState("text-base");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const user = useUser(); // 사용자 정보를 가져옵니다.

  useEffect(() => {
    if (!user) {
      return;
    } // 사용자가 없으면 데이터 로딩을 중단합니다.

    const fetchFontConfig = async () => {
      const { domain } = user; // 사용자 도메인을 가져옵니다.
      try {
        const response = await fetch(`${ENV.apiUrl}/api/font-config?domain=${domain}`);
        if (!response.ok) {
          throw new Error("폰트 설정을 가져오는 데 실패했습니다.");
        }

        const data = await response.json();
        setFontType(data.type || "폰트 A");
        setFontSize(`text-${data.size}` || "text-base");
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("알 수 없는 오류가 발생했습니다.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFontConfig();
  }, [user]); // `user`가 변경될 때마다 다시 실행됩니다.

  const handleFontTypeChange = (type: string) => {
    setFontType(type);
    updateFontConfig(type, fontSize);
  };

  const handleFontSizeChange = (size: string) => {
    setFontSize(size);
    updateFontConfig(fontType, size);
  };

  const updateFontConfig = async (newFontType: string, newFontSize: string) => {
    if (!user) {
      return;
    }

    try {
      const token = sessionStorage.getItem("jwt");
      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      console.log("Updating font config:", {
        domain: user.domain,
        type: newFontType,
        size: newFontSize.replace("text-", ""),
      });

      const response = await fetch(`${ENV.apiUrl}/api/font-config?domain=${user.domain}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 추가된 부분
        },
        body: JSON.stringify({
          type: newFontType,
          size: newFontSize.replace("text-", ""),
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update font config: ${response.status} ${errorText}`);
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error updating font config:", err.message);
        setError(err.message);
      } else {
        console.error("Unknown error occurred while updating font config");
        setError("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  if (loading) {
    return <div>...로딩중</div>;
  }
  if (error) {
    return <div>에러: {error}</div>;
  }

  const cardFontClass =
    fontType === "폰트 B" ? JuaFont.className : fontType === "폰트 C" ? OrbitFont.className : "";

  const inlineFontStyle =
    fontType !== "폰트 B" && fontType !== "폰트 C" ? { fontFamily: fontType } : {};

  return (
    <>
      <section className="space-y-2 px-3 md:space-y-3">
        <h1 className="sr-only">폰트 편집</h1>

        {/* 폰트 종류 변경 */}
        <div>
          <Heading variant="subtitle2" order={2} className="font-medium">
            종류
          </Heading>
          <div className="mt-2 flex gap-2">
            <Button
              type="button"
              variant={fontType === "폰트 A" ? "primary" : "secondary"}
              onClick={() => handleFontTypeChange("폰트 A")}
            >
              폰트 A
            </Button>
            <Button
              type="button"
              variant={fontType === "폰트 B" ? "primary" : "secondary"}
              onClick={() => handleFontTypeChange("폰트 B")}
              className={`flex items-center text-base ${JuaFont.className}`}
            >
              폰트 B
            </Button>
            <Button
              type="button"
              variant={fontType === "폰트 C" ? "primary" : "secondary"}
              onClick={() => handleFontTypeChange("폰트 C")}
              className={`flex items-center text-sm ${OrbitFont.className}`}
            >
              폰트 C
            </Button>
          </div>
        </div>
        <div>
          <Heading variant="subtitle2" order={2} className="font-medium">
            사이즈
          </Heading>
          <div className="mt-2 flex gap-2">
            <Button
              type="button"
              variant={fontSize === "text-xs" ? "primary" : "secondary"}
              className="text-xs"
              onClick={() => handleFontSizeChange("text-xs")}
            >
              작게
            </Button>
            <Button
              type="button"
              variant={fontSize === "text-sm" ? "primary" : "secondary"}
              className="text-sm"
              onClick={() => handleFontSizeChange("text-sm")}
            >
              보통
            </Button>
            <Button
              type="button"
              variant={fontSize === "text-base" ? "primary" : "secondary"}
              className="text-base"
              onClick={() => handleFontSizeChange("text-base")}
            >
              크게
            </Button>
          </div>
        </div>
        <div>
          <h1 className="sr-only">폰트 미리보기</h1>
          <Card
            variant="muted"
            className={`mt-10 flex h-32 w-full items-center justify-center rounded-2xl ${fontSize} ${cardFontClass}`}
            style={inlineFontStyle}
          >
            가나다 ABC
          </Card>
        </div>
      </section>
    </>
  );
}
