FROM gitpod/workspace-full

ARG USERNAME=gitpod
ENV HOME=/home/${USERNAME}

WORKDIR $HOME
USER ${USERNAME}

ENV GO_VERSION=1.24.5 \
    GOPATH=$HOME/go-packages \
    GOROOT=$HOME/go
RUN export PATH=$(echo "$PATH" | sed -e 's|:/workspace/go/bin||' -e 's|:/home/gitpod/go/bin||' -e 's|:/home/gitpod/go-packages/bin||')
ENV PATH=$GOROOT/bin:$GOPATH/bin:$PATH

RUN go install -v \
    github.com/air-verse/air@latest && \
    sudo rm -rf $GOPATH/src && \
    sudo rm -rf $GOPATH/pkg
# user Go packages
ENV GOPATH=/workspace/go \
    PATH=/workspace/go/bin:$PATH

RUN pip3 install --no-cache-dir cython && \
    pip3 install --no-cache-dir flask peewee sqlite-web

USER root
