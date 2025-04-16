<?php

namespace App\Http\Controllers\SearchWithJSon;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\File;

class SearchController extends Controller
{
    private $dataPath = 'data.json'; // Path relatif dari root aplikasi
    
    public function search(Request $request)
    {
        $query = strtolower($request->input('q', ''));
        
        if (empty($query)) {
            return response()->json([]);
        }
        
        // Baca data dari JSON file
        $data = $this->readJsonData();
        if (empty($data)) {
            return response()->json([]);
        }
        
        // Filter data berdasarkan query pencarian
        $results = $this->filterDataByQuery($data, $query);
        
        return response()->json($results);
    }
    
    public function advancedSearch(Request $request)
    {
        $judul = strtolower($request->input('judul', ''));
        $penulis = strtolower($request->input('penulis', ''));
        $fakultas = $request->input('fakultas', '');
        
        // Baca data dari JSON file
        $data = $this->readJsonData();
        if (empty($data)) {
            return response()->json([]);
        }
        
        // Filter data berdasarkan parameter advanced search
        $results = $this->filterDataByAdvancedSearch($data, $judul, $penulis, $fakultas);
        
        return response()->json($results);
    }
    
    private function readJsonData()
    {
        try {
            $jsonPath = base_path($this->dataPath);
            
            if (!File::exists($jsonPath)) {
                Log::error("Data file not found: {$jsonPath}");
                return [];
            }
            
            $jsonContent = File::get($jsonPath);
            $data = json_decode($jsonContent, true);
            
            if (json_last_error() !== JSON_ERROR_NONE) {
                Log::error("Error parsing JSON data: " . json_last_error_msg());
                return [];
            }
            
            return $data;
        } catch (\Exception $e) {
            Log::error("Error reading JSON data: " . $e->getMessage());
            return [];
        }
    }
    
    private function filterDataByQuery($data, $query)
    {
        $results = [];
        
        foreach ($data as $item) {
            $matches = false;
            
            // Cek pada semua bidang teks yang relevan
            if (
                stripos(strtolower($item['judul_indonesia'] ?? ''), $query) !== false ||
                stripos(strtolower($item['judul_inggris'] ?? ''), $query) !== false ||
                stripos(strtolower($item['penulis'] ?? ''), $query) !== false ||
                stripos(strtolower($item['fakultas'] ?? ''), $query) !== false ||
                stripos(strtolower($item['kata_kunci'] ?? ''), $query) !== false
            ) {
                $matches = true;
            }
            
            if ($matches) {
                // Hitung score sederhana berdasarkan jumlah kemunculan kata kunci
                $score = $this->calculateScore($item, $query);
                $item['score'] = (string)$score;
                $results[] = $item;
            }
        }
        
        // Urutkan hasil berdasarkan score (dari tertinggi ke terendah)
        usort($results, function($a, $b) {
            return $b['score'] <=> $a['score'];
        });
        
        return $results;
    }
    
    private function filterDataByAdvancedSearch($data, $judul, $penulis, $fakultas)
    {
        $results = [];
        
        foreach ($data as $item) {
            $matches = true;
            
            // Filter berdasarkan judul jika parameter judul ada
            if (!empty($judul) && stripos(strtolower($item['judul_indonesia'] ?? ''), $judul) === false) {
                $matches = false;
            }
            
            // Filter berdasarkan penulis jika parameter penulis ada
            if (!empty($penulis) && stripos(strtolower($item['penulis'] ?? ''), $penulis) === false) {
                $matches = false;
            }
            
            // Filter berdasarkan fakultas jika parameter fakultas ada dan bukan '- Pilih -'
            if (!empty($fakultas) && $fakultas !== '- Pilih -' && $item['fakultas'] !== $fakultas) {
                $matches = false;
            }
            
            if ($matches) {
                // Hitung score sederhana
                $score = 1.0;
                if (!empty($judul)) {
                    $score += $this->calculateScore($item, $judul);
                }
                if (!empty($penulis)) {
                    $score += $this->calculateScore($item, $penulis);
                }
                $item['score'] = (string)$score;
                $results[] = $item;
            }
        }
        
        // Urutkan hasil berdasarkan score
        usort($results, function($a, $b) {
            return $b['score'] <=> $a['score'];
        });
        
        return $results;
    }
    
    private function calculateScore($item, $query)
    {
        $score = 0;
        
        // Bobot untuk setiap field
        $weights = [
            'judul_indonesia' => 3.0,
            'judul_inggris' => 2.0,
            'penulis' => 2.5,
            'fakultas' => 1.0,
            'kata_kunci' => 2.0
        ];
        
        foreach ($weights as $field => $weight) {
            if (isset($item[$field])) {
                $fieldValue = strtolower($item[$field]);
                $queryLower = strtolower($query);
                
                // Tambahkan ke score jika query ditemukan dalam field
                if (stripos($fieldValue, $queryLower) !== false) {
                    $score += $weight;
                    
                    // Tambahkan bobot lebih jika merupakan kecocokan tepat
                    if ($fieldValue === $queryLower) {
                        $score += $weight * 0.5;
                    }
                }
            }
        }
        
        return $score;
    }
}