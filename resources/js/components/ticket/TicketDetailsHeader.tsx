import React from "react";
import {
    EllipsisVertical,
    Expand,
    SquareCheckBig,
    CirclePlay,
    CircleChevronLeft,
    CircleChevronRight,
} from "lucide-react";
import { Button } from "../ui/button";
import useToggle from "@/hooks/useToggle";

const TicketDetailsHeader = () => {
    // Hook to handle toggle state for the side button
    const { isOpen, toggle } = useToggle();
    return (
        <div className="flex flex-col justify-end gap-3 relative z-0">
            {/* Header with ticket title and action buttons */}
            <header className="flex flex-row justify-between">
                <h1 className="text-xl font-bold mb-2 text-[#181C34]">
                    نواجه مشكلة في عدم عمل واجهة المستخدم
                </h1>
                {/* Action buttons */}
                <div className="flex gap-2 flex-row-reverse">
                    <Button className="border border-[#7A8699] hover:opacity-75 p-1">
                        <EllipsisVertical size={20} color="#7A8699" />
                    </Button>
                    <Button className="border border-[#7A8699] hover:opacity-75 p-1">
                        <Expand size={20} color="#7A8699" />
                    </Button>
                    <Button className="flex items-center gap-2 border border-[#7A8699] hover:opacity-75">
                        <SquareCheckBig size={20} color="#7A8699" />
                        <span className="text-[#7A8699]">تحويل لمهمة</span>
                    </Button>
                    <Button className="flex items-center gap-2 hover:opacity-75">
                        <span className="text-[#7A8699]">00:00:00</span>
                        <CirclePlay size={20} color="#7A8699" />
                    </Button>
                </div>
            </header>
            {/* Toggle button for collapsing/expanding */}
            <Button
                className="w-fit h-fit absolute top-14 -left-7 shadow-none bg-white p-0 rounded-full"
                onClick={toggle}
            >
                {isOpen ? (
                    <CircleChevronLeft size={20} color="#7A8699" />
                ) : (
                    <CircleChevronRight size={20} color="#7A8699" />
                )}
            </Button>
        </div>
    );
};

export default TicketDetailsHeader;
