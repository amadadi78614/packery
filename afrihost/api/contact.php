<?php
/* Quote request handler (mirrors app/api/contact/route.ts). */
require __DIR__ . '/_lib.php';
require_post();
rate_limit('quote', 5);

$body = json_decode((string) file_get_contents('php://input'), true);
if (!is_array($body)) respond(400, ['error' => 'Invalid request.']);

$ref = reference('SP');
if (clean($body['website'] ?? '', 200) !== '') respond(200, ['ok' => true, 'reference' => $ref]); // honeypot

$L = lists();
$byId = [];
foreach ($L['services'] ?? [] as $s) $byId[$s['id']] = $s['title'];
$picked = [];
foreach ((array) ($body['services'] ?? []) as $id) if (is_string($id) && isset($byId[$id])) $picked[] = $byId[$id];
$oneOf = fn(string $v, string $list) => in_array($v, $L[$list] ?? [], true) ? $v : '';

$d = [
    'services'   => array_values(array_unique($picked)),
    'clientType' => $oneOf(clean($body['clientType'] ?? '', 60), 'clientTypes'),
    'turnover'   => $oneOf(clean($body['turnover'] ?? '', 60), 'turnoverBands'),
    'timeline'   => $oneOf(clean($body['timeline'] ?? '', 60), 'timelines'),
    'name'       => clean($body['name'] ?? '', 120),
    'email'      => clean($body['email'] ?? '', 200),
    'phone'      => clean($body['phone'] ?? '', 30),
    'company'    => clean($body['company'] ?? '', 160),
    'message'    => clean($body['message'] ?? '', 5000),
];

if (!$d['services'] || !$d['clientType'] || !$d['timeline'] || mb_strlen($d['name']) < 2 || !valid_email($d['email']) || !valid_phone($d['phone'])) {
    respond(422, ['error' => 'Please check the form fields.']);
}

$html = '<h2 style="font-family:sans-serif;color:#1F2340">New quote request · ' . $ref . '</h2>'
    . '<table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">'
    . row('Services', implode(', ', $d['services'])) . row('Client type', $d['clientType']) . row('Turnover', $d['turnover']) . row('Timeline', $d['timeline'])
    . row('Name', $d['name']) . row('Business', $d['company']) . row('Email', $d['email']) . row('Phone', $d['phone'])
    . '</table><p style="font-family:sans-serif;font-size:14px">' . nl2br(esc($d['message'])) . '</p>';

$c = config();
$sent = send_mail($c['to'] ?? '', "Quote request $ref: " . implode(', ', $d['services']) . ' — ' . $d['name'], $html, $d['email']);
if ($sent === false) respond(502, ['error' => "We couldn't send your request right now."]);
if ($sent === null) error_log("[quote] $ref received but email delivery is NOT configured (_config.php).");
respond(200, ['ok' => true, 'reference' => $ref]);
