-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th9 15, 2025 lúc 04:13 AM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `ecommerce`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `brands`
--

CREATE TABLE `brands` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `brands`
--

INSERT INTO `brands` (`id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Acne Studios', 1, '2025-07-25 06:48:50', '2025-07-25 06:48:50'),
(2, 'Balenciaga', 1, '2025-07-25 06:49:08', '2025-07-25 06:49:08'),
(3, 'Casadei', 1, '2025-07-25 06:49:36', '2025-07-25 06:49:36'),
(4, 'Delvaux', 1, '2025-07-25 06:49:53', '2025-07-25 06:49:53'),
(5, 'FENDI', 1, '2025-07-25 06:50:08', '2025-07-25 06:50:08'),
(6, 'Gucci', 1, '2025-07-25 06:50:25', '2025-07-25 06:50:31'),
(7, 'Hermès', 1, '2025-07-25 06:51:28', '2025-07-25 06:51:28'),
(8, 'Hermès', 1, '2025-07-25 06:51:34', '2025-07-25 06:51:34'),
(9, 'Kiton', 1, '2025-07-25 06:51:49', '2025-07-25 06:51:49'),
(10, 'La Lune', 1, '2025-07-25 06:52:03', '2025-07-25 06:52:03');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Kids', 1, '2025-07-25 03:40:44', '2025-07-25 03:40:44'),
(2, 'Women', 1, '2025-07-25 03:40:52', '2025-07-25 03:40:52'),
(3, 'Men', 1, '2025-07-25 03:40:59', '2025-07-25 03:40:59');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(12, '0001_01_01_000000_create_users_table', 1),
(13, '0001_01_01_000001_create_cache_table', 1),
(14, '0001_01_01_000002_create_jobs_table', 1),
(15, '2025_07_18_083511_create_personal_access_tokens_table', 1),
(16, '2025_07_19_080353_create_categories_table', 1),
(17, '2025_07_19_080626_create_brands_table', 1),
(18, '2025_07_21_132509_create_products_table', 1),
(19, '2025_07_21_134834_create_sizes_table', 1),
(20, '2025_07_21_135014_create_product_images_table', 1),
(21, '2025_07_21_135243_create_product_sizes_table', 1),
(22, '2025_07_21_135428_create_temp_images_table', 1),
(23, '2025_08_20_033837_create_orders_table', 2),
(24, '2025_08_20_035505_create_order_items_table', 3),
(27, '2025_09_06_030348_alter_users_table', 4),
(28, '2025_09_06_092148_create_shipping_charges_table', 5),
(29, '2025_09_11_044317_alter_orders_table', 6);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `subtotal` double NOT NULL,
  `grand_total` double NOT NULL,
  `shipping` double NOT NULL,
  `discount` double DEFAULT NULL,
  `payment_status` enum('paid','not_paid') NOT NULL DEFAULT 'not_paid',
  `payment_method` enum('cod','stripe') NOT NULL DEFAULT 'cod',
  `status` enum('pending','shipped','delivered','cancelled') NOT NULL DEFAULT 'pending',
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobile` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `zip` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `subtotal`, `grand_total`, `shipping`, `discount`, `payment_status`, `payment_method`, `status`, `name`, `email`, `mobile`, `address`, `city`, `state`, `zip`, `created_at`, `updated_at`) VALUES
(7, 3, 987, 987, 0, 0, 'not_paid', 'cod', 'pending', 'Paula Kirkland', 'xijyre@mailinator.com', '012345678', 'Dolorem quibusdam te', 'Ad dignissimos dolor', 'Voluptatem Numquam', '26011', '2025-08-20 20:13:33', '2025-08-20 20:13:33'),
(16, 3, 987, 987, 0, 0, 'not_paid', 'cod', 'pending', 'Adria Oliver', 'tycuk@mailinator.com', '012345678', 'Error eu dolorem qui', 'Quaerat reprehenderi', 'Eum quidem excepturi', '58727', '2025-08-20 21:06:29', '2025-08-20 21:06:29'),
(17, 3, 987, 987, 0, 0, 'paid', 'cod', 'shipped', 'Lenore Aguilar', 'zinexyjebi@mailinator.com', '012345678', 'Laborum ex eos reru', 'Eum quidem officia e', 'Neque laboris dolori', '88016', '2025-08-20 21:07:20', '2025-09-03 08:42:36'),
(18, 3, 4578, 4578, 0, 0, 'not_paid', 'cod', 'delivered', 'Kelly Meadows', 'xusa@mailinator.com', '012345678', 'Maxime ex ipsam magn', 'Iusto id velit error', 'Qui ipsum blanditiis', '34003', '2025-08-24 19:50:12', '2025-09-04 09:12:49'),
(19, 3, 2208, 2208, 0, 0, 'not_paid', 'cod', 'cancelled', 'Mohammad Riddle', 'wiforyv@mailinator.com', '012345678', 'Irure deserunt harum', 'Lorem sed quia Nam v', 'Incidunt soluta qui', '36890', '2025-08-25 07:46:56', '2025-08-25 07:46:56'),
(20, 3, 1482, 1482, 0, 0, 'not_paid', 'cod', 'pending', 'Leo Hyde', 'zoxyfob@mailinator.com', '012345678', 'Expedita omnis quide', 'Dolore qui incididun', 'Ut debitis vitae nos', '63991', '2025-08-25 08:11:18', '2025-08-25 08:11:18'),
(21, 2, 1032, 1032, 0, 0, 'not_paid', 'cod', 'pending', 'Name', 'email@gmail.com', '0701112223', 'Binh Nhuong', 'SG', 'NYC', '111', '2025-09-04 09:04:04', '2025-09-04 09:04:04'),
(22, 3, 2580, 2580, 0, 0, 'not_paid', 'cod', 'pending', 'Daphne Keith', 'sunabyhep@mailinator.com', '+1 (587) 601-2698', 'Voluptatem dolorem i', 'Iure dolor officia a', 'Et minima esse atqu', '32252', '2025-09-06 01:51:49', '2025-09-06 01:51:49'),
(23, 3, 3693, 3753, 60, 0, 'not_paid', 'cod', 'pending', 'Daphne Keith', 'sunabyhep@mailinator.com', '+1 (587) 601-2698', 'Voluptatem dolorem i', 'Iure dolor officia a', 'Et minima esse atqu', '32252', '2025-09-06 07:37:51', '2025-09-06 07:37:51'),
(24, 3, 1292, 1352, 60, 0, 'not_paid', 'cod', 'pending', 'Daphne Keith', 'sunabyhep@mailinator.com', '+1 (587) 601-2698', 'Voluptatem dolorem i', 'Iure dolor officia a', 'Et minima esse atqu', '32252', '2025-09-10 20:48:00', '2025-09-10 20:48:00'),
(25, 3, 1292, 1352, 60, 0, 'not_paid', 'cod', 'pending', 'Daphne Keith', 'sunabyhep@mailinator.com', '+1 (587) 601-2698', 'Voluptatem dolorem i', 'Iure dolor officia a', 'Et minima esse atqu', '32252', '2025-09-10 20:58:57', '2025-09-10 20:58:57'),
(26, 3, 1946, 1976, 30, 0, 'not_paid', 'cod', 'pending', 'Daphne Keith', 'sunabyhep@mailinator.com', '+1 (587) 601-2698', 'Voluptatem dolorem i', 'Iure dolor officia a', 'Et minima esse atqu', '32252', '2025-09-10 21:06:37', '2025-09-10 21:06:37'),
(27, 3, 1548, 1593, 45, 0, 'not_paid', 'cod', 'pending', 'Daphne Keith', 'sunabyhep@mailinator.com', '+1 (587) 601-2698', 'Voluptatem dolorem i', 'Iure dolor officia a', 'Et minima esse atqu', '32252', '2025-09-10 21:26:31', '2025-09-10 21:26:31'),
(28, 3, 1548, 1593, 45, 0, 'not_paid', 'cod', 'pending', 'Daphne Keith', 'sunabyhep@mailinator.com', '+1 (587) 601-2698', 'Voluptatem dolorem i', 'Iure dolor officia a', 'Et minima esse atqu', '32252', '2025-09-10 21:34:28', '2025-09-10 21:34:28'),
(29, 3, 1548, 1593, 45, 0, 'paid', 'cod', 'pending', 'Daphne Keith', 'sunabyhep@mailinator.com', '+1 (587) 601-2698', 'Voluptatem dolorem i', 'Iure dolor officia a', 'Et minima esse atqu', '32252', '2025-09-10 21:39:03', '2025-09-10 21:39:03'),
(30, 3, 114, 144, 30, 0, 'not_paid', 'cod', 'pending', 'Daphne Keith', 'sunabyhep@mailinator.com', '+1 (587) 601-2698', 'Voluptatem dolorem i', 'Iure dolor officia a', 'Et minima esse atqu', '32252', '2025-09-11 01:33:36', '2025-09-11 01:33:36'),
(31, 3, 114, 144, 30, 0, 'paid', 'cod', 'pending', 'Daphne Keith', 'sunabyhep@mailinator.com', '+1 (587) 601-2698', 'Voluptatem dolorem i', 'Iure dolor officia a', 'Et minima esse atqu', '32252', '2025-09-11 01:34:01', '2025-09-11 01:34:01'),
(32, 3, 114, 144, 30, 0, 'not_paid', 'cod', 'pending', 'Daphne Keith', 'sunabyhep@mailinator.com', '+1 (587) 601-2698', 'Voluptatem dolorem i', 'Iure dolor officia a', 'Et minima esse atqu', '32252', '2025-09-11 01:52:25', '2025-09-11 01:52:25'),
(33, 3, 1133, 1163, 30, 0, 'paid', 'cod', 'pending', 'Daphne Keith', 'sunabyhep@mailinator.com', '+1 (587) 601-2698', 'Voluptatem dolorem i', 'Iure dolor officia a', 'Et minima esse atqu', '32252', '2025-09-11 01:55:56', '2025-09-11 01:55:56'),
(34, 3, 1133, 1163, 30, 0, 'paid', 'cod', 'pending', 'Daphne Keith', 'sunabyhep@mailinator.com', '+1 (587) 601-2698', 'Voluptatem dolorem i', 'Iure dolor officia a', 'Et minima esse atqu', '32252', '2025-09-11 01:57:27', '2025-09-11 01:57:27'),
(35, 3, 1133, 1163, 30, 0, 'not_paid', 'cod', 'pending', 'Daphne Keith', 'sunabyhep@mailinator.com', '+1 (587) 601-2698', 'Voluptatem dolorem i', 'Iure dolor officia a', 'Et minima esse atqu', '32252', '2025-09-11 02:02:17', '2025-09-11 02:02:17'),
(36, 3, 1133, 1163, 30, 0, 'paid', 'cod', 'pending', 'Daphne Keith', 'sunabyhep@mailinator.com', '+1 (587) 601-2698', 'Voluptatem dolorem i', 'Iure dolor officia a', 'Et minima esse atqu', '32252', '2025-09-11 02:02:38', '2025-09-11 02:02:38'),
(37, 3, 1133, 1163, 30, 0, 'not_paid', 'cod', 'pending', 'Daphne Keith', 'sunabyhep@mailinator.com', '+1 (587) 601-2698', 'Voluptatem dolorem i', 'Iure dolor officia a', 'Et minima esse atqu', '32252', '2025-09-11 02:05:05', '2025-09-11 02:05:05'),
(38, 3, 741, 756, 15, 0, 'paid', 'cod', 'pending', 'Daphne Keith', 'sunabyhep@mailinator.com', '+1 (587) 601-2698', 'Voluptatem dolorem i', 'Iure dolor officia a', 'Et minima esse atqu', '32252', '2025-09-11 02:41:56', '2025-09-11 02:41:56'),
(39, 3, 741, 756, 15, 0, 'paid', 'stripe', 'pending', 'Daphne Keith', 'sunabyhep@mailinator.com', '+1 (587) 601-2698', 'Voluptatem dolorem i', 'Iure dolor officia a', 'Et minima esse atqu', '32252', '2025-09-11 02:45:35', '2025-09-11 02:45:35'),
(40, 3, 741, 756, 15, 0, 'paid', 'stripe', 'shipped', 'Daphne Keith', 'sunabyhep@mailinator.com', '+1 (587) 601-2698', 'Voluptatem dolorem i', 'Iure dolor officia a', 'Et minima esse atqu', '32252', '2025-09-11 02:46:28', '2025-09-11 02:53:34');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_items`
--

CREATE TABLE `order_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `size` varchar(255) DEFAULT NULL,
  `price` double NOT NULL,
  `unit_price` double NOT NULL,
  `quantity` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `name`, `size`, `price`, `unit_price`, `quantity`, `created_at`, `updated_at`) VALUES
(8, 7, 2, 'Trendy Queen Womens', NULL, 930, 930, 1, '2025-08-20 20:13:33', '2025-08-20 20:13:33'),
(26, 16, 2, 'Trendy Queen Womens', NULL, 930, 930, 1, '2025-08-20 21:06:29', '2025-08-20 21:06:29'),
(27, 16, 1, 'Jumpsuits', 'M', 57, 57, 1, '2025-08-20 21:06:29', '2025-08-20 21:06:29'),
(28, 17, 2, 'Trendy Queen Womens', NULL, 930, 930, 1, '2025-08-20 21:07:20', '2025-08-20 21:07:20'),
(29, 17, 1, 'Jumpsuits', 'M', 57, 57, 1, '2025-08-20 21:07:20', '2025-08-20 21:07:20'),
(30, 18, 4, 'Gin', 'S', 2736, 912, 3, '2025-08-24 19:50:12', '2025-08-24 19:50:12'),
(31, 18, 4, 'Gin', 'XL', 912, 912, 1, '2025-08-24 19:50:12', '2025-08-24 19:50:12'),
(32, 18, 2, 'Trendy Queen Womens', NULL, 930, 930, 1, '2025-08-24 19:50:12', '2025-08-24 19:50:12'),
(33, 19, 9, 'Pure Champ', 'S', 516, 516, 1, '2025-08-25 07:46:56', '2025-08-25 07:46:56'),
(34, 19, 9, 'Pure Champ', 'L', 516, 516, 1, '2025-08-25 07:46:56', '2025-08-25 07:46:56'),
(35, 19, 8, 'American Apparel', NULL, 203, 203, 1, '2025-08-25 07:46:56', '2025-08-25 07:46:56'),
(36, 19, 7, 'Dri-Power', 'M', 973, 973, 1, '2025-08-25 07:46:56', '2025-08-25 07:46:56'),
(37, 20, 3, 'Hanes Men\'s EcoSmart Fleece', NULL, 1482, 741, 2, '2025-08-25 08:11:18', '2025-08-25 08:11:18'),
(38, 21, 9, 'Pure Champ', 'M', 1032, 516, 2, '2025-09-04 09:04:04', '2025-09-04 09:04:04'),
(39, 22, 6, 'Gildan', NULL, 927, 927, 1, '2025-09-06 01:51:49', '2025-09-06 01:51:49'),
(40, 22, 3, 'Hanes Men\'s EcoSmart Fleece', NULL, 741, 741, 1, '2025-09-06 01:51:49', '2025-09-06 01:51:49'),
(41, 22, 4, 'Gin', 'M', 912, 912, 1, '2025-09-06 01:51:49', '2025-09-06 01:51:49'),
(42, 23, 6, 'Gildan', NULL, 2781, 927, 3, '2025-09-06 07:37:51', '2025-09-06 07:37:51'),
(43, 23, 4, 'Gin', 'M', 912, 912, 1, '2025-09-06 07:37:51', '2025-09-06 07:37:51'),
(44, 24, 8, 'American Apparel', NULL, 203, 203, 1, '2025-09-10 20:48:00', '2025-09-10 20:48:00'),
(45, 24, 9, 'Pure Champ', 'L', 1032, 516, 2, '2025-09-10 20:48:00', '2025-09-10 20:48:00'),
(46, 24, 1, 'Jumpsuits', 'M', 57, 57, 1, '2025-09-10 20:48:00', '2025-09-10 20:48:00'),
(47, 25, 8, 'American Apparel', NULL, 203, 203, 1, '2025-09-10 20:58:57', '2025-09-10 20:58:57'),
(48, 25, 9, 'Pure Champ', 'L', 1032, 516, 2, '2025-09-10 20:58:57', '2025-09-10 20:58:57'),
(49, 25, 1, 'Jumpsuits', 'M', 57, 57, 1, '2025-09-10 20:58:57', '2025-09-10 20:58:57'),
(50, 26, 7, 'Dri-Power', 'M', 1946, 973, 2, '2025-09-10 21:06:37', '2025-09-10 21:06:37'),
(51, 27, 9, 'Pure Champ', 'L', 516, 516, 1, '2025-09-10 21:26:31', '2025-09-10 21:26:31'),
(52, 27, 9, 'Pure Champ', 'M', 1032, 516, 2, '2025-09-10 21:26:31', '2025-09-10 21:26:31'),
(53, 28, 9, 'Pure Champ', 'L', 516, 516, 1, '2025-09-10 21:34:28', '2025-09-10 21:34:28'),
(54, 28, 9, 'Pure Champ', 'M', 1032, 516, 2, '2025-09-10 21:34:28', '2025-09-10 21:34:28'),
(55, 29, 9, 'Pure Champ', 'L', 516, 516, 1, '2025-09-10 21:39:03', '2025-09-10 21:39:03'),
(56, 29, 9, 'Pure Champ', 'M', 1032, 516, 2, '2025-09-10 21:39:03', '2025-09-10 21:39:03'),
(57, 30, 1, 'Jumpsuits', 'S', 57, 57, 1, '2025-09-11 01:33:36', '2025-09-11 01:33:36'),
(58, 30, 1, 'Jumpsuits', 'L', 57, 57, 1, '2025-09-11 01:33:36', '2025-09-11 01:33:36'),
(59, 31, 1, 'Jumpsuits', 'S', 57, 57, 1, '2025-09-11 01:34:01', '2025-09-11 01:34:01'),
(60, 31, 1, 'Jumpsuits', 'L', 57, 57, 1, '2025-09-11 01:34:01', '2025-09-11 01:34:01'),
(61, 32, 1, 'Jumpsuits', 'S', 57, 57, 1, '2025-09-11 01:52:25', '2025-09-11 01:52:25'),
(62, 32, 1, 'Jumpsuits', 'L', 57, 57, 1, '2025-09-11 01:52:25', '2025-09-11 01:52:25'),
(63, 33, 2, 'Trendy Queen Womens', NULL, 930, 930, 1, '2025-09-11 01:55:56', '2025-09-11 01:55:56'),
(64, 33, 8, 'American Apparel', NULL, 203, 203, 1, '2025-09-11 01:55:56', '2025-09-11 01:55:56'),
(65, 34, 2, 'Trendy Queen Womens', NULL, 930, 930, 1, '2025-09-11 01:57:27', '2025-09-11 01:57:27'),
(66, 34, 8, 'American Apparel', NULL, 203, 203, 1, '2025-09-11 01:57:27', '2025-09-11 01:57:27'),
(67, 35, 2, 'Trendy Queen Womens', NULL, 930, 930, 1, '2025-09-11 02:02:17', '2025-09-11 02:02:17'),
(68, 35, 8, 'American Apparel', NULL, 203, 203, 1, '2025-09-11 02:02:18', '2025-09-11 02:02:18'),
(69, 36, 2, 'Trendy Queen Womens', NULL, 930, 930, 1, '2025-09-11 02:02:38', '2025-09-11 02:02:38'),
(70, 36, 8, 'American Apparel', NULL, 203, 203, 1, '2025-09-11 02:02:38', '2025-09-11 02:02:38'),
(71, 37, 2, 'Trendy Queen Womens', NULL, 930, 930, 1, '2025-09-11 02:05:05', '2025-09-11 02:05:05'),
(72, 37, 8, 'American Apparel', NULL, 203, 203, 1, '2025-09-11 02:05:05', '2025-09-11 02:05:05'),
(73, 38, 3, 'Hanes Men\'s EcoSmart Fleece', NULL, 741, 741, 1, '2025-09-11 02:41:56', '2025-09-11 02:41:56'),
(74, 39, 3, 'Hanes Men\'s EcoSmart Fleece', NULL, 741, 741, 1, '2025-09-11 02:45:35', '2025-09-11 02:45:35'),
(75, 40, 3, 'Hanes Men\'s EcoSmart Fleece', NULL, 741, 741, 1, '2025-09-11 02:46:28', '2025-09-11 02:46:28');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'token', '91ee8bae5fb353e6557c7ad310c6d778941a44fc7ea60347dfb211b74be81b69', '[\"*\"]', '2025-08-20 03:15:58', NULL, '2025-07-25 03:40:36', '2025-08-20 03:15:58'),
(2, 'App\\Models\\User', 1, 'token', 'da8ec2d51bee458b6e4abd4bf36edf070e9add40686d8e284d1d336d9265c84e', '[\"*\"]', '2025-08-24 20:38:24', NULL, '2025-07-26 20:08:13', '2025-08-24 20:38:24'),
(3, 'App\\Models\\User', 2, 'token', 'baddf3a8f5c32076eb3fb108f69e88e6b2542d7c2468545c8ceecc1395571542', '[\"*\"]', NULL, NULL, '2025-08-16 08:28:56', '2025-08-16 08:28:56'),
(4, 'App\\Models\\User', 2, 'token', '1ff07c19ed1166c24f94e4313edc8f539760ab7b7f5095b7a99f00873900dd41', '[\"*\"]', NULL, NULL, '2025-08-16 08:30:51', '2025-08-16 08:30:51'),
(5, 'App\\Models\\User', 3, 'token', '932be6d87592c76e05dfd7615fd5de6ecb8747a1242f907122bdb9c4ac3a8d95', '[\"*\"]', NULL, NULL, '2025-08-18 02:58:40', '2025-08-18 02:58:40'),
(6, 'App\\Models\\User', 3, 'token', '4ae90bafa95411eaac9243ecf6f657a1af13b882d234961d57fa0f4eb7523a3c', '[\"*\"]', NULL, NULL, '2025-08-18 02:59:18', '2025-08-18 02:59:18'),
(7, 'App\\Models\\User', 3, 'token', '32f9b72d82799bae719e7ec4f691f8fda6b462567ad5e479f89c700b1f444a19', '[\"*\"]', '2025-09-11 02:51:45', NULL, '2025-08-18 03:37:48', '2025-09-11 02:51:45'),
(8, 'App\\Models\\User', 3, 'token', 'b20ae5f49a8c69b83b6984599351402252d9c578123c9efee4c38f3a237b0f9b', '[\"*\"]', NULL, NULL, '2025-08-24 20:38:02', '2025-08-24 20:38:02'),
(9, 'App\\Models\\User', 1, 'token', '013670c63c31675447eebd0c866b08be5946bf99edcdbe2d7f2b897521ba1a2d', '[\"*\"]', NULL, NULL, '2025-08-27 08:22:22', '2025-08-27 08:22:22'),
(10, 'App\\Models\\User', 1, 'token', '51d0d303e13ecd59df99640120bf667ed76dbc25442feb469b233b76b42df944', '[\"*\"]', '2025-09-11 02:56:39', NULL, '2025-08-27 08:22:23', '2025-09-11 02:56:39'),
(11, 'App\\Models\\User', 2, 'token', '720c2ecf48c125274d128b21c1681f517e7d4f918b597beebe00c9da4f193cf1', '[\"*\"]', '2025-09-04 09:11:56', NULL, '2025-09-04 09:03:03', '2025-09-04 09:11:56');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `price` double NOT NULL,
  `compare_price` double DEFAULT NULL,
  `description` text DEFAULT NULL,
  `short_description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `brand_id` bigint(20) UNSIGNED DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `sku` varchar(255) NOT NULL,
  `barcode` varchar(255) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `is_featured` enum('yes','no') NOT NULL DEFAULT 'no',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`id`, `title`, `price`, `compare_price`, `description`, `short_description`, `image`, `category_id`, `brand_id`, `quantity`, `sku`, `barcode`, `status`, `is_featured`, `created_at`, `updated_at`) VALUES
(1, 'Jumpsuits', 57, 917, '<p>Rompers Comfy Beach Vacation Trendy Overalls Jumpers Fashion Clothes 2025</p>', 'Fashion Clothes', '1-1753588303.jpg', 3, 7, 70, '450', '234', 1, 'yes', '2025-07-25 06:58:48', '2025-08-07 02:05:07'),
(2, 'Trendy Queen Womens', 930, NULL, '<p>Fashion Workout Plus Size Tops Short Sleeve Beach Vacation Gym Clothes 2025</p>', 'Fashion Workout', '2-1754710082.jpg', 2, 2, 16, '344', '324', 1, 'yes', '2025-07-25 07:31:00', '2025-08-08 20:28:14'),
(3, 'Hanes Men\'s EcoSmart Fleece', 741, 490, '<p>Tempora fugiat, magn.&nbsp;Est qui iusto eiusmo</p>', NULL, '3-1753454719.jpg', 2, 3, 949, '809', '177', 1, 'yes', '2025-07-25 07:45:19', '2025-08-06 03:17:42'),
(4, 'Gin', 912, 283, NULL, 'Quia est sunt esse', '4-1754409392.jpg', 2, 9, 686, '558', '726', 1, 'yes', '2025-07-25 08:03:27', '2025-08-05 09:20:53'),
(6, 'Gildan', 927, 652, '<p>Irure fugiat unde qu. aa</p>', 'Iure fugit voluptat', '6-1754409438.jpg', 2, 5, 141, '789', '709', 1, 'yes', '2025-07-25 08:20:42', '2025-08-07 02:04:29'),
(7, 'Dri-Power', 973, 512, '<p>Moisture Wicking, Odor Protection, UPF 30+, Sizes S-4x</p>', 'Cotton Blend Short Sleeve Tees', '7-87031754406923.jpg', 3, 4, 557, '141', '333', 1, 'yes', '2025-08-05 08:15:23', '2025-08-06 03:18:02'),
(8, 'American Apparel', 203, 715, NULL, 'Enim veniam qui qui', '8-1754411182.jpg', 3, 6, 284, '400', '402', 1, 'yes', '2025-08-05 09:07:07', '2025-08-07 02:01:47'),
(9, 'Pure Champ', 516, 78, '<p>Reprehenderit molest.</p>', 'Facilis Nam aut ut d', '9-61881754473697.jpg', 1, 10, 403, '948', '366', 1, 'yes', '2025-08-06 02:48:02', '2025-08-06 03:02:35'),
(10, 'Gerber', 368, 210, NULL, 'Magni fugit numquam', '10-40501754557953.jpg', 1, 7, 841, '386', '225', 0, 'yes', '2025-08-07 02:12:33', '2025-08-07 02:13:42');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_images`
--

CREATE TABLE `product_images` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `image` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `product_images`
--

INSERT INTO `product_images` (`id`, `product_id`, `image`, `created_at`, `updated_at`) VALUES
(6, 3, '3-1753454719.jpg', '2025-07-25 07:45:20', '2025-07-25 07:45:20'),
(8, 1, '1-1753588303.jpg', '2025-07-26 20:51:43', '2025-07-26 20:51:43'),
(11, 2, '2-1753630544.jpg', '2025-07-27 08:35:46', '2025-07-27 08:35:46'),
(12, 7, '7-87031754406923.jpg', '2025-08-05 08:15:24', '2025-08-05 08:15:24'),
(13, 7, '7-51951754406924.jpg', '2025-08-05 08:15:25', '2025-08-05 08:15:25'),
(14, 7, '7-25101754406925.jpg', '2025-08-05 08:15:27', '2025-08-05 08:15:27'),
(15, 7, '7-65311754406927.jpg', '2025-08-05 08:15:28', '2025-08-05 08:15:28'),
(17, 4, '4-1754409392.jpg', '2025-08-05 08:56:34', '2025-08-05 08:56:34'),
(19, 6, '6-1754409438.jpg', '2025-08-05 08:57:19', '2025-08-05 08:57:19'),
(22, 8, '8-1754411182.jpg', '2025-08-05 09:26:23', '2025-08-05 09:26:23'),
(26, 9, '9-61881754473697.jpg', '2025-08-06 02:48:17', '2025-08-06 02:48:17'),
(27, 9, '9-89461754473697.jpg', '2025-08-06 02:48:17', '2025-08-06 02:48:17'),
(28, 9, '9-79191754473697.jpg', '2025-08-06 02:48:17', '2025-08-06 02:48:17'),
(29, 9, '9-68491754473697.jpg', '2025-08-06 02:48:17', '2025-08-06 02:48:17'),
(30, 10, '10-40501754557953.jpg', '2025-08-07 02:12:34', '2025-08-07 02:12:34'),
(31, 10, '10-16401754557954.jpg', '2025-08-07 02:12:34', '2025-08-07 02:12:34'),
(32, 10, '10-89321754557954.jpg', '2025-08-07 02:12:35', '2025-08-07 02:12:35'),
(33, 10, '10-39191754557955.jpg', '2025-08-07 02:12:36', '2025-08-07 02:12:36'),
(34, 1, '1-1754709988.jpg', '2025-08-08 20:26:30', '2025-08-08 20:26:30'),
(35, 1, '1-1754709995.jpg', '2025-08-08 20:26:35', '2025-08-08 20:26:35'),
(36, 1, '1-1754710000.jpg', '2025-08-08 20:26:41', '2025-08-08 20:26:41'),
(37, 2, '2-1754710082.jpg', '2025-08-08 20:28:03', '2025-08-08 20:28:03'),
(38, 2, '2-1754710087.jpg', '2025-08-08 20:28:07', '2025-08-08 20:28:07'),
(39, 2, '2-1754710091.jpg', '2025-08-08 20:28:12', '2025-08-08 20:28:12'),
(40, 3, '3-1754710223.jpg', '2025-08-08 20:30:23', '2025-08-08 20:30:23'),
(41, 3, '3-1754710227.jpg', '2025-08-08 20:30:28', '2025-08-08 20:30:28'),
(42, 3, '3-1754710231.jpg', '2025-08-08 20:30:32', '2025-08-08 20:30:32'),
(43, 4, '4-1754710465.jpg', '2025-08-08 20:34:25', '2025-08-08 20:34:25'),
(44, 4, '4-1754710469.jpg', '2025-08-08 20:34:30', '2025-08-08 20:34:30'),
(45, 4, '4-1754710473.jpg', '2025-08-08 20:34:34', '2025-08-08 20:34:34');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_sizes`
--

CREATE TABLE `product_sizes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `size_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `product_sizes`
--

INSERT INTO `product_sizes` (`id`, `product_id`, `size_id`, `created_at`, `updated_at`) VALUES
(38, 9, 1, '2025-08-06 03:02:35', '2025-08-06 03:02:35'),
(39, 9, 2, '2025-08-06 03:02:35', '2025-08-06 03:02:35'),
(40, 9, 3, '2025-08-06 03:02:35', '2025-08-06 03:02:35'),
(41, 7, 2, '2025-08-06 03:18:02', '2025-08-06 03:18:02'),
(45, 10, 1, '2025-08-07 02:13:42', '2025-08-07 02:13:42'),
(46, 10, 2, '2025-08-07 02:13:42', '2025-08-07 02:13:42'),
(47, 10, 4, '2025-08-07 02:13:42', '2025-08-07 02:13:42'),
(48, 4, 1, '2025-08-08 20:34:35', '2025-08-08 20:34:35'),
(49, 4, 2, '2025-08-08 20:34:35', '2025-08-08 20:34:35'),
(50, 4, 3, '2025-08-08 20:34:35', '2025-08-08 20:34:35'),
(51, 4, 4, '2025-08-08 20:34:35', '2025-08-08 20:34:35'),
(52, 1, 1, '2025-08-10 08:45:06', '2025-08-10 08:45:06'),
(53, 1, 2, '2025-08-10 08:45:06', '2025-08-10 08:45:06'),
(54, 1, 3, '2025-08-10 08:45:06', '2025-08-10 08:45:06'),
(55, 1, 4, '2025-08-10 08:45:06', '2025-08-10 08:45:06');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('QQXYx58TbmykgOjU60K8Q8QOOWAkpyXFciZ3Adop', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoidld5QmlGaWduRnlvV1BoQVBNbDZMOVVDUnV6dGlVdkdJaDNZMk41VyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1754452290),
('uLXL1vODx3X6BxvCGJ1V524ZA9cGsN5y44yPk0EW', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoidkdNN3RaUlBURGxDQ2FPYmZRdlMyYlJiZHhkSll5Y3prQjdTZUN1NCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1754404057);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `shipping_charges`
--

CREATE TABLE `shipping_charges` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `shipping_charge` double NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `shipping_charges`
--

INSERT INTO `shipping_charges` (`id`, `shipping_charge`, `created_at`, `updated_at`) VALUES
(1, 15, NULL, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sizes`
--

CREATE TABLE `sizes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `sizes`
--

INSERT INTO `sizes` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'S', '2025-07-25 06:48:50', '2025-07-25 06:48:50'),
(2, 'M', '2025-07-25 06:49:08', '2025-07-25 06:49:08'),
(3, 'L', '2025-07-25 07:49:36', '2025-07-25 07:49:36'),
(4, 'XL', '2025-07-25 08:50:53', '2025-07-25 08:50:53');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `temp_images`
--

CREATE TABLE `temp_images` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `temp_images`
--

INSERT INTO `temp_images` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, '1753451921.jpg', '2025-07-25 06:58:41', '2025-07-25 06:58:41'),
(2, '1753451925.jpg', '2025-07-25 06:58:45', '2025-07-25 06:58:45'),
(3, '1753453843.jpg', '2025-07-25 07:30:43', '2025-07-25 07:30:43'),
(4, '1753453850.jpg', '2025-07-25 07:30:50', '2025-07-25 07:30:50'),
(5, '1753453857.jpg', '2025-07-25 07:30:57', '2025-07-25 07:30:57'),
(6, '1753454510.jpg', '2025-07-25 07:41:50', '2025-07-25 07:41:50'),
(7, '1753454716.jpg', '2025-07-25 07:45:16', '2025-07-25 07:45:16'),
(8, '1753456519.jpg', '2025-07-25 08:15:19', '2025-07-25 08:15:19'),
(9, '1753458129.jpg', '2025-07-25 08:42:09', '2025-07-25 08:42:09'),
(10, '1753458162.jpg', '2025-07-25 08:42:42', '2025-07-25 08:42:42'),
(11, '1753458207.jpg', '2025-07-25 08:43:27', '2025-07-25 08:43:27'),
(12, '1753458361.jpg', '2025-07-25 08:46:01', '2025-07-25 08:46:01'),
(13, '1753458764.jpg', '2025-07-25 08:52:44', '2025-07-25 08:52:44'),
(14, '1753458849.jpg', '2025-07-25 08:54:09', '2025-07-25 08:54:09'),
(15, '1753459031.jpg', '2025-07-25 08:57:11', '2025-07-25 08:57:11'),
(16, '1753459498.jpg', '2025-07-25 09:04:58', '2025-07-25 09:04:58'),
(17, '1753541002.jpg', '2025-07-26 07:43:22', '2025-07-26 07:43:22'),
(18, '1753586790.jpg', '2025-07-26 20:26:30', '2025-07-26 20:26:30'),
(19, '1754406896.jpg', '2025-08-05 08:14:56', '2025-08-05 08:14:56'),
(20, '1754406905.jpg', '2025-08-05 08:15:05', '2025-08-05 08:15:05'),
(21, '1754406910.jpg', '2025-08-05 08:15:10', '2025-08-05 08:15:10'),
(22, '1754406914.jpg', '2025-08-05 08:15:14', '2025-08-05 08:15:14'),
(23, '1754406920.jpg', '2025-08-05 08:15:20', '2025-08-05 08:15:20'),
(24, '1754410024.jpg', '2025-08-05 09:07:04', '2025-08-05 09:07:04'),
(25, '1754473547.png', '2025-08-06 02:45:47', '2025-08-06 02:45:47'),
(26, '1754473552.png', '2025-08-06 02:45:52', '2025-08-06 02:45:52'),
(27, '1754473562.png', '2025-08-06 02:46:02', '2025-08-06 02:46:02'),
(28, '1754473669.jpg', '2025-08-06 02:47:49', '2025-08-06 02:47:49'),
(29, '1754473673.jpg', '2025-08-06 02:47:53', '2025-08-06 02:47:53'),
(30, '1754473677.jpg', '2025-08-06 02:47:57', '2025-08-06 02:47:57'),
(31, '1754473680.jpg', '2025-08-06 02:48:00', '2025-08-06 02:48:00'),
(32, '1754557935.jpg', '2025-08-07 02:12:15', '2025-08-07 02:12:15'),
(33, '1754557942.jpg', '2025-08-07 02:12:22', '2025-08-07 02:12:22'),
(34, '1754557946.jpg', '2025-08-07 02:12:26', '2025-08-07 02:12:26'),
(35, '1754557951.jpg', '2025-08-07 02:12:31', '2025-08-07 02:12:31');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `zip` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `role` enum('customer','admin') NOT NULL DEFAULT 'customer',
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `address`, `city`, `state`, `zip`, `mobile`, `role`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'admin@gmail.com', NULL, NULL, NULL, NULL, NULL, 'admin', '2025-07-25 03:38:21', '$2y$12$hXu790iPDrN6fnr.6M2g9OTFBk15xAS4Myxye4L6bNw5/9qhee1y.', 'LDzISTiGuT', '2025-07-25 03:38:22', '2025-07-25 03:38:22'),
(2, 'user', 'user@gmail.com', NULL, NULL, NULL, NULL, NULL, 'customer', NULL, '$2y$12$WeRcTTcAfTAyaBBfNV5JROj0FL4yYZiLHDmnEnrOdKVuYFh/tHD/u', NULL, '2025-08-15 21:21:44', '2025-08-15 21:21:44'),
(3, 'Daphne Keith', 'sunabyhep@mailinator.com', 'Voluptatem dolorem i', 'Iure dolor officia a', 'Et minima esse atqu', '32252', '+1 (587) 601-2698', 'customer', NULL, '$2y$12$pkdOb5CRzItMCINUV.XAm.Gct35RUEYq6bYGiLR5IEd2oRt1aFGxa', NULL, '2025-08-17 09:08:21', '2025-09-06 01:48:14');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Chỉ mục cho bảng `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Chỉ mục cho bảng `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Chỉ mục cho bảng `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orders_user_id_foreign` (`user_id`);

--
-- Chỉ mục cho bảng `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_items_order_id_foreign` (`order_id`),
  ADD KEY `order_items_product_id_foreign` (`product_id`);

--
-- Chỉ mục cho bảng `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Chỉ mục cho bảng `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_category_id_foreign` (`category_id`),
  ADD KEY `products_brand_id_foreign` (`brand_id`);

--
-- Chỉ mục cho bảng `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_images_product_id_foreign` (`product_id`);

--
-- Chỉ mục cho bảng `product_sizes`
--
ALTER TABLE `product_sizes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_sizes_product_id_foreign` (`product_id`),
  ADD KEY `product_sizes_size_id_foreign` (`size_id`);

--
-- Chỉ mục cho bảng `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Chỉ mục cho bảng `shipping_charges`
--
ALTER TABLE `shipping_charges`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `sizes`
--
ALTER TABLE `sizes`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `temp_images`
--
ALTER TABLE `temp_images`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `brands`
--
ALTER TABLE `brands`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT cho bảng `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT cho bảng `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `product_images`
--
ALTER TABLE `product_images`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT cho bảng `product_sizes`
--
ALTER TABLE `product_sizes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT cho bảng `shipping_charges`
--
ALTER TABLE `shipping_charges`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `sizes`
--
ALTER TABLE `sizes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `temp_images`
--
ALTER TABLE `temp_images`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_brand_id_foreign` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `product_images_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `product_sizes`
--
ALTER TABLE `product_sizes`
  ADD CONSTRAINT `product_sizes_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_sizes_size_id_foreign` FOREIGN KEY (`size_id`) REFERENCES `sizes` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
