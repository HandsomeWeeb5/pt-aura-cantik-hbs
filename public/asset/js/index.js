

$(function(){

    //* ========== SEARCH BAR ===========
    /*
    $("#search-button").on("click", function(){
        var value = $("#cari_deskripsi_brg").val().toLowerCase();
        $("#tb_pemasukan tbody tr").filter(function(){
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > - 1);
        });
    });
   */ 
    //* ========== Search Bar End ==========

    //* ========== PREVIEW IMAGE BEFORE UPLOAD ========
    $('#input_imgfile').on("change", () => {
        var file = $('#input_imgfile')[0].files[0];

        if(file){
            const fileReader = new FileReader();

            $(".image-wrapper").css("display", "none");
            $("#image-uploaded").css("display", "block");

            fileReader.addEventListener("load", function(){
                console.log(this);
                $("#image-uploaded").attr("src", this.result);
            })

            fileReader.readAsDataURL(file);
        }
    });
    //* ========== PREVIEW IMAGE BEFORE UPLOAD ======== 

    //* ========== RESET FORM BUTTON ================
    $('#pemasukan_reset').on('click', function(){
        $("#image-uploaded").css("display", "none");
        $(".image-wrapper").css("display", "flex");
    }); 
    //* ========== Reset Form Button End ==============

    //* ========== GET DATA FROM SELECTED ROW =========
    let dataPlace = [];
    let count = 0;
    
    function dataBarang(
        id_barang //id_barang,
        // deskripsi_brg,
        // tgl_pemasukan,
        // jenis_barang,
        // waktu,
        // merek_barang,
        // no_dokumen_bc,
        // harga_per_unit,
        // vendor_item,
        // hs_code,
        // barcode_barang
    ){
        this.id_barang = id_barang;
        // this.deskripsi_brg = deskripsi_brg;
        // this.tgl_pemasukan = tgl_pemasukan;
        // this.jenis_barang = jenis_barang;
        // this.waktu = waktu;
        // this.merek_barang = merek_barang;
        // this.no_dokumen_bc = no_dokumen_bc;
        // this.harga_per_unit = harga_per_unit;
        // this.vendor_item = vendor_item;
        // this.hs_code = hs_code;
        // this.barcode_barang = barcode_barang;
    };

    $('input[id^="select-item"]').on('click', function(){
        //let checkbox_id = this.id;
        let table_row = $(this).closest('tr');
        //$(this).closest('tr').toggleClass('bg-primary').toggleClass('text-light');
        // console.log(table_row);
        $(table_row).toggleClass('bg-primary').toggleClass('text-light');
        
        let tr_idBarang_pmk = $(this).parent("td").attr("id");
        // let tr_deskripsiBrg_pmk = $(table_row).find("#deskripsi_brg_pm").text();
        // let tr_tglPemasukan_pmk = $(table_row).find("#tgl_pemasukan_pm").text();
        // let tr_jenisBarang_pmk = $(table_row).find("#jenis_barang_pm").text();
        // let tr_waktu_pmk = $(table_row).find("#waktu_pm").text();
        // let tr_merekBarang_pmk = $(table_row).find("#merek_brg_pm").text();
        // let tr_noDokumenBC_pmk = $(table_row).find("#no_dokumen_bc_pm").text();
        // let tr_hargaPerUnit_pmk = $(table_row).find("#harga_per_unit_pm").text();
        // let tr_vendorItem_pmk = $(table_row).find("#vendor_item_pm").text();
        // let tr_hsCode_pmk = $(table_row).find("#hs_code_pm").text();
        // let tr_barcodeBarang_pmk = $(table_row).find("#barcode_brg_pm").text();
        
        let dataBarangPerRows = new dataBarang(
            tr_idBarang_pmk
            // tr_deskripsiBrg_pmk,
            // tr_tglPemasukan_pmk,
            // tr_jenisBarang_pmk,
            // tr_waktu_pmk,
            // tr_merekBarang_pmk,
            // tr_noDokumenBC_pmk,
            // tr_hargaPerUnit_pmk,
            // tr_vendorItem_pmk,
            // tr_hsCode_pmk,
            // tr_barcodeBarang_pmk
        );
    
        if($(this).is(':checked')){
            dataPlace.push(dataBarangPerRows);
            let totalSelected = count += 1;
            $("#hapus-btn").html(`Hapus Barang <span class="store-data-length"> (${totalSelected})</span>`);
        } else {
            let totalSelected = count -= 1;
            //let selectedIndex = dataPlace.indexOf(this);
            dataPlace = $.grep(dataPlace, function(obj){ 
                return obj.id_barang !== tr_idBarang_pmk; 
            });
            //dataPlace.splice(selectedIndex, 1);
            $("#hapus-btn").html(`Hapus Barang <span class="store-data-length"> (${totalSelected})</span>`);
        };
    
        console.log(dataPlace);
        return dataPlace;
    })
    //* ============ Get Data From Selected Row end =========
    
    //* ========== DELETE SELECTED ROW TABLE =========
    $("#hapus-btn").on("click", function(ev){ 
        let id_barang = dataPlace.map((data) => data.id_barang);
        console.log(id_barang);
        // cth: id_barang = ["23", "24"];
        //* let dataObj = {...dataPlace}; <= Success
        // console.log(dataObj);
        //* let newObj = {}; <= Success
        //* let dataArr = []; <= Success
        //* for (let [i] of Object.keys(dataObj)) { <= Success
        //*     newObj.id_barang = dataObj[i].id_barang; <= Success
        //*     dataArr.push(newObj); <= Success
        //* }; <= Success
        //* console.log(dataArr); <= Success
        
        let text = "Apakah Kamu Yakin menghapus beberapa Data Barang tersebut?";
        
        if(confirm(text) === true){
            $.ajax({
                type: "POST",
                url: "/delete",
                data: { 
                    dataArr: id_barang 
                },
                async: true,
                success: function(data){
                    Toastify({
                        text: "Penghapusan data Sukses! Data Terpilih" + id_barang.length,
                        duration: 3000,
                        close: true,
                        gravity: top,
                        style: {
                            background: "linear-gradient(to right, #00b09b, #96c93d)"
                        }
                    }).showToast();
                },
                error: function(exception){
                    Toastify({
                        text: "Penghapusan data Gagal, Error dari Server: " + exception,
                        duration: 3000,
                        close: true,
                        gravity: top,
                        style: {
                            background: "linear-gradient(to right, #e01f19, #c48b54)"
                        }
                    }).showToast();
                }
            });
            $('input[id*="select-item"]').prop('checked', false);
            setTimeout(function(){
              location.reload();
            }, 5000);
        };
        
    });
    //* ========== Delete Selected Row Table End =========
    
    //* ========== SENT DATA SELECTED ROW TO CART ============
    $("#kirim-btn").on("click", function(ev){
        let id_keranjang = dataPlace.map((data) => data.id_barang);

        let text = "Apakah Kamu Yakin mengirim beberapa Data Barang tersebut?";

        if(confirm(text) === true){
            $.ajax({
                type: "POST",
                url: "/send",
                data: { 
                    dataArr: id_keranjang 
                },
                async: true,
                success: function(data){
                    Toastify({
                        text: "Keranjang data Barang Sudah Siap! Data Terpilih: " + id_barang.length,
                        duration: 3000,
                        close: true,
                        gravity: top,
                        style: {
                            background: "linear-gradient(to right, #00b09b, #96c93d)"
                        }
                    }).showToast();
                },
                error: function(exception){
                    Toastify({
                        text: "Pengiriman data Gagal, Error dari Server: " + exception,
                        duration: 3000,
                        close: true,
                        gravity: top,
                        style: {
                            background: "linear-gradient(to right, #e01f19, #c48b54)"
                        }
                    }).showToast();
                }
            });
        };
    });
    //* ======= Sent Data Selected Row to Cart End =======

    $('button[id^="delete_data"]').on("click", function(){
        let text = "Apakah Kamu Yakin menghapus beberapa Data Barang tersebut?";

        let idBarang = $("tr td").first().attr("id");
        let id = parseInt(idBarang, 10);

        if(confirm(text) === true){
            $.ajax({
                type: "DELETE",
                url: `/del/${id}`,
                processData: false,
                contentType: false,
                // dataType: 'application/json; charset=utf-8',
                success: function(data){
                    alert(data);
                },
                error: function(exception){
                    console.error("Error Terdeteksi: " + exception);
                }
            });
        };
    });

    $("form.add-item").validate({
        errorClass: "denied-alert",
        rules:{
            deskripsi_brg: {
                required: true,
                minlength: 5
            },
            jenis_barang: {
                required: true
            },
            merek_brg: {
                required: true
            },
            no_dokumen_bc: {
                required: true,
                rangelength: [6, 6],
                number: true                
            },
            harga_per_unit: {
                required: true
            },
            vendor_item: {
                required: true
            },
            hs_code: {
                required: true,
                number: true,
                rangelength: [8, 8]
            },
            barcode_brg: {
                required: true,
                number: true,
                rangelength: [12, 12]
            }
        },
        messages: {
            deskripsi_brg: {
                required: "Deskripsi Barang harus diisi!!",
                minlength: "Harus diisi sampai min. 5 Karakter!!"
            },
            jenis_barang: {
                required: "Jenis Barang harus dipilih!!"
            },
            merek_brg: {
                required: "Merek Barang harus diisi!!"
            },
            no_dokumen_bc: {
                required: "No. Dokumen BC",
                rangelength: "Tulisan ini harus 6 Digit Angka!",
                number: "No. Dokumen harus angka, bukan huruf!!"
            },
            harga_per_unit: {
                required: "Harga per Unit harus diisi!"
            },
            vendor_item: {
                required: "Vendor Item Harus diisi!"
            },
            hs_code: {
                required: "HS Code harus diisi!",
                number: "HS Code harus diisi Angka Saja!",
                rangelength: "Wajib diisi 8 Angka Digit!"
            },
            barcode_brg: {
                required: "Barcode harus diisi!",
                number: "Barcode hanya diisi Angka saja!",
                rangelength: "Wajib diisi 12 Angka Digit!"
            }
        },
        submitHandler: function(a, ev){
            let formAddItemData = new FormData(this);

            $.ajax({
                type: "POST",
                url: "/create",
                data: formAddItemData,
                processData: false,
                contentType: false,
                success: function(data){
                    Toastify({
                        text: "Pembuatan data Sukses, result: ",
                        duration: 3000,
                        destination: "http://localhost:7000",
                        newWindow: true,
                        close: true,
                        gravity: top,
                        style: {
                            background: "linear-gradient(to right, #00b09b, #96c93d)"
                        }
                    }).showToast();
                }   
            })
            return false; // required to block normal submit since you used ajax
        }
    });

    /*
    TODO#########################################################
    TODO##########      Pengeluaran Barang    ###################
    TODO##########################################################
    */
    //* ========= SEARCH BAR KERANJANG ===================
    $("#search_bar_pgl").on("keyup", function(){
        var value = $(this).val().toLowerCase();
        $("#tb_keranjang tbody tr").filter(function(){
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > - 1);
        });
    });
    //* ========= Search Bar Keranjang End ===============

    let dataPlace_pengeluaran = [];
    let count_pengeluaran = 0;

    function dataKeranjang(
        id_keranjang,
        deskripsi_barang,
        tgl_pemasukan,
        jenis_barang,
        merek_barang,
        no_dokumen_bc,
        barcode_barang,
        harga_per_unit,
    ){
        this.id_keranjang = id_keranjang;
        this.deskripsi_barang = deskripsi_barang;
        this.tgl_pemasukan = tgl_pemasukan;
        this.jenis_barang = jenis_barang;
        this.merek_barang = merek_barang;
        this.no_dokumen_bc = no_dokumen_bc;
        this.harga_per_unit = harga_per_unit;
        this.barcode_barang = barcode_barang;
    };

    //* ========== SELECTED ROW TABLE KERANJANG ========-    
    $('input[id^="select-item-cart"]').on('click', function(){
        let table_row_pgl = $(this).closest('tr');

        $(table_row_pgl).toggleClass('bg-primary').toggleClass('text-light');

        let tr_idKeranjang = $(this).parent("td").attr("id");
        let tr_deskripsiBrg_pgl = $(table_row_pgl).find("#deskripsi_brg_pgl").text();
        let tr_tglPemasukan_pgl = $(table_row_pgl).find("#tgl_pemasukan_pgl").text();
        let tr_jenisBarang_pgl = $(table_row_pgl).find("#jenis_barang_pgl").text();
        let tr_merekBarang_pgl = $(table_row_pgl).find("#merek_barang_pgl").text();
        let tr_noDokumenBC_pgl = $(table_row_pgl).find("#no_dokumen_pgl").text();
        let tr_barcodeBarang_pgl = $(table_row_pgl).find("#barcode_brg_pgl").text();
        let tr_hargaPerUnit_pgl = $(table_row_pgl).find("#harga_per_unit_pgl").text();

        let dataKeranjangPerRows = new dataKeranjang(
            tr_idKeranjang,
            tr_deskripsiBrg_pgl,
            tr_tglPemasukan_pgl,
            tr_jenisBarang_pgl,
            tr_merekBarang_pgl,
            tr_noDokumenBC_pgl,
            tr_barcodeBarang_pgl,
            tr_hargaPerUnit_pgl
        );

        if($(this).is(':checked')){
            dataPlace_pengeluaran.push(dataKeranjangPerRows);

            let totalSelected_pgl = count_pengeluaran += 1;
            $("#delete-cart-items-btn").html(`Hapus Barang <span>(${totalSelected_pgl})</span>`);
            $("#add-lampiran-btn").html(`Tambah Item ke Lampiran <span>(${totalSelected_pgl})</span>`)
        } else {
            let totalSelected_pgl = count_pengeluaran -= 1;
            dataPlace_pengeluaran = $.grep(dataPlace_pengeluaran, function(obj){ 
                return obj.id_keranjang !== tr_idKeranjang; 
            });

            $("#delete-cart-items-btn").html(`Hapus Barang <span>(${totalSelected_pgl})</span>`);
            $("#add-lampiran-btn").html(`Tambah Item ke Lampiran <span>(${totalSelected_pgl})</span>`);
        };

        console.log(dataPlace_pengeluaran);
        return dataPlace_pengeluaran;
    });
    //* ========= Selected Row Table Keranjang End ========

    //let check_barang_arr = [];
    //* ========== Input Into Lampiran PPB-TBB List ==========
    $("#add-lampiran-item").on("click", function(){
        let input_nomorDokumenBC_range = $("#min-no-dokumen-bc").val() + " - " + $("#max-no-dokumen-bc").val();

        let input_jenisDokumen = $("#jenis-dokumen").val();
        let input_tglDokumenMasuk = $("#tgl_dokumen_masuk").val();
        let input_indexTag = $("#index-tag").val();

        let lampiran_objArr = [];
        dataPlace_pengeluaran.forEach((obj, index) => {
            var lampiran_obj = {};
            lampiran_obj.barcode_barang = obj.barcode_barang;
            lampiran_obj.deskripsi_barang = obj.deskripsi_barang;
            lampiran_objArr.push(lampiran_obj); 
        });        

        console.log(lampiran_objArr);
    });

});



 