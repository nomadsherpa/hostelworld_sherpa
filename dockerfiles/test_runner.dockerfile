FROM ruby:3.4.1-slim

RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /test_runner

COPY Gemfile Gemfile.lock /test_runner/

RUN bundle install

COPY .rspec ./spec .rubocop.yml /test_runner/
