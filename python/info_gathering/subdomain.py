import socket

def find_subdomains(domain):
    subs = ["www","mail","ftp","admin","api","blog","shop"]
    results = []

    for sub in subs:
        try:
            full = f"{sub}.{domain}"
            ip = socket.gethostbyname(full)
            results.append(f"[+] {full} --> {ip}")
        except:
            pass

    return results