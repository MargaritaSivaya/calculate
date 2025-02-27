<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'path/to/PHPMailer/src/Exception.php';
require 'path/to/PHPMailer/src/PHPMailer.php';
require 'path/to/PHPMailer/src/SMTP.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'PHPMailer-6.9.3/language');
$mail->isHTML(true);

$mail->setFrom('2796791@gmail.com', 'Маргарита Сивая');
$mail->addAddress('2796791@gmail.com');
$mail->Subject = 'Заявка на засчет стоимости материалов';

$body = '<h1>Данные отправителя:</h1>';

if(trim(!empty($_POST['square']))) {
    $body.='<p><strong>Площадь крыши:</strong> '.$_POST['square'].'</p>';
}

if(trim(!empty($_POST['krov']))) {
    $body.='<p><strong>Тип кровли:</strong> '.$_POST['krov'].'</p>';
}

if(trim(!empty($_POST['coverage']))) {
    $body.='<p><strong>Покрытие для металла:</strong> '.$_POST['coverage'].'</p>';
}

if(trim(!empty($_POST['membrane']))) {
    $body.='<p><strong>Подкровельная пленка:</strong> '.$_POST['membrane'].'</p>';
}

if(trim(!empty($_POST['complete']))) {
    $body.='<p><strong>Дополнительные элементы:</strong> '.$_POST['complete'].'</p>';
}

if(trim(!empty($_POST['total']))) {
    $body.='<p><strong>Предварительная стоимость:</strong> '.$_POST['total'].'</p>';
}

if(trim(!empty($_POST['contact']))) {
    $body.='<p><strong>Номер телефона заказчика:</strong> '.$_POST['contact'].'</p>';
}

$mail->Body = $body;

if (!$mail->send()) {
    $message = 'Ошибка';
} else {
    $message = 'Данные отправлены!';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);