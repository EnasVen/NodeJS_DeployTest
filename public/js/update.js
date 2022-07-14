let name, tel, email;
$("#add").click(function () {
    name = $("#name").val();
    tel = $("#tel").val();
    email = $("#email").val();
    console.log(name, tel, email);

    let Row = `<tr>
                      <td>${name}</td>
                      <td>${tel}</td>
                      <td>${email}</td>
                      <td>${email}</td>
                      <td>
                          <button type="button" class="btn btn-primary btn-del"><i class="fa-solid fa-trash-can"></i></button>
                      </td>
                  </tr>`
    $(".tbody").append(Row);
});

$("tbody").on("click", ".btn-del", function () {
    $(this).closest("tr").remove();
})