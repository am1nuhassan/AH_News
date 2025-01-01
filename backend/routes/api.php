<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PreferencesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/preferences', [PreferencesController::class, 'store']);
    Route::get('/personalized-feed', [ArticleController::class, 'fetchPersonalizedFeed']);
    Route::get('/preferences/options', [PreferencesController::class, 'getOptions']);
    Route::get('/preferences/saved', [PreferencesController::class, 'getSavedPreferences']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/fetch-articles', [ArticleController::class, 'fetchArticles']);
Route::get('/articles', [ArticleController::class, 'index']);
