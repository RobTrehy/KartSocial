<?php

namespace App\Console\Commands;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class ClearExpiredRoles extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:clear-expired-roles';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Clear any Roles from models which have expired';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $expireds = DB::table('model_has_roles')->select(['role_id', 'model_id as user_id', 'expires_at'])->where('expires_at', '<', Carbon::now())->get();

        foreach ($expireds as $expired) {
            $user = User::find($expired->user_id);
            $user->removeRole($expired->role_id);
        }
    }
}
