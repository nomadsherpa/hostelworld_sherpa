from mitmproxy import ctx, http

# Store requests only for whitelisted domains and block everything else with 404
class ConditionalResponse:
    def __init__(self):
        self.allowed_domains = {
            "hostelworld.com",
            "hwstatic.com",
            "api.mapbox.com"
        }

    def request(self, flow: http.HTTPFlow) -> None:
        host = flow.request.pretty_host
        second_level_domain = ".".join(host.split(".")[-2:])

        if host not in self.allowed_domains and second_level_domain not in self.allowed_domains:
            print("== Blocked domain", host)
            # Send 404 Not Found response
            flow.response = http.Response.make(
                404,  # status code
                b"Not Found",  # simple error message
                {"Content-Type": "text/plain"}  # restored headers since we have a body
            )
            # Kill the flow after sending response to prevent storing it
            flow.kill()

addons = [ConditionalResponse()]
