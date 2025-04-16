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