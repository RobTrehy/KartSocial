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
            $tracks = DB::table('tracks')
                ->select(['tracks.id', 'track_visits.visit_date'])
                ->join('track_layouts', 'track_layouts.track_id', '=', 'tracks.id')
                ->join('track_visits', 'track_visits.track_layout_id', '=', 'track_layouts.id')
                ->where('track_visits.user_id', $user->id)
                ->get()
                ->each(function ($track) {
                    // Add every track layout id, regardless of if the user has visited
                    $track->layouts = TrackLayout::where('track_id', $track->id)->pluck('id')->toArray();
                });

            // Get other users, not currently in suggestions, or already following to suggest, as they have also visited the same tracks
            $viaTracks = DB::table('track_visits')
                ->whereNotIn('track_visits.user_id', array_merge($suggestions->toArray(), $following->pluck('follows_id')->toArray(), [$user->id]))
                ->whereIn('track_layout_id', array_merge(...$tracks->pluck('layouts')))
                ->join('track_layouts', 'track_layouts.id', '=', 'track_layout_id')
                ->join('tracks', 'tracks.id', '=', 'track_layouts.track_id')
                ->select(['user_id', 'track_layout_id', 'tracks.id as track_id'])
                ->distinct()
                ->get()
                ->each(function ($data) use ($user) {
                    UserSuggestion::create([
                        'user_id' => $user->id,
                        'suggested_id' => $data->user_id,
                    ])->via()->associate(Track::find($data->track_id))->save();
                });

            // Merge the new suggestions so they don't get resuggested in the next steps
            $suggestions = $suggestions->merge($viaTracks->pluck('user_id'));

            // TODO: Create suggestions for people who are followed by users you are following
        }
    }
}
