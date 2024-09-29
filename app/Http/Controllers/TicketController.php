<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use Illuminate\Http\Request;
use App\Http\Requests\Tickets\StoreTicket;
use App\Http\Requests\Tickets\UpdateTicket;
use Inertia\Inertia;

class TicketController extends Controller
{
    public function index()
    {
        $data = json_decode('{"tickets":[{"id":1,"ticket_number":1,"received_number":null,"company_id":8,"user_id":1130,"subject":"\u0637\u0644\u0628 \u062a\u062c\u0631\u064a\u0628\u064a","status":"open","priority":"low","agent_id":null,"received_date":null,"channel_id":null,"type_id":null,"group_id":1,"close_date":null,"mobile":null,"country_id":null,"deleted_at":null,"added_by":17,"last_updated_by":17,"task_id":null,"created_on":"25 Sep 2024 13:24"}]}');
        return Inertia::render('Tickets/TicketTable', ["data" => $data,]);
    }

    public function store(Request $request)
    {
        return Reply::successWithData(__('messages.recordSaved'), ['replyID' => 1]);
    }

    public function show($ticketNumber)
    {
        $data = json_decode('{"ticket":{"id":1,"ticket_number":1,"received_number":null,"company_id":8,"user_id":1130,"subject":"\u0637\u0644\u0628 \u062a\u062c\u0631\u064a\u0628\u064a","status":"open","priority":"low","agent_id":null,"received_date":null,"channel_id":null,"type_id":null,"group_id":1,"close_date":null,"mobile":null,"country_id":null,"deleted_at":null,"added_by":17,"last_updated_by":17,"task_id":null,"created_on":"25 Sep 2024 13:24"}}');
        return Inertia::render('Tickets/Ticket', ["data" => $data,]);
    }

    public function update(Request $request, $id)
    {
        return Reply::dataOnly(['status' => 'success']);
    }

    public function destroy($id)
    {
        return Reply::success(__('messages.deleteSuccess'));
    }

    public function changeStatus(Request $request)
    {
        return Reply::successWithData(__('messages.updateSuccess'), ['status' => 'success']);
    }

}