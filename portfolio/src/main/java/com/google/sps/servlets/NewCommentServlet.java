package com.google.sps.servlets;

import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreOptions;
import com.google.cloud.datastore.Entity;
import com.google.cloud.datastore.FullEntity;
import com.google.cloud.datastore.KeyFactory;
import com.google.cloud.language.v1.Document;
import com.google.cloud.language.v1.LanguageServiceClient;
import com.google.cloud.language.v1.Sentiment;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.jsoup.Jsoup;
import org.jsoup.safety.Whitelist;

/** Servlet responsible for save new messages. */
@WebServlet("/new-comment")
public class NewCommentServlet extends HttpServlet {

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // Sanitize user input to remove HTML tags and JavaScript.
        System.out.println(request.getRequestURL());
        System.out.println(request.getParameter("topics"));
        String topicValue   = Jsoup.clean(request.getRequestURL().substring(request.getRequestURI().indexOf("=")+1), Whitelist.none());
        String nameValue    = Jsoup.clean(request.getParameter("name-input"), Whitelist.none());
        String emailValue   = Jsoup.clean(request.getParameter("email-input"), Whitelist.none());
        String messageValue = Jsoup.clean(request.getParameter("message-input"), Whitelist.none());

        //Start the dataStore
        Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
        KeyFactory keyFactory = datastore.newKeyFactory().setKind("Comment");
        
        Document doc =
           Document.newBuilder().setContent(messageValue).setType(Document.Type.PLAIN_TEXT).build();
        LanguageServiceClient languageService = LanguageServiceClient.create();
        Sentiment sentiment = languageService.analyzeSentiment(doc).getDocumentSentiment();
        float score = sentiment.getScore();
        languageService.close();

        if ( score > -0.1 ) {
            // Write the value to the response so the user can see it.
            response.setContentType("text/html;");
            response.getWriter().println("You submitted: ");
            response.getWriter().println("TOPIC: " + topicValue);
            response.getWriter().println("NAME: " + nameValue);
            response.getWriter().println("EMAIL: " + emailValue);
            response.getWriter().println("MESSAGE: " + messageValue);            
            response.getWriter().println("Score: " + score);  
            
          FullEntity messageEntity =
                Entity.newBuilder(keyFactory.newKey())
                    .set("topic", topicValue)    
                    .set("name", nameValue)
                    .set("email", emailValue)
                    .set("message", messageValue)
                    .build();           
            datastore.put(messageEntity);
        }
        response.sendRedirect("/input_form.html?topic="+topicValue);
  }
}