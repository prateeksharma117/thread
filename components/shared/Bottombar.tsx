"use client";

import { sidebarLinks } from "@/constants";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const Bottombar = () => {

  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
    <section className="bottombar">
      <div className="bottombar_container">
      {sidebarLinks.map((link) => {
            const isActive =
              (pathname.includes(link.route) && link.route.length > 1) ||
              pathname === link.route;

            return (
              <Link 
                href={link.route}
                key={link.label}
                className={`bottombar_link ${isActive && "bg-[#528ae2]"}`}
              >
                {link.imgURL}
                <p className=" text-subtle-medium text-light-1 max-sm:hidden">{link.label.split(/\s+/)[0]}</p>
              </Link>
            );
          })}
      </div>
    </section>
    </>
  )
}

export default Bottombar
