<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Services\ArticleService;
use Illuminate\Http\Request;
use App\Services\NewsFetchService;

class ArticleController extends Controller
{
    protected $newsFetchService;

    public function __construct(NewsFetchService $newsFetchService)
    {
        $this->newsFetchService = $newsFetchService;
    }

    public function fetchArticles()
    {
        $this->newsFetchService->fetchAndStoreArticles();
        return response()->json(['message' => 'Artcles fetched and stored successfully']);
    }

    public function index(Request $request, ArticleService $articleService)
    {
        try {
            $articles = $articleService->getArticles($request);
            return response()->json($articles);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    public function fetchPersonalizedFeed(Request $request, ArticleService $articleService)
    {
        try {
            $user = $request->user();
            $articles = $articleService->getArticles($request, $user->preferences);
            return response()->json($articles);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
