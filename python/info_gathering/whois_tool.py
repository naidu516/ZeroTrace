import whois

def whois_lookup(domain):
    try:
        info = whois.whois(domain)

        return {
            "domain": str(info.domain_name),
            "registrar": str(info.registrar),
            "created": str(info.creation_date),
            "expiry": str(info.expiration_date),
            "nameservers": ", ".join(info.name_servers) if info.name_servers else "N/A"
        }
    except Exception as e:
        return {"error": str(e)}