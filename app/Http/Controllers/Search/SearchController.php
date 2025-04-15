<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->input('q', '');
        $rank = $request->input('rank', 1000);
    
        $process = new Process(["python3", "query.py", "indexdb", (string) $rank, $query]);
        $process->run();
    
        if (!$process->isSuccessful()) {
            return response()->json(['error' => 'Process failed'], 500);
        }
    
        $raw_output = trim($process->getOutput());  
        $list_data = explode("\n", $raw_output); 
        $data = [];
    
        foreach ($list_data as $json_item) {
            $dataj = json_decode($json_item, true);
    
            if (!is_array($dataj)) {
                continue; 
            }
    
            $data[] = [
                'url' => htmlspecialchars($dataj['url']),
                'judul_indonesia' => htmlspecialchars($dataj['judul_indonesia']),
                'judul_inggris' => htmlspecialchars($dataj['judul_inggris']),
                'penulis' => htmlspecialchars($dataj['penulis']),
                'fakultas' => htmlspecialchars(ucfirst($dataj['fakultas'])),
                'nim' => htmlspecialchars($dataj['nim']),
                'kata_kunci' => htmlspecialchars($dataj['kata_kunci']),
                'score' => htmlspecialchars($dataj['score']),
            ];
        }
    
        return response()->json($data); // Kembalikan JSON yang valid
    }
    
}
