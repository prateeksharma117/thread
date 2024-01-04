import Image from "next/image";
import Link from "next/link";
import { IoSnowOutline } from "react-icons/io5";
import { FaSnowflake } from "react-icons/fa6";
import { SlBubble } from "react-icons/sl";
import { SlActionRedo } from "react-icons/sl";
import { SlPaperPlane } from "react-icons/sl";
import { useState } from "react";
import { formatDateString } from "@/lib/utils";

interface Props {
    id: string;
    currentUserId: string;
    parentId: string | null;
    content: string;
    image: string;
    author: {
        name: string;
        image: string;
        id: string;
    };
    community: {
        id: string;
        name: string;
        image: string;
    } | null;
    createdAt: string;
    comments: {
        author: {
            image: string;
        };
    }[];
    isComment?: boolean;
}

const ThreadCard = ({
    id,
    currentUserId,
    parentId,
    content,
    image,
    author,
    community,
    createdAt,
    comments,
    isComment
}: Props) => {

    return (
        <>
            <article className={`flex w-full flex-col rounded-xl${isComment ? ' px-0 xs:px-7' : 'bg-dark-2 p-7'}`}>
                <div className=" flex items-start justify-between">
                    <div className=" flex w-full flex-1 flex-row gap-4">
                        <div className=" flex flex-col items-center">
                            <Link
                                href={`/profile/${author?.id}`}
                                className=" relative h-11 w-11"
                            >
                                <Image
                                    src={author?.image}
                                    alt="profile Image"
                                    fill
                                    className=" cursor-pointer rounded-full object-cover"
                                />
                            </Link>
                            <div className="thread-card_bar" />
                        </div>
                        <div className=" flex w-full flex-col">
                            <Link href={`/profile/${author?.id}`} className="  w-fit">
                                <h4 className=" cursor-pointer text-base-semibold text-light-1">
                                    {author?.name}
                                </h4>
                            </Link>
                            <div>
                                {image && (
                                    <>
                                        <img
                                            src={image}
                                            alt="profile Image"
                                            className="mt-3 cursor-pointer rounded-md object-cover h-[12rem]"
                                        />
                                    </>
                                )}
                            </div>
                            <p className=" mt-2 text-small-regular text-light-2">{content}</p>
                            <div className=" mt-5 flex flex-col gap-3">
                                <div className=" flex gap-5">
                                    <IoSnowOutline
                                        color="#697c89"
                                        size={18}
                                        className=" cursor-pointer"
                                    />
                                    <Link href={`/thread/${id}`}>
                                        <SlBubble
                                            className=" cursor-pointer"
                                            color="#697c89"
                                            size={18}
                                        />
                                    </Link>
                                    <SlActionRedo
                                        className=" cursor-pointer"
                                        color="#697c89"
                                        size={18}
                                    />
                                    <SlPaperPlane
                                        className=" cursor-pointer"
                                        color="#697c89"
                                        size={18}
                                    />
                                </div>
                                {
                                    isComment && comments.length > 0 && (
                                        <Link href={`/thread/${id}`}>
                                            <p className=" mt-1 text-subtle-medium text-gray-1">
                                                replies
                                            </p>
                                        </Link>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {
                    !isComment && community && (
                        <Link href={`/communities/${community.id}`} className=" mt-5 text-gray-1 flex items-center">
                            <p>
                                {formatDateString(createdAt)}{" "}-{community.name} Community
                            </p>
                            <Image
                                src={community.image}
                                alt={community.name}
                                width={20}
                                height={20}
                                className=" ml-1 rounded-full object-cover"
                            />
                        </Link>
                    )
                }
            </article >
        </>
    );
};

export default ThreadCard;
