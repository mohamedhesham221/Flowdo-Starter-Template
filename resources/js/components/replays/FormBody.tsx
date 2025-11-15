import React from "react";
import { Button } from "../ui/button";
import { Sparkle, Paperclip, X } from "lucide-react";
import useUpdateReply from "@/hooks/useUpdateReply";
import profilePicture from "@/assets/Rectangle.png";
const FormBody = () => {
    // State to manage the reply message
    const [message, setMessage] = React.useState("");
    const { replays, addNewReply } = useUpdateReply();
    // Handler for adding a new reply
    const handleAddReply = (e: React.FormEvent) => {
        e.preventDefault();
        addNewReply({
            id: replays.length + 1,
            name: "محمد صقر",
            message: message,
            image: profilePicture,
            timestamp: { date: "2023-10-01", time: "02:32 م" },
            replyTo: "راشد فهد",
            emails: ["ahmed@example.com", "rashedf@example.com"],
            expand: false,
        });
        setTimeout(() => {
            setMessage("");
        }, 500);
    };

    return (
        <form className="border-t border-[#E2E8F0]" onSubmit={handleAddReply}>
            {/** Reply form body */}
            <fieldset className="mt-4">
                <textarea
                    className="w-full h-32 bg-[#F7F8FA] border border-[#E2E8F0] rounded-lg p-2 outline-none resize-none focus:ring-0"
                    placeholder="إضافة رد ..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                ></textarea>
            </fieldset>
            {/** Reply form controls */}
            <div className="flex flex-row justify-between items-center mt-3">
                <div className="flex flex-row">
                    <Button variant="ghost" className="p-2 text-[#7A8699]">
                        A
                    </Button>
                    <Button variant="ghost" className="p-2 text-[#7A52FF]">
                        <Sparkle size={16} />
                    </Button>
                    <Button variant="ghost" className="p-2 text-[#7A8699]">
                        <Paperclip size={16} />
                    </Button>
                </div>
                {/** Reply form buttons */}
                <div className="flex flex-row-reverse gap-2">
                    <Button
                        type="submit"
                        className="bg-[#00CA7C] text-white hover:opacity-75 rounded-xl px-4 py-2"
                    >
                        إضافة رد
                    </Button>
                    <Button
                        type="button"
                        className=" text-[#B8BFCC] hover:opacity-75 rounded-xl px-4 py-2 border-[#B8BFCC]"
                        onClick={() => setMessage("")}
                    >
                        الغاء
                        <X size={16} color="#7A8699" className="ms-3" />
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default FormBody;
