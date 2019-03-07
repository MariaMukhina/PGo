@echo off
git push -u origin master
go get -u github.com/BigCodilo/TimeRows
go build index.go