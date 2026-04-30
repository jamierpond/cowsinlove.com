FROM python:3.12-slim

RUN apt-get update \
 && apt-get install -y --no-install-recommends openssh-client \
 && rm -rf /var/lib/apt/lists/*

RUN pip install --no-cache-dir asyncssh==2.18.0

COPY main.py /usr/local/bin/cowsinlove.py
COPY server.py /usr/local/bin/server.py
RUN chmod +x /usr/local/bin/cowsinlove.py /usr/local/bin/server.py

ENV LANG=C.UTF-8 \
    LC_ALL=C.UTF-8 \
    SSH_HOST_KEY_DIR=/data/ssh_keys \
    SSH_PORT=22

EXPOSE 22

CMD ["python3", "/usr/local/bin/server.py"]
