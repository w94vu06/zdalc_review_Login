"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useState, useEffect } from "react";
import { MdMailOutline } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const SignUp: React.FC = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      setError("密碼不相同");
      return;
    }
  
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
  
      if (response.ok) {
        window.location.href = '/auth/signin';
      } else {
        const data = await response.json();
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error("註冊時發生錯誤:", err);
      setError("註冊時發生錯誤");
    }
  };
  

  return (
    <DefaultLayout>
      <Breadcrumb pageName="註冊" />

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
                註冊為中道會員
              </h2>

              <form onSubmit={handleSignUp}>
                {error &&
                  <p className="text-red-500">
                    {error}
                  </p>
                }
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    姓名
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="輸入你的全名"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <span className="absolute right-4 top-4">
                      <FaRegUser size={24} />
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="輸入你的email"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />

                    <span className="absolute right-4 top-4">
                      <MdMailOutline size={24} />
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    密碼
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="輸入你的密碼"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    <span className="absolute right-4 top-4">
                      <MdLockOutline size={24} />
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    再次確認密碼
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="再次確認密碼"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <span className="absolute right-4 top-4">
                      <MdLockOutline size={24} />
                    </span>
                  </div>
                </div>

                <div className="mb-5">
                  <input
                    type="submit"
                    value="建立帳號"
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  />
                </div>

                <div className="mt-6 text-center">
                  <p>
                    已經有帳號了嗎?{" "}
                    <Link href="/auth/signin" className="text-primary">
                      登入
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

export default SignUp;
