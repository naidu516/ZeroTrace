import time
from flask import request

blocked_ips = set()
request_count = {}
logs = []

LIMIT = 50
WINDOW = 60


def get_ip():
    return request.remote_addr


def check_ip():
    ip = get_ip()
    now = time.time()

    if ip in blocked_ips:
        return False

    if ip not in request_count:
        request_count[ip] = []

    request_count[ip] = [t for t in request_count[ip] if now - t < WINDOW]
    request_count[ip].append(now)

    if len(request_count[ip]) > LIMIT:
        blocked_ips.add(ip)
        log_attack(ip)
        return False

    return True


# ✅ THIS WAS MISSING / WRONG BEFORE
def firewall(domain=None):
    return check_ip()


def log_attack(ip):
    logs.append(f"🚨 Blocked IP: {ip}")


def get_blocked_ips():
    return list(blocked_ips)


def get_logs():
    return logs