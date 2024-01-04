import { currentUser, OrganizationSwitcher, SignedIn, SignOutButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Image from "next/image";
import Link from "next/link";
import { CiLogout } from "react-icons/ci";
import { redirect } from "next/navigation";


const Topbar = async() => {

    const user = await currentUser()

    if(!user) redirect("/sign-in")

    return (
        <>
            <nav className="topbar">
                    <Link href="/" className=" flex items-center gap-4">
                        <Image src="/logo.png" alt="logo" width={28} height={28} />
                        <p className="text-heading3-bold text-light-1 max-xs:hidden">
                            Thread
                        </p>
                    </Link>

                <div className=" flex items-center gap-1">
                    <div className=" block md:hidden">
                        <SignedIn>
                            <SignOutButton>
                                <div className=" flex cursor-pointer">
                                    <CiLogout color="white" size={24} />
                                </div>
                            </SignOutButton>
                        </SignedIn>
                    </div>
                    <OrganizationSwitcher
                        appearance={{
                            baseTheme: dark,
                            elements: {
                                organizationSwitcherTrigger: "py-2 px-4",
                            },
                        }}
                    />
                </div>
            </nav>
        </>
    );
};

export default Topbar;
