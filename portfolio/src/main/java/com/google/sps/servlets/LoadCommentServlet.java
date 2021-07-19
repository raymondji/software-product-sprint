package com.google.sps.servlets;

import com.google.sps.servlets.data.Comment;
import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreOptions;
import com.google.cloud.datastore.Entity;
import com.google.cloud.datastore.Query;
import com.google.cloud.datastore.QueryResults;
import com.google.cloud.datastore.StructuredQuery.OrderBy;
import com.google.gson.Gson;
import java.util.ArrayList;
import java.util.List;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet responsible for save new messages. */
@WebServlet("/load-comment")
public class LoadCommentServlet extends HttpServlet {

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
        String searchTopic = "cheers";
        Query<Entity> query = Query.newEntityQueryBuilder().setKind("Comment").setOrderBy(OrderBy.desc("topic"))
                .build();
        QueryResults<Entity> results = datastore.run(query);

        List<Comment> topicComments = new ArrayList<>();
        String topic;
        String name;
        String email;
        String message;
        Comment comment;

        //search topic
        while (results.hasNext()) {
            Entity pivot = results.next();
            if( pivot.getString("topic").equals(searchTopic) ){
                
                topic = pivot.getString("topic");
                name = pivot.getString("name");
                email = pivot.getString("email");
                message  = pivot.getString("message");

                comment = new Comment(topic, name, email,message);
                topicComments.add(comment);
                break;
            }
        }
        
        while (results.hasNext()) {
            Entity entity = results.next();
            if( entity.getString("topic").equals(searchTopic) ){
                topic = entity.getString("topic");
                name = entity.getString("name");
                email = entity.getString("email");
                message  = entity.getString("message");;

                comment = new Comment(topic, name, email,message);
                topicComments.add(comment);
            }
            else break;
        } 

        Gson gson = new Gson();
        response.setContentType("application/json;");
        response.getWriter().println( gson.toJson(topicComments) );
    }
}