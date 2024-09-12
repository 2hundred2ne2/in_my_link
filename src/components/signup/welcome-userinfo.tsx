"use client";
import dynamic from "next/dynamic";
import Image from "next/image"; // 이미지 사용을 위해 next/image 추가
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Heading } from "@/components/ui/heading";
import { ENV } from "@/constants/env";
import { useUser } from "@/context/user-context";
import { User } from "@/types/user";

const FireWorks = dynamic<any>(
  () => import("@/components/signup/fireworks").then((module) => module.FireWorks),
  { ssr: false },
);

/**GET API: 유저 테이블에서 회원가입 한 유저 정보 불러오기 */
async function getUser(id: string) {
  try {
    const response = await fetch(`${ENV.apiUrl}/api/users?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("유저 정보를 불러오는데 실패했어요");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.log("Error fetching user data:", error);
    return null;
  }
}

export function UserInfo() {
  const router = useRouter();
  const user = useUser() as User | null; // useUser 훅에서 user 전체를 가져옴
  const [nickname, setNickname] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string | null>(null); // 프로필 이미지 상태 추가

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!user || !user.userId) {
        return;
      } // user 또는 userId가 없으면 중단

      const userInfo = await getUser(user.userId);
      if (userInfo?.user?.nickname) {
        setNickname(userInfo.user.nickname);
      }
      if (userInfo?.user?.image) {
        setProfileImage(userInfo.user.image);
      }
    };

    fetchUserInfo();
  }, [user]);

  // if (!user || !user.userId) {
  //   router.push("/login");
  //   return <></>;
  // }

  return (
    <div className="flex flex-col items-center px-12 pt-24">
      <div>
        {/* 유저 이미지가 있으면 그 이미지를, 없으면 기본 배경 색상을 표시 */}
        {profileImage ? (
          <div className="relative h-32 w-32 rounded-full">
            <Image
              src={profileImage}
              alt={`${nickname}의 프로필 이미지`}
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </div>
        ) : (
          <span className="inline-block h-32 w-32 rounded-full bg-primary-300"></span>
        )}
      </div>
      <div className="mb-12 mt-8 inline-block h-7">
        <Heading variant="subtitle1" className="font-bold">
          {nickname ? `${nickname}님, 환영합니다!` : "환영합니다!"}
          <FireWorks />
        </Heading>
      </div>
    </div>
  );
}
