package com.senacor.topothesia.curator

import org.apache.tika.metadata.Metadata
import org.jsoup.Jsoup
import org.jsoup.nodes.Element
import org.springframework.data.annotation.Id
import org.springframework.data.elasticsearch.annotations.Document
import org.springframework.data.elasticsearch.annotations.Field
import org.springframework.data.elasticsearch.annotations.FieldType.*

@Document(indexName = "documents")
data class ProcessedDocument(
        @Id var id: String?,
        @Field(type = Keyword) val author: String,
        @Field(type = Date) val created: String,
        @Field(type = Text) val type: String,
        @Field(type = Text) val title: String,
        @Field(type = Keyword) val filename: String,
        @Field(type = Integer) val numberOfPages: Int?,
        @Field(type = Nested, includeInParent = true) val pages: List<Page>
) {
    companion object Factory {
        fun create(metadata: Metadata, content: String): ProcessedDocument {
            val html = Jsoup.parse(content)
            val elements = html.select("body > div").filter { it.text().trim() != "" }
            return ProcessedDocument(
                    id = null,
                    author = metadata["Author"]?: "",
                    created = metadata["date"],
                    type = metadata["Content-Type"],
                    title = metadata["title"]?: "",
                    filename = metadata["file_name"],
                    numberOfPages = elements.size,
                    pages = elements.map { Page.create(it) }.toList()
            )
        }
    }
}

data class Page(
        @Field(type = Text, analyzer = "german") val text: String,
        @Field(type = Text) val title: String) {

    companion object Factory {
        fun create(element: Element): Page {
            val elements = element.select("p:matches(.+)")
            var title = ""
            if (elements.size > 2) {
                val logoRegex = Regex("(Senacor Technologies AG)+")
                title = if (elements[0].text().matches(logoRegex)) elements[1].text() else elements[0].text()
            } else if (elements.size == 1) {
                title = elements[0].text()
            }

            return Page(
                    text = element.text(),
                    title = title
            )
        }
    }
}