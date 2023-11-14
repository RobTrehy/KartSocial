<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ChangeExpiryRequest;
use App\Http\Requests\Admin\RestrictUserRequest;
use App\Http\Requests\AppealRestrictionRequest;
use App\Models\User;
use App\Models\UserRestrictionAppeal;
use App\Models\UserRestrictions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserRestrictionController extends Controller
{
    /**
     * Add a comment to an appeal
     * This can be the restricted/banned user or an admin
     * 
     * Requires: none //TODO: ?
     */
    public function addAppealComment(AppealRestrictionRequest $request)
    {
        UserRestrictionAppeal::create([
            'ban_id' => $request->ban_id,
            'commenter_id' => Auth::id(),
            'appeal' => $request->appeal,
            'allow_reply' => ($request->allow_reply) ? $request->allow_reply : true,
        ]);
    }

    /**
     * Show the admin page to manage a User's restriction
     * 
     * Requires: admin.access (middelware)
     */
    public function adminManageRestriction(User $user)
    {
        $ban = UserRestrictions::where('user_id', $user->id)->with(['user', 'banner', 'appeals', 'appeals.user'])->first();
        if ($ban) {
            return Inertia::render('Admin/Users/Restriction', [
                'user' => $user,
                'user.ban' => $ban,
            ]);
        }
        return redirect()->back();
    }

    /**
     * Prevent the user from adding further comments to their appeal
     * 
     * Requires: admin.access (middleware)
     */
    public function adminCancelAppeals(UserRestrictions $ban)
    {
        $appeal = UserRestrictionAppeal::where('ban_id', $ban->id)->orderBy('created_at', 'DESC')->first();
        $appeal->allow_reply = false;
        $appeal->save();
    }

    /**
     * Allow the user to add further comments to their appeal
     * 
     * Requires: admin.access (middleware)
     */
    public function adminOpenAppeals(UserRestrictions $ban)
    {
        $appeal = UserRestrictionAppeal::where('ban_id', $ban->id)->orderBy('created_at', 'DESC')->first();
        $appeal->allow_reply = true;
        $appeal->save();
    }

    /**
     * Change the expiry date of a user restriction
     * 
     * Requires: admin.acess (middleware)
     */
    public function adminChangeExpiry(ChangeExpiryRequest $request, UserRestrictions $ban)
    {
        $ban->expires_at = $request->expires_at;
        $ban->save();
    }

    /**
     * Restrict a user from the system
     * 
     * Requires: admin.access (middleware)
     */
    public function adminRestrictUser(RestrictUserRequest $request, User $user)
    {
        UserRestrictions::create([
            'user_id' => $user->id,
            'banner_id' => Auth::id(),
            'reason' => $request->reason,
            'expires_at' => $request->expires_at,
        ]);
    }
}
