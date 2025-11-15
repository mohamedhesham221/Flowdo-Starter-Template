import React from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Expand, Search, X } from "lucide-react";
import FormBody from "./FormBody";

const ReplayForm = () => {
    return (
        <div className="flex flex-col mt-5 border rounded-md p-2 gap-5">
            {/** Reply form container */}
            <div className="flex justify-between">
                <div className="flex flex-row gap-2 items-center">
                    <span className="text-[#7A8699]">رد الي:</span>
                    <Badge className="cursor-pointer text-[10px] text-[#7A8699] border border-[#B8BFCC] px-2 whitespace-nowrap shadow-none">
                        ahmed@example.com
                    </Badge>
                </div>
                {/** Reply form actions */}
                <div className="flex flex-row gap-2 items-center">
                    <Button className="w-10 text-white bg-[#00CA7C] hover:opacity-75 p-1 rounded-xl">
                        cc
                    </Button>
                    <Button className="w-10 border border-[#7A8699] hover:opacity-75 p-1 rounded-xl">
                        <Expand size={16} color="#7A8699" />
                    </Button>
                </div>
            </div>
            {/** CC input and badges */}
            <div className="flex flex-row gap-2">
                <div className="flex flex-row gap-2 items-center">
                    <span className="text-[#7A8699]">cc:</span>
                    <div className="flex items-center h-[29px] bg-[#F7F8FA] border border-[#E2E8F0] rounded-lg px-2">
                        <Search size={10} color="#7A8699" />
                        <input
                            type="email"
                            name="cc"
                            id="cc"
                            className="h-full bg-transparent placeholder:text-xs outline-none px-1  border-0 focus:ring-0"
                            placeholder="ادخل الاسم"
                        />
                    </div>
                </div>
                {/** CC badges */}
                <div className="flex flex-row gap-2 items-center">
                    {Array(3)
                        .fill(0)
                        .map((_, index) => (
                            <Badge
                                key={index}
                                className="text-[10px] text-[#7A8699] border border-[#B8BFCC] px-2 whitespace-nowrap shadow-none"
                            >
                                ahmed@example.com&nbsp;
                                <Button
                                    className="p-0 shadow-none h-fit"
                                    variant="ghost"
                                >
                                    <X size={10} color="#7A8699" />
                                </Button>
                            </Badge>
                        ))}
                </div>
                <div></div>
            </div>
            <FormBody />
        </div>
    );
};

export default ReplayForm;
