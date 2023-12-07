<?php

namespace App\Http\Controllers\Track\Session;

use App\Http\Controllers\Controller;
use App\Http\Requests\Track\Sessions\CreateTrackSessionRequest;
use App\Http\Requests\Track\Sessions\UpdateTrackSessionRequest;
use App\Models\TrackEvent;
use App\Models\TrackSession;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TrackSessionsController extends Controller
{
    /**
     * Show the form for creating a new resource.
     *
     * Requires: visits.sessions.create
     */
    public function create(TrackEvent $event)
    {
        if (Auth::user()->cannot('visits.sessions.create')) {
            abort(403);
        }

        return Inertia::render('Track/Sessions/New', [
            'event' => $event->load(['trackLayout', 'sessions']),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * Requires: visits.sessions.create
     */
    public function store(CreateTrackSessionRequest $request)
    {
        if (Auth::user()->cannot('visits.sessions.create')) {
            abort(403);
        }

        $session = TrackSession::create(
            array_merge(
                ['user_id' => Auth::id()],
                $request->safe()->toArray()
            )
        );

        return redirect(route('events.show', ['event' => $session->track_event_id]));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * Requires: visits.sessions.update
     */
    public function edit(TrackEvent $event, TrackSession $session)
    {
        if (Auth::user()->cannot('visits.sessions.update')) {
            abort(403);
        }

        return Inertia::render('Track/Sessions/Edit', [
            'event' => $event->load(['trackLayout', 'sessions']),
            'session' => $session,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * Requires: visits.sessions.update
     */
    public function update(TrackEvent $event, TrackSession $session, UpdateTrackSessionRequest $request)
    {
        if (Auth::user()->cannot('visits.sessions.update')) {
            abort(403);
        }

        $session->update($request->safe()->toArray());

        return redirect(route('events.show', ['event' => $event->id]));
    }

    /**
     * Remove the specified resource from storage.
     *
     * Requires: visits.sessions.destroy
     */
    public function destroy(TrackEvent $event, TrackSession $session)
    {
        if (Auth::user()->cannot('visits.sessions.destroy')) {
            abort(403);
        }

        $session->delete();

        return redirect(route('events.show', ['event' => $event->id]));
    }
}
