"use client";
import { Nanum_Pen_Script } from "next/font/google";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { ENV } from "@/constants/env";

const hahmletFont = Nanum_Pen_Script({ subsets: ["latin"], weight: ["400"] });

export function FontConfigEditor() {
  const [fontType, setFontType] = useState("폰트 A");
  const [fontSize, setFontSize] = useState("text-base");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const domain = "test";

  const fetchFontConfig = async () => {
    try {
      const response = await fetch(`${ENV.apiUrl}/api/font-config?domain=${domain}`);
      if (!response.ok) {
        throw new Error("Failed to fetch font config");
      }

      const data = await response.json();
      setFontType(data.type || "폰트 A");
      setFontSize(`text-${data.size}` || "text-base");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateFontConfig = async (newFontType: string, newFontSize: string) => {
    try {
      const response = await fetch(`${ENV.apiUrl}/api/font-config?domain=${domain}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: newFontType,
          size: newFontSize.replace("text-", ""),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update font config");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchFontConfig();
  }, []);

  const handleFontTypeChange = (type: string) => {
    setFontType(type);
    updateFontConfig(type, fontSize);
  };

  const handleFontSizeChange = (size: string) => {
    setFontSize(size);
    updateFontConfig(fontType, size);
  };

  if (loading) {
    return <div>...로딩중</div>;
  }
  if (error) {
    return <div>에러: {error}</div>;
  }

  const cardFontClass = fontType === "폰트 B" ? hahmletFont.className : "";
  const inlineFontStyle = fontType !== "폰트 B" ? { fontFamily: fontType } : {};

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
            >
              폰트 B
            </Button>
            <Button
              type="button"
              variant={fontType === "폰트 C" ? "primary" : "secondary"}
              onClick={() => handleFontTypeChange("폰트 C")}
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
