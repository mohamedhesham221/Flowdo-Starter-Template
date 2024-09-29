import { ticketAtom, ticketDataAtom } from "@/atoms/TicketAtoms";
import Layout from "@/layouts/Layout"
import { Head } from '@inertiajs/react';
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
    <Layout title={`#عنوان`} tabs={false} className="bg-[#f2f4f7]">
      <Head title={`#عنوان`} />
      {/* Ticket UI here */}
    </Layout>
  )
}