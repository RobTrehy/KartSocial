<?php

namespace App\Http\Middleware;

use App\Models\UserRestrictions;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class UserIsNotRestricted
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::check()) {
            if (UserRestrictions::where('user_id', Auth::id())->first()) {
                return redirect(route('restricted.access'));
            }
        }

        return $next($request);
    }
}
