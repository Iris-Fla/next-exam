import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'ExamImgStorage',
  access: (allow) => ({
      'examdata/{entity_id}/*': [
        allow.guest.to(['read']),
        allow.entity('identity').to(['read', 'write', 'delete'])
      ],
      'examdata-public/*': [
        allow.authenticated.to(['read','write']),
        allow.guest.to(['read', 'write'])
      ],
    })
});
