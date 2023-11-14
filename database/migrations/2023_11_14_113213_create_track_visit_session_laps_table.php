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
        Schema::create('track_visit_session_laps', function (Blueprint $table) {
            $table->id();
            $table->foreignId('session_id')->constrained('track_visit_sessions')->onDelete('cascade');
            $table->bigInteger('lap_number');
            $table->decimal('lap_time', 8, 3);
            $table->decimal('lap_diff', 8, 3)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('track_visit_session_laps');
    }
};
