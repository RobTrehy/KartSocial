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
        Schema::create('track_visit_sessions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('track_visit_id')->constrained('track_visits')->onDelete('cascade');
            $table->string('session_name');
            $table->enum('session_type', ['Practice', 'Qualifying', 'Heat', 'Semi Final', 'Grand Final', 'Final', 'Race']);
            $table->enum('session_length_type', ['Minutes', 'Laps']);
            $table->bigInteger('session_length');
            $table->integer('session_order')->default(0);
            $table->integer('total_drivers')->nullable();
            $table->integer('finish_position')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('track_visit_sessions');
    }
};
