<?php

namespace App\Console\Commands;

use App\Models\Track;
use App\Models\TrackLayout;
use App\Models\User;
use App\Models\UserSuggestion;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class SuggestPeople extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:suggest-people';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create User Suggestions based on visiting same track or people in common';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $all_users = User::all();

        foreach ($all_users as $user) {
            // Get a collection of the users current suggested people
            $suggestions = UserSuggestion::where('user_id', $user->id)->pluck('suggested_id');
            // Get a collection of the users currently followed
            $following = DB::table('user_following')->where('user_id', $user->id)->get();

            // Get a collection of the tracks this user has visited
            $tracksViaEventOrganiser = DB::table('tracks')
                ->select(['tracks.id', 'track_events.date'])
                ->join('track_layouts', 'track_layouts.track_id', '=', 'tracks.id')
                ->join('track_events', 'track_events.track_layout_id', '=', 'track_layouts.id')
                ->where('track_events.user_id', $user->id)
                ->get()
                ->each(function ($track) {
                    // Add every track layout id, regardless of if the user has visited
                    $track->layouts = TrackLayout::where('track_id', $track->id)->pluck('id')->toArray();
                });
            $tracksViaEventAttendee = DB::table('tracks')
                ->select(['tracks.id', 'track_events.date'])
                ->join('track_layouts', 'track_layouts.track_id', '=', 'tracks.id')
                ->join('track_events', 'track_events.track_layout_id', '=', 'track_layouts.id')
                ->join('track_event_attendees', 'track_event_attendees.track_event_id', '=', 'track_events.id')
                ->where('track_event_attendees.user_id', $user->id)
                ->get()
                ->each(function ($track) {
                    // Add every track layout id, regardless of if the user has visited
                    $track->layouts = TrackLayout::where('track_id', $track->id)->pluck('id')->toArray();
                });
            $tracksViaSessionDriver = DB::table('tracks')
                ->select(['tracks.id', 'track_events.date'])
                ->join('track_layouts', 'track_layouts.track_id', '=', 'tracks.id')
                ->join('track_events', 'track_events.track_layout_id', '=', 'track_layouts.id')
                ->join('track_sessions', 'track_sessions.track_event_id', '=', 'track_events.id')
                ->join('track_session_drivers', 'track_session_drivers.track_session_id', '=', 'track_sessions.id')
                ->where('track_session_drivers.user_id', $user->id)
                ->get()
                ->each(function ($track) {
                    // Add every track layout id, regardless of if the user has visited
                    $track->layouts = TrackLayout::where('track_id', $track->id)->pluck('id')->toArray();
                });

            $track_layouts = array_unique(
                array_merge(
                    ...$tracksViaEventOrganiser->pluck('layouts')->toArray(),
                    ...$tracksViaEventAttendee->pluck('layouts')->toArray(),
                    ...$tracksViaSessionDriver->pluck('layouts')->toArray(),
                )
            );

            // Get other users, not currently in suggestions, or already following to suggest, as they have also visited the same tracks
            $viaTrackEventOrganisers = DB::table('track_events')
                ->whereNotIn('track_events.user_id', array_merge($suggestions->toArray(), $following->pluck('follows_id')->toArray(), [$user->id]))
                ->whereIn('track_layout_id', $track_layouts)
                ->join('track_layouts', 'track_layouts.id', '=', 'track_layout_id')
                ->join('tracks', 'tracks.id', '=', 'track_layouts.track_id')
                ->select(['track_events.user_id', 'track_layout_id', 'tracks.id as track_id'])
                ->distinct()
                ->get()
                ->each(function ($data) use ($user) {
                    UserSuggestion::updateOrCreate([
                        'user_id' => $user->id,
                        'suggested_id' => $data->user_id,
                    ], [])->via()->associate(Track::find($data->track_id))->save();
                });
            $viaTrackEventAttendees = DB::table('track_events')
                ->whereNotIn('track_event_attendees.user_id', array_merge($suggestions->toArray(), $following->pluck('follows_id')->toArray(), [$user->id]))
                ->whereIn('track_layout_id', $track_layouts)
                ->join('track_layouts', 'track_layouts.id', '=', 'track_layout_id')
                ->join('tracks', 'tracks.id', '=', 'track_layouts.track_id')
                ->join('track_event_attendees', 'track_event_attendees.track_event_id', 'track_events.id')
                ->select(['track_event_attendees.user_id', 'track_layout_id', 'tracks.id as track_id'])
                ->distinct()
                ->get()
                ->each(function ($data) use ($user) {
                    UserSuggestion::updateOrCreate([
                        'user_id' => $user->id,
                        'suggested_id' => $data->user_id,
                    ], [])->via()->associate(Track::find($data->track_id))->save();
                });
            $viaTrackSessionDrivers = DB::table('track_events')
                ->whereNotIn('track_session_drivers.user_id', array_merge($suggestions->toArray(), $following->pluck('follows_id')->toArray(), [$user->id]))
                ->whereIn('track_layout_id', $track_layouts)
                ->join('track_layouts', 'track_layouts.id', '=', 'track_layout_id')
                ->join('tracks', 'tracks.id', '=', 'track_layouts.track_id')
                ->join('track_sessions', 'track_sessions.track_event_id', 'track_events.id')
                ->join('track_session_drivers', 'track_session_drivers.track_session_id', 'track_sessions.id')
                ->select(['track_session_drivers.user_id', 'track_layout_id', 'tracks.id as track_id'])
                ->distinct()
                ->get()
                ->each(function ($data) use ($user) {
                    UserSuggestion::updateOrCreate([
                        'user_id' => $user->id,
                        'suggested_id' => $data->user_id,
                    ], [])->via()->associate(Track::find($data->track_id))->save();
                });

            // Merge the new suggestions so they don't get resuggested in the next steps
            $suggestions = $suggestions->merge(
                array_merge(
                    ...$viaTrackEventOrganisers->pluck('user_id')->toArray(),
                    ...$viaTrackEventAttendees->pluck('user_id')->toArray(),
                    ...$viaTrackSessionDrivers->pluck('user_id')->toArray(),
                )
            );

            // TODO: Create suggestions for people who are followed by users you are following
        }
    }
}
