"use server";

import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectedToDb } from "../mongoose";

interface Params {
    text: string;
    image: string | "";
    author: string;
    communityId: string | null;
    path: string;
}

export const createThread = async ({
    text,
    image,
    author,
    communityId,
    path,
}: Params) => {
    try {
        connectedToDb();

        const createThread = await Thread.create({
            text,
            image,
            author,
            community: null,
        });

        await User.findByIdAndUpdate(author, {
            $push: { threads: createThread._id },
        });

        revalidatePath(path);
    } catch (e: any) {
        throw new Error(e.message);
    }
};

export const fetchPosts = async (pageNumber = 1, pageSize = 20) => {
    connectedToDb();

    const skipAmount = (pageNumber - 1) * pageSize;

    const postsQuery = Thread.find({ parentId: { $in: [null, undefined] } })
        .sort({ createdAt: "desc" })
        .skip(skipAmount)
        .limit(pageSize)
        .populate({ path: "author", model: User })
        .populate({
            path: "children",
            populate: {
                path: "author",
                model: User,
                select: "_id name parentId image",
            },
        });

    const totalPostCount = await Thread.countDocuments({
        parentId: { $in: [null, undefined] },
    });

    const posts = await postsQuery.exec();
    const isNext = totalPostCount > skipAmount + posts.length;

    return { posts, isNext };
};

export const fetchThreadById = async (id: string) => {
    connectedToDb();

    try {
        const thread = await Thread.findById(id)
            .populate({ path: "author", model: User, select: "_id id name image" })
            .populate({
                path: "children",
                populate: [
                    { path: "author", model: User, select: "_id id name parentId image" },
                    {
                        path: "children",
                        model: Thread,
                        populate: {
                            path: "author",
                            model: User,
                            select: "_id id name parentId image",
                        },
                    },
                ],
            })
            .exec();

        return thread;
    } catch (e: any) {
        throw new Error(e.message);
    }
};

export const addCommentToThread = async (
    threadId: String,
    commentText: string,
    userId: string,
    path: string
) => {
    connectedToDb();

    try {
        const originalThread = await Thread.findById(threadId);
        if (!originalThread) {
            throw new Error("Thread not found");
        }

        const commentThread = new Thread({
            text: commentText,
            author: userId,
            parentId: threadId,
        });

        const saveCommentThread = await commentThread.save();

        originalThread.children.push(saveCommentThread._id);
        await originalThread.save();
        revalidatePath(path);
    } catch (e: any) {
        throw new Error(e.message);
    }
};
