import React from "react";
import ReplyItem from "../replays/ReplyItem";
import useUpdateReply from "@/hooks/useUpdateReply";
const TicketReplays = () => {
      // Memoize ReplyItem to prevent unnecessary re-renders
    const MemoizedReplyItem = React.memo(ReplyItem);
      // Get replies from custom hook
    const { replays } = useUpdateReply();
    return (
        <div className="flex flex-col gap-1 mt-5 h-[300px] overflow-y-scroll">
            {replays.map((replay) => (
                <MemoizedReplyItem reply={replay} key={replay.id} />
            ))}
        </div>
    );
};

export default TicketReplays;
