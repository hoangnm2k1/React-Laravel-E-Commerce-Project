<?php

namespace App\Repositories;

use App\Models\Category;
use App\Repositories\Interfaces\ICategoryRepository;

class CategoryRepository implements ICategoryRepository
{
    public function getAll()
    {
        return Category::orderBy('created_at', 'DESC')->get();
    }

    public function findById($id)
    {
        return Category::find($id);
    }

    public function create(array $data)
    {
        return Category::create($data);
    }

    public function update($id, array $data)
    {
        $category = Category::find($id);
        if ($category) {
            $category->update($data);
            return $category;
        }
        return null;
    }

    public function delete($id)
    {
        $category = Category::find($id);
        if ($category) {
            return $category->delete();
        }
        return false;
    }
}