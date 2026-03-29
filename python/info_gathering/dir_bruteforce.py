import requests

def dir_bruteforce(domain):
    result = []

    try:
        wordlist = ["admin", "login", "dashboard", "test", "backup", "api"]

        if not domain.startswith("http"):
            domain = "http://" + domain

        for word in wordlist:
            url = f"{domain}/{word}"

            try:
                res = requests.get(url, timeout=3)

                if res.status_code == 200:
                    result.append(f"[FOUND] {url}")
                else:
                    result.append(f"[{res.status_code}] {url}")

            except Exception as e:
                result.append(f"[ERROR] {url}")

    except Exception as e:
        result.append(f"MAIN ERROR: {str(e)}")

    return result