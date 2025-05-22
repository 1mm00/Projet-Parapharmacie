<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;



return new class extends Migration
{
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->integer('stock')->default(0);
            $table->unsignedTinyInteger('promotion_percentage')->nullable(); // نسبة مئوية مثل 10، 20…
            $table->date('promotion_start')->nullable();
            $table->date('promotion_end')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn(['stock', 'promotion_percentage', 'promotion_start', 'promotion_end']);
        });
    }
};

