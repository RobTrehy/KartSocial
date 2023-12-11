<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateUserProfileRequest;
use App\Models\Track;
use App\Models\TrackEvent;
use App\Models\TrackVisit;
use App\Models\TrackVisitSession;
use App\Models\User;
use App\Models\UserRestrictionAppeal;
use App\Models\UserSuggestion;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

/**
 * Requires: admin.access (middleware)
 */
class UserAdminController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * Requires: none
     */
    public function index()
    {
        return Inertia::render('Admin/Users/Index', [
            'users' => User::with('homeTrack')->paginate(10),
        ]);
    }

    /**
     * Display the specified resource.
     *
     * Requires: none
     */
    public function show(User $user)
    {
        $tracks = Track::orderBy('name', 'ASC')->get();
        $trackSelect = [];
        $selectedTrack = [];

        foreach ($tracks as $track) {
            $trackSelect[] = [
                'value' => $track->id,
                'label' => $track->name,
            ];
            if ($track->id === $user->home_track_id) {
                $selectedTrack = [
                    'value' => $track->id,
                    'label' => $track->name,
                ];
            }
        }

        return Inertia::render('Admin/Users/Show', [
            'user' => $user->load(['roles', 'restriction']),
            'trackSelect' => $trackSelect,
            'selectedTrack' => $selectedTrack,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * Requires: user-profile.update.any
     */
    public function update(UpdateUserProfileRequest $request, User $user)
    {
        if (Auth::user()->cannot('user-profile.update.any')) {
            abort(403);
        }

        $user->name = $request->name;
        $user->alias = $request->alias;
        $user->bio = $request->bio;
        $user->weight = $request->weight;
        $user->home_track_id = $request->home_track_id;
        $user->save();

        session()->flash('flash.banner', 'Profile Updated!');
        session()->flash('flash.bannerStyle', 'success');

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        // TODO: Only super-dooper-admin can do this
        if (Auth::user()->alias !== "RobGoesRacing" && Auth::user()->alias !== "Administrator") {
            abort(403);
        }

        UserSuggestion::where('suggested_id', $user->id)->delete();
        UserRestrictionAppeal::where('restriction_id', $user->restriction()->first()->id)->delete();
        $user->restriction()->delete();

        $user->trackVisits()->each(function (TracKVisit $visit) {
            $visit->laps()->delete();
            $visit->sessions()->delete();
            $visit->delete();
        });
        $user->suggestions()->delete();
        $user->delete();

        return redirect(route('admin:users.index'));
    }

    /**
     * Get a list of TrackEvents for a User
     *
     * Requires: visits.view.any
     */
    public function trackEvents(User $user)
    {
        if (Auth::user()->cannot('visits.view.any')) {
            abort(403);
        }

        return Inertia::render('Admin/Users/TrackEvents/Index', [
            'events' => TrackEvent::where('user_id', $user->id)->with(['trackLayout', 'sessions', 'sessions.drivers'])->paginate(10),
        ]);
    }

    /**
     * Get a list of user activity
     *
     * Requires: none
     */
    public function activity(User $user)
    {
        return Inertia::render('Admin/Users/Activity', [
            'user' => $user,
            'user.actions' => $user->actions()->with(['object'])->orderBy('created_at', 'DESC')->paginate(15),
        ]);
    }
}
