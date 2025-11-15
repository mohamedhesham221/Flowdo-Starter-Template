import React from "react";
import {
    ArrowRightLeft,
    ContactRound,
    FlagTriangleRight,
    FileSpreadsheet,
    WalletCards,
} from "lucide-react";
// Define the actions with their respective icons and labels
const actions = [
    {
        icon: ArrowRightLeft,
        label: "الإجراءات",
    },
    {
        icon: ContactRound,
        label: "بيانات الاتصال",
    },
    {
        icon: WalletCards,
        label: "تذاكر مرتبطة",
    },
    {
        icon: FileSpreadsheet,
        label: "التفاصيل",
    },
    {
        icon: FlagTriangleRight,
        label: "السجلات الزمنية",
    },
];
const SideBar = () => {
    return (
        <div className="w-[12%] p-4 flex flex-col items-center gap-y-5 border  border-r-[#98A2B2] ">
            {/* Additional actions or info */}
            {actions.map((action, index) => (
                <div key={index} className="text-center cursor-pointer ">
                    <div
                        className={`w-fit mx-auto flex items-center justify-center p-3 mb-1 ${
                            action.label === "السجلات الزمنية"
                                ? "bg-[#00CA7C1A] rounded-xl"
                                : ""
                        }`}
                    >
                        <action.icon
                            role="img"
                            className={
                                action.label === "السجلات الزمنية"
                                    ? "text-[#00CA7C]"
                                    : "text-[#98A2B2]"
                            }
                            size={15}
                        />
                    </div>
                    {/* Action label */}
                    <span
                        className={`mr-2 text-[#98A2B2] text-xs ${
                            action.label === "السجلات الزمنية"
                                ? "text-[#29304C]"
                                : ""
                        }`}
                    >
                        {action.label}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default SideBar;
