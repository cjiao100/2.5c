function tdelete(table) {
    table.children().remove();
    table.append("<tr id='parameter'>\n" +
        "                  <td><input id=\"parameter_name\" type=\"text\"></td>\n" +
        "                  <td><input type=\"text\"></td>\n" +
        "                </tr>");
}