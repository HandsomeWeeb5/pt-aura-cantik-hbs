-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 13, 2022 at 07:57 AM
-- Server version: 10.6.7-MariaDB
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_gudang_aura_cantik`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `hapusBarang` (IN `idTarget` INT(11))  BEGIN
    /* ---- ERROR HANDLING ---- */
    DECLARE sql_error TINYINT DEFAULT FALSE;
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
    SET sql_error = TRUE;
	
    START TRANSACTION;
    DELETE tb_barang, tb_dokumen FROM `tb_barang` INNER JOIN `tb_dokumen` ON (tb_barang.id_dokumen = tb_dokumen.id_dokumen) WHERE id_barang = idTarget;
    
    IF sql_error = FALSE THEN
        COMMIT;
        SELECT `Penambahan data sukses`;
    ELSE
        ROLLBACK;
        SELECT `Penambahan data Gagal, kesalahan query atau memasukkan data tidak benar`;
        SHOW ERRORS;
    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `resetAutoIncrementAfterEmpty` ()  BEGIN
	ALTER TABLE tb_barang AUTO_INCREMENT = 0;
    ALTER TABLE tb_dokumen AUTO_INCREMENT = 0;
    ALTER TABLE tb_status_laporan AUTO_INCREMENT = 0;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `tambahkanBarang` (IN `namaBarang` VARCHAR(200), IN `nomorDokumen` VARCHAR(50), IN `nomorJenisBarang` INT(6), IN `merekBarang` VARCHAR(50), IN `hargaPerUnit` DECIMAL(10,2), IN `vendorItem` VARCHAR(80), IN `hsCode` VARCHAR(120), IN `barcodeBarang` VARCHAR(120), IN `gambarBarang` VARCHAR(255))  BEGIN
    /* ---- ERROR HANDLING ---- */
    DECLARE sql_error TINYINT DEFAULT FALSE;
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
    SET sql_error = TRUE;
    
    /*SELECT @tambah_no_dokumen := nomorDokumen;*/
    /*SELECT no_dokumen_bc INTO @current_no_dokumen FROM `tb_dokumen` WHERE no_dokumen_bc = nomorDokumen;*/

    /* SELECT no_dokumen_bc INTO current_no_dokumen FROM `tb_dokumen`; */
    START TRANSACTION;
    
    /*INSERT INTO `tb_dokumen` (
        no_dokumen_bc, tgl_pemasukan
    ) SELECT * FROM (
        SELECT nomorDokumen, CURRENT_DATE()) AS tmp WHERE NOT EXISTS (
        SELECT no_dokumen_bc FROM `tb_dokumen` WHERE no_dokumen_bc = nomorDokumen) LIMIT 1; */
    
    INSERT IGNORE INTO `tb_dokumen` (
    	no_dokumen_bc, tgl_pemasukan
    ) VALUES (
        nomorDokumen, CURRENT_DATE());
        
    INSERT INTO `tb_barang` (
        deskripsi_brg,
        id_dokumen,
        id_jenis_brg,
        waktu,
        merek_brg,
        harga_per_unit,
        vendor_item,
        hs_code,
        barcode_brg,
        img_barang
    ) VALUES (
        namaBarang,
        LAST_INSERT_ID(),
        nomorJenisBarang,
        CURRENT_TIME(),
        merekBarang,
        hargaPerUnit,
        vendorItem,
        hsCode,
        barcodeBarang,
        gambarBarang
    );

    IF sql_error = FALSE THEN
        COMMIT;
        SELECT `Penambahan data sukses`;
    ELSE
        ROLLBACK;
        SELECT `Penambahan data Gagal, sesuatu kesalahan query, salah function atau memasukkan data tidak benar`;
        SHOW ERRORS;
    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ubahBarang` (IN `idTarget` INT(11), IN `u_namaBarang` VARCHAR(200), IN `u_nomorDokumen` INT(6) ZEROFILL, IN `u_nomorJenisBarang` INT(6), IN `u_merekBarang` VARCHAR(50), IN `u_hargaPerUnit` DECIMAL(10,2), IN `u_vendorItem` VARCHAR(80), IN `u_hsCode` VARCHAR(120), IN `u_barcodeBarang` VARCHAR(120))  BEGIN
    /* ---- ERROR HANDLING ---- */
    DECLARE sql_error TINYINT DEFAULT FALSE;
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
    SET sql_error = TRUE;
    
    START TRANSACTION;
    UPDATE `tb_barang` AS b JOIN `tb_dokumen` AS d ON b.id_dokumen = d.id_dokumen 
    SET
    	b.deskripsi_brg = u_namaBarang,
    	d.no_dokumen_bc = u_nomorDokumen,
    	b.id_jenis_brg = u_nomorJenisBarang,
    	b.merek_brg = u_merekBarang,
    	b.harga_per_unit = u_hargaPerUnit,
    	b.vendor_item = u_vendorItem,
    	b.hs_code = u_hsCode,
    	b.barcode_brg = u_barcodeBarang
    WHERE b.id_barang = idTarget;

    IF sql_error = FALSE THEN
        COMMIT;
        SELECT `Penambahan data sukses`;
    ELSE
        ROLLBACK;
        SELECT `Penambahan data Gagal, kesalahan query atau memasukkan data tidak benar`;
        SHOW ERRORS;
    END IF;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `tb_barang`
--

CREATE TABLE `tb_barang` (
  `id_barang` int(11) NOT NULL,
  `deskripsi_brg` varchar(200) NOT NULL,
  `id_dokumen` int(11) NOT NULL,
  `id_jenis_brg` int(11) NOT NULL,
  `waktu` time NOT NULL,
  `merek_brg` varchar(50) NOT NULL,
  `harga_per_unit` decimal(10,2) DEFAULT NULL,
  `vendor_item` varchar(80) DEFAULT NULL,
  `hs_code` varchar(120) DEFAULT NULL,
  `barcode_brg` varchar(120) DEFAULT NULL,
  `img_barang` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tb_barang`
--

INSERT INTO `tb_barang` (`id_barang`, `deskripsi_brg`, `id_dokumen`, `id_jenis_brg`, `waktu`, `merek_brg`, `harga_per_unit`, `vendor_item`, `hs_code`, `barcode_brg`, `img_barang`) VALUES
(1, 'Produk Kosmetik Master ', 1, 1, '20:49:58', 'Master', '123.45', 'MASTER001', '71178199', '723113212023', ''),
(2, 'Produk Perhiasan Master', 2, 2, '20:51:30', 'Master', '123.45', 'MASTER002', '71180001', '231442141624', ''),
(3, 'Produk Jam Tangan Master', 3, 3, '20:57:35', 'Master', '123.45', 'MASTER003', '71178090', '2326669000', ''),
(4, 'Produk Fashion Master', 4, 4, '20:57:35', 'Master', '123.45', 'MASTER004', '71173025', '7832112421', ''),
(5, 'Biore Washing Gel Blaster', 5, 4, '21:07:50', 'Biore', '123.45', 'BIORE123', '71172000', '7832112421', ''),
(6, 'Seiko Watches Red Black Gothic Kurumi Tokisaki', 6, 3, '21:07:50', 'Seiko', '123.45', 'SEIKO001', '71170098', '3142353890', ''),
(7, 'Seiko Watches Magenta White Silver Yurippe', 7, 3, '21:07:50', 'Seiko', '123.45', 'SEIKO002', '71170098', '7832414124', ''),
(8, 'Seiko Watches Platinum Orange Kiana Kaslana', 8, 3, '21:07:50', 'Seiko', '123.45', 'SEIKO123', '71173025', '7834388888', ''),
(9, 'Polo Shirt Black Cardinal Crow', 9, 4, '21:07:50', 'Polo', '123.45', 'POLO001', '71177000', '7832112421', ''),
(10, 'Levis Jacket Jeans Johnny Depp', 10, 4, '21:07:51', 'Levis', '123.45', 'LEVIS001', '71170002', '78321255555', ''),
(11, 'Uniqlo Tank Top Airism Carl Johnson', 11, 4, '21:07:51', 'Uniqlo', '123.45', 'UNIQLO001', '71171050', '78321266645', ''),
(12, 'Rexona Deodorant', 17, 1, '09:29:14', 'Rexona', '68.99', 'REXONA123', '71180090', '54534100908000', '1657592954433-img_barang'),
(13, 'Rexona Deodorant', 18, 1, '09:29:14', 'Rexona', '68.99', 'REXONA123', '71180090', '54534100908000', '1657592954585-img_barang'),
(20, 'Swarovski Octea Lux Chrono Green Leather Strap', 27, 3, '15:06:10', 'Swarovski', '223.80', 'SWAROV123', '71178900', '23214998989898', '1657613170923-img_barang.jpg'),
(21, 'Swarovski Necklace 5636512', 28, 2, '15:24:01', 'Swarovski', '310.04', 'SWAROV456', '71172300', '45830483984938', '1657614240984-img_barang.jpg'),
(22, 'Swarovski Crystal Pendant Catarina Blue Purple', 29, 1, '21:51:19', 'Swarovski', '230.69', 'SWAROV2357', '71173400', '768549162459', '1657637479678-img_barang.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `tb_dokumen`
--

CREATE TABLE `tb_dokumen` (
  `id_dokumen` int(11) NOT NULL,
  `no_dokumen_bc` varchar(50) NOT NULL,
  `tgl_pemasukan` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tb_dokumen`
--

INSERT INTO `tb_dokumen` (`id_dokumen`, `no_dokumen_bc`, `tgl_pemasukan`) VALUES
(1, '000000', '2022-07-02'),
(2, '000000', '2022-07-02'),
(3, '000000', '2022-07-02'),
(4, '000000', '2022-07-02'),
(5, '000001', '2022-07-02'),
(6, '000001', '2022-07-02'),
(7, '000001', '2022-07-02'),
(8, '000002', '2022-07-02'),
(9, '000002', '2022-07-02'),
(10, '000002', '2022-07-02'),
(11, '000003', '2022-07-02'),
(17, '000004', '2022-07-12'),
(18, '000004', '2022-07-12'),
(27, '000004', '2022-07-12'),
(28, '000004', '2022-07-12'),
(29, '000004', '2022-07-12');

-- --------------------------------------------------------

--
-- Table structure for table `tb_histori_laporan`
--

CREATE TABLE `tb_histori_laporan` (
  `id_laporan` int(11) NOT NULL,
  `tgl_laporan` date NOT NULL,
  `id_status_laporan` int(11) NOT NULL,
  `data_histori` varchar(255) NOT NULL,
  `pdf_file` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tb_jenis_barang`
--

CREATE TABLE `tb_jenis_barang` (
  `id_jenis_brg` int(11) NOT NULL,
  `jenis_barang` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tb_jenis_barang`
--

INSERT INTO `tb_jenis_barang` (`id_jenis_brg`, `jenis_barang`) VALUES
(1, 'Kosmetik'),
(2, 'Perhiasan'),
(3, 'Jam Tangan'),
(4, 'Fashion');

-- --------------------------------------------------------

--
-- Table structure for table `tb_status_laporan`
--

CREATE TABLE `tb_status_laporan` (
  `id_status_laporan` int(11) NOT NULL,
  `status_laporan` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tb_status_laporan`
--

INSERT INTO `tb_status_laporan` (`id_status_laporan`, `status_laporan`) VALUES
(1, 'pemasukan'),
(2, 'pengeluaran'),
(3, 'penarikan');

-- --------------------------------------------------------

--
-- Table structure for table `tb_users`
--

CREATE TABLE `tb_users` (
  `id_user` int(11) NOT NULL,
  `username` varchar(180) NOT NULL,
  `password` varchar(180) NOT NULL,
  `email` varchar(200) NOT NULL,
  `fullname` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tb_users`
--

INSERT INTO `tb_users` (`id_user`, `username`, `password`, `email`, `fullname`) VALUES
(4, 'Farhan1', '$2a$10$yQpUQmmg116wFndy9oYQhe8DvCC.WQe7YL/Z026HAH12vbTp.T6CS', 'farhan1@example.com', 'Farhan Satu');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_barang`
--
ALTER TABLE `tb_barang`
  ADD PRIMARY KEY (`id_barang`),
  ADD UNIQUE KEY `fk_dokumen` (`id_dokumen`),
  ADD KEY `fk_jenis_barang` (`id_jenis_brg`);

--
-- Indexes for table `tb_dokumen`
--
ALTER TABLE `tb_dokumen`
  ADD PRIMARY KEY (`id_dokumen`);

--
-- Indexes for table `tb_histori_laporan`
--
ALTER TABLE `tb_histori_laporan`
  ADD PRIMARY KEY (`id_laporan`),
  ADD KEY `fk_status_laporan` (`id_status_laporan`);

--
-- Indexes for table `tb_jenis_barang`
--
ALTER TABLE `tb_jenis_barang`
  ADD PRIMARY KEY (`id_jenis_brg`);

--
-- Indexes for table `tb_status_laporan`
--
ALTER TABLE `tb_status_laporan`
  ADD PRIMARY KEY (`id_status_laporan`);

--
-- Indexes for table `tb_users`
--
ALTER TABLE `tb_users`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_barang`
--
ALTER TABLE `tb_barang`
  MODIFY `id_barang` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `tb_dokumen`
--
ALTER TABLE `tb_dokumen`
  MODIFY `id_dokumen` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `tb_histori_laporan`
--
ALTER TABLE `tb_histori_laporan`
  MODIFY `id_laporan` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_jenis_barang`
--
ALTER TABLE `tb_jenis_barang`
  MODIFY `id_jenis_brg` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tb_status_laporan`
--
ALTER TABLE `tb_status_laporan`
  MODIFY `id_status_laporan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tb_users`
--
ALTER TABLE `tb_users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tb_barang`
--
ALTER TABLE `tb_barang`
  ADD CONSTRAINT `fk_dokumen` FOREIGN KEY (`id_dokumen`) REFERENCES `tb_dokumen` (`id_dokumen`),
  ADD CONSTRAINT `fk_jenis_barang` FOREIGN KEY (`id_jenis_brg`) REFERENCES `tb_jenis_barang` (`id_jenis_brg`);

--
-- Constraints for table `tb_histori_laporan`
--
ALTER TABLE `tb_histori_laporan`
  ADD CONSTRAINT `fk_status_laporan` FOREIGN KEY (`id_status_laporan`) REFERENCES `tb_status_laporan` (`id_status_laporan`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
