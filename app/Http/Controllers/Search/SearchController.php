<?php

namespace App\Http\Controllers\Search;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Symfony\Component\Process\Process;
use Illuminate\Support\Facades\Log;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->input('q', '');
        $rank = $request->input('rank', 0);
    
        $process = new Process(["python3", "query.py", "indexdb", (string) $rank, $query]);
        $process->run();
    
        if (!$process->isSuccessful()) {
            return response()->json(['error' => 'Process failed'], 500);
        }
    
        return $this->formatResults($process->getOutput());
    }
    
    public function advancedSearch(Request $request)
    {
        $judul = $request->input('judul', '');
        $penulis = $request->input('penulis', '');
        $fakultas = $request->input('fakultas', '');
        
        // Remove "Fak. " prefix if present for search purposes
        $fakultasSearch = $fakultas;
        if (strpos($fakultas, 'Fak. ') === 0) {
            $fakultasSearch = substr($fakultas, 5);
        }
        
        // Build combined search query for the Python script
        $searchParts = [];
        if (!empty($judul)) $searchParts[] = $judul;
        if (!empty($penulis)) $searchParts[] = $penulis;
        if (!empty($fakultasSearch) && $fakultas !== '- Pilih -') $searchParts[] = $fakultasSearch;
        
        $combinedQuery = implode(' ', $searchParts);
        
        // If no search parameters, return empty results
        if (empty($combinedQuery)) {
            return response()->json([]);
        }
        
        // Call the Python script
        $process = new Process(["python3", "query.py", "indexdb", "0", $combinedQuery]);
        $process->run();
        
        if (!$process->isSuccessful()) {
            return response()->json(['error' => 'Process failed'], 500);
        }
        
        // Get the raw results
        $results = $this->formatResults($process->getOutput());
        
        // Filter results based on exact matching conditions
        $filteredResults = $results->original;
        
        if (!empty($judul)) {
            $filteredResults = array_filter($filteredResults, function($item) use ($judul) {
                return stripos($item['judul_indonesia'], $judul) !== false;
            });
        }
        
        if (!empty($penulis)) {
            $filteredResults = array_filter($filteredResults, function($item) use ($penulis) {
                return stripos($item['penulis'], $penulis) !== false;
            });
        }
        
        if (!empty($fakultas) && $fakultas !== '- Pilih -') {
            $filteredResults = array_filter($filteredResults, function($item) use ($fakultas) {
                return $item['fakultas'] == $fakultas;
            });
        }
        
        return response()->json(array_values($filteredResults));
    }
    
    private function formatResults($rawOutput)
    {
        $raw_output = trim($rawOutput);  
        $list_data = explode("\n", $raw_output); 
        $data = [];
    
        foreach ($list_data as $json_item) {
            if (empty(trim($json_item))) continue;
            
            $dataj = json_decode($json_item, true);
    
            if (!is_array($dataj)) {
                continue; 
            }
    
            $data[] = [
                'url' => htmlspecialchars($dataj['url'] ?? ''),
                'judul_indonesia' => htmlspecialchars($dataj['judul_indonesia'] ?? ''),
                'judul_inggris' => htmlspecialchars($dataj['judul_inggris'] ?? ''),
                'penulis' => htmlspecialchars($dataj['penulis'] ?? ''),
                'fakultas' => htmlspecialchars(ucfirst($dataj['fakultas'] ?? '')),
                'nim' => htmlspecialchars($dataj['nim'] ?? ''),
                'kata_kunci' => htmlspecialchars($dataj['kata_kunci'] ?? ''),
                'score' => htmlspecialchars($dataj['score'] ?? '0'),
            ];
        }
    
        return response()->json($data);
    }
}