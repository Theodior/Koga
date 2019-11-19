<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
$name = $_POST ['name'];
$email = $_POST ['email'];
$message = $_POST ['message'];
$formcontent="From: $name \n Message: $message";
$recipient = "esau@esauka.dk";
$subject = "mail fra kunden";
//$mailheader = "From: $name \r\n";
mail($recipient, $subject, $formcontent) or die ("Error!");
echo "Jeg vender tilbage så hurtigt som muligt";
?>
