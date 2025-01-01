<?php

namespace App\Services;

use App\Models\Article;
use App\Models\Preferences;

class PreferencesService
{
    public function savePreferences($userId, $data)
    {
        return Preferences::updateOrCreate(
            ['user_id' => $userId],
            $data
        );
    }

    public function getPreferences($userId)
    {
        return Preferences::where('user_id', $userId)->first();
    }

    public function getOptions()
    {
        return [
            'sources' => Article::distinct()->pluck('source')->whereNotIn('source', ['[Removed]']),
            'categories' => Article::distinct()->pluck('category'),
            'authors' => Article::distinct()->pluck('author'),
        ];
    }
}
