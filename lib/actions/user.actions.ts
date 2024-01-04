"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectedToDb } from "../mongoose";
import Thread from "../models/thread.model";
import { FilterQuery, SortOrder } from "mongoose";

interface Params {
    userId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
    path: string;
}

export const updateUser = async ({
    userId,
    username,
    name,
    bio,
    image,
    path,
}: Params): Promise<void> => {
    connectedToDb();

    try {
        await User.findOneAndUpdate(
            { id: userId },
            {
                username: username.toLowerCase(),
                name,
                bio,
                image,
                onboarded: true,
            },
            { upsert: true }
        );

        if (path === "/profile/edit") {
            revalidatePath(path);
        }
    } catch (e: any) {
        throw new Error(e.message);
    }
};

export const fetchUser = async (userId: string) => {
    try {
        connectedToDb();
        return await User.findOne({ id: userId }); /* .populate({
            path:'communities',
            model:'Community',
        }) */
    } catch (e: any) {
        throw new Error(e.message);
    }
};

export const fetchUserPosts = async (userId: string) => {
    try {
        connectedToDb();

        const threads = await User.findOne({ id: userId }).populate({
            path: "threads",
            model: Thread,
            populate: {
                path: "children",
                model: Thread,
                populate: {
                    path: "author",
                    model: User,
                    select: "name, image,id",
                },
            },
        });

        return threads
    } catch (e) {
        throw new Error(e.message);
    }
};

export const fetchUsers = async ({ userId, searchString = "", pageNumber = 1, pageSize = 20, sortBy = "desc" }
    : { userId: string, searchString: string, pageNumber?: number, pageSize?: number, sortBy?: SortOrder }) => {
    try {
        connectedToDb();

        const skipAmount = (pageNumber - 1) * pageSize
        const regex = new RegExp(searchString, "i");

        const query:FilterQuery<typeof User> ={
            id:{$ne:userId}
        }

        if (searchString !== "") {
            query.$or=[
                {username:{$regex:regex}},
                {name:{$regex:regex}}
            ]
        }

        const sortOptions={
            createdAt:sortBy
        }

        const userQuery=User.find(query)
        .sort(sortOptions)
        .limit(pageSize)
        .skip(skipAmount)

        const totalUserCount=await User.countDocuments(query)

        const users=await userQuery.exec()

        const isNext=totalUserCount>skipAmount+users.length

        return{users,isNext}

    } catch (e) {
        throw new Error(e.message)
    }
}

export const getActivity=async(userId:string) =>{
    try {
        connectedToDb()

        const userThread=await Thread.find({author:userId})

        const childThreadIds=userThread.reduce((acc,userThread)=>{
            return  acc.concat(userThread.children)
        },[])
        
        const replies=await Thread.find({
            _id:{$in:childThreadIds},
            author:{$ne:userId}
        }).populate({
            path:'author',
            model:User,
            select:"name image _id"
        })

        return replies 
    } catch (e:any) {
        throw new Error(e.message)
    }
}