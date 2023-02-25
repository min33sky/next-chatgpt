// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { queryChatGPT } from '@/lib/queryApi';
import { Message } from '@/types/chat';
import type { NextApiRequest, NextApiResponse } from 'next';
import admin from 'firebase-admin';
import { adminDB } from '@/lib/firebaseAdmin';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { text, chatId, model, session } = req.body;

    console.log(req.body);

    if (!text) {
      res.status(400).json({ message: 'Please provide a text!' });
      return;
    }

    if (!chatId) {
      res.status(400).json({ message: 'Please provide a valid chatId!' });
      return;
    }

    //* Call the ChatGPT API
    const response = await queryChatGPT({
      text,
      chatId,
      model,
    });

    const message: Message = {
      text: response || 'Fuck!!!!',
      createdAt: admin.firestore.Timestamp.now(),
      user: {
        _id: 'ChatGPT',
        name: 'ChatGPT',
        avatar: 'https://links.papareact.com/89k',
      },
    };

    await adminDB
      .collection('users')
      .doc(session?.user?.email)
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .add(message);

    res.status(200).json({ answer: message.text });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
