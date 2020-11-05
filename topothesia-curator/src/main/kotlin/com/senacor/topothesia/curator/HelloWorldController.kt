package com.senacor.topothesia.curator

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.multipart.MultipartFile
import java.io.File

@RestController
class HelloWorldController {

    @GetMapping("/")
    fun helloWorld(): String {
        return "Hello World"
    }

    @PostMapping("/")
    fun uploadHelloWorld(@RequestParam("file") file: MultipartFile): String {
        println(file.originalFilename)
        println(file.contentType)
        return file.name
    }
}