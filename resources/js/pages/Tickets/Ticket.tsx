import { ticketAtom, ticketDataAtom } from "@/atoms/TicketAtoms";
import SideBar from "@/components/sideBar/SideBar";
import SideBarHistory from "@/components/sideBar/SideBarHistory";
import TicketDetails from "@/components/ticket/TicketDetails";
import Layout from "@/layouts/Layout";
import { Head } from "@inertiajs/react";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
// import { AgGridReact } from "ag-grid-react";
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-quartz.css";

export default function Ticket({ data }) {
    const [ticket, setTicket] = useAtom(ticketAtom);
    const [ticketData, setTicketData] = useAtom(ticketDataAtom);
    // const [columnDefs] = useState([
    //     { field: 'id', headerName: 'Ticket ID', filter: true },
    //     { field: 'subject', headerName: 'Subject', filter: true, flex: 1 },
    //     { field: 'status', headerName: 'Status', filter: true },
    //     { field: 'priority', headerName: 'Priority', filter: true }
    //   ]);

    //   const [rowData] = useState([
    //     { id: 'T-001', subject: 'Login Issue', status: 'Open', priority: 'High' },
    //     { id: 'T-002', subject: 'Payment Error', status: 'In Progress', priority: 'Medium' },
    //     // ... more data
    //   ]);
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
            {/* <div className="mx-6 my-4">
                <div
                    className="ag-theme-quartz border border-[#98A2B2] rounded-lg overflow-hidden"
                    style={{ height: 400 }}
                >
                    <AgGridReact rowData={rowData} columnDefs={columnDefs} />
                </div>
            </div> */}
            <div className="flex flex-row justify-end border border-[#98A2B2] bg-white rounded-lg shadow-sm mx-6 my-4 min-h-[600px]">
                <TicketDetails />
                <SideBarHistory />
                <SideBar />
            </div>
        </Layout>
    );
}
