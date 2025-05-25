import {
  Query,
  push,
  ref,
  set,
  get as getFirebaseData,
} from "firebase/database";
import { database } from "@/firebase";
import { Post } from "@/types/post";

const createPost = async (
  post: Post
): Promise<{
  postId?: string | null;
  status: boolean;
  message: string;
}> => {
  try {
    const postRef = ref(database, "posts");
    const newPostRef = push(postRef); // Generates a unique ID for the new user
    set(newPostRef, post);
    return {
      postId: newPostRef.key,
      status: true,
      message: "Successfully Added User to firebase👍",
    };
  } catch (error: any) {
    return {
      status: false,
      message: "Fail Added User to firebase👍",
    };
  }
};

const getPost = async () => {
  try {
    const completedTasksRef: Query = ref(database, "posts");
    const snapshot = await getFirebaseData(completedTasksRef);
    if (snapshot.exists()) {
      return {
        data: snapshot.val(),
      };
    } else {
      return {
        data: "No data found",
      };
    }
  } catch (error: any) {
    return {
      data: [],
    };
  }
};

export { createPost, getPost };
