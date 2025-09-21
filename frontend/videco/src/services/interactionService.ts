// src/services/interactionService.ts

// 定义将要发送到API的数据类型
export interface NewNotePayload {
    content: string;
    timestamp: string | null;
    videoId: string;
}

// 定义API成功返回的笔记数据类型
export interface Note {
    id: string;
    user: string;
    avatar: string;
    content:string;
    timestamp: string | null;
    replies: number;
    likes: number;
    createdAt: string;
}

/**
 * 模拟一个获取视频笔记列表的API请求。
 * @param videoId - 视频的ID
 * @returns 返回一个Promise，它会解析为一个笔记对象数组
 */
export const getNotes = async (videoId: string): Promise<Note[]> => {
    console.log(`Fetching notes for video: ${videoId}`);

    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 500));

    // 模拟服务器已有的数据
    const existingNotes: Note[] = [
        { id: 'n1', user: '学习者A', avatar: 'https://placehold.co/40x40/EFEFEF/333333?text=A', content: '这个概念解释得太清楚了！完全理解了。', timestamp: '2:35', replies: 2, likes: 15, createdAt: new Date().toISOString() },
        { id: 'n2', user: '好奇宝宝', avatar: 'https://placehold.co/40x40/EFEFEF/333333?text=B', content: '请问这个理论在现实中有哪些应用案例？', timestamp: '5:12', replies: 5, likes: 22, createdAt: new Date().toISOString() },
    ];

    console.log('Received notes from server:', existingNotes);
    return existingNotes;
};

/**
 * 模拟一个向服务器提交新笔记的API请求。
 * 在真实的应用程序中，这里会是一个 fetch 或 axios 调用。
 * @param payload - 要提交的笔记数据
 * @returns 返回一个Promise，它会解析为服务器创建的新笔记对象
 */
export const postNote = async (payload: NewNotePayload): Promise<Note> => {
    console.log('Posting note to server:', payload);

    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 500));

    // 模拟服务器返回的数据
    const newNoteFromServer: Note = {
        id: `n${Date.now()}`,
        user: 'Videco User', // 将来会从认证信息中获取
        avatar: 'https://placehold.co/40x40/EFEFEF/333333?text=VU',
        content: payload.content,
        timestamp: payload.timestamp,
        replies: 0,
        likes: 0,
        createdAt: new Date().toISOString(),
    };

    console.log('Received response from server:', newNoteFromServer);
    return newNoteFromServer;
};
