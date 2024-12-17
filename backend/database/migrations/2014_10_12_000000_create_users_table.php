<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('username')->nullable();
            $table->string('wallet')->unique();
            $table->string('website')->nullable();
            $table->text('about')->nullable();
            $table->text('description')->nullable();
            $table->string('avatar')->nullable();
            $table->string('discord')->nullable();
            $table->string('twitter')->nullable();
            $table->string('instagram')->nullable();
            $table->string('telegram')->nullable();
            $table->string(column: 'youtube')->nullable();
            $table->string(column: 'facebook')->nullable();
            $table->string(column: 'item1')->nullable();
            $table->string(column: 'item2')->nullable();
            $table->string(column: 'item3')->nullable();
            $table->string(column: 'item4')->nullable();
            $table->string(column: 'item5')->nullable();
            $table->string(column: 'item6')->nullable();
            $table->string(column: 'item7')->nullable();
            $table->string(column: 'item8')->nullable();
            $table->string(column: 'item9')->nullable();
            $table->string(column: 'item10')->nullable();
            $table->string(column: 'item11')->nullable();
            $table->string(column: 'item12')->nullable();
            $table->enum(
                'status',
                ['Active', 'Blocked']
            );
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
