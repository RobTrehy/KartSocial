<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateProfileRequest;
use App\Models\DashboardFeed;
use App\Models\Track;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserProfileController extends Controller
{
    /**
     * Display the specified resource.
     *
     * Requires: None/Guest
     */
    public function show(string $alias)
    {
        $user = User::where('alias', $alias)
            ->with(['homeTrack', 'trackEvents'])
            ->with(['followedBy' => function ($query) {
                $query->inRandomOrder()->take('6');
            }])
            ->withCount(['followedBy', 'follows'])
            ->firstOrFail();

        return Inertia::render('User/Show', [
            'user' => $user,
            'following' => Auth::check() && $user->isFollowedBy(Auth::user()),
            'feed' => DashboardFeed::where('user_id', $user->id)->orderBy('created_at', 'DESC')->get(),
        ]);
    }

    /**
     * Display the specified resource.
     *
     * Requires: None/Guest
     */
    public function showFollows(string $alias)
    {
        $user = User::where('alias', $alias)
            ->with(['homeTrack', 'trackEvents', 'follows'])
            ->with(['followedBy' => function ($query) {
                $query->inRandomOrder()->take('6');
            }])
            ->withCount(['followedBy', 'follows'])
            ->firstOrFail();

        return Inertia::render('User/Follows', [
            'user' => $user,
            'following' => Auth::check() && $user->isFollowedBy(Auth::user()),
        ]);
    }

    /**
     * Display the specified resource.
     *
     * Requires: None/Guest
     */
    public function showFollowers(string $alias)
    {
        $user = User::where('alias', $alias)
            ->with(['homeTrack', 'trackEvents', 'followedBy'])
            ->withCount(['followedBy', 'follows'])
            ->firstOrFail();

        return Inertia::render('User/Followers', [
            'user' => $user,
            'following' => Auth::check() && $user->isFollowedBy(Auth::user()),
        ]);
    }

    /**
     * Display the specified resource.
     *
     * Requires: None/Guest
     */
    public function showItem(string $alias, DashboardFeed $item)
    {
        $user = User::where('alias', $alias)
            ->with(['homeTrack', 'trackEvents'])
            ->with(['followedBy' => function ($query) {
                $query->inRandomOrder()->take('6');
            }])
            ->withCount(['followedBy', 'follows'])
            ->firstOrFail();

        return Inertia::render('User/ShowItem', [
            'user' => $user,
            'following' => Auth::check() && $user->isFollowedBy(Auth::user()),
            'item' => $item,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * Requires: user-profile.update
     */
    public function edit()
    {
        if (Auth::user()->cannot('user-profile.update')) {
            abort(403);
        }

        $tracks = Track::orderBy('name', 'ASC')->get();
        $trackSelect = [];
        $selectedTrack = [];

        foreach ($tracks as $track) {
            $trackSelect[] = [
                'value' => $track->id,
                'label' => $track->name,
            ];
            if ($track->id === Auth::user()->home_track_id) {
                $selectedTrack = [
                    'value' => $track->id,
                    'label' => $track->name,
                ];
            }
        }

        return Inertia::render('Profile/Edit', [
            'trackSelect' => $trackSelect,
            'selectedTrack' => ($selectedTrack) ? $selectedTrack : null,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * Requires: user-profile.update
     */
    public function update(UpdateProfileRequest $request)
    {
        if (Auth::user()->cannot('user-profile.update')) {
            abort(403);
        }

        User::find(Auth::id())->update(
            $request->safe()->toArray()
        );

        session()->flash('flash.banner', 'Profile Updated!');
        session()->flash('flash.bannerStyle', 'success');

        return back();
    }

    /**
     * Add a follower
     *
     * Requires: user-profile:update
     */
    public function follow(User $user)
    {
        if (Auth::user()->cannot('user-profile.update')) {
            abort(403);
        }

        $user->followedBy()->save(User::find(Auth::id()));

        return back();
    }

    /**
     * Remove a follower
     *
     * Requires: user-profile:update
     */
    public function unfollow(User $user)
    {
        if (Auth::user()->cannot('user-profile.update')) {
            abort(403);
        }

        $user->followedBy()->detach(User::find(Auth::id()));

        return back();
    }
}
