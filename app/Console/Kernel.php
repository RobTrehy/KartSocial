<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        $schedule->command('app:suggest-people')->hourly();
        $schedule->command('app:cancel-expired-restrictions')->daily();
        $schedule->command('app:clear-expired-roles')->daily();
        $schedule->command('app:clear-expired-invites')->daily();
        $schedule->command('activitylog:clean')->daily();
        $schedule->command('personal-data-export:clean')->daily();
        $schedule->command('authentication-log:purge')->monthly();
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}
