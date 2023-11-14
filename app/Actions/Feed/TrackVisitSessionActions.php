<?php

namespace App\Actions\Feed;

use App\Events\TrackVisitSessionEvent;
use App\Models\DashboardFeed;
use App\Models\TrackVisit;
use App\Models\TrackVisitSession;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;

class TrackVisitSessionActions
{
    public function create(TrackVisitSessionEvent $event)
    {
        $user_id = Auth::check() ? Auth::id() : $event->session->trackVisit->user_id; // Hack to get around seeding?

        // Find if a TrackVisit has recently been logged for this session        
        // If no visit is recently logged, find if a session is recently logged on the same visit
        $created = DashboardFeed::where('user_id', $user_id)
            ->where(function (Builder $query) use ($event) {
                $query->where(function (Builder $query) use ($event) {
                    $query->where('subject_type', 'App\\Models\\TrackVisit')
                        ->where('subject_id', $event->session->track_visit_id);
                })->orWhere(function (Builder $query) use ($event) {
                    $query->where('subject_type', 'App\\Models\\TrackSession')
                        ->orWhere('subject_id', $event->session->id);
                });
            })
            ->where('updated_at', '>=', Carbon::now()->subHours(5))
            ->first();

        if ($created) {
            $created->subject_type = 'App\\Models\\TrackSession';
            $created->subject_id = $event->session->id;
            $created->card_type = 'TrackSession';
            $created->description = "added some Track Sessions to a new Track Visit";
            $created->parent_type = 'App\\Models\\TrackVisit';
            $created->parent_id = $event->session->track_visit_id;
            $created->save();
        } else {
            DashboardFeed::create([
                'user_id' => $user_id,
                'subject_type' => 'App\\Models\\TrackSession',
                'subject_id' => $event->session->id,
                'card_type' => 'TrackSession',
                'event' => 'created',
                'description' => 'recorded a new Track Session',
                'parent_type' => 'App\\Models\\TrackVisit',
                'parent_id' => $event->session->track_visit_id,
            ]);
        }
    }

    public function update(TrackVisitSessionEvent $event)
    {
        $user_id = (Auth::check()) ? Auth::id() : $event->session->trackVisit->user_id; // Hack to get around seeding?
        $record = DashboardFeed::where('user_id', $user_id)
            ->where('subject_type', 'App\\Models\\TrackSession')
            ->where('subject_id', $event->session->id)
            ->where('event', 'updated')
            ->where('updated_at', '>=', Carbon::now()->subHours(5))
            ->first();

        if ($record) {
            $record->touch();
        } else {
            DashboardFeed::create([
                'user_id' => $user_id,
                'subject_type' => 'App\\Models\\TrackSession',
                'subject_id' => $event->session->id,
                'card_type' => 'TrackSession',
                'event' => 'updated',
                'description' => 'updated a Track Session',
                'parent_type' => 'App\\Models\\TrackVisit',
                'parent_id' => $event->session->track_visit_id,
            ]);
        }
    }

    public function addOrUpdateLaps(TrackVisitSessionEvent $event)
    {
        $user_id = (Auth::check()) ? Auth::id() : $event->session->trackVisit->user_id; // Hack to get around seeding?
        $record = DashboardFeed::where('user_id', $user_id)
            ->where('subject_type', 'App\\Models\\TrackSession')
            ->where('subject_id', $event->session['session']['id'])
            ->where('event', 'laps')
            ->where('updated_at', '>=', Carbon::now()->subHours(5))
            ->first();

        if ($record) {
            $record->description =
                (($event->session['added'] > 0) ? 'added ' . $event->session['added'] .
                    (($event->session['updated'] > 0) ? ' and ' : '') : '') . (($event->session['updated'] > 0) ? 'updated ' . $event->session['updated'] : '') . ' laps on a Track Session';
            $record->save();
        } else {
            DashboardFeed::create([
                'user_id' => $user_id,
                'subject_type' => 'App\\Models\\TrackSession',
                'subject_id' => $event->session['session']['id'],
                'card_type' => 'SessionLaps',
                'event' => 'laps',
                'description' => (($event->session['added'] > 0) ? 'added ' . $event->session['added'] .
                    (($event->session['updated'] > 0) ? ' and ' : '') : '') . (($event->session['updated'] > 0) ? 'updated ' . $event->session['updated'] : '') . ' laps on a Track Session',
                'parent_type' => 'App\\Models\\TrackVisit',
                'parent_id' => $event->session['session']['track_visit_id'],
            ]);
        }

        activity('Session Laps')
            ->performedOn(TrackVisitSession::find($event->session['session']['id']))
            ->event('- ' . (($event->session['updated'] > 0) ? $event->session['updated'] . ' updated ' . (($event->session['added'] > 0) ? ', ' : '') : '') . (($event->session['added'] > 0) ? $event->session['added'] . ' created' : ''))
            ->log('updated');
    }

    public function records(TrackVisitSessionEvent $event)
    {
        $records = $event->session['records'];

        if ($records['track']) {
            // Track, Layout and Personal Records
            $this->createTrackRecordFeedItem($event->session['session'], $event->session['lap']);
        } else if ($records['layout']) {
            // Layout and Personal Records
            $this->createTrackLayoutRecordFeedItem($event->session['session'], $event->session['lap']);
        } else if ($records['personal']) {
            // Personal Record only
            $this->createPersonalRecordFeedItem($event->session['session'], $event->session['lap']);
        }
    }

    private function createTrackRecordFeedItem($session, $lap)
    {
        $visit = TrackVisit::find($session['track_visit_id']);
        $record = DashboardFeed::where('user_id', $visit->user_id)
            ->where('subject_type', 'App\\Models\\TrackSession')
            ->where('subject_id', $session['id'])
            ->where('event', 'track_record')
            ->first();
        if ($record) {
            $record->subject_id = $session['id'];
            $record->properties = [
                'lap' => $lap,
                'track' => $visit->trackLayout->track,
            ];
            $record->save();
        } else {
            DashboardFeed::create([
                'user_id' => $visit->user_id,
                'subject_type' => 'App\\Models\\TrackSession',
                'subject_id' => $session['id'],
                'card_type' => 'TrackRecord',
                'event' => 'track_record',
                'description' => 'set a new Track Record!',
                'properties' => [
                    'lap' => $lap,
                    'track' => $visit->trackLayout->track,
                ]
            ]);
        }
    }

    private function createTrackLayoutRecordFeedItem($session, $lap)
    {
        $visit = TrackVisit::find($session['track_visit_id']);
        $record = DashboardFeed::where('user_id', $visit->user_id)
            ->where('subject_type', 'App\\Models\\TrackSession')
            ->where('subject_id', $session['id'])
            ->where('event', 'layout_record')
            ->first();
        if ($record) {
            $record->subject_id = $session['id'];
            $record->properties = [
                'lap' => $lap,
                'track' => $visit->trackLayout->track,
                'layout' => $visit->trackLayout,
            ];
            $record->save();
        } else {
            DashboardFeed::create([
                'user_id' => $visit->user_id,
                'subject_type' => 'App\\Models\\TrackSession',
                'subject_id' => $session['id'],
                'card_type' => 'TrackRecord',
                'event' => 'layout_record',
                'description' => 'set a new Track Layout Record!',
                'properties' => [
                    'lap' => $lap,
                    'track' => $visit->trackLayout->track,
                    'layout' => $visit->trackLayout,
                ]
            ]);
        }
    }

    private function createPersonalRecordFeedItem($session, $lap)
    {
        $visit = TrackVisit::find($session['track_visit_id']);
        $record = DashboardFeed::where('user_id', $visit->user_id)
            ->where('subject_type', 'App\\Models\\TrackSession')
            ->where('subject_id', $session['id'])
            ->where('event', 'personal_record')
            ->first();
        if ($record) {
            $record->subject_id = $session['id'];
            $record->properties = [
                'lap' => $lap,
                'track' => $visit->trackLayout->track,
                'layout' => $visit->trackLayout,
            ];
            $record->save();
        } else {
            DashboardFeed::create([
                'user_id' => $visit->user_id,
                'subject_type' => 'App\\Models\\TrackSession',
                'subject_id' => $session['id'],
                'card_type' => 'TrackRecord',
                'event' => 'personal_record',
                'description' => 'set a new Personal Record!',
                'properties' => [
                    'lap' => $lap,
                    'track' => $visit->trackLayout->track,
                    'layout' => $visit->trackLayout,
                ]
            ]);
        }
    }
}
