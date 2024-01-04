<?php

namespace App\Http\Controllers\Track\Event;

use App\Http\Controllers\Controller;
use App\Http\Requests\Track\Events\CreateTrackEventRequest;
use App\Http\Requests\Track\Events\UpdateTrackEventRequest;
use App\Models\Status;
use App\Models\Track;
use App\Models\TrackEvent;
use App\Models\TrackEventAttendee;
use App\Models\TrackLayout;
use App\Models\TrackSession;
use App\Models\TrackSessionLap;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class TrackEventsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * Requires: visits.view
     */
    public function index()
    {
        if (Auth::user()->cannot('visits.view')) {
            abort(403);
        }

        return Inertia::render('Track/Events/Index', [
            'events' => TrackEvent::where('user_id', Auth::id())
                ->with(['trackLayout', 'sessions', 'sessions.laps'])
                ->orderBy('date', 'DESC')
                ->paginate(15),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * Requires: visits.create
     */
    public function create()
    {
        if (Auth::user()->cannot('visits.create')) {
            abort(403);
        }

        $tracks = Track::with('allLayouts')->orderBy('name', 'ASC')->get();
        $trackSelect = [];

        foreach ($tracks as $track) {
            $trackSelect[] = [
                'value' => $track->id,
                'label' => $track->name,
            ];
        }

        return Inertia::render('Track/Events/New', [
            'tracks' => $tracks,
            'trackSelect' => $trackSelect,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * Requires: visits.create
     */
    public function store(CreateTrackEventRequest $request)
    {
        if (Auth::user()->cannot('visits.create')) {
            abort(403);
        }

        $event = TrackEvent::create(
            array_merge(
                ['user_id' => Auth::id()],
                $request->safe()->toArray()
            )
        );

        return redirect(route('events.show', ['track' => $event->trackLayout->track->slug, 'event' => $event->slug]));
    }

    /**
     * Display the specified resource.
     *
     * Requires: visits.view
     */
    public function show(Track $track, string $event_slug)
    {
        if (Auth::user()->cannot('visits.view')) {
            abort(403);
        }

        $event = TrackEvent::where('slug', $event_slug)->whereIn('track_layout_id', $track->allLayouts()->pluck('id'))->first();
        $_sessions = TrackSession::where('track_event_id', $event->id)->with(['drivers'])->get();
        $isDriver = false;

        foreach ($_sessions as $session) {
            if (!$isDriver) {
                $isDriver = $session->drivers->contains(Auth::user());
            }
        }

        return Inertia::render('Track/Events/Show', [
            'event' => $event->load([
                'trackLayout',
                'attendees',
                'attendees.pivot.status',
            ]),
            'event.sessions' => $_sessions,
            'driver' => $isDriver,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * Requires: visits.update
     */
    public function edit(Track $track, string $event_slug)
    {
        if (Auth::user()->cannot('visits.update')) {
            abort(403);
        }

        $event = TrackEvent::where('slug', $event_slug)->whereIn('track_layout_id', $track->allLayouts()->pluck('id'))->first();
        $layout = TrackLayout::find($event->track_layout_id);
        $tracks = Track::with('allLayouts')->orderBy('name', 'ASC')->get();
        $trackSelect = [];

        foreach ($tracks as $track) {
            $trackSelect[] = [
                'value' => $track->id,
                'label' => $track->name,
            ];
            if ($track->id === $layout->track_id) {
                $selectedTrack = [
                    'value' => $track->id,
                    'label' => $track->name,
                ];
            }
        }

        return Inertia::render('Track/Events/Edit', [
            'event' => $event->load('trackLayout', 'trackLayout.track'),
            'tracks' => $tracks,
            'trackSelect' => $trackSelect,
            'selectedTrack' => $selectedTrack,
            'selectedLayout' => [
                'value' => $layout->id,
                'label' => $layout->name,
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * Requires: visits.update
     */
    public function update(UpdateTrackEventRequest $request, Track $track, string $event_slug)
    {
        if (Auth::user()->cannot('visits.update')) {
            abort(403);
        }

        $event = TrackEvent::where('slug', $event_slug)->whereIn('track_layout_id', $track->allLayouts()->pluck('id'))->first();
        $event->update(
            $request->only([
                'track_layout_id',
                'date',
                'name',
                'description',
            ])
        );

        return redirect(route('events.show', ['track' => $event->trackLayout->track->slug, 'event' => $event->slug]));
    }

    /**
     * 
     */
    public function updateAttendees(Track $track, string $event_slug, Request $request)
    {
        $event = TrackEvent::where('slug', $event_slug)->whereIn('track_layout_id', $track->allLayouts()->pluck('id'))->first();
        if ($request->status !== "Undecided") {
            TrackEventAttendee::updateOrCreate(
                [
                    'user_id' => Auth::id(),
                    'track_event_id' => $event->id,
                ],
                [
                    'status_id' => Status::where('value', $request->status)->first()->id,
                ]
            );
        } else {
            TrackEventAttendee::where('user_id', Auth::id())
                ->where('track_event_id', $event->id)
                ->delete();
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * Requires: visits.destroy
     */
    public function destroy(TrackEvent $event)
    {
        if (Auth::user()->cannot('visits.destroy')) {
            abort(403);
        }

        $event->delete();

        return redirect(route('events.index'));
    }
}
