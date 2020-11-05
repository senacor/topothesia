.PHONY: build clean deploy

build:
	env GOOS=linux go build -ldflags="-s -w" -o bin/search search/main.go
	env GOOS=linux go build -ldflags="-s -w" -o bin/select select/main.go

clean:
	rm -rf ./bin

deploy: clean build
	sls deploy --verbose
