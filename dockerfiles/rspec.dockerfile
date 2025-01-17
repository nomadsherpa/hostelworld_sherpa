FROM ruby:3.4.1

WORKDIR /test_runner

COPY Gemfile Gemfile.lock /test_runner/

RUN bundle install

COPY .rspec ./spec /test_runner/
