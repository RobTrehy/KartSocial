<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::dropIfExists('track_visit_session_laps');
        Schema::dropIfExists('track_visit_sessions');
        Schema::dropIfExists('track_visits');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
