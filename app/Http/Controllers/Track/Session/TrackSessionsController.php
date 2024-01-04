<?php

namespace App\Http\Controllers\Track\Session;

use App\Http\Controllers\Controller;
use App\Http\Requests\Track\Sessions\CreateTrackSessionRequest;
use App\Http\Requests\Track\Sessions\UpdateTrackSessionRequest;
use App\Models\Track;
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
    public function create(Track $track, string $event_slug)
    {
        if (Auth::user()->cannot('visits.sessions.create')) {
            abort(403);
        }
        $event = TrackEvent::where('slug', $event_slug)->whereIn('track_layout_id', $track->allLayouts()->pluck('id'))->first();

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

        return redirect(route('events.show', ['track' => $session->trackEvent->trackLayout->track->slug, 'event' => $session->trackEvent->slug]));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * Requires: visits.sessions.update
     */
    public function edit(Track $track, string $event_slug, TrackSession $session)
    {
        if (Auth::user()->cannot('visits.sessions.update')) {
            abort(403);
        }
        $event = TrackEvent::where('slug', $event_slug)->whereIn('track_layout_id', $track->allLayouts()->pluck('id'))->first();

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
    public function update(Track $track, string $event_slug, TrackSession $session, UpdateTrackSessionRequest $request)
    {
        if (Auth::user()->cannot('visits.sessions.update')) {
            abort(403);
        }
        $event = TrackEvent::where('slug', $event_slug)->whereIn('track_layout_id', $track->allLayouts()->pluck('id'))->first();

        $session->update($request->safe()->toArray());

        return redirect(route('events.show', ['track' => $track->slug, 'event' => $event_slug]));
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

        return redirect(route('events.show', ['track' => $event->trackLayout->track->slug, 'event' => $event->slug]));
    }
}
