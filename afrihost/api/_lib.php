<?php
/* Shared helpers for the S Packery form handlers (Afrihost Windows hosting, PHP 8.x). */
declare(strict_types=1);

require __DIR__ . '/lib/PHPMailer/Exception.php';
require __DIR__ . '/lib/PHPMailer/PHPMailer.php';
require __DIR__ . '/lib/PHPMailer/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

function respond(int $status, array $body): never {
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function require_post(): void {
    if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') respond(405, ['error' => 'Method not allowed.']);
}

function config(): array {
    $file = __DIR__ . '/_config.php';
    if (!is_file($file)) return [];
    $c = require $file;
    return is_array($c) ? $c : [];
}

function lists(): array {
    static $l = null;
    if ($l === null) {
        $raw = @file_get_contents(dirname(__DIR__) . '/form-lists.json');
        $l = $raw ? (json_decode($raw, true) ?: []) : [];
    }
    return $l;
}

/** Simple file-based rate limit per IP (default: $max requests per 10 minutes). */
function rate_limit(string $bucket, int $max): void {
    $ip = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $ip = trim(explode(',', $ip)[0]);
    $file = sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'spk_' . $bucket . '_' . hash('sha256', $ip) . '.json';
    $now = time();
    $hits = [];
    if (is_file($file)) $hits = json_decode((string) @file_get_contents($file), true) ?: [];
    $hits = array_values(array_filter($hits, fn($t) => $now - (int) $t < 600));
    if (count($hits) >= $max) respond(429, ['error' => 'Too many submissions.']);
    $hits[] = $now;
    @file_put_contents($file, json_encode($hits), LOCK_EX);
}

function reference(string $prefix): string {
    return $prefix . '-' . strtoupper(substr(base_convert((string) (int) (microtime(true) * 1000), 10, 36), -6));
}

function clean(mixed $v, int $max): string {
    return is_string($v) ? mb_substr(trim($v), 0, $max) : '';
}

function esc(string $s): string {
    return htmlspecialchars($s, ENT_QUOTES | ENT_HTML5, 'UTF-8');
}

function valid_email(string $e): bool {
    return (bool) preg_match('/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/', $e);
}

function valid_phone(string $p): bool {
    return (bool) preg_match('/^[+\d][\d\s()-]{8,18}$/', $p);
}

function row(string $k, string $v): string {
    return '<tr><td style="padding:6px 12px;color:#64748b">' . esc($k) . '</td><td style="padding:6px 12px;font-weight:600">' . esc($v !== '' ? $v : '—') . '</td></tr>';
}

/**
 * Send an email via the firm's own Afrihost mailbox (SMTP), or PHP mail() if configured.
 * $attachments: list of ['path' => tmp path, 'name' => filename]
 * Returns true on success. When email is not configured, returns null (logged without personal data).
 */
function send_mail(string $to, string $subject, string $html, string $replyTo, array $attachments = []): ?bool {
    $c = config();
    if (empty($c['to']) && $to === '') return null;
    $m = new PHPMailer(true);
    try {
        $m->CharSet = 'UTF-8';
        if (($c['transport'] ?? 'smtp') === 'smtp') {
            if (empty($c['smtp_host']) || empty($c['smtp_user']) || empty($c['smtp_pass'])) return null;
            $m->isSMTP();
            $m->Host = $c['smtp_host'];
            $m->Port = (int) ($c['smtp_port'] ?? 587);
            $m->SMTPAuth = true;
            $m->Username = $c['smtp_user'];
            $m->Password = $c['smtp_pass'];
            $secure = $c['smtp_secure'] ?? 'tls';
            if ($secure === 'none') { $m->SMTPSecure = ''; $m->SMTPAutoTLS = false; }
            else $m->SMTPSecure = $secure === 'ssl' ? PHPMailer::ENCRYPTION_SMTPS : PHPMailer::ENCRYPTION_STARTTLS;
            $m->Timeout = 20;
        } else {
            $m->isMail();
        }
        $m->setFrom($c['from'] ?? $c['smtp_user'] ?? 'website@packery.co.za', $c['from_name'] ?? 'S Packery Website');
        foreach (array_filter(array_map('trim', explode(',', $to))) as $addr) $m->addAddress($addr);
        if (valid_email($replyTo)) $m->addReplyTo($replyTo);
        foreach ($attachments as $a) $m->addAttachment($a['path'], $a['name']);
        $m->isHTML(true);
        $m->Subject = $subject;
        $m->Body = $html;
        $m->AltBody = trim(html_entity_decode(strip_tags(str_replace(['<br/>', '</tr>', '</p>'], "\n", $html)), ENT_QUOTES, 'UTF-8'));
        $m->send();
        return true;
    } catch (Throwable $e) {
        error_log('[forms] email delivery failed: ' . $m->ErrorInfo);
        return false;
    }
}
