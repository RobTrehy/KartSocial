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
        Schema::create('track_sessions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('track_event_id')->constrained('track_events')->onDelete('cascade');
            $table->string('name');
            $table->enum('session_type', ['Practice', 'Qualifying', 'Heat', 'Semi Final', 'Grand Final', 'Final', 'Race']);
            $table->enum('length_type', ['Minutes', 'Laps']);
            $table->bigInteger('length');
            $table->integer('order')->default(0);
            $table->integer('total_drivers')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('track_sessions');
    }
};
