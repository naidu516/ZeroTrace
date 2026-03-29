from flask import Flask, request, jsonify
from flask_cors import CORS

from whois_tool import whois_lookup
from subdomain import find_subdomains
from dns_enum import dns_lookup
from port_scan import port_scan
from dir_bruteforce import dir_bruteforce

from security import firewall, check_ip, log_attack, get_blocked_ips, get_logs

app = Flask(__name__)
CORS(app)

# ================= TOOLS =================

def protect(domain):
    if not check_ip():
        return {"error": "Too many requests 🚫"}, 429

    if not firewall(domain):
        log_attack(request.remote_addr, "Blocked input")
        return {"error": "Blocked by firewall 🚫"}, 403

    return None, None


@app.route("/whois", methods=["POST"])
def whois_api():
    domain = request.json.get("domain")
    err, code = protect(domain)
    if err: return jsonify(err), code
    return jsonify(whois_lookup(domain))


@app.route("/subdomain", methods=["POST"])
def subdomain_api():
    domain = request.json.get("domain")
    err, code = protect(domain)
    if err: return jsonify(err), code
    return jsonify(find_subdomains(domain))


@app.route("/dns", methods=["POST"])
def dns_api():
    domain = request.json.get("domain")
    err, code = protect(domain)
    if err: return jsonify(err), code
    return jsonify(dns_lookup(domain))


@app.route("/portscan", methods=["POST"])
def portscan_api():
    domain = request.json.get("domain")
    err, code = protect(domain)
    if err: return jsonify(err), code
    return jsonify(port_scan(domain))


@app.route("/dir", methods=["POST"])
def dir_api():
    domain = request.json.get("domain")
    err, code = protect(domain)
    if err: return jsonify(err), code
    return jsonify(dir_bruteforce(domain))


# ================= SECURITY UI =================

@app.route("/blocked", methods=["GET"])
def blocked_api():
    return jsonify(get_blocked_ips())


@app.route("/logs", methods=["GET"])
def logs_api():
    return jsonify(get_logs())


@app.route("/")
def home():
    return "ZeroTrace Backend Running 🚀"


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)