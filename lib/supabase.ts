import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import {
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  SUPABASE_STORAGE_BUCKET,
} from "./config";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});


export interface Profile {
  id: string;
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
}

export interface Post {
  id: string;
  user_id: string;
  title: string;
  body: string | null;
  image_url: string | null;
  channel: string | null;
  tags: string[] | null;
  created_at: string;
  author?: Profile | null;
  comments_count?: number;
}

export interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  body: string;
  created_at: string;
  author?: Profile | null;
  post?: { id: string; title: string } | null;
}

export async function fetchPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*, author:profiles!posts_user_id_fkey(*)")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Post[];
}

export async function fetchPost(postId: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from("posts")
    .select("*, author:profiles!posts_user_id_fkey(*)")
    .eq("id", postId)
    .single();
  if (error) throw error;
  return data as Post;
}

export async function fetchPostsByUser(userId: string): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*, author:profiles!posts_user_id_fkey(*)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Post[];
}

export async function createPost(input: {
  title: string;
  body?: string;
  imageUri?: string | null;
  channel?: string;
  tags?: string[];
}): Promise<Post> {
  const { data: userData, error: userErr } = await supabase.auth.getUser();
  if (userErr || !userData.user) throw userErr ?? new Error("Not signed in");
  const userId = userData.user.id;

  let imageUrl: string | null = null;
  if (input.imageUri) {
    imageUrl = await uploadPostImage(userId, input.imageUri);
  }

  const { data, error } = await supabase
    .from("posts")
    .insert({
      user_id: userId,
      title: input.title,
      body: input.body ?? null,
      image_url: imageUrl,
      channel: input.channel ?? null,
      tags: input.tags ?? [],
    })
    .select("*, author:profiles!posts_user_id_fkey(*)")
    .single();
  if (error) throw error;
  return data as Post;
}

export async function deletePost(postId: string): Promise<void> {
  const { error } = await supabase.from("posts").delete().eq("id", postId);
  if (error) throw error;
}


export async function fetchComments(postId: string): Promise<Comment[]> {
  const { data, error } = await supabase
    .from("comments")
    .select("*, author:profiles!comments_user_id_fkey(*)")
    .eq("post_id", postId)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Comment[];
}

export async function fetchCommentsByUser(userId: string): Promise<Comment[]> {
  const { data, error } = await supabase
    .from("comments")
    .select(
      "*, author:profiles!comments_user_id_fkey(*), post:posts!comments_post_id_fkey(id, title)"
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Comment[];
}

export async function createComment(
  postId: string,
  body: string
): Promise<Comment> {
  const { data: userData, error: userErr } = await supabase.auth.getUser();
  if (userErr || !userData.user) throw userErr ?? new Error("Not signed in");

  const { data, error } = await supabase
    .from("comments")
    .insert({
      post_id: postId,
      user_id: userData.user.id,
      body,
    })
    .select("*, author:profiles!comments_user_id_fkey(*)")
    .single();
  if (error) throw error;
  return data as Comment;
}

export async function deleteComment(commentId: string): Promise<void> {
  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId);
  if (error) throw error;
}


export async function fetchProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();
  if (error) throw error;
  return (data as Profile) ?? null;
}


export async function uploadPostImage(
  userId: string,
  fileUri: string
): Promise<string> {
  const ext = fileUri.split(".").pop()?.split("?")[0] ?? "jpg";
  const path = `${userId}/${Date.now()}.${ext}`;

  const res = await fetch(fileUri);
  const arrayBuffer = await res.arrayBuffer();

  const contentType =
    ext === "png"
      ? "image/png"
      : ext === "webp"
      ? "image/webp"
      : "image/jpeg";

  const { error } = await supabase.storage
    .from(SUPABASE_STORAGE_BUCKET)
    .upload(path, arrayBuffer, { contentType, upsert: false });
  if (error) throw error;

  const { data } = supabase.storage
    .from(SUPABASE_STORAGE_BUCKET)
    .getPublicUrl(path);
  return data.publicUrl;
}
