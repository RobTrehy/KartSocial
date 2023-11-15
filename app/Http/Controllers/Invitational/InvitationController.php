<?php

namespace App\Http\Controllers\Invitational;

use App\Http\Controllers\Controller;
use App\Http\Requests\Invitational\StoreInvitationRequest;
use App\Models\Invitation;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class InvitationController extends Controller
{
    public function show()
    {
        $invited = Auth::user()->invited;
        foreach ($invited as $i => $invite) {
            if ($invite->registered_at) {
                $invited[$i]->became = User::where('email', $invite->email)->first();
            }
        }

        return Inertia::render('Invitations/Show', [
            'invited' => $invited,
        ]);
    }

    public function store(StoreInvitationRequest $request)
    {
        if (User::where('email', $request->email)->first()) {
            throw ValidationException::withMessages([
                'email' => 'This email address belongs to a current user. No need to invite them!',
            ]);
        }

        $invitation = new Invitation($request->all());
        $invitation->generateInvitationToken();
        $invitation->save();

        activity('Invitation')
            ->event('invited')
            ->log('Invited '.$request->email);

        // TODO: Trigger invitation email

        session()->flash('flash.banner', 'The invitation has been sent!');
        session()->flash('flash.bannerStyle', 'success');

        return back();
    }
}
