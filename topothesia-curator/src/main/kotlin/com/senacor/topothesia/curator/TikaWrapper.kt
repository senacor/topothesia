package com.senacor.topothesia.curator

import org.apache.commons.io.FilenameUtils
import org.apache.tika.exception.TikaException
import org.apache.tika.extractor.EmbeddedDocumentExtractor
import org.apache.tika.metadata.Metadata
import org.apache.tika.parser.AutoDetectParser
import org.apache.tika.parser.ParseContext
import org.apache.tika.parser.microsoft.OfficeParser
import org.apache.tika.parser.microsoft.ooxml.OOXMLParser
import org.apache.tika.parser.pdf.PDFParser
import org.apache.tika.parser.pdf.PDFParserConfig
import org.apache.tika.sax.ToXMLContentHandler
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import org.xml.sax.SAXException
import java.io.FileInputStream
import java.io.IOException
import java.io.InputStream
import java.net.URL
import java.nio.file.Paths

@Service
class TikaWrapper {
    var logger: Logger = LoggerFactory.getLogger(TikaWrapper::class.java)
    private lateinit var parser: AutoDetectParser

    init {
        val config = PDFParserConfig()
        val pdfParser = PDFParser()
        config.extractInlineImages = true
        config.extractUniqueInlineImagesOnly = true
        pdfParser.pdfParserConfig = config
        this.parser = AutoDetectParser(pdfParser, OfficeParser(), OOXMLParser())
    }

    fun parse(filename: String?, stream: InputStream): ProcessedDocument {
        val handler = ToXMLContentHandler()
        var xhtmlContents = ""
        val context = ParseContext()
        val metadata = Metadata()
        context.set(AutoDetectParser::class.java, parser)


        try {
            parser.parse(stream, handler, metadata, context)
            xhtmlContents = handler.toString()
        } catch (e: IOException) {
            e.printStackTrace()
        } catch (e: SAXException) {
            e.printStackTrace()
        } catch (e: TikaException) {
            e.printStackTrace()
        }
        logger.info("File=${filename} processed!")

        metadata["file_name"] = metadata["file_name"]?: filename
        return ProcessedDocument.create(metadata, xhtmlContents)
    }
}