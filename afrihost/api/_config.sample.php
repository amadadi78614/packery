<?php
/*
 * Copy to _config.php on the server (or let the GitHub deploy create it from repository secrets).
 * Never commit _config.php — it contains the mailbox password.
 * Requesting this file in a browser returns an empty page; PHP never prints its contents.
 */
return [
    'transport'   => 'smtp',                    // 'smtp' (recommended) or 'mail' (PHP mail())
    'smtp_host'   => 'envoy.aserv.co.za',        // Afrihost outgoing mail server for packery.co.za
    'smtp_port'   => 587,
    'smtp_secure' => 'tls',                      // 'tls' for 587, 'ssl' for 465
    'smtp_user'   => 'website@packery.co.za',
    'smtp_pass'   => 'CHANGE_ME',
    'from'        => 'website@packery.co.za',
    'from_name'   => 'S Packery Website',
    'to'          => 'admin@packery.co.za',      // quote requests + testimonials (comma-separate for several)
    'college_to'  => 'admin@packery.co.za',      // EZ College applications
];
