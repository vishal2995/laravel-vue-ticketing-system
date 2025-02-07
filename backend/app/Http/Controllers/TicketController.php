<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ticket;
use App\Http\Requests\TicketRequest;

class TicketController extends Controller
{
    public function index()
    {
        $tickets = Ticket::paginate();

        return response()->json([
            "success" => true,
            "message" => "Tickets retrieved successfully",
            "payload" => ["data" => $tickets]
        ]);
    }

    public function store(TicketRequest $request)
    {
        $ticket = Ticket::create($request->all());

        return response()->json([
            "success" => true,
            "message" => "Ticket created successfully",
            "payload" => ["data" => $ticket]
        ], 201);
    }

    public function show(Ticket $ticket)
    {
        return response()->json([
            "success" => true,
            "message" => "Ticket retrieved successfully",
            "payload" => ["data" => $ticket]
        ], 200);
    }

    public function update(TicketRequest $request, Ticket $ticket)
    {
        $ticket->update($request->all());

        return response()->json([
            "success" => true,
            "message" => "Ticket updated successfully",
            "payload" => ["data" => $ticket]
        ], 200);
    }

    public function destroy(Ticket $ticket)
    {
        $ticket->delete();

        return response()->json([
            "success" => true,
            "message" => "Ticket deleted successfully"
        ], 200);
    }
}
