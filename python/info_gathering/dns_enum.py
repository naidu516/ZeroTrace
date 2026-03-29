"""
========================================
🔍 DNS ENUMERATION TOOL (ZeroTrace)
========================================

🧠 What is DNS Enumeration?

DNS Enumeration is the process of gathering
information about a domain’s DNS records.

It helps in:
✔ Finding server IP addresses
✔ Identifying mail servers
✔ Discovering name servers
✔ Checking security configurations

----------------------------------------

📊 Records this script checks:

A   → IP address of the domain
MX  → Mail servers
NS  → Name servers
TXT → Extra data (SPF, verification, etc.)

----------------------------------------

🚀 How to Use:

1. Install required library:

   pip install dnspython

2. Run the script:

   python dns_enum.py

3. Enter target domain:

   example.com

----------------------------------------

⚠️ Important Rules:

✔ Use only on:
   - Your own websites
   - Labs (DVWA, bWAPP, Juice Shop)

❌ Do NOT scan random websites without permission

----------------------------------------

💡 Example Output:

[+] Running DNS Enumeration on example.com

--- A Records ---
93.184.216.34

--- MX Records ---
mail.example.com

--- NS Records ---
ns1.example.com
ns2.example.com

========================================
"""
import dns.resolver

def dns_lookup(domain):
    result = {}

    # A Records
    try:
        answers = dns.resolver.resolve(domain, 'A')
        result["A"] = [str(rdata) for rdata in answers]
    except:
        result["A"] = []

    # NS Records
    try:
        answers = dns.resolver.resolve(domain, 'NS')
        result["NS"] = [str(rdata) for rdata in answers]
    except:
        result["NS"] = []

    # MX Records
    try:
        answers = dns.resolver.resolve(domain, 'MX')
        result["MX"] = [str(rdata) for rdata in answers]
    except:
        result["MX"] = []

    # TXT Records
    try:
        answers = dns.resolver.resolve(domain, 'TXT')
        result["TXT"] = [str(rdata) for rdata in answers]
    except:
        result["TXT"] = []

    return result















