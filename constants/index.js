import { CiHome } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { PiGooglePhotosLogoThin } from "react-icons/pi";
import { GoPeople } from "react-icons/go";
import { HiOutlineFaceSmile } from "react-icons/hi2";
import { BiMessageRoundedDots } from "react-icons/bi";
import { CiShoppingTag } from "react-icons/ci";
import { FaRegFaceGrinTears } from "react-icons/fa6";
import { SlPeople } from "react-icons/sl";
import { IoPersonAddOutline } from "react-icons/io5";



export const sidebarLinks = [
    {
      imgURL: <CiHome color="white" size={24}/>,
      route: "/",
      label: "Home",
    },
    {
      imgURL: <CiSearch color="white" size={24}/>,
      route: "/search",
      label: "Search",
    },
    {
      imgURL: <CiHeart color="white" size={24}/>,
      route: "/activity",
      label: "Activity",
    },
    {
      imgURL: <PiGooglePhotosLogoThin color="white" size={24}/>,
      route: "/create-thread",
      label: "Create Thread",
    },
    {
      imgURL: <GoPeople color="white" size={24}/>,
      route: "/communities",
      label: "Communities",
    },
    {
      imgURL: <HiOutlineFaceSmile color="white" size={24}/>,
      route: "/profile",
      label: "Profile",
    },
  ];
  
  export const profileTabs = [
    { value: "threads", label: "Threads", icon: <BiMessageRoundedDots color="#697c89" size={24}/> },
    { value: "replies", label: "Replies", icon: <CiShoppingTag color="#697c89" size={24}/> },
    { value: "tagged", label: "Tagged", icon: <FaRegFaceGrinTears color="#697c89" size={24}/> },
  ];
  
  export const communityTabs = [
    { value: "threads", label: "Threads", icon: <BiMessageRoundedDots color="#697c89" size={24}/> },
    { value: "members", label: "Members", icon: <SlPeople color="#697c89" size={24}/> },
    { value: "requests", label: "Requests", icon: <IoPersonAddOutline color="#697c89" size={24}/> },
  ];