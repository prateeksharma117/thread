import Image from "next/image";
import Link from "next/link";

import { Button } from "../ui/button";

interface Props {
    id: string;
    name: string;
    username: string;
    imgUrl: string;
    bio: string;
    members: {
        image: string;
    }[];
}

function LeftCommunityCard({ id, name, username, imgUrl, bio, members }: Props) {
    return (
        <article>
            <div className='flex justify-between'>
                <div className="flex justify-start gap-3">
                    <Link href={`/communities/${id}`} className='relative h-12 w-12'>
                        <Image
                            src={imgUrl}
                            alt='community_logo'
                            fill
                            className='rounded-full object-cover'
                        />
                    </Link>
                    <Link href={`/communities/${id}`}>
                        <h4 className='text-base-semibold text-light-1'>{name}</h4>
                        <p className='text-small-medium text-gray-1'>@{username}</p>
                    </Link>
                </div>

                <div>
                    <Link href={`/communities/${id}`}>
                        <Button size='sm' className='community-card_btn'>
                            View
                        </Button>
                    </Link>
                </div>
            </div>
        </article>
    );
}

export default LeftCommunityCard;