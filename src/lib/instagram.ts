export interface InstagramPost {
    id: string;
    caption?: string;
    media_url: string;
    thumbnail_url?: string;
    permalink: string;
    timestamp: string;
    media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
}

export interface InstagramProfile {
    id: string;
    username: string;
    profile_picture_url?: string;
}

export interface InstagramFeedData {
    profile: InstagramProfile | null;
    posts: InstagramPost[];
}

interface InstagramMediaApiResponse {
    data?: InstagramPost[];
    error?: {
        message: string;
        type: string;
        code: number;
    };
}

interface InstagramUserApiResponse {
    id?: string;
    username?: string;
    profile_picture_url?: string;
    error?: {
        message: string;
        type: string;
        code: number;
    };
}

export async function getInstagramProfile(): Promise<InstagramProfile | null> {
    const token = process.env.INSTAGRAM_ACCESS_TOKEN;
    if (!token) return null;

    try {
        const url = `https://graph.instagram.com/me?fields=id,username,profile_picture_url&access_token=${token}`;
        const res = await fetch(url, {
            next: { revalidate: 3600 },
        });

        if (!res.ok) {
            console.error("Failed to fetch Instagram profile:", res.status);
            return null;
        }

        const data: InstagramUserApiResponse = await res.json();
        if (!data.id || !data.username) return null;

        return {
            id: data.id,
            username: data.username,
            profile_picture_url: data.profile_picture_url,
        };
    } catch (error) {
        console.error("Error fetching Instagram profile:", error);
        return null;
    }
}

export async function getInstagramPosts(limit = 12): Promise<InstagramPost[]> {
    const token = process.env.INSTAGRAM_ACCESS_TOKEN;

    if (!token) {
        console.warn("INSTAGRAM_ACCESS_TOKEN is not configured.");
        return [];
    }

    try {
        const fields = "id,caption,media_url,thumbnail_url,permalink,timestamp,media_type";
        const url = `https://graph.instagram.com/me/media?fields=${fields}&limit=${limit}&access_token=${token}`;

        const res = await fetch(url, {
            next: { revalidate: 3600 }, // Cache and revalidate in background every 1 hour
        });

        if (!res.ok) {
            const errorBody = await res.json().catch(() => ({}));
            console.error("Failed to fetch Instagram posts:", res.status, errorBody);
            return [];
        }

        const data: InstagramMediaApiResponse = await res.json();
        return data.data || [];
    } catch (error) {
        console.error("Error fetching Instagram posts:", error);
        return [];
    }
}

export async function getInstagramData(limit = 12): Promise<InstagramFeedData> {
    const [profile, posts] = await Promise.all([
        getInstagramProfile(),
        getInstagramPosts(limit),
    ]);

    return { profile, posts };
}
