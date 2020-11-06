package com.senacor.topothesia.curator

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository

interface ProcessedDocumentsRepository : ElasticsearchRepository<ProcessedDocument, String>