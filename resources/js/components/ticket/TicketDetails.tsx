import React from "react";
import TicketDetailsHeader from "./TicketDetailsHeader";
import TicketReplays from "./TicketReplays";
import QuickReplays from "../replays/QuickReplays";
import ReplayForm from "../replays/ReplayForm";

const TicketDetails = () => {
    return (
        <div className="w-3/5 p-4 flex-grow">
            {/* Ticket details and messages */}
            <TicketDetailsHeader />
            <TicketReplays />
            <QuickReplays />
            <ReplayForm />
        </div>
    );
};

export default TicketDetails;
