from mitmproxy import http

# Replay 404 for requests that are not stored in the replay file
def request(flow):
    flow.response = http.Response.make(
        404,  # HTTP status code
        b"",  # Response body
        {"Content-Type": "text/plain"}  # Headers
    )
