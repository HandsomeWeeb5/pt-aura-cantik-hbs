$(function(){
    $("#search-button").on("click", function(){
        var value = $("#cari_deskripsi_brg").val().toLowerCase();
        $("#tb_pemasukan tbody tr").filter(function(){
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > - 1);
        });
    });
});