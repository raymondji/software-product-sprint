package com.google.sps.servlets.data;

public final class FeedBack {
    private final String name;
    private final String helpful;

    public FeedBack(String name, String helpful) {
        this.name = name;
        this.helpful = helpful;
    }

    public String getName() {
        return name;
    }

    public String getHelpful() {
        return helpful;
    }
}

