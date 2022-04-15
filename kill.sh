function killPort {
    pid=$(lsof -i:$1 -t);
    kill -TERM $pid 2> /dev/null || kill -KILL $pid 2> /dev/null
}

killPort 1234
killPort 8000
killPort 3000
killPort 3001
killPort 5001