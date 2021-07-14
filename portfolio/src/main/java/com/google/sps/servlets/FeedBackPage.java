package com.google.sps.servlets;

/*import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreOptions;
import com.google.cloud.datastore.Entity;
import com.google.cloud.datastore.FullEntity;
import com.google.cloud.datastore.KeyFactory;*/
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/feedBack-page")
public final class FeedBackPage extends HttpServlet {

    private static final long serialVersionUID = 1L;

    @Override
    public void doPost(final HttpServletRequest request, final HttpServletResponse response) throws IOException {
        final String name = request.getParameter("name-input");
        final String helpful = request.getParameter("helpful-input");

       // Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
       // KeyFactory keyFactory = datastore.newKeyFactory().setKind("FeedBack");
        
        if (!name.equals("") && !helpful.equals("")) {
            System.out.println("You submitted this data: ");
            System.out.println("Name: " + name);
            System.out.println("Helpful?: " + helpful);

            response.getWriter().println("You submitted this data: ");
            response.getWriter().println("Name: " + name);
            response.getWriter().println("Helpful?: " + helpful);

         //   FullEntity feedBackEntity = Entity.newBuilder(keyFactory.newKey()).set("name", name).set("helpful", helpful).build();

           // datastore.put(feedBackEntity);
        }
    }
}