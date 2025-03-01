# Hostelworld Sherpa Chrome extension

[![CI](https://github.com/nomadsherpa/hostelworld_sherpa/actions/workflows/ci.yml/badge.svg)](https://github.com/nomadsherpa/hostelworld_sherpa/actions/workflows/ci.yml)

# Local development

## Testing

To run the test suite, use the following command:

```sh
make test
```

### Viewing tests in a real browser

To see the tests running in a real browser, set the `HEADLESS` environment variable to `false` and run the tests:

```sh
HEADLESS=false make test
```

Then open this URL in your browser:

```sh
http://localhost:7900/?autoconnect=1&resize=scale
```
