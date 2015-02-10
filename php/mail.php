<?php
	/**
	 * Email options
	 *
	 * to:      email address where the message will be sent (receiver)
	 * from:    email address from which the message will appear to be sent (sender)
	 * subject: a short summary of the email content
	 * headers: extra information for email clients
	 */
	$to      = "your@domain.com";
	$from    = "your@domain.com";
	$subject = "A message from Dropout";
    $headers = 'From: ' . $from . "\r\n" .
               'Reply-To: ' . $from . "\r\n" .
               'Content-type: text/html; charset=iso-8859-1' . "\r\n" .
               'X-Mailer: PHP/' . phpversion();


    // Message that will show on the site, if the message was successfully sent        
    $success_message = 'Your message was sent successfully.';

	// Set to 'true' if you want the email subject to be used from the form
	$form_subject = false;



	/**
	 * Main form code, do not edit (unless you want to change the functionality/message style)
	 */

	$form = explode('&', urldecode($_POST['form']));
	$border = 'border: 1px solid #E1E1E1;';
	$message = '<table cellspacing="0" border="0" style="' . $border . ' border-radius: 5px;"><tbody>';

	$first_row = true;
	foreach ($form as $value) {
		$value = explode('=', $value);

		if( $form_subject == true && $value[0] == 'subject' ) {
			$subject = $value[1];
			continue;
		}

		if ( $first_row ) {
			$message .= '<tr><th style="' . $border . ' border-style: none solid none none; padding: 12px; text-align:left; color: #222;">' . $value[0] . ':</th><td style="' . $border . ' border-style: none; padding: 12px; color: #777">' . $value[1] . '</td></tr>';
			$first_row = false;
		} else {
			$message .= '<tr><th style="' . $border . ' border-style: solid solid none none; padding: 12px; text-align:left; color: #222;">' . $value[0] . ':</th><td style="' . $border . ' border-style: solid none none none; padding: 12px; color: #777">' . $value[1] . '</td></tr>';
		}
	}

	$message .= '</tbody></table>';

	mail($to, $subject, $message, $headers);

	echo $success_message;
?>