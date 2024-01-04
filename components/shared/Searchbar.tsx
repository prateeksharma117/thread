"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

import { Input } from "../ui/input";

interface Props {
    routeType: string;
}

function Searchbar({ routeType }: Props) {
    const router = useRouter();
    const [search, setSearch] = useState("");

    return (
        <div className='searchbar flex items-center'>
            <CiSearch color="white" size={30}/>
            <Input
                id='text'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className='no-focus searchbar_input'
            />
        </div>
    );
}

export default Searchbar;