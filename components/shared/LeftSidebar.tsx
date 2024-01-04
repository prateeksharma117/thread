"use client";

import { sidebarLinks } from "@/constants";
import { SignOutButton, SignedIn, useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CiLogout } from "react-icons/ci";

const LeftSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const{userId}=useAuth()

  return (
    <>
      <section className="custom-scrollbar leftsidebar">
        <div className=" flex w-full flex-1 gap-6 px-6 flex-col">
          {sidebarLinks.map((link) => {

            if(link.route==="/profile") link.route=`${link.route}/${userId}`

            const isActive =
              (pathname.includes(link.route) && link.route.length > 1) ||
              pathname === link.route;

            return (
              <Link
                href={link.route}
                key={link.label}
                className={`leftsidebar_link ${isActive && "bg-[#528ae2]"}`}
              >
                {link.imgURL}
                <p className=" text-light-1 max-lg:hidden">{link.label}</p>
              </Link>
            );
          })}
        </div>
        <div className=" mt-10 px-6">
          <SignedIn>
            <SignOutButton signOutCallback={()=>router.push('/sign-in')}>
              <div className=" flex cursor-pointer gap-4 p-4">
                <CiLogout color="white" size={24} />
                <p className=" text-light-2 max-lg:hidden">Logout</p>
              </div>
            </SignOutButton>
          </SignedIn>
        </div>
      </section>
    </>
  );
};

export default LeftSidebar;
