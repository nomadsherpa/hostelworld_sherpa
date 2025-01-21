from mitmproxy import ctx, http

class ConditionalResponse:
    def __init__(self):
        # Domains that should pass through normally. Everything else will
        # be blocked with a 204 response without accessing the network.
        self.allowed_domains = {
            "hostelworld.com",
            "hwstatic.com"
        }

    def request(self, flow: http.HTTPFlow) -> None:
        host = flow.request.pretty_host
        second_level_domain = ".".join(host.split(".")[-2:])

        if host not in self.allowed_domains and second_level_domain not in self.allowed_domains:
            print("== Blocked domain", host)

            flow.response = http.Response.make(
                204,  # status code
                b"",  # response body
                {"Content-Type": "text/plain"}  # headers
            )

addons = [ConditionalResponse()]
