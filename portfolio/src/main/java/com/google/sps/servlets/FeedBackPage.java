package com.google.sps.servlets;

import java.io.IOException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.cloud.language.v1.Document;
import com.google.cloud.language.v1.LanguageServiceClient;
import com.google.cloud.language.v1.Sentiment;
import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreOptions;
import com.google.cloud.datastore.Entity;
import com.google.cloud.datastore.FullEntity;
import com.google.cloud.datastore.KeyFactory;

import org.jsoup.Jsoup;
import org.jsoup.safety.Whitelist;

@WebServlet("/feedBack-page")
public final class FeedBackPage extends HttpServlet {

    //private static final long serialVersionUID = 1L;

    @Override
    public void doPost(final HttpServletRequest request, final HttpServletResponse response) throws IOException {
        String name = Jsoup.clean(request.getParameter("name-input"), Whitelist.none());
        String helpful = Jsoup.clean(request.getParameter("helpful-input"), Whitelist.none());
        
        System.out.println("You submitted: ");
        System.out.println("Name: " + name);
        System.out.println("Helpful: " + helpful);

        Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
        KeyFactory keyFactory = datastore.newKeyFactory().setKind("FeedBack");

        Document doc = Document.newBuilder().setContent(helpful).setType(Document.Type.PLAIN_TEXT).build();
        LanguageServiceClient languageService = LanguageServiceClient.create();
        Sentiment sentiment = languageService.analyzeSentiment(doc).getDocumentSentiment();
        float score = sentiment.getScore();
        languageService.close();

        if (score > -0.1) {
            FullEntity messageEntity = Entity.newBuilder(keyFactory.newKey()).set("name", name).set("helpful", helpful).build();
            datastore.put(messageEntity);
        }
    }
}