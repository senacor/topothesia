package main

import (
	"bytes"
	"encoding/json"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"strconv"
)

// Response is of type APIGatewayProxyResponse since we're leveraging the
// AWS Lambda Proxy Request functionality (default behavior)
//
// https://serverless.com/framework/docs/providers/aws/events/apigateway/#lambda-proxy-integration
type Response events.APIGatewayProxyResponse
type Request events.APIGatewayProxyRequest

type Document struct {
	Id     int    `json:"id"`
	Title  string `json:"title"`
	Author string `json:"author"`
}

// Handler is our lambda handler invoked by the `lambda.Start` function call
func Handler(request Request) (Response, error) {
	var buf bytes.Buffer
	documentId := request.PathParameters["documentId"]
	id, err := strconv.Atoi(documentId)
	if err != nil {
		return Response{StatusCode: 404}, err
	}
	doc := &Document{
		Id:     id,
		Title:  "Test",
		Author: "Georg",
	}
	body, err := json.Marshal(*doc)
	if err != nil {
		return Response{StatusCode: 404}, err
	}
	json.HTMLEscape(&buf, body)

	return Response{
		StatusCode:      200,
		IsBase64Encoded: false,
		Body:            buf.String(),
		Headers: map[string]string{
			"Content-Type":           "application/json",
			"X-MyCompany-Func-Reply": "world-handler",
		},
	}, nil
}

func main() {
	lambda.Start(Handler)
}
