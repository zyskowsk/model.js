#!/bin/bash

# check for test env variable
[[ $TEST_ENV = "test" ]] && make test || echo "TEST_ENV invalid"
