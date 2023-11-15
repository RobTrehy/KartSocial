<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\DashboardFeed;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UserPhotosController extends Controller
{
    /**
     * Update the user's photos in storage.
     *
     * Requires: user-profile.photos.update
     */
    public function update(Request $request)
    {
        if (Auth::user()->cannot('user-profile.photos.update')) {
            abort(403);
        }

        $user = User::find(Auth::id());
        $input = Validator::make($request->all(), [
            'photo' => ['nullable', 'mimes:jpg,jpeg,png', 'max:10000'],
            'cover' => ['nullable', 'mimes:jpg,jpeg,png', 'max:10000'],
        ])->validateWithBag('updateProfilePhotos');

        if (isset($input['photo'])) {
            $user->updateProfilePhoto($input['photo']);
            activity('User')
                ->performedOn($user)
                ->event('updated profile photo')
                ->log('updated profile photo');
        }
        if (isset($input['cover'])) {
            $user->updateCoverPhoto($input['cover']);
            activity('User')
                ->performedOn($user)
                ->event('updated cover photo')
                ->log('updated cover photo');
        }

        $record = DashboardFeed::where('user_id', Auth::id())
            ->where('subject_type', 'App\\Models\\User')
            ->where('subject_id', Auth::id())
            ->where('event', 'updated_photos')
            ->where('updated_at', '>=', Carbon::now()->subHours(5))
            ->first();

        if ($record) {
            $record->touch();
        } else {
            DashboardFeed::create([
                'user_id' => Auth::id(),
                'subject_type' => 'App\\Models\\User',
                'subject_id' => Auth::id(),
                'card_type' => 'ProfilePhotos',
                'event' => 'updated_photos',
                'description' => 'updated their Profile Photos',
            ]);
        }

        session()->flash('flash.banner', 'Profile Photos Updated!');
        session()->flash('flash.bannerStyle', 'success');

        return back();
    }

    /**
     * Delete the current user's profile photo.
     *
     * Requires: user-profile.photos.update
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroyPhoto(Request $request)
    {
        if (Auth::user()->cannot('user-profile.photos.update')) {
            abort(403);
        }

        $request->user()->deleteProfilePhoto();

        activity('User')
            ->performedOn($request->user())
            ->event('removed profile photo')
            ->log('removed profile photo');

        return back(303)->with('status', 'profile-photo-deleted');
    }

    /**
     * Delete the current user's cover photo.
     *
     * Requires: user-profile.photos.update
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroyCover(Request $request)
    {
        if (Auth::user()->cannot('user-profile.photos.update')) {
            abort(403);
        }

        $request->user()->deleteCoverPhoto();

        activity('User')
            ->performedOn($request->user())
            ->event('removed cover photo')
            ->log('removed cover photo');

        return back(303)->with('status', 'cover-photo-deleted');
    }
}
