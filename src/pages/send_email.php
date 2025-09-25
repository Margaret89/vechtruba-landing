<?
// Включение вывода ошибок (для разработки)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Обработка CORS (если нужно)
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	
	// Функция очистки данных
	function clean_input($data) {
		$data = trim($data);
		$data = stripslashes($data);
		$data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
		return $data;
	}
	
	// Получаем и очищаем данные
	$phone = clean_input($_POST['phone'] ?? '');
	$telegram = clean_input($_POST['telegram'] ?? '');
	$whatsapp = clean_input($_POST['whatsapp'] ?? '');
	$notCallWhatsapp = clean_input($_POST['not-call-whatsapp'] ?? '');
	$notCallTelegram = clean_input($_POST['not-call-telegram'] ?? '');
	$cliendId = clean_input($_POST['cliend_id'] ?? '');
	
	// Валидация
	$errors = [];
	
	// Защита от спама
	if (!empty($_POST['website'])) {
		$errors[] = 'Spam detected';
	}
	
	// Если есть ошибки
	if (!empty($errors)) {
		echo json_encode([
			'success' => false,
			'message' => implode(', ', $errors)
		]);
		exit;
	}
	
	// Настройки письма
	$to = 'match14@yandex.ru';
	$subject = "Обратная связь с лэндинга";
	
	$headers = "From: no-reply@yourdomain.com\r\n";
	// $headers .= "Reply-To: $email\r\n";
	$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
	$headers .= "X-Mailer: PHP/" . phpversion();
	
	// Тело письма
	$email_message = "
	<p><strong>Телефон:</strong> $phone</p>
	<p><strong>Telegram:</strong> $telegram</p>
	<p><strong>Whatsapp:</strong> $whatsapp</p>
	<p><strong>Не перезванивать в Whatsapp:</strong> $notCallWhatsapp</p>
	<p><strong>Не перезванивать в Telegram:</strong> $notCallTelegram</p>
	<p><strong>clientId:</strong> $cliendId</p>
	";
	
	// Попытка отправки
	if (mail($to, $subject, $email_message, $headers)) {
		echo json_encode([
			'success' => true,
			'message' => 'Письмо успешно отправлено'
		]);
	} else {
		echo json_encode([
			'success' => false,
			'message' => 'Ошибка при отправке письма'
		]);
	}
	
} else {
	echo json_encode([
		'success' => false,
		'message' => 'Неверный метод запроса'
	]);
}
?>