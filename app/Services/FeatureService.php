<?php

namespace App\Services;

use App\Models\Feature;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class FeatureService
{
    public function getAll()
    {
        return Feature::with('category')->get();
    }

    public function findById(int $id)
    {
        return Feature::with('category')->findOrFail($id);
    }

    public function create(array $data)
    {
        // SLUG GENERATION SAFE
        $slug = Str::slug($data['title']);
        $originalSlug = $slug;
        $count = 1;

        while (Feature::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $count++;
        }

        $data['slug'] = $slug;

        return Feature::create($data);
    }

    public function update(int $id, array $data)
    {
        $feature = Feature::findOrFail($id);

        // ONLY regenerate slug if title exists
        if (isset($data['title'])) {
            $data['slug'] = Str::slug($data['title']);
        }

        $feature->update($data);

        return $feature->load('category');
    }

    public function delete(int $id)
    {
        $feature = Feature::findOrFail($id);

        // delete image safely
        if ($feature->image) {
            Storage::disk('public')->delete($feature->image);
        }

        $feature->delete();
    }
}