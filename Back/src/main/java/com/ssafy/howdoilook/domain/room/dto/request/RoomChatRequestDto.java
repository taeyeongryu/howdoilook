package com.ssafy.howdoilook.domain.room.dto.request;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RoomChatRequestDto {
    private String chatContent;
    private String token;
    private long roomId;
    @Builder
    public RoomChatRequestDto(String chatContent, String token, long roomId) {
        this.chatContent = chatContent;
        this.token = token;
        this.roomId = roomId;
    }
}
