package com.senacor.topothesia.curator

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.multipart.MultipartFile
import java.io.File

@RestController
class Controller(val tikaWrapper: TikaWrapper, val repository: ProcessedDocumentsRepository) {

    @PostMapping("/")
    fun uploadHelloWorld(@RequestParam("file") file: MultipartFile): String {
        val document = tikaWrapper.parse(file.originalFilename, file.inputStream)
        print(document)
        repository.save(document)
        return file.name
    }
}