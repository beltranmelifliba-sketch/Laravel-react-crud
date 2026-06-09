<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\FeatureService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FeatureController extends Controller
{
    public function __construct(private FeatureService $featureService) {}

    private function attachImageUrl($feature)
    {
        if ($feature->image) {
            $feature->image_url = asset('storage/' . $feature->image);
        } else {
            $feature->image_url = null;
        }

        return $feature;
    }

    /* ---------------- GET ALL FEATURES ---------------- */
    public function index()
    {
        $features = $this->featureService->getAll();

        $features->transform(fn($f) => $this->attachImageUrl($f));

        return response()->json($features);
    }

    /* ---------------- GET SINGLE FEATURE ---------------- */
    public function show(int $id)
    {
        $feature = $this->featureService->findById($id);

        return response()->json($this->attachImageUrl($feature));
    }

    /* ---------------- ADD FEATURE (WORDPRESS STYLE) ---------------- */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'feature_category_id' => 'nullable|exists:feature_categories,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        // 🔥 WordPress-like image upload handling
        if ($request->hasFile('image')) {
            $file = $request->file('image');

            $path = $file->store('features', 'public');

            $validated['image'] = $path;
        }

        $feature = $this->featureService->create($validated);

        return response()->json($this->attachImageUrl($feature), 201);
    }

    /* ---------------- UPDATE FEATURE ---------------- */
    public function update(Request $request, int $id)
    {
        $validated = $request->validate([
            'feature_category_id' => 'nullable|exists:feature_categories,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        $feature = $this->featureService->findById($id);

        // 🔥 replace image if new one uploaded
        if ($request->hasFile('image')) {

            // delete old image
            if ($feature->image) {
                Storage::disk('public')->delete($feature->image);
            }

            $validated['image'] = $request->file('image')->store('features', 'public');
        }

        $feature = $this->featureService->update($id, $validated);

        return response()->json($this->attachImageUrl($feature));
    }

    /* ---------------- DELETE FEATURE ---------------- */
    public function destroy(int $id)
    {
        $feature = $this->featureService->findById($id);

        // delete image first (WP-like cleanup)
        if ($feature->image) {
            Storage::disk('public')->delete($feature->image);
        }

        $this->featureService->delete($id);

        return response()->json([
            'message' => 'Feature deleted successfully'
        ]);
    }
}