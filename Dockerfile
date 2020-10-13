FROM python:3.7.9-alpine3.11

RUN apk add --no-cache nodejs nodejs-npm

COPY requirements.txt .
RUN \
  apk add --no-cache postgresql-libs \
  && apk add --no-cache --virtual build-deps bash gcc make musl-dev \
  && apk add postgresql-dev \
  && python3 -m pip install -r requirements.txt --no-cache-dir

COPY . /template
WORKDIR /template

RUN make ui-requirements
RUN make ui-build

RUN chmod +x wait-for-it.sh
RUN chmod +x entrypoint.sh


