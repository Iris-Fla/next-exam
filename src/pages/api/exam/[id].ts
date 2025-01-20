import { NextApiRequest, NextApiResponse } from 'next';
import Prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    const examId = Number(id);
    if (isNaN(examId)) {
      return res.status(400).json({ error: 'Invalid exam ID' });
    }

    const examData = await Prisma.examdata.findUnique({
      where: { id: examId },
    });

    if (!examData) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    res.status(200).json(examData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}