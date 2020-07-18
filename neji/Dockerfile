FROM ruby:2.6.3

RUN apt-get update -qq && apt-get install -y yarn
RUN mkdir /neji

WORKDIR /neji

COPY Gemfile /neji/Gemfile
COPY Gemfile.lock /neji/Gemfile.lock

RUN bundle install
COPY . /neji
