<?php
/* Testimonial handler (mirrors app/api/testimonial/route.ts). */
require __DIR__ . '/_lib.php';
require_post();
rate_limit('testimonial', 4);

$body = json_decode((string) file_get_contents('php://input'), true);
if (!is_array($body)) respond(400, ['error' => 'Invalid request.']);

$ref = reference('TS');
if (clean($body['website'] ?? '', 200) !== '') respond(200, ['ok' => true, 'reference' => $ref]);

$publishLabels = ['full' => 'Name, role and company', 'company' => 'Role and company only', 'anonymous' => 'Anonymously'];
$d = [
    'name'    => clean($body['name'] ?? '', 120),
    'email'   => clean($body['email'] ?? '', 200),
    'role'    => clean($body['role'] ?? '', 120),
    'company' => clean($body['company'] ?? '', 160),
    'service' => clean($body['service'] ?? '', 120),
    'quote'   => clean($body['quote'] ?? '', 1200),
    'rating'  => is_int($body['rating'] ?? null) ? $body['rating'] : 0,
    'publish' => clean($body['publish'] ?? '', 20),
    'consent' => ($body['consent'] ?? false) === true,
];
if (mb_strlen($d['name']) < 2 || !valid_email($d['email']) || $d['rating'] < 1 || $d['rating'] > 5
    || mb_strlen($d['quote']) < 20 || !isset($publishLabels[$d['publish']]) || !$d['consent']) {
    respond(422, ['error' => 'Please check the form fields.']);
}

$stars = str_repeat('★', $d['rating']) . str_repeat('☆', 5 - $d['rating']);
$html = '<h2 style="font-family:sans-serif;color:#1F2340">New website testimonial · ' . $ref . '</h2>'
    . '<p style="font-family:sans-serif;font-size:18px;color:#f59e0b">' . $stars . '</p>'
    . '<blockquote style="font-family:sans-serif;font-size:15px;border-left:4px solid #5AA9E0;margin:0;padding:8px 16px">' . nl2br(esc($d['quote'])) . '</blockquote>'
    . '<table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;margin-top:16px">'
    . row('Name', $d['name']) . row('Role', $d['role']) . row('Company', $d['company']) . row('Email', $d['email']) . row('Service', $d['service'])
    . row('Publish as', $publishLabels[$d['publish']]) . row('Consent to publish', 'Yes')
    . '</table><p style="font-family:sans-serif;font-size:13px;color:#64748b">To publish it, send this email to your web developer. Keep it as the client\'s record of consent.</p>';

$c = config();
$sent = send_mail($c['to'] ?? '', "New testimonial $ref — {$d['rating']}★ from {$d['name']}", $html, $d['email']);
if ($sent === false) respond(502, ['error' => "We couldn't send your testimonial right now."]);
if ($sent === null) error_log("[testimonial] $ref received but email delivery is NOT configured (_config.php).");
respond(200, ['ok' => true, 'reference' => $ref]);
