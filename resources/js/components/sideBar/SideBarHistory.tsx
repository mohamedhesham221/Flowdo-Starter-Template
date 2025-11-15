import React from "react";
import { Badge } from "../ui/badge";
import useToggle from "@/hooks/useToggle";
import {
    TicketX,
    ReplyAll,
    CircleUserRound,
    NotepadText,
    StretchHorizontal,
    MoveDown,
} from "lucide-react";

const SideBarHistory = () => {
    const recordsCount: number = 5;
    // Define the type for timestamp
    type TimeStamp = {
        date: string;
        time: string;
    };
    // Sample records data
    const records: Array<{
        id: number;
        title: string;
        action: string;
        timestamp: TimeStamp;
        icon: React.ElementType;
        iconColor?: string;
        iconBgColor?: string;
    }> = [
        {
            id: 1,
            title: "أحدث الطلبات",
            action: "قام @محمد صقر بإنشاء تذكره باسم نواجه مشكله في عدم عمل واجة المستخدم الحاليه ارجو الرد",
            timestamp: { date: "2023-10-01", time: "02:32 م" },
            icon: TicketX,
            iconColor: "#5A91FF",
            iconBgColor: "#D8E8FF",
        },
        {
            id: 2,
            title: "أحدث الطلبات",
            action: "قام @راشد فهد بالرد علي التذكره ب جاري العمل علي اصلاح المشكله",
            timestamp: { date: "2023-10-01", time: "02:32 م" },
            icon: ReplyAll,
            iconColor: "#7A8699",
            iconBgColor: "#F0F1F3",
        },
        {
            id: 3,
            title: "أحدث الطلبات",
            action: "قام @العميل بالرد علي التذكره شاكرين لمجهوداتكم والرد السريع",
            timestamp: { date: "2023-10-01", time: "02:32 م" },
            icon: CircleUserRound,
            iconColor: "#00CA7C",
            iconBgColor: "#C7F3DD",
        },
        {
            id: 4,
            title: "أحدث الطلبات",
            action: "قام @راشد فهد باضافة ملاحظه ب ارجو العمل علي حل المشكله باسرع ما يمكن",
            timestamp: { date: "2023-10-01", time: "02:32 م" },
            icon: NotepadText,
            iconColor: "#FFA43D",
            iconBgColor: "#FFF0D8",
        },
        {
            id: 5,
            title: "أحدث الطلبات",
            action: "قام @محمد صقر بتغيير حاله التذكره من مفتوح الي مغلق",
            timestamp: { date: "2023-10-01", time: "02:32 م" },
            icon: StretchHorizontal,
            iconColor: "#8426EF",
            iconBgColor: "#EDD8FF",
        },
    ];
    // Use the custom hook to get the toggle state
    const { isOpen } = useToggle();
    // Render the sidebar only if isOpen is true
    return isOpen ? (
        <div className="w-1/5 p-4 border border-r-[#98A2B2]">
            <div className="flex items-center justify-start gap-2">
                <h2 className="text-lg">السجلات الزمنية</h2>
                <Badge className="mt-2 text-lg">{recordsCount}</Badge>
            </div>
            {/* Sidebar with ticket info */}
            <div className="mt-4 space-y-4 max-h-[600px] overflow-y-auto">
                {records.map((record) => (
                    <div key={record.id} className="flex items-start gap-3">
                        <div className="flex flex-col items-center h-full">
                            <div
                                className={`p-2 rounded-full`}
                                style={{ backgroundColor: record.iconBgColor }}
                            >
                                <record.icon
                                    size={20}
                                    color={record.iconColor}
                                />
                            </div>
                            {/* Connector and arrow for timeline */}
                            {record.id !== records.length && (
                                <div className="flex flex-col items-center flex-1 opacity-20">
                                    {/* vertical line */}
                                    <div
                                        className="w-[2.5px] h-8 flex-0"
                                        style={{
                                            backgroundColor: record.iconColor,
                                        }}
                                    ></div>

                                    {/* arrow at the end */}
                                    <MoveDown
                                        color={record.iconColor}
                                        className="-m-1"
                                    />
                                </div>
                            )}
                        </div>
                        {/* Record details */}
                        <div>
                            <h3 className="font-medium text-sm text-[#29304C]">
                                {record.title}
                            </h3>
                            <p className="text-xs text-[#7A8699] mb-3 flex gap-2">
                                <span>{record.timestamp.date}</span>
                                <span>{record.timestamp.time}</span>
                            </p>
                            <p className="text-xs text-[#29304C]">
                                {record.action}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    ) : null;
};

export default SideBarHistory;
