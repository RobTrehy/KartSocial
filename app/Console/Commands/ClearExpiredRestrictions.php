<?php

namespace App\Console\Commands;

use App\Models\UserRestrictions;
use Carbon\Carbon;
use Illuminate\Console\Command;

class ClearExpiredRestrictions extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:clear-expired-restrictions';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Clear any expired user restrictions';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $expireds = UserRestrictions::where('expires_at', '<=', Carbon::now()->endOfDay())->get();
        foreach ($expireds as $expired) {
            $expired->delete();
        }
    }
}
