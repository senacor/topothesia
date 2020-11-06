package com.senacor.topothesia.curator

import org.elasticsearch.client.RestHighLevelClient
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Profile
import org.springframework.data.elasticsearch.client.ClientConfiguration
import org.springframework.data.elasticsearch.client.RestClients
import org.springframework.data.elasticsearch.config.AbstractElasticsearchConfiguration

@Configuration
@Profile("dev")
class RestClientDevConfig : AbstractElasticsearchConfiguration() {

    @Bean
    override fun elasticsearchClient(): RestHighLevelClient {
        val clientConfiguration = ClientConfiguration.builder()
                .connectedTo("search-topothesia-xgm2eh7g25z5qqkjpvlfmzqjve.eu-central-1.es.amazonaws.com:443")
                .usingSsl()
                .build()
        return RestClients.create(clientConfiguration).rest()
    }

}

@Configuration
@Profile("local")
class RestClientLocalConfig : AbstractElasticsearchConfiguration() {

    @Bean
    override fun elasticsearchClient(): RestHighLevelClient {
        val clientConfiguration = ClientConfiguration.builder()
                .connectedTo("localhost:9200")
                .build()
        return RestClients.create(clientConfiguration).rest()
    }

}