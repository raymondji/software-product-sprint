/** Class containing format of message send in my page. */
package com.google.sps.servlets.data;

public final class Comment{
    private final String topic;
    private final String name;
    private final String email; 
    private final String message;

    public Comment(String topic,  String name, String email,  String message){
        this.topic = topic;
        this.name = name;
        this.email = email;
        this.message = message;
    }

    public String getTopic(){
        return topic;
    }
    public String getName(){
        return name;
    }
    public String getEmail(){
        return email;
    }
    public String getMessage(){
        return message;
    }
    
}