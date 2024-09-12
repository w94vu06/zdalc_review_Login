"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { MdMailOutline } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      
      if (response.headers.get('content-type')?.includes('application/json')) {
        const data = await response.json();
        if (response.ok) {
          window.location.href = "/profile";
        } else {
          setError(data.message || "登入失敗");
        }
      } else {
        setError("帳號或密碼錯誤");
      }
      
    } catch (err) {
      console.error("登入時發生錯誤:", err);
      setError("登入時發生錯誤");
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="登入" />

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="px-32 py-17.5 text-center">
            <Image
                  src={"/images/logo/zd_logo.png"}
                  alt="Logo"
                  width={300}
                  height={32}
                />
            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <span className="mb-1.5 block font-medium">現在開始你的中道之旅</span>
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                登入為中道會員
              </h2>

              <form onSubmit={handleSignIn}>
                {error && (
                  <p className="text-red-500">
                    {error}
                  </p>
                )}
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="輸入你的Email"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <span className="absolute right-4 top-4">
                      <MdMailOutline size={24} />
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    密碼
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="6 個以上字符，1 個大寫字母"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span className="absolute right-4 top-4">
                      <MdLockOutline size={24} />
                    </span>
                  </div>
                </div>

                <div className="mb-5">
                  <input
                    type="submit"
                    value="登入"
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  />
                </div>

                <div className="mt-6 text-center">
                  <p>
                    還沒成為中道會員?{" "}
                    <Link href="/auth/signup" className="text-primary">
                      註冊
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SignIn;
