<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\NewsFetchService;

class FetchNewsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'news:fetch';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fetch and store news articles from different sources';

    /**
     * The NewsFetchService instance.
     *
     * @var NewsFetchService
     */
    protected $newsFetchService;

    /**
     * Create a new command instance.
     *
     * @param NewsFetchService $newsFetchService
     * @return void
     */
    public function __construct(NewsFetchService $newsFetchService)
    {
        parent::__construct();

        $this->newsFetchService = $newsFetchService;
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->info('Fetching news articles...');
        $this->newsFetchService->fetchAndStoreArticles();
        $this->info('News articles fetched successfully!');
        return Command::SUCCESS;
    }
}
