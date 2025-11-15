import React from "react";
import {
    Reply,
    Mail,
    EllipsisVertical,
    ChevronDown,
    ChevronUp,
} from "lucide-react";
import { Button } from "../ui/button";
import useUpdateReply from "@/hooks/useUpdateReply";

// Define the type for the reply prop
type replyType = {
    id: number;
    name: string;
    message: string;
    image: string;
    timestamp: { date: string; time: string };
    replyTo: string;
    emails: string[];
    expand: boolean;
};
// Component to display a single reply item
const ReplyItem = ({ reply }: { reply: replyType }) => {
    const { toggleExpand } = useUpdateReply();
    return (
        <div>
            <div
                className="border-2 rounded-lg p-4 mb-4"
                style={{
                    borderColor: !reply.expand ? "#00CA7C" : "#E2E8F0",
                    backgroundColor: !reply.expand ? "#00CA7C0D" : "#FFFFFF",
                }}
            >
                {/* Reply header with image, name, and timestamp */}
                <div className="flex items-start mb-2 gap-3">
                    <img
                        src={reply.image}
                        alt={`${reply.name} profile`}
                        className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-grow">
                        <div className="flex gap-4">
                            <span className="font-semibold text-[#29304C]">
                                {reply.name}
                            </span>
                            <span className="text-sm  flex gap-4 items-center text-[#7A8699]">
                                <span>{reply.timestamp.date}</span>
                                <span>{reply.timestamp.time}</span>
                            </span>
                        </div>
                        {/* Reply details including replyTo and emails */}
                        <div className="mt-2 flex gap-4">
                            <span className="text-sm  flex items-center gap-2 text-[#7A8699]">
                                <Reply size={16} color="#7A8699" />
                                موجهة إلي {reply.replyTo}
                            </span>
                            <div className="flex flex-wrap gap-2 items-center">
                                <Mail size={16} color="#7A8699" />
                                {reply.emails.map((email, index) => (
                                    <span
                                        key={index}
                                        className="text-sm text-[#7A8699]"
                                    >
                                        <span
                                            style={{
                                                display:
                                                    index + 1 !==
                                                    reply.emails.length
                                                        ? "none"
                                                        : "inline",
                                            }}
                                        >
                                            ,
                                        </span>{" "}
                                        {`<${email}>`}
                                    </span>
                                ))}
                            </div>
                        </div>
                        {/* Expanded message content */}
                        {reply.expand && (
                            <div className="pt-4">
                                <p className="text-[#29304C] leading-5 text-xs">
                                    {reply.message}
                                </p>
                            </div>
                        )}
                    </div>
                    {/* Expand/collapse and options buttons */}
                    <div className="flex flex-row gap-2 items-start">
                        {reply.expand ? (
                            <Button
                                size="icon"
                                variant="ghost"
                                className="contents"
                                onClick={() => toggleExpand(reply.id)}
                            >
                                <ChevronUp size={20} color="#7A8699" />
                            </Button>
                        ) : (
                            <Button
                                size="icon"
                                variant="ghost"
                                className="contents"
                                onClick={() => toggleExpand(reply.id)}
                            >
                                <ChevronDown size={20} color="#7A8699" />
                            </Button>
                        )}
                        <EllipsisVertical size={20} color="#7A8699" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReplyItem;
