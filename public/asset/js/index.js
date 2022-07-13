$(function(){

//* ========== SEARCH BAR ===========
    $("#search-button").on("click", function(){
        var value = $("#cari_deskripsi_brg").val().toLowerCase();
        $(".clickable-rows").filter(function(){
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > - 1);
        });
    });


    $("#search-button").on("click", function(){
        var value = $("#cari_deskripsi_brg").val().toLowerCase();
        $(".clickable-rows").filter(function(){
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > - 1);
        });
    });
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

    $('#pemasukan_reset').on('click', function(){
        $("#image-uploaded").css("display", "none");
        $(".image-wrapper").css("display", "flex");
    }) 

    
    var tb_rows_length = $('.clickable_rows').length; // <= checked
    
        $('input[id^="select-item"]').on('click', function(){
            //let checkbox_id = this.id;
            //let table_row = $(this).closest('tr').attr('id');
            $(this).closest('tr').toggleClass('bg-primary').toggleClass('text-light');
            // console.log(table_row);
            
        })

});

//* ========== Preview Image Before Upload end ========

    //var tb_rows_length = $('.clickable_rows').length; // <= checked
//* ========== GET DATA FROM SELECTED ROW =========
let dataPlace = [];
let count = 0;

function dataBarang(
    id_barang,
    deskripsi_brg,
    tgl_pemasukan,
    jenis_barang,
    waktu,
    merek_barang,
    no_dokumen_bc,
    harga_per_unit,
    vendor_item,
    hs_code,
    barcode_barang
){
    this.id_barang = id_barang;
    this.deskripsi_brg = deskripsi_brg;
    this.tgl_pemasukan = tgl_pemasukan;
    this.jenis_barang = jenis_barang;
    this.waktu = waktu;
    this.merek_barang = merek_barang;
    this.no_dokumen_bc = no_dokumen_bc;
    this.harga_per_unit = harga_per_unit;
    this.vendor_item = vendor_item;
    this.hs_code = hs_code;
    this.barcode_barang = barcode_barang;
};

$('input[id^="select-item"]').on('click', function(){
    //let checkbox_id = this.id;
    let table_row = $(this).closest('tr');
    //$(this).closest('tr').toggleClass('bg-primary').toggleClass('text-light');
    // console.log(table_row);
    $(table_row).toggleClass('bg-primary').toggleClass('text-light');
    
    let tr_idBarang_pmk = $(table_row).parent("td").attr("id");
    let tr_deskripsiBrg_pmk = $(table_row).find("#deskripsi_brg_pm").text();
    let tr_tglPemasukan_pmk = $(table_row).find("#tgl_pemasukan_pm").text();
    let tr_jenisBarang_pmk = $(table_row).find("#jenis_barang_pm").text();
    let tr_waktu_pmk = $(table_row).find("#waktu_pm").text();
    let tr_merekBarang_pmk = $(table_row).find("#merek_brg_pm").text();
    let tr_noDokumenBC_pmk = $(table_row).find("#no_dokumen_bc_pm").text();
    let tr_hargaPerUnit_pmk = $(table_row).find("#harga_per_unit_pm").text();
    let tr_vendorItem_pmk = $(table_row).find("#vendor_item_pm").text();
    let tr_hsCode_pmk = $(table_row).find("#hs_code_pm").text();
    let tr_barcodeBarang_pmk = $(table_row).find("#barcode_brg_pm").text();
    
    let dataBarangPerRows = new dataBarang(
        tr_idBarang_pmk,
        tr_deskripsiBrg_pmk,
        tr_tglPemasukan_pmk,
        tr_jenisBarang_pmk,
        tr_waktu_pmk,
        tr_merekBarang_pmk,
        tr_noDokumenBC_pmk,
        tr_hargaPerUnit_pmk,
        tr_vendorItem_pmk,
        tr_hsCode_pmk,
        tr_barcodeBarang_pmk
    );

    if($(this).is(':checked')){
        dataPlace.push(dataBarangPerRows);
        let totalSelected = count += 1;
        $("#hapus-btn").html(`Hapus Barang <span class="store-data-length"> (${totalSelected})</span>`);
    } else {
        let totalSelected = count -= 1;
        //let selectedIndex = dataPlace.indexOf(this);
        dataPlace = $.grep(dataPlace, function(obj){ 
            return obj.deskripsi_brg !== tr_deskripsiBrg_pmk; 
        });
        //dataPlace.splice(selectedIndex, 1);
        $("#hapus-btn").html(`Hapus Barang <span class="store-data-length"> (${totalSelected})</span>`);
    };

    console.log(dataPlace);
    //* ============ Get Data From Selected Row end =========

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
                    console.log(data)
                }   
            })
            return false; // required to block normal submit since you used ajax
        }
    });
})


    


/*
$(".use-address").click(function() {
    var $row = $(this).closest("tr");    // Find the row
    var $text = $row.find(".nr").text(); // Find the text
    
    // Let's test it out
    alert($text);
});
*/
