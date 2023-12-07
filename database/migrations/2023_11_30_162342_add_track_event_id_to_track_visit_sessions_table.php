<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('track_visit_sessions', function (Blueprint $table) {
            $table->foreignId('track_event_id')->after('track_visit_id')->nullable()->constrained('track_events')->onDelete('cascade');
            $table->foreignId('track_visit_id')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('track_visit_sessions', function (Blueprint $table) {
            $table->foreignId('track_visit_id')->nullable(false)->change();
            $table->dropColumn('track_event_id');
        });
    }
};
