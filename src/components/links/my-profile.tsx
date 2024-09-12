"use client";

import { useEffect, useState } from "react";

import { useUser } from "@/context/user-context";

import { Skeleton } from "../ui/skeleton";
import { UserProfile } from "../user-profile";

export function MyProfle() {
  // FIXME
  const user = useUser();
  const [profile, setProfile] = useState<{ nickname: string; image: string; intro: string } | null>(
    null,
  );

  useEffect(() => {
    const fetchMyProfile = async () => {
      const response = await fetch(`/api/users?id=${user?.userId}`);
      const data = await response.json();
      // FIXME
      const { user: me } = data;
      setProfile(me);
    };

    if (user) {
      fetchMyProfile();
    }
  }, [user]);

  if (!profile || !user) {
    return (
      <div className="flex flex-col items-center px-3 pt-12">
        <Skeleton className="h-24 w-24 rounded-full" />
        <Skeleton className="mt-4 h-8 w-32" />
      </div>
    );
  }

  return <UserProfile nickname={profile.nickname} intro={profile.intro} image={profile.image} />;
}
