<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ticket;
use App\Http\Requests\TicketRequest;

class TicketController extends Controller
{

    /**
     * Display a paginated list of tickets with optional search filtering.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $perPage = $request->integer('per_page', default: 10);
        $search = $request->string('q');
        $tickets = Ticket::search($search)->latest()->paginate(perPage: $perPage);

        return response()->json([
            "success" => true,
            "message" => "Tickets retrieved successfully",
            "payload" => ["data" => $tickets]
        ]);
    }

    /**
     * Store a newly created ticket in the database.
     *
     * @param  \App\Http\Requests\TicketRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(TicketRequest $request)
    {
        $ticket = Ticket::create($request->all());

        return response()->json([
            "success" => true,
            "message" => "Ticket created successfully",
            "payload" => ["data" => $ticket]
        ], 201);
    }

    /**
     * Display the specified ticket details.
     *
     * @param  \App\Models\Ticket  $ticket
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Ticket $ticket)
    {
        return response()->json([
            "success" => true,
            "message" => "Ticket retrieved successfully",
            "payload" => ["data" => $ticket]
        ], 200);
    }

    /**
     * Update the specified ticket in the database.
     *
     * @param  \App\Http\Requests\TicketRequest  $request
     * @param  \App\Models\Ticket  $ticket
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(TicketRequest $request, Ticket $ticket)
    {
        $ticket->update($request->all());

        return response()->json([
            "success" => true,
            "message" => "Ticket updated successfully",
            "payload" => ["data" => $ticket]
        ], 200);
    }

    /**
     * Remove the specified ticket from the database.
     *
     * @param  \App\Models\Ticket  $ticket
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Ticket $ticket)
    {
        $ticket->delete();

        return response()->json([
            "success" => true,
            "message" => "Ticket deleted successfully"
        ], 200);
    }
}
