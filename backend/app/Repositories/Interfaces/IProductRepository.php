<?php

namespace App\Repositories\Interfaces;

interface IProductRepository
{
    public function getAll();
    public function findById($id);
    public function findByIdWithRelations($id, array $relations = []);
    public function create(array $data);
    public function update($id, array $data);
    public function delete($id);
    public function getActiveProducts(array $filters = []);
    public function getLatestProducts($limit = 8);
    public function getFeaturedProducts($limit = 8);
}
