<?php

namespace App\Console\Commands;

use App\Models\Invitation;
use Carbon\Carbon;
use Illuminate\Console\Command;

class ClearExpiredInvites extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:clear-expired-invites';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Clear invited users who have not accepted';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        Invitation::where('created_at', '<=', Carbon::now()->subDays(30)->startOfDay())
            ->whereNull('registered_at')
            ->delete();
    }
}
