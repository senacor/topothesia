package main

import (
	"testing"
)

func TestCorrectResponseFromHandler(t *testing.T) {
	request := Request{
		QueryStringParameters: map[string]string{
			"filter": "test",
		},
	}
	response, err := Handler(request)
	if err != nil {
		t.Errorf("Error in request %s", err)
	}
	if response.Body != "{\"1\":\"Happy hacking with test\",\"2\":\"Another document test\"}" {
		t.Errorf("bla fasel: %s", response.Body)
	}
}
