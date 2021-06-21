import { InjectableRxStompConfig } from "@stomp/ng2-stompjs";

const token: string =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBcGkgZGUgTG9naW4gVGVsdWdvIiwic3ViIjoidGVzdGUxNEBmNXByb21vdG9yYS5jb20uYnIiLCJlbXByZXNhTWFzdGVyIjoiOTA1NDU1MjkwMDAxODMiLCJ1c3VhcmlvUGFyY2Vpcm8iOiJKb8OjbyBWaXRvciIsImVxdWlwZSI6Ik5BQyIsInVzdWFyaW9Ob21lIjoiVGVzdGUiLCJhdXRob3JpdGllcyI6WyJST0xFX0NMSUVOVEUiLCJST0xFX0NMSUVOVEVfQ1JJQVIiXSwiaWF0IjoxNjIwOTA4ODQxLCJleHAiOjE2MjA5OTUyNDF9.8D98VlnBU6m7jfa_ldor6wJanMZIPPs7GmrvMIF_T6Y";

export const myRxStompConfig: InjectableRxStompConfig = {
  brokerURL: 'ws://127.0.0.1:8080/notifications',
  connectHeaders: {
    Authorization: token
  },
  heartbeatIncoming: 0,
  heartbeatOutgoing: 20000,
  reconnectDelay: 1000000,
  debug: (msg: string): void => {
    console.log(new Date(), msg);
  },
};
