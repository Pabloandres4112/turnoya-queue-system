export class SendNotificationDto {
  userId: string;
  title: string;
  body: string;
  type: 'new-turn' | 'turn-completed' | 'queue-update' | 'next-turn';
  data?: any;
}
