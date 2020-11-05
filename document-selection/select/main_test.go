package main

import (
	"testing"
)

func TestCorrectResponseFromHandler(t *testing.T) {
	request := Request{
		PathParameters: map[string]string{
			"documentId": "1",
		},
	}
	response, err := Handler(request)
	if err != nil {
		t.Errorf("Error in request %s", err)
	}
	if response.Body != "{\"id\":1,\"title\":\"Test\",\"author\":\"Georg\"}" {
		t.Errorf("error answer from the function: %s", response.Body)
	}
}
