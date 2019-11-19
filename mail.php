<?php
$name = $_POST ['name'];
$email = $_POST ['email'];
$message = $_POST ['message'];
$formcontent="From: $name \n Message: $message";
$recipient = "info@esauka.dk";
$subject = "Contact Form";
$mailheader = "From: $name \r\n";
mail($recipient, $subject, $formcontent, $mailheader) or die ("Error!");
echo "MANGE TAK SKAL HAVE MIN VEN";
?>
