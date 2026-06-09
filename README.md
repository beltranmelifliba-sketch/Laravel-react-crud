# Laravel + React CRUD

A CRUD web application built with Laravel 12 and React, featuring a REST API backend and a recreated WordPress theme frontend.

## Tech Stack
- Laravel 12
- React 19
- TailwindCSS
- MySQL
- Vite

## Features
- REST API Endpoints (Routes → Controller → Services → Model)
- CRUD for relational data (FeatureCategory hasMany Features)
- File upload for feature images
- Recreated WordPress theme (Techmax) as React frontend

## Requirements
- PHP 8.2+
- Composer
- Node.js v20+
- MySQL / MariaDB
- XAMPP or Laragon

## Setup Instructions
git clone https://github.com/beltranmelifliba-sketch/Laravel-react-crud.git

### 1. Clone the repository
git clone 
cd laravel-react-crud

### 2. Install PHP dependencies
composer install

### 3. Install JS dependencies
npm install

### 4. Configure environment
cp .env.example .env
php artisan key:generate

### 5. Update .env database settings
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel_crud
DB_USERNAME=root
DB_PASSWORD=

### 6. Run migrations
php artisan migrate

### 7. Create storage link
php artisan storage:link

### 8. Start the servers
php artisan serve
npm run dev

### 9. Open in browser
http://localhost:8000

