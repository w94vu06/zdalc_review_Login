"use client";
import { useEffect } from "react";
import { useRouter } from "next/router";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { getSession } from "next-auth/react"; 

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkUserSession = async () => {
      const session = await getSession(); // 使用 next-auth 獲取 session

      if (session) {
        // 使用者已登入，導向 /profile
        router.push("/profile");
      } else {
        // 使用者未登入，導向 /auth/signin
        router.push("/auth/signin");
      }
    };

    checkUserSession();
  }, [router]);

  return (
    <DefaultLayout>
      還沒想到要放什麼
    </DefaultLayout>
  );
}
