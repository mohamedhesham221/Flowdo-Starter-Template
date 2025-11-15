import { ticketAtom, ticketDataAtom } from "@/atoms/TicketAtoms";
import SideBar from "@/components/sideBar/SideBar";
import SideBarHistory from "@/components/sideBar/SideBarHistory";
import TicketDetails from "@/components/ticket/TicketDetails";
import Layout from "@/layouts/Layout";
import { Head } from "@inertiajs/react";
import { useAtom } from "jotai";
import { useEffect } from "react";
export default function Ticket({ data }) {
    const [ticket, setTicket] = useAtom(ticketAtom);
    const [ticketData, setTicketData] = useAtom(ticketDataAtom);
    if (ticket == null) {
        setTicket(data.ticket);
    }
    if (ticketData == null) {
        setTicketData(data);
    }

    useEffect(() => {
        console.log(ticket);
        setTicket(data.ticket);
    }, [data]);

    return (
        <Layout title={`الطلبات`} tabs={false} className="bg-[#f2f4f7]">
            <Head title={`نواجه مشكلة في عدم عمل واجهة المستخدم`} />
            {/* Ticket UI here */}
            <div className="flex flex-row justify-end border border-[#98A2B2] bg-white rounded-lg shadow-sm mx-6 my-4 min-h-[600px]">
                <TicketDetails />
                <SideBarHistory />
                <SideBar />
            </div>
        </Layout>
    );
}
