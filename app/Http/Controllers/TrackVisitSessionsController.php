<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateTrackVisitSessionRequest;
use App\Http\Requests\UpdateTrackVisitSessionRequest;
use App\Models\TrackVisit;
use App\Models\TrackVisitSession;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TrackVisitSessionsController extends Controller
{
    /**
     * Show the form for creating a new resource.
     *
     * Requires: visits.sessions.create
     */
    public function create(TrackVisit $visit)
    {
        if (Auth::user()->cannot('visits.sessions.create')) {
            abort(403);
        }

        return Inertia::render('Visits/NewSession', [
            'visit' => $visit->load(['trackLayout', 'sessions']),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * Requires: visits.sessions.create
     */
    public function store(CreateTrackVisitSessionRequest $request)
    {
        if (Auth::user()->cannot('visits.sessions.create')) {
            abort(403);
        }

        $session = TrackVisitSession::create($request->safe()->toArray());

        return redirect(route('visits.show', ['visit' => $session->track_visit_id]));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * Requires: visits.sessions.update
     */
    public function edit(TrackVisit $visit, TrackVisitSession $session)
    {
        if (Auth::user()->cannot('visits.sessions.update')) {
            abort(403);
        }

        return Inertia::render('Visits/EditSession', [
            'visit' => $visit->load(['trackLayout', 'sessions']),
            'session' => $session,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * Requires: visits.sessions.update
     */
    public function update(UpdateTrackVisitSessionRequest $request, TrackVisit $visit, TrackVisitSession $session)
    {
        if (Auth::user()->cannot('visits.sessions.update')) {
            abort(403);
        }

        $session->update($request->safe()->toArray());

        return redirect(route('visits.show', ['visit' => $visit->id]));
    }

    /**
     * Remove the specified resource from storage.
     *
     * Requires: visits.sessions.destroy
     */
    public function destroy(TrackVisit $visit, TrackVisitSession $session)
    {
        if (Auth::user()->cannot('visits.sessions.destroy')) {
            abort(403);
        }

        $session->delete();

        return redirect(route('visits.show', ['visit' => $visit->id]));
    }
}
