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
        Schema::create('user_restriction_appeals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('restriction_id')->constrained('user_restrictions')->onDelete('cascade');
            $table->foreignId('commenter_id')->constrained('users')->onDelete('cascade');
            $table->text('appeal');
            $table->boolean('allow_reply')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_restriction_appeals');
    }
};
