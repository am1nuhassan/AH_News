<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Preferences;
use Illuminate\Http\Request;
use App\Services\PreferencesService;

class PreferencesController extends Controller
{

    protected $preferencesService;

    public function __construct(PreferencesService $preferencesService)
    {
        $this->preferencesService = $preferencesService;
    }
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'sources' => 'nullable|array',
            'categories' => 'nullable|array',
            'authors' => 'nullable|array',
        ]);

        $preference = $this->preferencesService->savePreferences($request->user_id, $request->only(['sources', 'categories', 'authors']));

        return response()->json(['message' => 'Preferences saved successfully!', 'preference' => $preference]);
    }

    public function getOptions()
    {
        $options = $this->preferencesService->getOptions();

        return response()->json($options);
    }

    public function getSavedPreferences(Request $request)
    {
        $preferences = $this->preferencesService->getPreferences($request->user()->id);

        return response()->json([
            'sources' => $preferences->sources ?? [],
            'categories' => $preferences->categories ?? [],
            'authors' => $preferences->authors ?? [],
        ]);
    }
}
