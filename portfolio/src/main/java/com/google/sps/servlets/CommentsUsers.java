package com.google.sps.servlets;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreOptions;
import com.google.cloud.datastore.Entity;
import com.google.cloud.datastore.Query;
import com.google.cloud.datastore.QueryResults;
import com.google.gson.Gson;
import com.google.sps.servlets.data.FeedBack;

@WebServlet("/comment-user")
public class CommentsUsers extends HttpServlet {

    //private static final long serialVersionUID = 1L;

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Datastore datastore = DatastoreOptions.getDefaultInstance().getService();

        Query<Entity> query = Query.newEntityQueryBuilder().setKind("FeedBack").build();
        QueryResults<Entity> results = datastore.run(query);

        List<FeedBack> feedbackComments = new ArrayList<>();
        String name;
        String helpful;
        FeedBack feedback;

        while (results.hasNext()) {
            Entity pivot = results.next();
            name = pivot.getString("name");
            helpful = pivot.getString("helpful");
            
            feedback = new FeedBack(name, helpful);
            feedbackComments.add(feedback);
        }

    Gson gson = new Gson();
    response.setContentType("application/json;");
    response.getWriter().println(gson.toJson(feedbackComments));
  }
}