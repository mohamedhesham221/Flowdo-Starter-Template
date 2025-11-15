import React from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { FilePlus } from "lucide-react";

// QuickReplays Component
const badges = [
    "مرحبا بك، سيتم تحويل المشكلة للفريق المختص",
    "أهلا، تم استلام طلبكم وجاري معالجته",
    "شكرا لتواصلكم معنا، سنعود إليكم قريبا",
    "تم تحديث طلبكم، يرجى التحقق من بريدكم الإلكتروني",
];
const QuickReplays = () => {
    return (
        <div className="flex flex-row gap-4 justify-start items-center">
            <h2 className="text-[13px] whitespace-nowrap font-semibold text-[#7A8699]">
                ردود سريعة
            </h2>
            <div className="flex flex-row gap-2 overflow-x-scroll bg-[#F9FAFB] p-2 rounded-lg">
                {badges.map((badge, index) => (
                    <Badge
                        key={index}
                        className="cursor-pointer text-[9px] text-[#7A8699] hover:bg-blue-500 hover:text-white transition-colors border border-[#B8BFCC] px-1 whitespace-nowrap"
                    >
                        {badge}
                    </Badge>
                ))}
            </div>
            <Button
                variant="outline"
                size="sm"
                className="flex gap-2 hover:opacity-80"
            >
                <FilePlus size="16" color="#7A8699" />{" "}
                <span className="text-[#7A8699]">استدعاء من قالب</span>
            </Button>
        </div>
    );
};

export default QuickReplays;
