<?php
/* EZ Accounting College application handler (mirrors app/api/college-apply/route.ts). */
require __DIR__ . '/_lib.php';
require_post();
rate_limit('college', 4);

$ref = reference('EZ');
if (clean($_POST['website'] ?? '', 200) !== '') respond(200, ['ok' => true, 'reference' => $ref]);

$L = lists();
$year = clean($_POST['year'] ?? '', 4);
$d = [
    'name'          => clean($_POST['name'] ?? '', 120),
    'email'         => clean($_POST['email'] ?? '', 200),
    'phone'         => clean($_POST['phone'] ?? '', 30),
    'town'          => clean($_POST['town'] ?? '', 120),
    'qualification' => clean($_POST['qualification'] ?? '', 120),
    'institution'   => clean($_POST['institution'] ?? '', 160),
    'year'          => $year,
    'status'        => clean($_POST['status'] ?? '', 60),
    'funding'       => clean($_POST['funding'] ?? '', 60),
    'motivation'    => clean($_POST['motivation'] ?? '', 3000),
    'consent'       => ($_POST['consent'] ?? '') === 'yes',
];
$thisYear = (int) date('Y');
$valid = mb_strlen($d['name']) >= 2 && valid_email($d['email']) && valid_phone($d['phone']) && mb_strlen($d['town']) >= 2
    && in_array($d['qualification'], $L['qualifications'] ?? [], true) && mb_strlen($d['institution']) >= 2
    && preg_match('/^\d{4}$/', $year) && (int) $year >= 1980 && (int) $year <= $thisYear + 2
    && in_array($d['status'], $L['applicantStatuses'] ?? [], true) && in_array($d['funding'], $L['fundingStatuses'] ?? [], true)
    && mb_strlen($d['motivation']) >= 20 && $d['consent'];
if (!$valid) respond(422, ['error' => 'Please check the form fields.']);

// Supporting documents: certified ID + qualification required; funding proof and CV optional. 4 MB combined.
$docs = [
    ['key' => 'idDoc', 'label' => 'Certified ID', 'prefix' => 'ID', 'required' => true],
    ['key' => 'qualDoc', 'label' => 'Certified qualification', 'prefix' => 'Qualification', 'required' => true],
    ['key' => 'fundingDoc', 'label' => 'Proof of SETA funding', 'prefix' => 'SETA-funding', 'required' => false],
    ['key' => 'cv', 'label' => 'CV', 'prefix' => 'CV', 'required' => false],
];
$types = [
    'application/pdf' => 'pdf', 'application/msword' => 'doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document' => 'docx',
    'image/jpeg' => 'jpg', 'image/png' => 'png',
];
$finfo = function_exists('finfo_open') ? finfo_open(FILEINFO_MIME_TYPE) : null;
$safe = trim(preg_replace('/[^a-z0-9]+/i', '-', $d['name']), '-');
$safe = substr($safe !== '' ? $safe : 'applicant', 0, 40);
$attachments = []; $received = []; $total = 0;
foreach ($docs as $doc) {
    $f = $_FILES[$doc['key']] ?? null;
    if (!$f || ($f['error'] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_NO_FILE || ($f['size'] ?? 0) === 0) {
        if ($doc['required']) respond(422, ['error' => 'Please upload your ' . strtolower($doc['label']) . '.']);
        continue;
    }
    if ($f['error'] !== UPLOAD_ERR_OK || !is_uploaded_file($f['tmp_name'])) respond(422, ['error' => $doc['label'] . ' could not be uploaded. Please try again.']);
    $mime = $finfo ? finfo_file($finfo, $f['tmp_name']) : ($f['type'] ?? '');
    // Older Word files can be detected as generic types; fall back to the extension for .doc/.docx only.
    if (!isset($types[$mime]) && preg_match('/\.(docx?)$/i', $f['name'], $m)) $mime = strtolower($m[1]) === 'doc' ? 'application/msword' : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    if (!isset($types[$mime])) respond(422, ['error' => $doc['label'] . ' must be a PDF, Word document, JPG or PNG.']);
    $total += (int) $f['size'];
    if ($total > 4 * 1024 * 1024) respond(422, ['error' => 'Documents must be 4 MB or smaller in total.']);
    $attachments[] = ['path' => $f['tmp_name'], 'name' => "{$doc['prefix']}-$safe-$ref.{$types[$mime]}"];
    $received[] = $doc['label'];
}

$college = $L['collegeName'] ?? 'EZ Accounting College';
$html = '<h2 style="font-family:sans-serif;color:#16542A">New ' . esc($college) . ' application · ' . $ref . '</h2>'
    . '<table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">'
    . row('Name', $d['name']) . row('Email', $d['email']) . row('Phone', $d['phone']) . row('Town / area', $d['town'])
    . row('Qualification', $d['qualification']) . row('Institution', $d['institution']) . row('Year completed', $d['year']) . row('Status', $d['status'])
    . row('SETA funding', $d['funding']) . row('Documents attached', implode(', ', $received))
    . '</table><h3 style="font-family:sans-serif">Motivation</h3><p style="font-family:sans-serif;font-size:14px">' . nl2br(esc($d['motivation'])) . '</p>';

$c = config();
$sent = send_mail($c['college_to'] ?? ($c['to'] ?? ''), "$college application $ref — {$d['name']}", $html, $d['email'], $attachments);
if ($sent === false) respond(502, ['error' => "We couldn't submit your application right now."]);
if ($sent === null) error_log("[college-apply] $ref received but email delivery is NOT configured (_config.php).");
respond(200, ['ok' => true, 'reference' => $ref]);
