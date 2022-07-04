$(function(){
    $("#search-button").on("click", function(){
        var value = $("#deskripsi_brg").val().toLowerCase();
        $("#tb_pemasukan").filter(function(){
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > - 1);
        });
    });
});