"use client";
import { Button } from "@/components/ui/button";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { SignedOut, useUser } from "@clerk/nextjs";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LeftSidebar = () => {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]">
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((item) => {
          const isActive = (pathname.includes(item.route) && item.route.length > 1) || pathname === item.route;
          const groupHover = !isActive && "group-hover:text-orange-500 transition";
          const isProfileOpen = pathname === `/${user?.username}`;
          const profileHover = !isProfileOpen && "group-hover:text-orange-500 transition";
          if (item.label === "Профиль")
            return (
              <Link
                key={item.route}
                href={user?.username ? `/${user?.username}` : "/sign-in"}
                className={cn(
                  "flex items-center justify-start gap-4 bg-transparent p-4 group",
                  isProfileOpen ? "primary-gradient rounded-lg text-light-900" : "text-dark300_light900",
                )}
              >
                <Image
                  src={item.imgURL}
                  alt={item.label}
                  width={20}
                  height={20}
                  className={cn(isProfileOpen ? "" : "invert-colors")}
                />
                <p className={cn("max-lg:hidden ", profileHover, isActive)}>{item.label}</p>
              </Link>
            );
          return (
            <Link
              key={item.route}
              href={item.route}
              className={cn(
                "flex items-center justify-start gap-4 bg-transparent p-4 group",
                isActive ? "primary-gradient rounded-lg text-light-900" : "text-dark300_light900",
              )}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={20}
                height={20}
                className={cn(isActive ? "" : "invert-colors")}
              />
              <p className={cn("max-lg:hidden ", groupHover, isActive)}>{item.label}</p>
            </Link>
          );
        })}
      </div>

      <SignedOut>
        <div className="flex flex-col gap-3">
          <Link href="/sign-in">
            <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
              <Image
                className="invert-colors lg:hidden"
                alt="Login"
                width={20}
                height={20}
                src="/assets/icons/account.svg"
              />
              <span className="primary-text-gradient max-lg:hidden">Войти</span>
            </Button>
          </Link>

          <Link href="/sign-up">
            <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
              <Image
                className="invert-colors lg:hidden"
                alt="SignUp"
                width={20}
                height={20}
                src="/assets/icons/sign-up.svg"
              />
              <span className="max-lg:hidden">Регистрация</span>
            </Button>
          </Link>
        </div>
      </SignedOut>
    </section>
  );
};
export default LeftSidebar;
