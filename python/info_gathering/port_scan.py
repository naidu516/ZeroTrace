import socket

def port_scan(domain):
    result = []

    try:
        ip = socket.gethostbyname(domain)

        common_ports = [21, 22, 23, 25, 53, 80, 110, 139, 143, 443, 445, 8080]

        for port in common_ports:
            s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            s.settimeout(1)

            if s.connect_ex((ip, port)) == 0:
                result.append(f"Port {port} OPEN")
            else:
                result.append(f"Port {port} CLOSED")

            s.close()

    except Exception as e:
        result.append(f"Error: {str(e)}")

    return result