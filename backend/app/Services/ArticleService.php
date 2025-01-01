<?php

namespace App\Services;

use Illuminate\Http\Request;
use App\Models\Article;

class ArticleService
{
    public function getArticles(Request $request, $preferences = null)
    {
        $query = $this->buildArticleQuery($request, $preferences);
        return $query->whereNot('title', '[Removed]')->paginate(12);
    }

    protected function buildArticleQuery(Request $request, $preferences = null)
    {
        $keyword = $request->query('keyword');
        $category = $request->query('category');
        $source = $request->query('source');
        $date = $request->query('date');

        $query = Article::query();

        if ($keyword) {
            $query->where('title', 'like', '%' . $keyword . '%')
                ->orWhere('category', 'like', '%' . $keyword . '%')
                ->orWhere('source', 'like', '%' . $keyword . '%');
        }

        if ($category) {
            $query->where('category', $category);
        }

        if ($source) {
            $query->where('source', $source);
        }

        if ($date) {
            $query->whereDate('published_at', $date);
        }

        if ($preferences) {
            if ($preferences->sources) {
                $query->whereIn('source', $preferences->sources);
            }
            if ($preferences->categories) {
                $query->whereIn('category', $preferences->categories);
            }
            if ($preferences->authors) {
                $query->whereIn('author', $preferences->authors);
            }
        }

        return $query;
    }
}
