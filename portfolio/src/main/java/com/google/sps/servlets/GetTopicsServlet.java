package com.google.sps.servlets;

import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.gson.Gson;
import java.nio.file.Files;
import java.nio.file.Paths;

/** Handles requests sent to the /hello URL. Try running a server and navigating to /hello! */
@WebServlet("/get-topics")
public class GetTopicsServlet extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
      String filePath = "src/main/java/com/google/sps/servlets/topic-list.json";
    String jsonStr = new String(Files.readAllBytes(Paths.get(filePath)));
    response.setContentType("application/json;");
    response.getWriter().println(jsonStr);
  }
}
