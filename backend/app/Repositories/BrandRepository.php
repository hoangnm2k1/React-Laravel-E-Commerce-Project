<?php

namespace App\Repositories;

use App\Models\Brand;
use App\Repositories\Interfaces\IBrandRepository;

class BrandRepository implements IBrandRepository
{
    public function getAll()
    {
        return Brand::orderBy('created_at', 'DESC')->get();
    }

    public function findById($id)
    {
        return Brand::find($id);
    }

    public function create(array $data)
    {
        return Brand::create($data);
    }

    public function update($id, array $data)
    {
        $brand = Brand::find($id);
        if ($brand) {
            $brand->update($data);
            return $brand;
        }
        return null;
    }

    public function delete($id)
    {
        $brand = Brand::find($id);
        if ($brand) {
            return $brand->delete();
        }
        return false;
    }
}