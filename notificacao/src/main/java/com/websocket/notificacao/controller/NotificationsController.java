package com.websocket.notificacao.controller;

import com.websocket.notificacao.service.NotificationDispatcher;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;

@Controller
public class NotificationsController {
    private final NotificationDispatcher notificationDispatcher;

    @Autowired
    public NotificationsController(NotificationDispatcher dispatcher) {
        this.notificationDispatcher = dispatcher;
    }

    @MessageMapping("/start")
    public void start(@Payload String message, StompHeaderAccessor accessor) {
        System.out.println("START STOMP");
        notificationDispatcher.add(accessor.getSessionId());
    }

    @MessageMapping("/stop")
    public void stop(StompHeaderAccessor accessor) {
        notificationDispatcher.remove(accessor.getSessionId());
    }

}
