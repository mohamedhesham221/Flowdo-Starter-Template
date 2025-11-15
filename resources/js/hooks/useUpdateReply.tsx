import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import profilePicture from "@/assets/Rectangle.png";

// Types
type TimeStamp = {
    date: string;
    time: string;
};

type Reply = {
    id: number;
    name: string;
    message: string;
    image: string;
    timestamp: TimeStamp;
    replyTo: string;
    emails: string[];
    expand: boolean;
};
// Initial mock replies
const initialReplays: Reply[] = [
    {
        id: 1,
        name: "محمد صقر",
        message: "وصف مطول للتذكرة مثل نحتاج عرض سعر لخدمات الصيانة اللازمة للمعدات. وصف  مطول للتذكرة مثل نحتاج عرض سعر لخدمات الصيانة اللازمة للمعدات. وصف مطول للتذكرة مثل نحتاج عرض سعر لخدمات الصيانة اللازمة للمعدات. وصف مطول للتذكرة مثل نحتاج عرض سعر لخدمات الصيانة اللازمة للمعدات. وصف مطول للتذكرة مثل نحتاج عرض سعر لخدمات الصيانة اللازمة للمعدات. وصف  مطول للتذكرة مثل نحتاج عرض سعر لخدمات الصيانة اللازمة للمعدات.",
        image: profilePicture,
        timestamp: { date: "2023-10-01", time: "02:32 م" },
        replyTo: "راشد فهد",
        emails: ["ahmed@example.com", "rashedf@example.com"],
        expand: true,
    },
    {
        id: 2,
        name: "محمد صقر",
        message: "وصف مطول للتذكرة مثل نحتاج عرض سعر لخدمات الصيانة اللازمة للمعدات. وصف  مطول للتذكرة مثل نحتاج عرض سعر لخدمات الصيانة اللازمة للمعدات. وصف مطول للتذكرة مثل نحتاج عرض سعر لخدمات الصيانة اللازمة للمعدات. وصف مطول للتذكرة مثل نحتاج عرض سعر لخدمات الصيانة اللازمة للمعدات. وصف مطول للتذكرة مثل نحتاج عرض سعر لخدمات الصيانة اللازمة للمعدات. وصف  مطول للتذكرة مثل نحتاج عرض سعر لخدمات الصيانة اللازمة للمعدات.",
        image: profilePicture,
        timestamp: { date: "2023-10-01", time: "02:32 م" },
        replyTo: "راشد فهد",
        emails: ["ahmed@example.com", "rashedf@example.com"],
        expand: false,
    },
];

// Persistent mock database
let mockDatabase: Reply[] = [...initialReplays];

// Mock Axios API
const mockAxios = {
    get: async (url: string): Promise<{ data: Reply[] }> => {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        return { data: [...mockDatabase] };
    },
    
    patch: async (url: string, data: { id: number; expand: boolean }): Promise<{ data: Reply }> => {
        await new Promise((resolve) => setTimeout(resolve, 300));
        const index = mockDatabase.findIndex(r => r.id === data.id);
        if (index === -1) throw new Error("Reply not found");
        
        mockDatabase[index] = { ...mockDatabase[index], expand: data.expand };
        return { data: mockDatabase[index] };
    },
    
    post: async (url: string, data: Reply): Promise<{ data: Reply }> => {
        await new Promise((resolve) => setTimeout(resolve, 400));
        mockDatabase = [...mockDatabase, data];
        return { data };
    },
};

// TanStack Query Hook
const useUpdateReply = () => {
    const queryClient = useQueryClient();

    // Fetch replies
    const { data: replays = [], isLoading, error } = useQuery({
        queryKey: ["replies"],
        queryFn: async () => {
            const response = await mockAxios.get("/api/replies");
            return response.data;
        },
        initialData: initialReplays,
    });

    // Toggle expand mutation
    const toggleExpandMutation = useMutation({
        mutationFn: async (id: number) => {
            const reply = replays.find(r => r.id === id);
            if (!reply) throw new Error("Reply not found");
            
            return mockAxios.patch(`/api/replies/${id}`, {
                id,
                expand: !reply.expand,
            });
        },
        onMutate: async (id: number) => {
            // Cancel outgoing refetches
            await queryClient.cancelQueries({ queryKey: ["replies"] });

            // Snapshot previous value
            const previous = queryClient.getQueryData<Reply[]>(["replies"]);

            // Optimistically update
            queryClient.setQueryData<Reply[]>(["replies"], (old = []) =>
                old.map((reply) =>
                    reply.id === id ? { ...reply, expand: !reply.expand } : reply
                )
            );

            return { previous };
        },
        onError: (err, id, context) => {
            // Rollback on error
            if (context?.previous) {
                queryClient.setQueryData(["replies"], context.previous);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["replies"] });
        },
    });

    // Add new reply mutation
    const addNewReplyMutation = useMutation({
        mutationFn: async (newReply: Reply) => {
            return mockAxios.post("/api/replies", newReply);
        },
        onMutate: async (newReply: Reply) => {
            await queryClient.cancelQueries({ queryKey: ["replies"] });
            const previous = queryClient.getQueryData<Reply[]>(["replies"]);

            queryClient.setQueryData<Reply[]>(["replies"], (old = []) => [
                ...old,
                newReply,
            ]);

            return { previous };
        },
        onError: (err, newReply, context) => {
            if (context?.previous) {
                queryClient.setQueryData(["replies"], context.previous);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["replies"] });
        },
    });

    const toggleExpand = (id: number) => {
        toggleExpandMutation.mutate(id);
    };

    const addNewReply = (newReply: Reply) => {
        addNewReplyMutation.mutate(newReply);
    };

    return {
        replays,
        toggleExpand,
        addNewReply,
        isLoading,
        error,
    };
};

export default useUpdateReply;